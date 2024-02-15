import TrainingPage from './components/TrainingPage'

interface SearchParams {
  page: string
  category?: string
  q?: string
}

export default function Training({
  searchParams
}: {
  searchParams: SearchParams
}) {
  return <TrainingPage searchParams={searchParams} />
}
