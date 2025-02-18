'use client'

import { useSearchParams } from 'next/navigation'
import {
  InterviewType,
  Interviewer,
  SearchParamKey,
  AIModel
} from '@/types/training-key'
import { SearchParamsInterview } from '@/types/search-params'
import { getInterviewData } from '@/utils/get-interview-data'
import { useEffect, useState } from 'react'

export function useTrainingData() {
  const searchParams = useSearchParams()
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    const getStoredToken = () => {
      try {
        const storedToken = sessionStorage.getItem('aiToken')
        if (storedToken) {
          setToken(storedToken)
        }
      } catch (error) {
        console.error('Error accessing sessionStorage:', error)
      }
    }

    getStoredToken()
  }, [])

  const selectedInterviewType = searchParams.get(
    SearchParamKey.InterviewType
  ) as InterviewType
  const selectedInterviewer = searchParams.get(
    SearchParamKey.Interviewer
  ) as Interviewer
  const jobId = searchParams.get(SearchParamKey.JobId)
  const aiModel = searchParams.get(SearchParamKey.AIModel) as AIModel

  const { interviewCharacteristics, interviewPersonality } = getInterviewData(
    selectedInterviewType,
    selectedInterviewer
  )

  const trainingData: SearchParamsInterview = {
    interviewType: selectedInterviewType,
    interviewer: selectedInterviewer,
    jobId: jobId || '',
    aiModel: aiModel,
    token: token || ''
  }

  return {
    trainingData,
    interviewCharacteristics,
    interviewPersonality
  }
}
