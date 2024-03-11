import ListJobOffers from './ListJobOffers'
import { BaseSearchParams } from '@/app/types/search-params'
import { Suspense } from 'react'
import Loading from '../loading'
import Form from './Form'
import Header from './Header'

export default function TrainingPage({
  searchParams: searchParams
}: {
  searchParams: BaseSearchParams
}) {
  return (
    <main className='bg-GrayL3 px-9 pt-8 sm:px-6 flex flex-col h-screen max-sm:h-full'>
      <section className='max-w-3xl mx-auto'>
        <Header
          title='AI Interview'
          subtitle='Odyssey!'
          description='En esta simulación, experimentarás una entrevista de trabajo poco convencional. Nuestros entrevistadores de IA tienen personalidades únicas y te harán una serie de preguntas. Tu objetivo es responder a las preguntas de la mejor manera posible y divertirte. ¡Buena suerte!'
        />
        <Form />
      </section>

      <Suspense fallback={<Loading />}>
        <section className='max-w-3xl mx-auto mt-8 w-full h-full sm:overflow-hidden sm:overflow-y-scroll'>
          <ListJobOffers params={searchParams} />
        </section>
      </Suspense>
    </main>
  )
}
