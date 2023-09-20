import { updateUserDetails } from "app/Components/UpadateDetailSection";

export interface initialPolicyState {
  list: {
    name: string;title: string; id:  number; description: string
}[]
  isLoading: boolean,
  page : number,
  isCheckAll:boolean
  total : number
  isCheck:number[]
  isSearch: boolean,
  isPolicyRead : number
  isPolicySideBarLinkClicked:false
  limit : number
  policyRole : number[]
  duplicateList: {
    name: string;title: string; id:  number; description: string
}[]
  isSuccess:boolean
  error:string
  hasSearchEmpty: boolean
  previousPageUrl: null | string,
  nextPageUrl: null | string,
}
export interface addPolicyActionParams {
  payload: {
    id:  number
    title: string
    description: string
  }
}
export interface deletePolicyActionParams {
  payload:  number
}
export interface addPolicyRolePayload {
  payload: {
    isChecked: boolean
    id: number
  }
}

export interface AddPolicyPayload {
  token:string 
  item : {
    title: string
    description: string
    status:string
    policy_roles: number[]
  }

}

export interface UpdatePolicyPayload {
id: number,
item: {
  title: string
  description: string
  status:string
  policy_roles: number[]
}
token:string
}