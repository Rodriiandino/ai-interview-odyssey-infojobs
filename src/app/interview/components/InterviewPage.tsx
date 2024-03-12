import InterviewDataProvider from '../context/interview-context'
import TrainingDataProvider from '../context/training-context'

import Header from './Header'
import Main from './main/Main'
import Footer from './footer/Footer'

export default function InterviewPage() {
  return (
    <TrainingDataProvider>
      <InterviewDataProvider>
        <div className='bg-GrayL3 min-h-screen py-8 px-4 max-sm:px-2 max-sm:py-4 h-full flex items-center'>
          <div className='max-w-screen-xl mx-auto bg-white shadow rounded-lg sm:p-6 p-4 h-full w-full'>
            <Header />
            <Main />
            <Footer />
          </div>
        </div>
      </InterviewDataProvider>
    </TrainingDataProvider>
  )
}
