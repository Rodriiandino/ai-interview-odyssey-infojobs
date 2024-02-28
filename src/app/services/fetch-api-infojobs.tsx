import { CombinedSearchParams } from '@/app/types/search-params'

const clientId = process.env.INFOJOBS_CLIENT_KEY
const clientSecret = process.env.INFOJOBS_SECRET_KEY
const authHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`

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
