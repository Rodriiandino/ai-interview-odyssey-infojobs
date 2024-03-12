import { QuestionData } from '@/app/types/interview-key'
import FinishedFooter from './FinishedFooter'
import QuestionAndAnswersFooter from './QuestionAndAnswersFooter'

interface FooterProps {
  finished: boolean
  handleReset: () => void
  handleSubmit: () => void
  loading: boolean
  questionData: QuestionData[]
  currentQuestionIndex: number
  limit: number
  handleNewQuestion: () => void
}

const Footer: React.FC<FooterProps> = ({
  finished,
  handleReset,
  handleSubmit,
  loading,
  questionData,
  currentQuestionIndex,
  limit,
  handleNewQuestion
}) => {
  return (
    <>
      {finished ? (
        <FinishedFooter handleReset={handleReset} />
      ) : (
        <QuestionAndAnswersFooter
          loading={loading}
          questionData={questionData}
          currentQuestionIndex={currentQuestionIndex}
          limit={limit}
          handleSubmit={handleSubmit}
          handleNewQuestion={handleNewQuestion}
        />
      )}
    </>
  )
}

export default Footer
