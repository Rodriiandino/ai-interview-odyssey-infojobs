export interface APIResultOffer {
  id: string
  title: string
  province: Category
  city: string
  link: string
  category: Category
  contractType: Category
  subcategory: Category
  salaryMin: Category
  salaryMax: Category
  salaryPeriod: Category
  experienceMin: Category
  workDay: Category
  study: Category
  published: Date
  updated: Date
  author: Author
  requirementMin: string
  minRequirements: string
  description: string
  bold: boolean
  applications: string
  subSegment: number
  executive: boolean
  salaryDescription: string
  urgent: boolean
  color: boolean
  teleworking?: Category
}

interface Author {
  id: string
  name: string
  uri: string
  logoUrl: string
  corporateResponsive: boolean
  showCorporativeHeader: boolean
}

interface Category {
  id: number
  value: string
}

export interface Categories {
  id: number
  value: string
  order: number
  key: string
}
