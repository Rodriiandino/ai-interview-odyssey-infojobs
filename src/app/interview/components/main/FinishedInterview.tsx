'use Client'

import { JobData, QuestionData } from '@/app/types/interview-key'
import { SearchParamsInterview } from '@/app/types/search-params'
import { useState } from 'react'

interface FinishedInterviewProps {
  questionData: QuestionData[]
  trainingData: SearchParamsInterview
  jobData: JobData
}

const FinishedInterview: React.FC<FinishedInterviewProps> = ({
  questionData,
  trainingData,
  jobData
}) => {
  const [pageNumber, setIndex] = useState(0)

  const handleNext = () => {
    if (pageNumber >= questionData.length - 1) {
      return
    }
    setIndex(prev => prev + 1)

    const current = document.querySelector('#question') as HTMLElement
    if (current) {
      current.classList.remove('animate-fade-in-right')
      current.classList.remove('animate-fade-in-left')
      void current.offsetWidth
      current.classList.add('animate-fade-in-right')
    }
  }

  const handlePrev = () => {
    if (pageNumber <= 0) {
      return
    }
    setIndex(prev => prev - 1)
    const current = document.querySelector('#question') as HTMLElement
    if (current) {
      current.classList.remove('animate-fade-in-right')
      current.classList.remove('animate-fade-in-left')
      void current.offsetWidth
      current.classList.add('animate-fade-in-left')
    }
  }

  return (
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
          <h3 className='font-bold  text-xl text-primary'>Entrevistador:</h3>
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
        <h3 className='font-bold text-xl text-primary'>Detalles del trabajo</h3>
        <p>
          <strong className='text-primaryL1'>Título del puesto:</strong>{' '}
          {jobData?.title} <br />
          <strong className='text-primaryL1'>Requisitos mínimos:</strong>{' '}
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
  )
}

export default FinishedInterview
