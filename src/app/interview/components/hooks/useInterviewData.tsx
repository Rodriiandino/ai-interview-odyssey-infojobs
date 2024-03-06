'used client'

import fetchApiOpeniai from '@/app/services/fetch-api-routes-openiai'
import { InterviewData, JobData, QuestionData } from '@/app/types/interview-key'
import { SearchParamsInterview } from '@/app/types/search-params'
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
  const [jobData, setJobData] = useState<JobData>()

  const fetchData = useCallback(
    async ({ trainingData }: { trainingData: SearchParamsInterview }) => {
      try {
        setLoading(true)
        const response: InterviewData = await fetchApiOpeniai({
          searchParamsInterview: trainingData
        })

        const completions = response.openAIResponse
        setJobData(response.jobData)

        const questionStartIndex = completions.indexOf('Pregunta:')
        const questionEndIndex = completions.indexOf('Respuestas:')
        const answersEndIndex = completions.indexOf('Respuesta correcta')
        const explanationIndex = completions.indexOf('Explicación:')

        const questionText = completions
          .substring(questionStartIndex, questionEndIndex)
          .replace('Pregunta:', '')
          .trim()

        const answersText = completions
          .substring(questionEndIndex, answersEndIndex)
          .replace('Respuestas:', '')
          .trim()
          .split('\n')
          .map((answer: string) => answer.trim())
          .filter((answer: string) => answer !== '')

        const correctAnswer = completions
          .substring(answersEndIndex, explanationIndex)
          .replace('Respuesta correcta:', '')
          .trim()

        const explanationText = completions
          .substring(explanationIndex)
          .replace('Explicación:', '')
          .trim()

        const newQuestionData: QuestionData = {
          question: questionText,
          answers: answersText,
          selectedAnswer: null,
          answerStatus: '',
          correctAnswer,
          explanation: explanationText,
          submitted: false,
          answerIsSelected: false
        }

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
