'use client'

import { JobData, QuestionData } from '@/app/types/interview-key'
import { createContext, useContext } from 'react'
import useInterviewData from './hooks/useInterviewData'
import useInterviewDataMock from './hooks/useInterviewDataMock'

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
  // const interviewData = useInterviewData()
  const interviewData = useInterviewDataMock()

  return (
    <InterviewContext.Provider value={interviewData}>
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
