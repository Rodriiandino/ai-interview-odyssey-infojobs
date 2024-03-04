import { fetchApiInfojobsGetCategories } from '@/app/services/fetch-api-infojobs'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const categories = await fetchApiInfojobsGetCategories()

  try {
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error:', error)
  }
}
