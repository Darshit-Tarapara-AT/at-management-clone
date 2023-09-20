export interface initialIpAddressState {
  list: {name: string; id: number}[]
  isLoading: boolean
  hasSearchEmpty: boolean
  duplicateList: {name: string; id: number}[]
  error: string
  previousPageUrl: string | null
  nextPageUrl: string | null
  module : {id: number,
  title: string,
  name: string,
  created_at: string,
  updated_at: string
}[]
  page: number
  currentIP: string| null
  isSuccess: boolean
  total : number
  limit: number
  isIpSideBarLinkClicked: boolean
}

export interface addIpAddressActionParams {
  token: string,
  name: string
  ip_address: string,
}
export interface editIpAddressActionParams extends addIpAddressActionParams{
  id: number
}

export interface deleteIPActionParams {
  payload: number
}
