export enum SearchParamsInterviewKeys {
  InterviewType = 'interviewType',
  Interviewer = 'interviewer',
  JobId = 'jobId'
}

export type QuestionData = {
  question: string
  answers: string[]
  selectedAnswer: number | null
  answerStatus: string
  correctAnswer: string
  explanation: string
  submitted: boolean
  answerIsSelected: boolean
}

export type JobData = {
  title: string
  requirement: string
}

export type InterviewData = {
  jobData: JobData
  openAIResponse: string
}
