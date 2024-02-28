'use client'

import { Logo } from './Logo'
import { useTrainingData } from './hooks/useTrainingData'
import { useState, useEffect } from 'react'
import fetchApiOpeniai from '@/app/services/fetch-api-routes-openiai'

export default function InterviewPage() {
  const [interviewData, setInterviewData] = useState(null)
  const { trainingData, interviewCharacteristics, interviewPersonality } =
    useTrainingData()

  useEffect(() => {
    async function fetchInterviewData() {
      try {
        const response = await fetchApiOpeniai({
          searchParamsInterview: trainingData
        })
        setInterviewData(response)
      } catch (error) {
        console.error('Error fetching interview data:', error)
      }
    }
    if (
      trainingData.interviewType &&
      trainingData.interviewer &&
      trainingData.jobId
    ) {
      fetchInterviewData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='bg-GrayL3 min-h-screen py-8 px-4 max-sm:px-0 max-sm:pt-0  max-sm:pb-12'>
      <div className='max-w-screen-xl mx-auto bg-white shadow rounded-lg p-6'>
        <header className='flex items-end gap-3 mb-4'>
          <Logo />
          <h1 className='text-3xl font-bold mb-2 text-GrayL2'>Entrevista</h1>
        </header>
        <main>
          <section className='mb-4'>
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
          </section>
          <section className='mb-4'>
            <h3 className='font-bold mb-2 text-xl text-primary'>Enunciado</h3>
            <p className='text-GrayD4 text-lg'></p>
          </section>
          <section className='mb-4'>
            <h3 className='font-bold mb-2 text-xl text-primary'>Respuestas</h3>
            <ul></ul>
          </section>
        </main>
        <footer>
          <button className='bg-primary text-white px-4 py-2 rounded-lg mr-2 hover:bg-secondary disabled:opacity-50'>
            Responder
          </button>
        </footer>
      </div>
    </div>
  )
}
