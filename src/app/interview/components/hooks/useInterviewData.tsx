'used client'

import fetchApiOpeniai from '@/app/services/fetch-api-routes-openiai'
import { SearchParamsInterview } from '@/app/types/search-params'
import { useEffect, useState } from 'react'

export default function useInterviewData({
  trainingData
}: {
  trainingData: SearchParamsInterview
}) {
  const [question, setQuestion] = useState<string>('')
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number>(NaN)
  const [answerIsSelected, setAnswerIsSelected] = useState<boolean>(false)
  const [answerStatus, setAnswerStatus] = useState<string>('')
  const [correctAnswer, setCorrectAnswer] = useState<string>('')
  const [explanation, setExplanation] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [currentQuestion, setCurrentQuestion] = useState<number>(1)
  const [limit, setLimit] = useState<number>(5)
  const [finished, setFinished] = useState<boolean>(false)

  const fetchData = async ({
    trainingData
  }: {
    trainingData: SearchParamsInterview
  }) => {
    try {
      setLoading(true)
      const response = await fetchApiOpeniai({
        searchParamsInterview: trainingData
      })

      const completions = response.openAIResponse

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

      const answerCorrect = completions
        .substring(answersEndIndex, explanationIndex)
        .replace('Respuesta correcta:', '')
        .trim()

      const explanationText = completions
        .substring(explanationIndex)
        .replace('Explicación:', '')
        .trim()

      setCorrectAnswer(answerCorrect)
      setExplanation(explanationText)
      setQuestion(questionText)
      setAnswers(answersText)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData({ trainingData })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAnswerSelection = (index: number) => {
    setSelectedAnswer(index)
    setAnswerIsSelected(true)
  }

  const handleSubmit = () => {
    setSubmitted(true)

    const formattedSelectedAnswer = answers[selectedAnswer].substring(3)

    if (formattedSelectedAnswer == correctAnswer) {
      setAnswerStatus('Correcto')
    } else {
      setAnswerStatus('Incorrecto')
    }
  }

  const handleNewQuestion = () => {
    if (currentQuestion === limit) {
      setFinished(true)
      return
    }
    setCurrentQuestion(currentQuestion + 1)
    setAnswers([])
    setQuestion('')
    setSelectedAnswer(NaN)
    setAnswerStatus('')
    setSubmitted(false)
    setAnswerIsSelected(false)
    fetchData({ trainingData })
  }

  const handleReset = () => {
    setCurrentQuestion(1)
    setFinished(false)
    setAnswers([])
    setQuestion('')
    setSelectedAnswer(NaN)
    setAnswerStatus('')
    setSubmitted(false)
    setAnswerIsSelected(false)
    fetchData({ trainingData })
  }

  return {
    question,
    answers,
    selectedAnswer,
    answerStatus,
    explanation,
    submitted,
    loading,
    answerIsSelected,
    correctAnswer,
    handleAnswerSelection,
    handleSubmit,
    handleNewQuestion,
    currentQuestion,
    limit,
    finished,
    handleReset
  }
}
