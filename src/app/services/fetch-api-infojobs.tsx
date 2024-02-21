import { CombinedSearchParams } from '@/app/types/search-params'

export default async function fetchApiInfojobs({
  searchParams: { ...searchParams }
}: {
  searchParams: CombinedSearchParams
}) {
  const params = new URLSearchParams({
    ...searchParams,
    page: searchParams.page.toString(),
    maxResults: searchParams.maxResults.toString()
  })

  let url = 'http://localhost:3000/api/get-offers'
  if (params) url += `?${params.toString()}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}
