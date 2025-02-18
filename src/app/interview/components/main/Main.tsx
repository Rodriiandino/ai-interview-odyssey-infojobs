'use client'

import FinishedInterview from './FinishedInterview'
import QuestionAndAnswers from './QuestionAndAnswers'
import { useInterviewContext } from '.././context/interview-context'
import { useTrainingContext } from '.././context/training-context'

export default function Main() {
  const {
    questionData,
    currentQuestionIndex,
    handleAnswerSelection,
    loading,
    finished,
    jobData,
    error
  } = useInterviewContext()

  const { interviewCharacteristics, interviewPersonality, trainingData } =
    useTrainingContext()

  if (error) {
    return (
      <div className='p-4 bg-red-500 text-white text-center'>
        Error: {error}
      </div>
    )
  }

  return (
    <>
      {finished ? (
        <FinishedInterview
          questionData={questionData}
          trainingData={trainingData}
          jobData={jobData}
        />
      ) : (
        <QuestionAndAnswers
          loading={loading}
          currentQuestionIndex={currentQuestionIndex}
          questionData={questionData}
          trainingData={trainingData}
          interviewCharacteristics={interviewCharacteristics}
          interviewPersonality={interviewPersonality}
          handleAnswerSelection={handleAnswerSelection}
        />
      )}
    </>
  )
}
