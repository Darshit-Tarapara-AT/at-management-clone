import { UserResponseField } from "app/pages/Users/Components/Modal/Modal"
/**
 * temporary I added any type for added_by field but I will be change when my #395 PR merge
 */

export interface LeadInformation {
  updated_by_user: {id: number; name: string; image_url: string}
  added_by_user: {id: number; name: string; image_url: string}
  created_at?: string
  index?: number
  id?: string|number
  name: string
  email: string
  company_name: string
  updated_by?: number | null
  updated_at?: string
  website: string
  account: string
  position: string
  added_by?: any
  phone: number | string
  mobile: number | string
  skype_id: string
  linkedin_url: string
  lead_status: string
  address: string
  area: string
  country: string
  deadline_reminder: string,
  state: string
  city: string
  postal_code: number | string
  last_contact_date: Date | string
  first_contact_source: string
  comments: string
  lead_type: string
  note: string
  lead_select_date: Date | string
  lead_title: string
  lead_description: string
  lead_regular_contact_source: string
  given_price: number | string
  reason: string
  contact_url: string
  lead_contact_email: string
}

export interface InitialLeadState {
  list: LeadInformation[]
  tempList: LeadInformation[]
  isLoading: boolean
  page: number
  total : number
  nextPageUrl: null | string
  isSuccess: boolean
  isLeadSideBarLinkClicked: boolean
  error: string
  previousPageUrl: null | string
  limit: number
}

export interface addLeadActionPayLoad {
  payload: LeadInformation
}

export interface deleteLeadActionParams {
  payload : string| number
}
