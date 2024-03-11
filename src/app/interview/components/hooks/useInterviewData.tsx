'used client'

import fetchApiOpeniai from '@/app/services/fetch-api-routes-openiai'
import { InterviewData, JobData, QuestionData } from '@/app/types/interview-key'
import { SearchParamsInterview } from '@/app/types/search-params'
import processOpenAIResponse from '@/app/utils/process-open-ai-response'
import { useCallback, useEffect, useState } from 'react'

export default function useInterviewData({
  trainingData
}: {
  trainingData: SearchParamsInterview
}) {
  const [questionData, setQuestionData] = useState<QuestionData[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [finished, setFinished] = useState(false)
  const [limit, setLimit] = useState<number>(3)
  const [jobData, setJobData] = useState<JobData>({
    title: '',
    requirement: ''
  })

  const fetchData = useCallback(
    async ({ trainingData }: { trainingData: SearchParamsInterview }) => {
      try {
        setLoading(true)
        const response: InterviewData = await fetchApiOpeniai({
          searchParamsInterview: trainingData
        })

        const completions = response.openAIResponse
        setJobData(response.jobData)

        const newQuestionData: QuestionData = processOpenAIResponse(completions)

        setQuestionData([...questionData, newQuestionData])
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    },
    [questionData]
  )

  const handleAnswerSelection = (index: number) => {
    const updatedQuestionData = [...questionData]
    updatedQuestionData[currentQuestionIndex].selectedAnswer = index
    updatedQuestionData[currentQuestionIndex].answerIsSelected = true
    setQuestionData(updatedQuestionData)
  }

  const handleSubmit = () => {
    const selectedAnswerIndex =
      questionData[currentQuestionIndex].selectedAnswer
    const formattedSelectedAnswer =
      selectedAnswerIndex !== null
        ? questionData[currentQuestionIndex].answers[
            selectedAnswerIndex
          ].substring(3)
        : ''
    const isCorrect =
      formattedSelectedAnswer ===
      questionData[currentQuestionIndex].correctAnswer

    const updatedQuestionData = [...questionData]
    updatedQuestionData[currentQuestionIndex].submitted = true
    updatedQuestionData[currentQuestionIndex].answerStatus = isCorrect
      ? 'Correcto'
      : 'Incorrecto'
    setQuestionData(updatedQuestionData)
  }

  const handleNewQuestion = () => {
    if (currentQuestionIndex + 1 === limit) {
      setFinished(true)
      return
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1)
    if (currentQuestionIndex + 1 === questionData.length) {
      fetchData({
        trainingData
      })
    }
  }

  const handleReset = () => {
    setQuestionData([])
    setCurrentQuestionIndex(0)
    setFinished(false)
  }

  useEffect(() => {
    if (questionData.length === 0) {
      fetchData({ trainingData })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionData])

  return {
    questionData,
    loading,
    finished,
    currentQuestionIndex,
    limit,
    handleAnswerSelection,
    handleSubmit,
    handleNewQuestion,
    handleReset,
    jobData
  }
}
