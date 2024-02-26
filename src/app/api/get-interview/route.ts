import {
  InterviewType,
  Interviewer,
  SearchParamKey
} from '@/app/types/training-key'
import { NextResponse } from 'next/server'
import { getInterviewData } from '@/app/utils/get-interview-data'

export const GET = async (req: { url: string | URL }) => {
  const { searchParams } = new URL(req.url)

  const selectedInterviewType = searchParams.get(
    SearchParamKey.InterviewType
  ) as InterviewType | null
  const selectedInterviewer = searchParams.get(
    SearchParamKey.Interviewer
  ) as Interviewer | null

  const { interviewCharacteristics, interviewPersonality } = getInterviewData(
    selectedInterviewType,
    selectedInterviewer
  )

  try {
    return NextResponse.json({
      interviewCharacteristics,
      interviewPersonality
    })
  } catch (error) {
    console.error('Error:', error)
  }
}
