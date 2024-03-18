'use client'

import { useSearchParams } from 'next/navigation'
import {
  InterviewType,
  Interviewer,
  SearchParamKey
} from '@/app/types/training-key'
import { SearchParamsInterview } from '@/app/types/search-params'
import { getInterviewData } from '@/app/utils/get-interview-data'

export function useTrainingData() {
  const searchParams = useSearchParams()

  const selectedInterviewType = searchParams.get(
    SearchParamKey.InterviewType
  ) as InterviewType
  const selectedInterviewer = searchParams.get(
    SearchParamKey.Interviewer
  ) as Interviewer
  const jobId = searchParams.get(SearchParamKey.JobId)

  const { interviewCharacteristics, interviewPersonality } = getInterviewData(
    selectedInterviewType,
    selectedInterviewer
  )

  const trainingData: SearchParamsInterview = {
    interviewType: selectedInterviewType,
    interviewer: selectedInterviewer,
    jobId: jobId || ''
  }

  return {
    trainingData,
    interviewCharacteristics,
    interviewPersonality
  }
}
