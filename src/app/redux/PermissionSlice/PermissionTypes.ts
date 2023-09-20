export interface initialPermissionState {
  list: {name: string; id: number}[]
  isLoading: boolean
  hasSearchEmpty: boolean
  duplicateList: {name: string; id: number}[]
  error: string
  previousPageUrl: string | null
  nextPageUrl: string | null
  module : {id: number,
  title: string,
  name:string,
  created_at:string,
  updated_at:string
}[]
  page: number
  totalModules: number
  isSuccess: boolean
  total : number
  limit: number
  isPermissionSideBarLinkClicked: boolean
}

export interface addPermissionActionParams {
  payload: {
    id: number
    name: string
  }
}

export interface deletePermissionActionParams {
  payload: string | number
}

export interface individualPermission {

  id: number,
  name:string
  guard_name:string,
  created_at:string,
  updated_at:string
}
