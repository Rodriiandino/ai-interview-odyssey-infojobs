export default async function fetchApiInfojobs({ searchParams }) {
  const clientId = process.env.INFOJOBS_CLIENT_KEY
  const clientSecret = process.env.INFOJOBS_SECRET_KEY
  const authHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`

  const params = new URLSearchParams(searchParams)
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

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
  }
}
