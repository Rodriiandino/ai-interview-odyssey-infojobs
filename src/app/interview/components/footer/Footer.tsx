'use client'

import FinishedFooter from './FinishedFooter'
import QuestionAndAnswersFooter from './QuestionAndAnswersFooter'
import { useInterviewContext } from '../../context/interview-context'

export default function Footer() {
  const {
    questionData,
    currentQuestionIndex,
    limit,
    loading,
    finished,
    handleSubmit,
    handleNewQuestion,
    handleReset
  } = useInterviewContext()

  return (
    <>
      {finished ? (
        <FinishedFooter handleReset={handleReset} />
      ) : (
        <QuestionAndAnswersFooter
          loading={loading}
          questionData={questionData}
          currentQuestionIndex={currentQuestionIndex}
          limit={limit}
          handleSubmit={handleSubmit}
          handleNewQuestion={handleNewQuestion}
        />
      )}
    </>
  )
}
