'use client'

import {
  InterviewType,
  Interviewer,
  SearchParamKey,
  AIModel,
  interviewTypeDescriptions,
  interviewerDescriptions
} from '@/types/training-key'
import { useCopy } from './context/copy-context'
import { useEffect, FormEvent, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Form() {
  const { copiedId } = useCopy()
  const router = useRouter()
  const [aiToken, setAiToken] = useState('')
  const [activePopover, setActivePopover] = useState<string | null>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (copiedId) {
      const input = document.getElementById('id-jobs') as HTMLInputElement
      if (input) {
        input.value = copiedId
      }
    }
  }, [copiedId])

  useEffect(() => {
    const token = sessionStorage.getItem('aiToken')
    if (token) {
      setAiToken(token)
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setActivePopover(null)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActivePopover(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const interviewer = formData.get(SearchParamKey.Interviewer)
    const interviewType = formData.get(SearchParamKey.InterviewType)
    const jobId = formData.get(SearchParamKey.JobId)
    const aiModel = formData.get(SearchParamKey.AIModel)
    const token = formData.get('token')?.toString().trim()

    try {
      if (token) {
        sessionStorage.setItem('aiToken', token)
      }
      router.push(
        `/interview?interviewer=${interviewer}&interview-type=${interviewType}&job-id=${jobId}&ai-model=${aiModel}`
      )
    } catch (error) {
      console.error('Error al guardar el token:', error)
    }
  }

  const togglePopover = (id: string) => {
    setActivePopover(activePopover === id ? null : id)
  }

  return (
    <form onSubmit={handleSubmit} className='mt-8' id='form'>
      <div className='flex items-center gap-2 flex-wrap'>
        <h3 className='font-medium max-[397px]:text-base text-lg md:text-xl'>
          Selecciona el entrevistador:
        </h3>
        <div className='relative inline-block' ref={popoverRef}>
          <button
            type='button'
            className='rounded-full bg-gray-200 px-2 text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
            aria-label='Más información sobre los entrevistadores'
            onClick={() => togglePopover('interviewer')}
          >
            ?
          </button>
          <div
            className={`
            ${
              activePopover === 'interviewer'
                ? 'visible opacity-100'
                : 'invisible opacity-0'
            }
            absolute z-10 w-64 md:w-72 
            transform right-full bottom-1/2 mb-2 translate-y-1/2 mr-1
            rounded-lg bg-black/80 backdrop-blur-sm p-3 text-sm text-white shadow-lg
            transition-all duration-200 ease-in-out
            @media (hover: hover) {
              group-hover:visible group-hover:opacity-100
            }
          `}
          >
            <div className='relative'>
              {Object.entries(interviewerDescriptions).map(
                ([key, description]) => (
                  <div key={key} className='text-xs'>
                    <strong className='text-primary-300'>{key}:</strong>
                    <p className='text-gray-200 mb-1'>{description}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

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
      <div className='flex gap-6 justify-around flex-col'>
        <div className='flex gap-4 justify-around max-md:flex-col'>
          <div className='w-1/2 max-md:w-full'>
            <div className='flex items-center gap-2 flex-wrap'>
              <label
                className='font-medium max-[397px]:text-base text-lg md:text-xl'
                htmlFor='interview-type'
              >
                Selecciona el tipo de entrevista:
              </label>
              <div className='relative inline-block' ref={popoverRef}>
                <button
                  type='button'
                  className='rounded-full bg-gray-200 px-2 text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
                  aria-label='Más información sobre los tipos de entrevista'
                  onClick={() => togglePopover('interview-type')}
                >
                  ?
                </button>
                <div
                  className={`
                  ${
                    activePopover === 'interview-type'
                      ? 'visible opacity-100'
                      : 'invisible opacity-0'
                  }
                  absolute z-10 w-64 md:w-72 
                  transform right-full bottom-1/2 mb-2 translate-y-1/2 mr-1
                  rounded-lg bg-black/80 backdrop-blur-sm p-3 text-sm text-white shadow-lg
                  transition-all duration-200 ease-in-out
                  @media (hover: hover) {
                    group-hover:visible group-hover:opacity-100
                  }
                `}
                >
                  <div className='relative'>
                    {Object.entries(interviewTypeDescriptions).map(
                      ([key, description]) => (
                        <div key={key} className='text-xs'>
                          <strong className='text-primary-300'>{key}:</strong>
                          <p className='text-gray-200 mb-1'>{description}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <select
              name={SearchParamKey.InterviewType}
              id='interview-type'
              className='block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm'
            >
              <option value={InterviewType.Technical}>Técnica</option>
              <option value={InterviewType.Behavioral}>Conceptual</option>
              <option value={InterviewType.Case}>
                Resolución de problemas
              </option>
            </select>
          </div>

          <div className='w-1/2 max-md:w-full'>
            <label
              className='font-medium max-[397px]:text-base text-lg md:text-xl'
              htmlFor='id-jobs'
            >
              ID Oferta de Trabajo *
            </label>
            <input
              type='text'
              name={SearchParamKey.JobId}
              id='id-jobs'
              className='block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm'
              placeholder='282f50dec44d1ca...'
              required
            />
          </div>
        </div>

        <div className='flex gap-4 justify-around max-md:flex-col'>
          <div className='w-1/2 max-md:w-full'>
            <label
              className='font-medium max-[397px]:text-base text-lg md:text-xl'
              htmlFor='ai-model'
            >
              Selecciona el modelo de IA:
            </label>
            <select
              name={SearchParamKey.AIModel}
              id='ai-model'
              className='block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm'
              defaultValue={AIModel.GPT4o}
            >
              <option value={AIModel.GPT35}>GPT-3.5 Turbo</option>
              <option value={AIModel.GPT4}>GPT-4</option>
              <option value={AIModel.GPT4o}>GPT-4o</option>
            </select>
          </div>

          <div className='w-1/2 max-md:w-full'>
            <label
              className='font-medium max-[397px]:text-base text-lg md:text-xl'
              htmlFor='token'
            >
              Token de API
            </label>
            <input
              type='password'
              name='token'
              id='token'
              className='block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm'
              placeholder='Ingresa tu token de API'
              defaultValue={aiToken}
            />
          </div>
        </div>
      </div>

      <small className='block mt-4 text-gray-500'>
        <span className='text-sm font-medium'>Nota:</span> El token de API es
        necesario para acceder a la API de OpenAI. Si no tienes uno, puedes
        obtenerlo en la página de OpenAI. Si no se coloca un token de API, se
        hará una entrevista simulada por defecto.
      </small>
      <button
        type='submit'
        className='block w-full rounded-lg bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-secondary focus:outline-none focus:ring active:bg-rose-500 sm:w-auto transition-colors duration-200'
      >
        Empezar con la entrevista
      </button>
    </form>
  )
}
