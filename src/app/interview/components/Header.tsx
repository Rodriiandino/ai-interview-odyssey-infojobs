'use client'

import { Logo } from './Logo'
import { useInterviewContext } from './context/interview-context'
import Link from 'next/link'

export default function Header() {
  const { currentQuestionIndex, limit } = useInterviewContext()

  return (
    <header className='flex  justify-between gap-3 mb-4'>
      <div className='flex items-end sm:gap-3 sm:flex-row flex-col'>
        <Link href='/'>
          <Logo className='sm:w-52 w-32' />
        </Link>
        <h1 className='sm:text-3xl font-bold text-GrayL2 text-2xl'>
          Entrevista
        </h1>
      </div>

      <div className='flex items-center text-center gap-3 bg-primaryL1 text-white h-14 w-14 rounded-full'>
        <span className='w-full'>
          {currentQuestionIndex + 1} / {limit}
        </span>
      </div>
    </header>
  )
}
