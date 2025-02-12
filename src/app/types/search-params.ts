export type BaseSearchParams = {
  page: number
  category?: string
  q?: string
}

type AdditionalSearchParams = {
  maxResults: number
  order: string
}

export type CombinedSearchParams = BaseSearchParams & AdditionalSearchParams

import { InterviewType, Interviewer, AIModel } from './training-key'

export interface SearchParamsInterview {
  interviewType: InterviewType
  interviewer: Interviewer
  jobId: string
  aiModel: AIModel
  token: string
}
