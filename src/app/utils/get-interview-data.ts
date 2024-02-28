import {
  InterviewType,
  Interviewer,
  interviewTypeDescriptions,
  interviewerDescriptions
} from '../types/training-key'

export function getInterviewData(
  selectedInterviewType: InterviewType,
  selectedInterviewer: Interviewer
) {
  const interviewCharacteristics = selectedInterviewType
    ? assignCharacteristics(selectedInterviewType)
    : 'Características no definidas para este tipo de entrevista.'
  const interviewPersonality = selectedInterviewer
    ? assignPersonality(selectedInterviewer)
    : 'Una personalidad neutral.'

  return { interviewCharacteristics, interviewPersonality }
}

const assignPersonality = (selectedInterviewer: Interviewer): string => {
  return (
    interviewerDescriptions[selectedInterviewer] || 'Una personalidad neutral.'
  )
}

const assignCharacteristics = (interviewType: InterviewType): string => {
  return (
    interviewTypeDescriptions[interviewType] ||
    'Características no definidas para este tipo de entrevista.'
  )
}
