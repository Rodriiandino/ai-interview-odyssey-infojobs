import { NextResponse } from 'next/server'
import { CombinedSearchParams } from '@/app/types/search-params'

const clientId = process.env.INFOJOBS_CLIENT_KEY
const clientSecret = process.env.INFOJOBS_SECRET_KEY
const authHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`

async function fetchApiInfojobs({
  searchParams: { ...searchParams }
}: {
  searchParams: CombinedSearchParams
}) {
  const params = new URLSearchParams({
    ...searchParams,
    page: searchParams.page.toString(),
    maxResults: searchParams.maxResults.toString()
  })

  let url = 'https://api.infojobs.net/api/1/offer'

  if (params) url += `?${params.toString()}`

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}

export const GET = async (req: { url: string | URL }) => {
  const { searchParams } = new URL(req.url)

  const searchParamsObj: CombinedSearchParams = {
    category: searchParams.get('category') || '',
    page: parseInt(searchParams.get('page') || '1'),
    q: searchParams.get('q') || '',
    maxResults: parseInt(searchParams.get('maxResults') || '10'),
    order: searchParams.get('order') || 'updated'
  }

  for (const key in searchParamsObj) {
    if (searchParamsObj[key as keyof CombinedSearchParams] === '')
      delete searchParamsObj[key as keyof CombinedSearchParams]
  }

  const response = await fetchApiInfojobs({ searchParams: searchParamsObj })
  try {
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error:', error)
  }
}
