'use client'

import useInterviewData from './hooks/useInterviewData'
import { useTrainingData } from './hooks/useTrainingData'
import Header from './Header'
import Main from './main/Main'
import Footer from './footer/Footer'

export default function InterviewPage() {
  const { trainingData, interviewCharacteristics, interviewPersonality } =
    useTrainingData()
  const {
    handleAnswerSelection,
    handleNewQuestion,
    handleSubmit,
    loading,
    currentQuestionIndex,
    limit,
    finished,
    handleReset,
    questionData,
    jobData
  } = useInterviewData({ trainingData })

  return (
    <div className='bg-GrayL3 min-h-screen py-8 px-4 max-sm:px-2 max-sm:py-4 h-full flex items-center'>
      <div className='max-w-screen-xl mx-auto bg-white shadow rounded-lg sm:p-6 p-4 h-full w-full'>
        <Header currentQuestionIndex={currentQuestionIndex} limit={limit} />
        <Main
          questionData={questionData}
          handleAnswerSelection={handleAnswerSelection}
          currentQuestionIndex={currentQuestionIndex}
          interviewCharacteristics={interviewCharacteristics}
          interviewPersonality={interviewPersonality}
          finished={finished}
          jobData={jobData}
          loading={loading}
          trainingData={trainingData}
        />
        <Footer
          finished={finished}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
          loading={loading}
          questionData={questionData}
          currentQuestionIndex={currentQuestionIndex}
          limit={limit}
          handleNewQuestion={handleNewQuestion}
        />
      </div>
    </div>
  )
}
