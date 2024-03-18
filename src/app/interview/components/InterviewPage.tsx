'use client'
import InterviewDataProvider from './context/interview-context'
import TrainingDataProvider from './context/training-context'
import { Suspense } from 'react'
import Header from './Header'
import Main from './main/Main'
import Footer from './footer/Footer'
import Loading from './loading'

export default function InterviewPage() {
  return (
    <div className='bg-GrayL3 min-h-screen py-8 px-4 max-sm:px-2 max-sm:py-4 h-full flex items-center'>
      <Suspense fallback={<Loading />}>
        <div className='max-w-screen-xl mx-auto bg-white shadow rounded-lg sm:p-6 p-4 h-full w-full'>
          <TrainingDataProvider>
            <InterviewDataProvider>
              <Header />
              <Main />
              <Footer />
            </InterviewDataProvider>
          </TrainingDataProvider>
        </div>
      </Suspense>
    </div>
  )
}
