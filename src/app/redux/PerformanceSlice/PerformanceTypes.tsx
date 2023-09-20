
export interface PerformanceResponsePayload {
  id: number
  user: string
  totalEstimateTime: string
  totalTimeTaken: string
  project: string
  client: string
  estimatedTime: string
  timeTaken: string
  totalHours?: string
}

export interface PerformanceUserResponsePayload {
  project?: string
  totalHours?: string
  client?: string
  estimatedTime: string
  timeTaken: string
}


export interface PerformanceResponseFields {
  user?: string
  totalEstimateTime?: string
  totalTimeTaken?: string
  project?: string
  totalHours?: string
  client?: string
  estimatedTime: string
  timeTaken: string

}

export interface PerformanceUserResponseFields {
  project?: string
  totalHours?: string
  client?: string
  estimatedTime: string
  timeTaken: string

}

export interface initialPerformanceState{
  list:PerformanceResponseFields[]
  userList:PerformanceUserResponseFields[]
  client:string
  project: string
  total: number
  limit:number
  isLoading: boolean
  page: number
  error: string
}
