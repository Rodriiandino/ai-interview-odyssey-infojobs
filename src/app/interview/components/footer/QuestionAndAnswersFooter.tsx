import { QuestionData } from '@/app/types/interview-key'

interface QuestionAndAnswersFooterProps {
  loading: boolean
  questionData: QuestionData[]
  currentQuestionIndex: number
  limit: number
  handleSubmit: () => void
  handleNewQuestion: () => void
}

export default function QuestionAndAnswersFooter({
  loading,
  questionData,
  currentQuestionIndex,
  limit,
  handleSubmit,
  handleNewQuestion
}: QuestionAndAnswersFooterProps) {
  return (
    <footer className='flex gap-2 animate-fade-in'>
      <button
        className='bg-primary text-white px-4 py-2 rounded-lg  hover:bg-secondary disabled:opacity-50 transition-colors duration-200'
        onClick={() => handleSubmit()}
        disabled={
          loading ||
          !questionData[currentQuestionIndex]?.answerIsSelected ||
          questionData[currentQuestionIndex]?.submitted
        }
      >
        Responder
      </button>
      {questionData[currentQuestionIndex]?.submitted && (
        <button
          className='bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary disabled:opacity-50 transition-colors duration-200'
          onClick={() => handleNewQuestion()}
          disabled={loading}
        >
          {currentQuestionIndex + 1 === limit ? 'Finalizar' : 'Siguiente'}
        </button>
      )}
    </footer>
  )
}
