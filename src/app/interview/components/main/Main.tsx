import { JobData, QuestionData } from '@/app/types/interview-key'
import { SearchParamsInterview } from '@/app/types/search-params'
import React from 'react'

interface MainProps {
  finished: boolean
  questionData: QuestionData[]
  trainingData: SearchParamsInterview
  jobData: JobData
  pageNumber: number
  handlePrev: () => void
  handleNext: () => void
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
  pageNumber,
  handlePrev,
  handleNext,
  interviewCharacteristics,
  interviewPersonality,
  loading,
  currentQuestionIndex,
  handleAnswerSelection
}) => {
  return (
    <>
      {finished ? (
        <main className='flex flex-col justify-center w-full h-full  gap-4'>
          <h2 className='text-primary font-medium text-center text-xl sm:text-2xl '>
            ¡Felicidades! Has completado la entrevista.
          </h2>
          <section className='flex gap-4 sm:justify-evenly flex-wrap'>
            <div className='flex items-center gap-2 flex-wrap'>
              <h3 className='font-bold text-xl text-primary'>Resultados:</h3>
              <ul className='flex gap-3'>
                {questionData.map((question, index) => (
                  <li key={index}>
                    <h4 className='font-bold text-primaryL1'>
                      Pregunta {index + 1}
                    </h4>
                    <p className='text-GrayD4'>
                      {question.answerStatus
                        ? question.answerStatus === 'Correcto'
                          ? 'Correcto'
                          : 'Incorrecto'
                        : 'No respondido'}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex items-center gap-2'>
              <h3 className='font-bold  text-xl text-primary'>
                Entrevistador:
              </h3>
              <p className='text-GrayD4'>{trainingData.interviewer}</p>
            </div>
            <div className='flex items-center gap-2'>
              <h3 className='font-bold  text-xl text-primary'>
                Tipo de Entrevista:
              </h3>
              <p className='text-GrayD4'>{trainingData.interviewType}</p>
            </div>
          </section>
          <section className=''>
            <h3 className='font-bold text-xl text-primary'>
              Detalles del trabajo
            </h3>
            <p>
              <strong className='text-primaryL1'>Título del puesto:</strong>{' '}
              {jobData?.title} <br />
              <strong className='text-primaryL1'>
                Requisitos mínimos:
              </strong>{' '}
              {jobData?.requirement}
            </p>
          </section>
          <section>
            <h3 className='font-bold text-xl text-primary'>Resumen</h3>
            <div className='flex gap-3 justify-center items-center py-2'>
              <button
                onClick={handlePrev}
                disabled={pageNumber <= 0}
                className='bg-primary text-white px-2 py-2 rounded-lg hover:bg-secondary disabled:opacity-50 transition-colors duration-200'
              >
                {'<'}
              </button>
              <article className='animate-fade-in-right' id='question'>
                <h4 className='text-primaryL1 text-lg'>
                  {questionData[pageNumber]?.question}
                </h4>
                <ul>
                  {questionData[pageNumber]?.answers.map((answer, index) => (
                    <li key={index} className='mb-2'>
                      <button
                        className={`w-full p-2 text-lg text-start hover:scale-[1.01] disabled:opacity-65 duration-200
                            ${
                              questionData[pageNumber]?.selectedAnswer ===
                                index &&
                              questionData[pageNumber]?.answerStatus ===
                                'Correcto'
                                ? 'bg-green-100 text-green-600'
                                : questionData[pageNumber]?.selectedAnswer ===
                                    index &&
                                  questionData[pageNumber]?.answerStatus ===
                                    'Incorrecto'
                                ? 'bg-red-100 text-red-600'
                                : ''
                            }
                            `}
                        disabled={questionData[pageNumber]?.submitted}
                      >
                        {answer}
                        <hr />
                      </button>
                    </li>
                  ))}
                </ul>
                {questionData[pageNumber]?.submitted && (
                  <footer>
                    {questionData[pageNumber]?.correctAnswer && (
                      <article className='mb-2'>
                        <h3 className='font-bold  text-xl text-primary'>
                          Respuesta correcta
                        </h3>
                        <p className='text-GrayD4'>
                          {questionData[pageNumber]?.correctAnswer}
                        </p>
                      </article>
                    )}
                    {questionData[pageNumber]?.explanation && (
                      <article className='mb-4'>
                        <h3 className='font-bold text-xl text-primary'>
                          Explicación
                        </h3>
                        <p className='text-GrayD4'>
                          {questionData[pageNumber]?.explanation}
                        </p>
                      </article>
                    )}
                  </footer>
                )}
              </article>
              <button
                onClick={handleNext}
                disabled={pageNumber >= questionData.length - 1}
                className='bg-primary text-white px-2 py-2 rounded-lg hover:bg-secondary disabled:opacity-50 transition-colors duration-200'
              >
                {'>'}
              </button>
            </div>
          </section>
        </main>
      ) : (
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
                            questionData[currentQuestionIndex]
                              .selectedAnswer === index
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
      )}
    </>
  )
}

export default Main
