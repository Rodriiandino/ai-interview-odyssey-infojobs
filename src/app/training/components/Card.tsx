'use client'

import { APIResultOffer } from '@/app/types/result-offer'

export default function Card({ offer: offer }: { offer: APIResultOffer }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(offer.id)
  }

  return (
    <article className='hover:animate-background rounded-xl bg-gradient-to-r from-primaryL1 via-success to-secondary p-0.5 transition hover:via-primaryL1 hover:to-primary animate-fade-in'>
      <div className='rounded-[10px] bg-white p-4  sm:p-6'>
        <h3 className='mt-0.5 text-lg font-medium text-gray-900'>
          <a
            href={offer.link}
            target='_blank'
            rel='noreferrer noopener'
            className='hover:underline'
          >
            {offer.title}
          </a>
        </h3>
        <div>
          <span className=' text-gray-400 p-1'>{offer.id}</span>
          <button
            className='text-xs text-GrayL2 hover:text-primaryL1'
            onClick={handleCopy}
          >
            copiar
          </button>
        </div>

        <p className='mt-1 text-sm text-gray-500'>{offer.requirementMin}</p>

        <div className='mt-4 flex flex-wrap gap-1'>
          <span className='whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600'>
            {offer.category.value}
          </span>

          <span className='whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600'>
            {offer.subcategory.value}
          </span>
        </div>
      </div>
    </article>
  )
}
