import { QuestionData } from '../types/interview-key'

const processOpenAIResponse = (response: string): QuestionData => {
  const questionStartIndex = response.indexOf('Pregunta:')
  const questionEndIndex = response.indexOf('Respuestas:')
  const answersEndIndex = response.indexOf('Respuesta correcta')
  const explanationIndex = response.indexOf('Explicación:')

  const questionText = response
    .substring(questionStartIndex, questionEndIndex)
    .replace('Pregunta:', '')
    .trim()

  const answersText = response
    .substring(questionEndIndex, answersEndIndex)
    .replace('Respuestas:', '')
    .trim()
    .split('\n')
    .map((answer: string) => answer.trim())
    .filter((answer: string) => answer !== '')

  const correctAnswerText = response
    .substring(answersEndIndex, explanationIndex)
    .replace('Respuesta correcta:', '')
    .trim()

  const explanationText = response
    .substring(explanationIndex)
    .replace('Explicación:', '')
    .trim()

  return {
    question: questionText,
    answers: answersText,
    selectedAnswer: null,
    answerStatus: '',
    correctAnswer: correctAnswerText,
    explanation: explanationText,
    submitted: false,
    answerIsSelected: false
  }
}

export default processOpenAIResponse
