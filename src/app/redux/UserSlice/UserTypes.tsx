

export interface UserPersonalInformation {
  id: number
  name?: string
  image_url: string
  firstName: string
  lastName: string
  joiningDate: string
  email: string
  slackUrl: string
  birthDate: string
  designation: string
  role_id: {
    label: string,
    id: number,
    name: string,
    guard_name?: string,
    created_at: string
    updated_at: string
    default_role: number | string
  },
  contactEmail: string
  address: string
  area: string
  state: string
  city: string
  aadharCardNumber: string
  salary: string
  status: string
  postalCode: number | string
  mobile: number | string
  altMobile: number | string
  guardianFirstPersonName: string
  guardianFirstPersonContactNumber: number | string
  guardianFirstPersonAddress: string
  guardianSecondPersonName: string
  guardianSecondPersonContactNumber: number | string
  guardianSecondPersonAddress: string
  nextIncrementMonth: string
  panNumber: string | number
  bankDetails: string
  extraInformation: string
  role: string
}
export interface currentUserProfileDetailsTypes {
  slack_url: string
  name?: string
  id: number
  image_url: string
  first_name: string
  last_name: string
  joining_date: string
  email: string
  birth_date: string
  status?: string
  designation: string
  role_id: {
    id: number,
    name: string,
    guard_name: string,
    created_at: string
    updated_at: string
    default_role: number
  },
  contact_email: string
  address: string
  area: string
  state: string
  city: string
  late_entry_time?: string
  fullday_minutes?: string
  postal_code: string
  contact: string
  alternate_contact: string
  guadian_1_name: string
  earlyday_minutes?: string
  halfday_minutes?: string
  guadian_1_contact: string
  slack_username?: string
  guadian_1_address: string
  guadian_2_name: string
  guadian_2_contact: string
  guadian_2_address: string
  next_increment_date: string
  basic_salary: string
  aadhar_number: string
  pan_number: string
  bank_details: string
  extra_information: string
  role: string
  paid_leave_starts_from: string
  last_login: string
  created_at: string,
  updated_at: string,
  deleted_at: null | string
}
export interface InitialUserState {
  list: UserPersonalInformation[]
  isLoading: boolean
  isUserReadPolicy: number
  isUserDataFetched:boolean
  isSearch:boolean
  isCurrentUserDataFetch: boolean
  isUserSideBarLinkClicked: boolean
  currentUserProfileDetails : currentUserProfileDetailsTypes
  page: number
  total: number
  isCheckAll: boolean
  nextPageUrl: null | string,
  isSuccess: boolean,
  error: string,
  previousPageUrl: null | string,
  limit: number,
  isCheck: number[]
  duplicateList: UserPersonalInformation[],
}

export interface addUserActionPayLoad {
  payload: UserPersonalInformation
}
