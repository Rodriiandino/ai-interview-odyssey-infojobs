'use client'

import { SearchParamsInterview } from '@/types/search-params'
import { createContext, useContext } from 'react'
import { useTrainingData } from './hooks/useTrainingData'

type TrainingDataContext = {
  trainingData: SearchParamsInterview
  interviewCharacteristics: string
  interviewPersonality: string
}

type TrainingDataContextProviderProps = {
  children: React.ReactNode
}

export const TrainingContext = createContext<TrainingDataContext | null>(null)

export default function TrainingDataProvider({
  children
}: TrainingDataContextProviderProps) {
  const trainingData = useTrainingData()

  return (
    <TrainingContext.Provider value={trainingData}>
      {children}
    </TrainingContext.Provider>
  )
}

export const useTrainingContext = () => {
  const context: TrainingDataContext | null = useContext(TrainingContext)
  if (!context) {
    throw new Error(
      'useTrainingContext must be used within an TrainingDataProvider'
    )
  }
  return context
}
