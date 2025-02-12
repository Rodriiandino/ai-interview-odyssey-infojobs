'use client'

import {
  InterviewType,
  Interviewer,
  SearchParamKey,
  AIModel
} from '@/app/types/training-key'
import { useCopy } from './context/copy-context'
import { useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Form() {
  const { copiedId } = useCopy()
  const router = useRouter()

  useEffect(() => {
    if (copiedId) {
      const input = document.getElementById('id-jobs') as HTMLInputElement
      if (input) {
        input.value = copiedId
      }
    }
  }, [copiedId])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const interviewer = formData.get(SearchParamKey.Interviewer)
    const interviewType = formData.get(SearchParamKey.InterviewType)
    const jobId = formData.get(SearchParamKey.JobId)
    const aiModel = formData.get(SearchParamKey.AIModel)
    const token = formData.get('token')

    if (token) {
      sessionStorage.setItem('aiToken', token.toString())
    }

    router.push(
      `/interview?interviewer=${interviewer}&interview-type=${interviewType}&job-id=${jobId}&ai-model=${aiModel}`
    )
  }

  return (
    <form onSubmit={handleSubmit} className='mt-8' id='form'>
      <h3 className='font-medium text-xl'>Selecciona el entrevistador:</h3>
      <div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-3 mb-4'>
        <div>
          <input
            className='peer sr-only'
            id='option1'
            type='radio'
            tabIndex={-1}
            name={SearchParamKey.Interviewer}
            value={Interviewer.DrJokester}
            defaultChecked
          />

          <label
            htmlFor='option1'
            className='block w-full rounded-lg border border-gray-300 p-3 hover:border-primary peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white cursor-pointer transition-colors duration-200'
            tabIndex={0}
          >
            <span className='text-sm font-medium'>
              {Interviewer.DrJokester}
            </span>
          </label>
        </div>

        <div>
          <input
            className='peer sr-only'
            id='option2'
            type='radio'
            tabIndex={-1}
            name={SearchParamKey.Interviewer}
            value={Interviewer.MadameEccentric}
          />

          <label
            htmlFor='option2'
            className='block w-full rounded-lg border border-gray-300 p-3 hover:border-primary peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white cursor-pointer transition-colors duration-200'
            tabIndex={0}
          >
            <span className='text-sm font-medium'>
              {Interviewer.MadameEccentric}
            </span>
          </label>
        </div>

        <div>
          <input
            className='peer sr-only'
            id='option3'
            type='radio'
            tabIndex={-1}
            name={SearchParamKey.Interviewer}
            value={Interviewer.CaptainQuirk}
          />

          <label
            htmlFor='option3'
            className='block w-full rounded-lg border border-gray-300 p-3 hover:border-primary peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white cursor-pointer transition-colors duration-200'
            tabIndex={0}
          >
            <span className='text-sm font-medium'>
              {Interviewer.CaptainQuirk}
            </span>
          </label>
        </div>
      </div>

      <div className='flex gap-6 justify-around max-sm:flex-col'>
        <div className='mb-4 w-1/2 max-sm:w-full'>
          <label className='font-medium text-xl' htmlFor='interview-type'>
            Selecciona el tipo de entrevista:
          </label>
          <select
            name={SearchParamKey.InterviewType}
            id='interview-type'
            className='block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
          >
            <option value={InterviewType.Technical}>Técnica</option>
            <option value={InterviewType.Behavioral}>Conceptual</option>
            <option value={InterviewType.Case}>Resolución de problemas</option>
          </select>
        </div>

        <div className='mb-4 w-1/2 max-sm:w-full'>
          <label className='font-medium text-xl' htmlFor='id-jobs'>
            ID Oferta de Trabajo
          </label>
          <input
            type='text'
            name={SearchParamKey.JobId}
            id='id-jobs'
            className='block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
            placeholder='282f50dec44d1ca...'
            required
          />
        </div>

        <div className='mb-4 w-1/2 max-sm:w-full'>
          <label className='font-medium text-xl' htmlFor='ai-model'>
            Selecciona el modelo de IA:
          </label>
          <select
            name={SearchParamKey.AIModel}
            id='ai-model'
            className='block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
            required
          >
            <option value={AIModel.GPT35}>GPT-3.5 Turbo</option>
            <option value={AIModel.GPT4}>GPT-4</option>
          </select>
        </div>
      </div>

      <div className='mb-4 w-full'>
        <label className='font-medium text-xl' htmlFor='token'>
          Token de API
        </label>
        <input
          type='password'
          name='token'
          id='token'
          className='block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
          placeholder='Ingresa tu token de API'
          required
        />
      </div>

      <button
        type='submit'
        className='block w-full rounded-lg bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-secondary focus:outline-none focus:ring active:bg-rose-500 sm:w-auto transition-colors duration-200'
      >
        Empezar con la entrevista
      </button>
    </form>
  )
}
