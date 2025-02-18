'used client'

import { JobData, QuestionData } from '@/types/interview-key'
import processOpenAIResponse from '@/utils/process-open-ai-response'
import { useCallback, useEffect, useState } from 'react'
import { mockOpenAIResponse } from '@/mock/mock-openai-response'

export default function useInterviewData() {
  const [questionData, setQuestionData] = useState<QuestionData[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [finished, setFinished] = useState(false)
  const [jobData, setJobData] = useState<JobData>({
    title: '',
    requirement: ''
  })
  const [indexMock, setIndexMock] = useState(0)
  const limit = 5

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const completions = mockOpenAIResponse[indexMock]
      setIndexMock(indexMock + 1)

      const newQuestionData: QuestionData = processOpenAIResponse(completions)

      setJobData({
        title: 'Desarrollador Java Springboot (100% Remoto)',
        requirement:
          '-Perfil Back end orientado a Microservicios - Experiencia de consolidad en desarrollo de software con Java Spring Boot, API Rest, Swagger, Postman.'
      })

      setQuestionData([...questionData, newQuestionData])

      setTimeout(() => {
        setLoading(false)
      }, 200)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }, [indexMock, questionData])

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

  const handleNewQuestion = () => {
    setCurrentQuestionIndex(prevIndex => {
      const newIndex = prevIndex + 1
      if (newIndex === limit) {
        setFinished(true)
        return newIndex - 1
      } else {
        if (newIndex === questionData.length) {
          fetchData()
        }
      }
      return newIndex
    })
  }

  const handleReset = () => {
    setQuestionData([])
    setCurrentQuestionIndex(0)
    setFinished(false)
    setLoading(true)
    setIndexMock(0)
  }

  useEffect(() => {
    if (questionData.length === 0) {
      fetchData()
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
