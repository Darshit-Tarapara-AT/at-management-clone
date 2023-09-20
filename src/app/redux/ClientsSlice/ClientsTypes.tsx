

export interface ClientInformation {
  id: number 
  name: string,
  email: string
  company_name: string
  status: string
  website: string,
  added_by_username?: string
  phone: string | number,
  viewItem?: boolean
  deleteItem?: boolean
  editItem?: boolean
  mobile: string | number,
  last_contact_date: string | Date,
  skype_id: string,
  linkedin_url: string,
  lead_status: string,
  lead_select_date:string | Date,
  note:string,
  address: string,
  area: string,
  country: string,
  state: string,
  city: string,
  postal_code: string | number,
  added_by: number | string, 
  first_contact_source: string,
  comments: string,
  added_date: string,
  lead_type:string

}

export interface InitialClientState {
  list: ClientInformation[]
  tempList: ClientInformation[]
  isLoading: boolean
  page: number
  total: number
  duplicateList: ClientInformation[]
  nextPageUrl: null | string
  isSuccess: boolean
  isClientSideBarLinkClicked: boolean
  error: string
  previousPageUrl: null | string
  limit: number
}

export interface addLeadActionPayLoad {
  payload: ClientInformation

}
