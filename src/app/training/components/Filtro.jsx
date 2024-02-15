'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Filtro({ page = 1, totalPages = 1 }) {
  const [category, setCategory] = useState('')
  const [keyword, setKeyword] = useState('')
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const params = new URLSearchParams(searchParams)
  const nextPage = () => {
    if (page < totalPages) {
      params.set('page', page + 1)
      replace(`${pathname}?${params.toString()}`)
    }
  }

  const prevPage = () => {
    if (page > 1) {
      params.set('page', page - 1)
      replace(`${pathname}?${params.toString()}`)
    }
  }
  const disablePrev = page === 1

  const disableNext = page === totalPages

  const handleCategoryChange = e => {
    setCategory(e.target.value)
    params.set('category', e.target.value)
    replace(`${pathname}?${params.toString()}`)
  }

  const handleKeywordChange = e => {
    setKeyword(e.target.value)
    params.set('q', e.target.value)
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <header className='sticky top-0 bg-GrayL3'>
      <h3 className='font-medium text-xl'>Lista de Ofertas de trabajos:</h3>
      <div className='flex m-0 p-0 gap-4 justify-between items-center flex-col sm:flex-row'>
        <div className='flex m-0 p-0 gap-2 items-center'>
          <button
            className='w-24 py-2 bg-primary text-white rounded-lg hover:bg-secondary disabled:bg-GrayL2 focus:outline-none sm:text-sm'
            onClick={prevPage}
            disabled={disablePrev}
          >
            Anterior
          </button>
          <p className='font-medium text-base text-center'>
            {page} / {totalPages}
          </p>
          <button
            className='w-24 py-2 bg-primary text-white rounded-lg hover:bg-secondary disabled:bg-GrayL2 focus:outline-none sm:text-sm'
            onClick={nextPage}
            disabled={disableNext}
          >
            Siguiente
          </button>
        </div>

        <select
          value={category}
          onChange={handleCategoryChange}
          className='block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
        >
          <option value=''>Todas las categorías</option>
          <option value='informatica-telecomunicaciones'>
            Informática y Telecomunicaciones
          </option>
        </select>
        <input
          type='text'
          placeholder='Frontend, Backend, Fullstack...'
          value={keyword}
          onChange={handleKeywordChange}
          className='block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
        />
      </div>
    </header>
  )
}
