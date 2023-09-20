import { currentUserProfileDetailsTypes } from "../UserSlice/UserTypes"

export interface AttendanceResponsePayload {
  id: number
  name: string
  assigned_to: string
  takenHours: string
  estimationHours: string
  deleteItem?: boolean
  editItem?: boolean
  viewItem?: boolean
  end_date: string
  check_list: string
  percentage: string
}

export interface MonthlyAnalysisResponsePayload {
    label: string
    value: number
}

export interface InitialAttendanceState {
    list: AttendanceResponseFields[]
    attendanceCalendarBreadcrumbs: {
        title: string
        path: string
        isSeparator?: boolean
        isActive: boolean
    }[]
    calenderDetails: AttendanceCalendarResponseFields[]
    analysisData: MonthlyAnalysisResponsePayload[]
    attendanceMontlyData:MonthlyAnalysisResponsePayload[]
    monthlyLeaveData:MonthlyAnalysisResponsePayload[]
    isAttendanceDataFetched: boolean
    error: string
    page: number
    previousPageUrl: string | null
    nextPageUrl: string | null
    isLoading: boolean
    total: number
    limit: number
    holidayList: {
        added_by: number
        created_at: string
        deleted_at: string | null
        description: string
        formatted_date: string
        formatted_day: string
        holiday_date: string
        id: string
        name: string
        updated_at: string
        updated_by: number | null
    }[]
    masterList: {
        id:string,
        user: string
        percentage: string
    }[]
    taskCorrectionList: {
        id: string
        from: string
        forDate: string
        status: string
    }[]
}

export interface AttendanceResponseFields {
    tasks: string,
    time: string,
    start_time: string,
    end_time: string,
    project: string,
    id: number
}

export interface HolidayInformation {
    id:number,
    name:string,
    holiday_date:string,
    description:string,
    added_by:number | null ,
    updated_by:number | null,
    created_at:string,
    updated_at:string,
    deleted_at:string,
    formatted_date:string,
    formatted_day:string,
    added_by_user:currentUserProfileDetailsTypes
}
export interface AttendanceCalendarResponseFields {
    start: string
    end: string
    title:string
    backgroundColor: string
}
