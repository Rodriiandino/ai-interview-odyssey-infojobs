'use client'
import { useState } from 'react'

interface InterviewAccordionProps {
  title: string
  children: React.ReactNode
}

export default function InterviewAccordion({
  title,
  children
}: InterviewAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header>
      <button
        onClick={toggleAccordion}
        className='flex justify-between w-full bg-gray-200 px-4 py-2 rounded-md focus:outline-none'
      >
        <h3 className='text-primaryL1 font-bold text-lg'>{title}</h3>
        <span
          className={`${
            isOpen ? 'transform rotate-180' : ''
          } transition-transform duration-300`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className='pt-4 bg-GrayL3 px-4 py-2 rounded-b-md relative -top-1 animate-fade-in-down animate-duration-200'>
          {children}
        </div>
      )}
    </header>
  )
}
