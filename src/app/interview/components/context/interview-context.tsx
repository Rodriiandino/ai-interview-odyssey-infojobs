'use client'

import { JobData, QuestionData } from '@/app/types/interview-key'
import { createContext, useContext } from 'react'
import useInterviewData from './hooks/useInterviewData'
import useInterviewDataMock from './hooks/useInterviewDataMock'
import { useTrainingContext } from './training-context'

type InterviewDataContext = {
  questionData: QuestionData[]
  loading: boolean
  finished: boolean
  currentQuestionIndex: number
  limit: number
  handleAnswerSelection: (index: number) => void
  handleSubmit: () => void
  handleNewQuestion: () => void
  handleReset: () => void
  jobData: JobData
}

type InterviewDataContextProviderProps = {
  children: React.ReactNode
}

export const InterviewContext = createContext<InterviewDataContext | null>(null)

export default function InterviewDataProvider({
  children
}: InterviewDataContextProviderProps) {
  const { trainingData } = useTrainingContext()

  const interviewData = useInterviewData()
  const interviewDataMock = useInterviewDataMock()

  const contextValue = trainingData.token ? interviewData : interviewDataMock

  return (
    <InterviewContext.Provider value={contextValue}>
      {children}
    </InterviewContext.Provider>
  )
}

export const useInterviewContext = () => {
  const context: InterviewDataContext | null = useContext(InterviewContext)
  if (!context) {
    throw new Error(
      'useInterviewContext must be used within an InterviewDataProvider'
    )
  }
  return context
}
