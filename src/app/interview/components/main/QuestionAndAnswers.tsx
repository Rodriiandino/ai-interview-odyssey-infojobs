import { QuestionData } from '@/app/types/interview-key'
import { SearchParamsInterview } from '@/app/types/search-params'

interface QuestionAndAnswersProps {
  loading: boolean
  currentQuestionIndex: number
  questionData: QuestionData[]
  trainingData: SearchParamsInterview
  interviewCharacteristics: string
  interviewPersonality: string
  handleAnswerSelection: (index: number) => void
}

const QuestionAndAnswers: React.FC<QuestionAndAnswersProps> = ({
  loading,
  currentQuestionIndex,
  questionData,
  trainingData,
  interviewCharacteristics,
  interviewPersonality,
  handleAnswerSelection
}) => {
  return (
    <main>
      <header className='mb-4'>
        <h3 className='mb-2 text-primaryL1 font-bold text-lg'>
          Tipo de Entrevista:{' '}
          <span className='text-GrayD4 font-medium'>
            {trainingData.interviewType}{' '}
            <small className='opacity-85 text-GrayD4'>
              ({interviewCharacteristics})
            </small>
          </span>
        </h3>
        <h3 className='mb-2 text-primaryL1 font-bold text-lg'>
          Entrevistador:{' '}
          <span className='text-GrayD4 font-medium'>
            {trainingData.interviewer}{' '}
            <small className='opacity-85 text-GrayD4'>
              ({interviewPersonality})
            </small>
          </span>
        </h3>
      </header>
      <section className='mb-4'>
        <h3 className='font-bold mb-2 text-xl text-primary'>Enunciado</h3>
        {loading ? (
          <div role='status' className='space-y-2.5 animate-pulse max-w-lg'>
            <div className='flex items-center w-full'>
              <div className='h-2.5 rounded-full bg-primary w-32'></div>
              <div className='h-2.5 ms-2 rounded-full bg-primaryL1 w-24'></div>
              <div className='h-2.5 ms-2 rounded-full bg-primaryL1 w-full'></div>
            </div>
            <div className='flex items-center w-full max-w-[480px]'>
              <div className='h-2.5 rounded-full bg-primary w-full'></div>
              <div className='h-2.5 ms-2 rounded-full bg-primaryL1 w-full'></div>
              <div className='h-2.5 ms-2 rounded-full bg-primaryL1 w-24'></div>
            </div>
            <span className='sr-only'>Loading...</span>
          </div>
        ) : (
          <p className='text-GrayD4 text-lg animate-fade-in'>
            {questionData[currentQuestionIndex]?.question}
          </p>
        )}
      </section>
      <section className='mb-4'>
        <h3 className='font-bold mb-2 text-xl text-primary'>Respuestas</h3>

        {loading ? (
          <div
            role='status'
            className='space-y-4 divide-y animate-pulse dark:divide-primaryL1 p-4 w-full'
          >
            <div className='flex items-center justify-between w-full pt-4'>
              <div className='w-full'>
                <div className='h-2.5  rounded-full bg-primary w-1/3 mb-2.5'></div>
                <div className='w-4/5 h-2 rounded-full bg-primaryL1'></div>
              </div>
              <div className='h-2.5  rounded-full bg-primaryL1 w-12'></div>
            </div>
            <div className='flex items-center justify-between w-full pt-4'>
              <div className='w-full'>
                <div className='h-2.5  rounded-full bg-primary w-1/3 mb-2.5'></div>
                <div className='w-4/5 h-2 rounded-full bg-primaryL1'></div>
              </div>
              <div className='h-2.5  rounded-full bg-primaryL1 w-12'></div>
            </div>
            <div className='flex items-center justify-between w-full pt-4'>
              <div className='w-full'>
                <div className='h-2.5  rounded-full bg-primary w-1/3 mb-2.5'></div>
                <div className='w-4/5 h-2 rounded-full bg-primaryL1'></div>
              </div>
              <div className='h-2.5  rounded-full bg-primaryL1 w-12'></div>
            </div>
            <div className='flex items-center justify-between w-full pt-4'>
              <div className='w-full'>
                <div className='h-2.5  rounded-full bg-primary w-1/3 mb-2.5'></div>
                <div className='w-4/5 h-2 rounded-full bg-primaryL1'></div>
              </div>
              <div className='h-2.5  rounded-full bg-primaryL1 w-12'></div>
            </div>
            <span className='sr-only'>Loading...</span>
          </div>
        ) : (
          <ul>
            {questionData[currentQuestionIndex]?.answers.map(
              (answer, index) => (
                <li key={index} className='mb-2 animate-fade-in'>
                  <button
                    className={`w-full p-4 text-lg text-start hover:scale-[1.03] disabled:opacity-65 duration-200 
                        ${
                          questionData[currentQuestionIndex].selectedAnswer ===
                          index
                            ? 'bg-primaryL1 text-white disabled:opacity-100'
                            : ''
                        } 
                        `}
                    onClick={() => handleAnswerSelection(index)}
                    disabled={questionData[currentQuestionIndex]?.submitted}
                  >
                    {answer}
                    <hr />
                  </button>
                </li>
              )
            )}
          </ul>
        )}
      </section>
    </main>
  )
}

export default QuestionAndAnswers
