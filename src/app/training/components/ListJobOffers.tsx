import fetchApiInfojobs from '@/app/components/fetch/fetch-api-infojobs'
import Filtro from './Filtro'
import {
  BaseSearchParams,
  CombinedSearchParams
} from '@/app/types/search-params'

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

  for (const key in searchParams) {
    if (searchParams[key as keyof CombinedSearchParams] === '')
      delete searchParams[key as keyof CombinedSearchParams]
  }

  const response = await fetchApiInfojobs({ searchParams })

  const { currentPage, totalPages } = response

  return <Filtro page={currentPage} totalPages={totalPages} />
}
