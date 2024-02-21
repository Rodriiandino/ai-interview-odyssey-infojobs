import { APIResultOffer } from '@/app/types/result-offer'
import Card from './Card'
import fetchApiInfojobs from '@/app/services/fetch-api-infojobs'
import {
  BaseSearchParams,
  CombinedSearchParams
} from '@/app/types/search-params'

export default async function ListCards({
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

  const { offers } = await fetchApiInfojobs({ searchParams })

  return (
    <div className='flex flex-col gap-2 h-full pt-2'>
      {offers?.map((offer: APIResultOffer) => (
        <Card key={offer.id} offer={offer} />
      ))}
    </div>
  )
}
