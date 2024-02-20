export type BaseSearchParams = {
  page: number
  category?: string
  q?: string
}

type AdditionalSearchParams = {
  maxResults: number
  order: string
}

export type CombinedSearchParams = BaseSearchParams & AdditionalSearchParams
