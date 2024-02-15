import fetchApiInfojobs from '@/app/components/fetch/fetch-api-infojobs'
import Filtro from './Filtro'

export default async function ListJobOffers({ params }) {
  const searchParams = {
    page: 1,
    maxResults: 10,
    order: 'updated',
    ...params
  }

  for (const key in searchParams) {
    if (searchParams[key] === '') delete searchParams[key]
  }

  const response = await fetchApiInfojobs({ searchParams })

  const { currentPage, totalPages } = response

  return <Filtro page={currentPage} totalPages={totalPages} />
}
