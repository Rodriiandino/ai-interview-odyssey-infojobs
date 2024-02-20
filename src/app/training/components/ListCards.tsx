import { APIResultOffer } from '@/app/types/result-offer'
import Card from './Card'

export default function ListCards({
  offers: offers
}: {
  offers: APIResultOffer[]
}) {
  return (
    <div className='flex flex-col gap-2 h-full pt-2'>
      {offers.map(offer => (
        <Card key={offer.id} offer={offer} />
      ))}
    </div>
  )
}
