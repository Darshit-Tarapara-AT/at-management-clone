export interface initialState {
  list: RoleListProperties[]
  duplicateList: RoleListProperties[]
  error: string
  previousPageUrl: string | null
  nextPageUrl: string | null
  isLoading: boolean
  isRoleSideBarLinkClicked:boolean
  page: number
  currentUser:{name:string, id:number}
  isSuccess: boolean
  total:number
  limit: number
  assignPermissions: number[]
}

export interface RoleListProperties {
  label: string
  name: string
  id: number
}

export interface addRoleActionParams {
  payload: {
    name: string
    id: number
  }
}

export interface addAssignPermissionsActionParams {
  payload : {
   permissionName : string
  }
}

export interface deleteRoleActionParams {
  payload : string| number
}

export interface assignPermissionsPayload {
  payload: {
    isChecked: boolean
    id: number
  }
}
export interface editRoleThunkPayLoad {
  status: boolean
  message: any
}
