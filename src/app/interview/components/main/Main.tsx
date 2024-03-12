import { JobData, QuestionData } from '@/app/types/interview-key'
import { SearchParamsInterview } from '@/app/types/search-params'
import FinishedInterview from './FinishedInterview'
import QuestionAndAnswers from './QuestionAndAnswers'

interface MainProps {
  finished: boolean
  questionData: QuestionData[]
  trainingData: SearchParamsInterview
  jobData: JobData
  interviewCharacteristics: string
  interviewPersonality: string
  loading: boolean
  currentQuestionIndex: number
  handleAnswerSelection: (index: number) => void
}

const Main: React.FC<MainProps> = ({
  finished,
  questionData,
  trainingData,
  jobData,
  interviewCharacteristics,
  interviewPersonality,
  loading,
  currentQuestionIndex,
  handleAnswerSelection
}) => {
  return (
    <>
      {finished ? (
        <FinishedInterview
          questionData={questionData}
          trainingData={trainingData}
          jobData={jobData}
        />
      ) : (
        <QuestionAndAnswers
          loading={loading}
          currentQuestionIndex={currentQuestionIndex}
          questionData={questionData}
          trainingData={trainingData}
          interviewCharacteristics={interviewCharacteristics}
          interviewPersonality={interviewPersonality}
          handleAnswerSelection={handleAnswerSelection}
        />
      )}
    </>
  )
}

export default Main
