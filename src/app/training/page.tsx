import TrainingPage from './components/TrainingPage'
import { BaseSearchParams } from '@/types/search-params'

export default function Training({
  searchParams
}: {
  searchParams: BaseSearchParams
}) {
  return <TrainingPage searchParams={searchParams} />
}
