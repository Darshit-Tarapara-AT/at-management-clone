export interface LeaveFormValues {
    label: string | number | Date | string[] | undefined
    name: string | number | Date | string[] | undefined
    module: any
    joiningDate(startDate: any, endDate: string, joiningDate: unknown, reason: unknown): unknown
    startDate: [] | [Date] 
    endDate: [] | [Date] 
    status: string 
    type: string
    reason: string
  }

  export interface LeavePayload {
    start_date: string 
    endDate: string
    status: string 
    type: string
    reason: string
    parent_Leave_iD: number
}