import { APIResultOffer } from '@/types/result-offer'
import Card from './Card'

export default async function ListCards({
  offers
}: {
  offers: APIResultOffer[]
}) {
  return (
    <div className='flex flex-col gap-2 h-full pt-2'>
      {offers?.map((offer: APIResultOffer) => (
        <Card key={offer.id} offer={offer} />
      ))}
    </div>
  )
}
