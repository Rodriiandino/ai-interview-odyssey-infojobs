'use client'

import { JobData, QuestionData } from '@/types/interview-key'
import { SearchParamsInterview } from '@/types/search-params'
import { useEffect, useState } from 'react'
import InterviewAccordion from './InterviewAccordion'

interface FinishedInterviewProps {
  questionData: QuestionData[]
  trainingData: SearchParamsInterview
  jobData: JobData
}

export default function FinishedInterview({
  questionData,
  trainingData,
  jobData
}: FinishedInterviewProps) {
  const [pageNumber, setPageNumber] = useState(0)
  const [typeInterview, setTypeInterview] = useState('')

  const handleNext = () => {
    if (pageNumber >= questionData.length - 1) return
    setPageNumber(prevPageNumber => prevPageNumber + 1)
    animateQuestion('animate-fade-in-right')
  }

  const handlePrev = () => {
    if (pageNumber <= 0) return
    setPageNumber(prevPageNumber => prevPageNumber - 1)
    animateQuestion('animate-fade-in-left')
  }

  const animateQuestion = (animationClass: string) => {
    const currentQuestion = document.querySelector('#question') as HTMLElement
    if (currentQuestion) {
      currentQuestion.classList.remove(
        'animate-fade-in-right',
        'animate-fade-in-left'
      )
      void currentQuestion.offsetWidth
      currentQuestion.classList.add(animationClass)
    }
  }

  useEffect(() => {
    let interviewTypeText = ''
    switch (trainingData.interviewType) {
      case 'technical':
        interviewTypeText = 'Técnica'
        break
      case 'behavioral':
        interviewTypeText = 'Conceptual'
        break
      default:
        interviewTypeText = 'Resolución de problemas'
        break
    }
    setTypeInterview(interviewTypeText)
  }, [trainingData.interviewType])

  return (
    <main className='flex flex-col justify-center w-full h-full gap-4'>
      <InterviewAccordion title='Felicitaciones por completar la entrevista!!'>
        <div className='flex flex-col gap-4'>
          <div className='flex sm:justify-between gap-4 flex-wrap'>
            <div className='flex items-center gap-2 flex-wrap'>
              <h3 className='font-bold sm:text-xl text-lg text-primary'>
                Resultados:
              </h3>
              <ul className='flex gap-3 flex-wrap'>
                {questionData.map((question, index) => (
                  <li key={index}>
                    <h4 className='font-bold text-primaryL1 sm:text-base text-sm'>
                      Pregunta {index + 1}
                    </h4>
                    <p className='text-GrayD4 sm:text-base text-sm'>
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
              <h3 className='font-bold sm:text-xl text-lg text-primary'>
                Entrevistador:
              </h3>
              <p className='text-GrayD4 sm:text-base text-sm'>
                {trainingData.interviewer}
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <h3 className='font-bold sm:text-xl text-lg text-primary'>
                Tipo de Entrevista:
              </h3>
              <p className='text-GrayD4 sm:text-base text-sm'>
                {typeInterview}
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <h3 className='font-bold sm:text-xl text-lg text-primary'>
              Detalles del trabajo
            </h3>
            <p className='sm:text-base text-sm'>
              <strong className='text-primaryL1'>Título del puesto:</strong>{' '}
              {jobData?.title} <br />
            </p>
            <p className='sm:text-base text-sm'>
              <strong className='text-primaryL1'>Requisitos mínimos:</strong>{' '}
              {jobData?.requirement}
            </p>
          </div>
        </div>
      </InterviewAccordion>
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
            <h4 className='text-primaryL1 sm:text-lg'>
              {questionData[pageNumber]?.question}
            </h4>
            <ul>
              {questionData[pageNumber]?.answers.map((answer, index) => (
                <li key={index} className='mb-2'>
                  <button
                    className={`w-full p-2 sm:text-lg text-start hover:scale-[1.01] disabled:opacity-65 duration-200
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
      <footer>
        {questionData[pageNumber]?.submitted && (
          <>
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
                <h3 className='font-bold text-xl text-primary'>Explicación</h3>
                <p className='text-GrayD4'>
                  {questionData[pageNumber]?.explanation}
                </p>
              </article>
            )}
          </>
        )}
      </footer>
    </main>
  )
}
