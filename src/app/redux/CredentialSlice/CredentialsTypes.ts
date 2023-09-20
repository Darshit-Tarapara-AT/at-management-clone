import { updateUserDetails } from "app/Components/UpadateDetailSection"
import { SelectInputValue } from "app/pages/Projects/Components/Modal/Modal"

export interface initialState {
  list: CredentialListProperties[]
  duplicateList: CredentialListProperties[]
  error: string
  previousPageUrl: string | null
  nextPageUrl: string | null
  isLoading: boolean
  page: number
  currentUser: {name: string; id: number}
  isSuccess: boolean
  total: number
  limit: number
  assignPermissions: number[]
  credentialDetail: string
  isCredentialSideBarLinkClicked: boolean
}


export interface CredentialResponse {
  updated_by_user: updateUserDetails
  added_by_user: updateUserDetails
  added_by: string
  name:string
  description:string
  created_by:string
  updated_by:number
  deleted_by:string
  status:string
  created_at:string
  updated_at:string
  deleted_at: string
  role: {
    id: number,
    credential_id: number,
    role_id: number,
    created_at: string,
    updated_at: string,
    name: string
  }[],
  client: {id: number,
    credential_id: number,
    client_id: number,
    created_at: string,
    updated_at: string,
    name: string
  }[]
  project: {
    id: number,
    credential_id: number,
    project_id: number,
    created_at: string,
    updated_at: string,
    name: string
  }[]
  credentialDetail: string
  user: {
    image_url: any
    id: number,
    credential_id: number,
    user_id: number,
    created_at: string,
    updated_at: string,
    name: string

  }[]
}

export interface CredentialListProperties {
  name: string
  id: number
  user: any[],
  role: any[],
  client: string,
  description: string

}

export interface addCredentialActionParams {
  payload: {
    name: string
    id: number
  }
}

export interface addAssignPermissionsActionParams {
  payload: {
    permissionName: string
  }
}

export interface deleteCredentialActionParams {
  payload: string | number
}

export interface assignPermissionsPayload {
  payload: {
    isChecked: boolean
    id: number
  }
}
export interface editCredentialThunkPayLoad {
  status: boolean
  message: any
}
