export interface initialPolicyLogState {
  list: {description: string; id:number, user?:string}[]
  isLoading: boolean
  error: string
  previousPageUrl: string | null
  nextPageUrl: string | null
  page: number
  isSuccess: boolean
  total : number
  limit: number
  individualHistoryTotal: number
}

