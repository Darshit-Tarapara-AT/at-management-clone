import { updateUserDetails } from "app/Components/UpadateDetailSection"
import { UserPersonalInformation } from "../UserSlice/UserTypes"


export interface LeaveInformation {
  id: number
  approved_by_user: updateUserDetails
  updated_by_user: updateUserDetails
  added_by_user: updateUserDetails
  created_at: string
  approved_by?: number | null
  approved_dated?: string
  added_by?: number
  updated_by?: number
  user?: UserPersonalInformation
  updated_at?: string
  added_by_username?: string
  start_date: string
  end_date: string
  reason: string
  type?: string
  information_type: string
  status: string
  joining_date: string
  comment?: string
  deleteItem: boolean,
   editItem : boolean, 
   viewItem : boolean
}

export interface LeaveCalendarDataKeys {
  id: number,
  title: string
  start: string
  end: string
  cdate: string
  backgroundColor: string
  leaveType: string
}
export interface InitialLeaveState {
  list: LeaveInformation[] 
  userLeaveList: LeaveInformation[]
  leaveCalendarData: LeaveCalendarDataKeys[]
  isLoading: boolean
  previousPagePath: string
  page: number
  total: number
  duplicateList: LeaveInformation[]
  nextPageUrl: null | string
  isSuccess: boolean
  isLeaveSideBarLinkClicked: boolean
  error: string
  previousPageUrl: null | string
  limit: number
}

export interface addLeaveActionPayLoad {
  payload: LeaveInformation
}
