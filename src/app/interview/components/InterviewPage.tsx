'use client'

import { Logo } from './Logo'
import useInterviewData from './hooks/useInterviewData'
import { useTrainingData } from './hooks/useTrainingData'

export default function InterviewPage() {
  const { trainingData, interviewCharacteristics, interviewPersonality } =
    useTrainingData()
  const {
    answerIsSelected,
    answerStatus,
    answers,
    correctAnswer,
    explanation,
    handleAnswerSelection,
    handleNewQuestion,
    handleSubmit,
    loading,
    question,
    selectedAnswer,
    submitted
  } = useInterviewData({ trainingData })

  return (
    <div className='bg-GrayL3 min-h-screen py-8 px-4 max-sm:px-0 max-sm:pt-0  max-sm:pb-12'>
      <div className='max-w-screen-xl mx-auto bg-white shadow rounded-lg p-6'>
        <header className='flex items-end gap-3 mb-4'>
          <Logo />
          <h1 className='text-3xl font-bold mb-2 text-GrayL2'>Entrevista</h1>
        </header>
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
            {!question ? (
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
              <p className='text-GrayD4 text-lg'>{question}</p>
            )}
          </section>
          <section className='mb-4'>
            <h3 className='font-bold mb-2 text-xl text-primary'>Respuestas</h3>

            {!question ? (
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
                {answers.map((answer, index) => (
                  <li key={index} className='mb-2'>
                    <button
                      className={`w-full p-4 text-lg text-start hover:scale-[1.03] disabled:opacity-65 duration-200 ${
                        selectedAnswer === index
                          ? 'bg-primaryL1 text-white disabled:opacity-100'
                          : ''
                      }`}
                      onClick={() => handleAnswerSelection(index)}
                      disabled={submitted}
                    >
                      {answer}
                      <hr />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <footer>
            {submitted && (
              <>
                {answerStatus && (
                  <h3 className='font-bold mb-2 text-xl text-primary'>
                    Respuesta seleccionada:{' '}
                    <span className='text-secondary'>{answerStatus}</span>
                  </h3>
                )}

                {correctAnswer && (
                  <article className='mb-2'>
                    <h3 className='font-bold  text-xl text-primary'>
                      Respuesta correcta
                    </h3>
                    <p className='text-GrayD4'>{correctAnswer}</p>
                  </article>
                )}

                {explanation && (
                  <article className='mb-4'>
                    <h3 className='font-bold text-xl text-primary'>
                      Explicación
                    </h3>
                    <p className='text-GrayD4'>{explanation}</p>
                  </article>
                )}
              </>
            )}
          </footer>
        </main>
        <footer>
          <button
            className='bg-primary text-white px-4 py-2 rounded-lg mr-2 hover:bg-secondary disabled:opacity-50'
            onClick={() => handleSubmit()}
            disabled={loading || !answerIsSelected || submitted}
          >
            Responder
          </button>
          {submitted && (
            <button
              className='bg-primary text-white px-4 py-2 rounded-lg mr-2 hover:bg-secondary disabled:opacity-50'
              onClick={() => handleNewQuestion()}
              disabled={loading}
            >
              Generar nueva pregunta
            </button>
          )}
        </footer>
      </div>
    </div>
  )
}
