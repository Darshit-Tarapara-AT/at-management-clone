export interface initialPortfolioState {
  portfolioListProperties: PortfolioListProperties[];
  list: {name: string; id: number}[]
  isLoading: boolean
  hasSearchEmpty: boolean
  duplicateList: {name: string; id: number}[]
  error: string
  previousPageUrl: string | null
  nextPageUrl: string | null
  module: {id: number; title: string; name: string; created_at: string; updated_at: string}[]
  page: number
  isSuccess: boolean
  total: number
  limit: number
}

export interface PortfolioListProperties {
  projectName: string
  technologies: string,
  industries: string,

}
