import { BaseSearchParams } from '@/app/types/search-params'
import ListJobOffers from './ListJobOffers'
import { CopyProvider } from './context/copy-context'
import Form from './Form'
import Header from './Header'
import { Suspense } from 'react'
import Loading from './loading'

export default function TrainingPage({
  searchParams
}: {
  searchParams: BaseSearchParams
}) {
  return (
    <CopyProvider>
      <main className='bg-GrayL3 px-9 pt-8 sm:px-6 flex flex-col h-screen max-sm:h-full'>
        <section className='max-w-3xl mx-auto'>
          <Header
            title='AI Interview'
            subtitle='Odyssey!'
            description='En esta simulación, experimentarás una entrevista de trabajo poco convencional. Nuestros entrevistadores de IA tienen personalidades únicas y te harán una serie de preguntas. Tu objetivo es responder a las preguntas de la mejor manera posible y divertirte. ¡Buena suerte!'
          />
          <Form />
        </section>

        <section className='max-w-3xl mx-auto mt-8 w-full h-full sm:overflow-hidden sm:overflow-y-scroll'>
          <Suspense fallback={<Loading />}>
            <ListJobOffers params={searchParams} />
          </Suspense>
        </section>
      </main>
    </CopyProvider>
  )
}
