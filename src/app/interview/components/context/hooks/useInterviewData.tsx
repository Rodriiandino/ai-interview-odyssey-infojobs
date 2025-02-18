'use client'

import fetchApiOpeniai from '@/services/fetch-api-routes-openiai'
import { InterviewData, JobData, QuestionData } from '@/types/interview-key'
import { SearchParamsInterview } from '@/types/search-params'
import processOpenAIResponse from '@/utils/process-open-ai-response'
import { useCallback, useEffect, useState, useRef } from 'react'
import { useTrainingContext } from '../training-context'

export default function useInterviewData() {
  const [questionData, setQuestionData] = useState<QuestionData[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [finished, setFinished] = useState(false)
  const [jobData, setJobData] = useState<JobData>({
    title: '',
    requirement: ''
  })
  const isFetchingRef = useRef(false)

  const limit = 5

  const { trainingData } = useTrainingContext()

  const fetchData = useCallback(
    async ({ trainingData }: { trainingData: SearchParamsInterview }) => {
      if (isFetchingRef.current) return

      try {
        isFetchingRef.current = true
        setLoading(true)
        const response: InterviewData = await fetchApiOpeniai({
          searchParamsInterview: trainingData
        })

        const completions = response.openAIResponse
        setJobData(response.jobData)

        const newQuestionData: QuestionData = processOpenAIResponse(completions)

        setQuestionData(prevData => [...prevData, newQuestionData])
      } catch (error: any) {
        console.error('Error en fetchData:', error)
      } finally {
        setLoading(false)
        isFetchingRef.current = false
      }
    },
    []
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
        ? questionData[currentQuestionIndex].answers[selectedAnswerIndex]
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

  const handleNewQuestion = useCallback(() => {
    setCurrentQuestionIndex(prevIndex => {
      const newIndex = prevIndex + 1
      if (newIndex === limit) {
        setFinished(true)
        return prevIndex
      }

      if (newIndex === questionData.length && !isFetchingRef.current) {
        fetchData({ trainingData })
      }
      return newIndex
    })
  }, [fetchData, limit, questionData.length, trainingData])

  const handleReset = () => {
    setQuestionData([])
    setCurrentQuestionIndex(0)
    setFinished(false)
    setLoading(true)
    isFetchingRef.current = false
  }

  useEffect(() => {
    if (
      questionData.length === 0 &&
      trainingData.token &&
      !isFetchingRef.current
    ) {
      fetchData({ trainingData })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, trainingData])

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
