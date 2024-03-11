import { QuestionData } from '@/app/types/interview-key'

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
        <footer className='flex gap-2 animate-fade-in'>
          <a
            href='/training'
            className='bg-primary text-white px-4 py-2 rounded-lg  hover:bg-secondary disabled:opacity-50 transition-colors duration-200'
          >
            Volver
          </a>
          <button
            className='bg-primary text-white px-4 py-2 rounded-lg  hover:bg-secondary disabled:opacity-50 transition-colors duration-200'
            onClick={() => handleReset()}
          >
            Reiniciar
          </button>
        </footer>
      ) : (
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
      )}
    </>
  )
}

export default Footer
