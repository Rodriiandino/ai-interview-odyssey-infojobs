import { SearchParamsInterview } from '../types/search-params'

export default async function fetchApiOpeniai({
  searchParamsInterview
}: {
  searchParamsInterview: SearchParamsInterview
}) {
  const { token, ...restParams } = searchParamsInterview

  const params = new URLSearchParams()
  Object.entries(restParams).forEach(([key, value]) => {
    if (value) params.append(key, value)
  })

  if (token) params.append('token', token)

  let url = '/api/get-interview'
  if (params.toString()) url += `?${params.toString()}`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    console.log('response:', response)

    return await response.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
