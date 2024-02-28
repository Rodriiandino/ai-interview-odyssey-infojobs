import { SearchParamsInterview } from '../types/search-params'

export default async function fetchApiOpeniai({
  searchParamsInterview: { ...searchParamsInterview }
}: {
  searchParamsInterview: SearchParamsInterview
}) {
  const params = new URLSearchParams({
    ...searchParamsInterview
  })

  let url = 'http://localhost:3000/api/get-interview'
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
