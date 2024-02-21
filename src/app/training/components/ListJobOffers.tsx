import fetchApiInfojobs from '@/app/services/fetch-api-infojobs'
import Filtro from './Filtro'
import ListCards from './ListCards'
import {
  BaseSearchParams,
  CombinedSearchParams
} from '@/app/types/search-params'
import { Suspense } from 'react'
import Loading from '../loading'

export default async function ListJobOffers({
  params: params
}: {
  params: BaseSearchParams
}) {
  const searchParams: CombinedSearchParams = {
    ...params,
    page: params.page || 1,
    maxResults: 10,
    order: 'updated'
  }

  const response = await fetchApiInfojobs({ searchParams })

  const { currentPage, totalPages } = response

  return (
    <>
      <Filtro page={currentPage} totalPages={totalPages} />
      <Suspense key={currentPage} fallback={<Loading />}>
        <ListCards params={params} />
      </Suspense>
    </>
  )
}
