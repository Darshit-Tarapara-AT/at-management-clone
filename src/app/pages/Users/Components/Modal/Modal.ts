import { updateUserDetails } from 'app/Components/UpadateDetailSection'
import {InputFormikProps} from 'app/Modal/Modal'
import {SelectInputValue} from 'app/pages/Projects/Components/Modal/Modal'
import {FormikProps} from 'formik'

interface UserFormCommonProps {
  handlerBlurEvent: (name: string) => void
  formik: FormikProps<IProfileDetails>
}
export interface ContactDetailsProps extends UserFormCommonProps {
  address: string
  area: string
  state: string
  city: string
  postalCode: string
  mobile: string
  altMobile: string
  status: string
  cityOptions: string[]
  stateOptions: {name: string; code: string}[]
}
export interface PersonalDetailsProps extends UserFormCommonProps {
  profilePictureUrl: string
  profileUrl: string
  joiningDate: string
  userEmail: string
  slackUrl: string
  slackUserName: string
  slackUserNumber: string
  firstName: string
  lastName: string
  birthDate: string
  removeProfilePictureHandler: () => void
  designation: string
  contactEmail: string
}

export interface SalaryInformationProps extends UserFormCommonProps {
  nextIncrementDate: string
  bankDetails: string
  aadhaarCardNumber: string
  extraInformation: string
  panNumber: string
  role: string
  salary: string
  paidLeaveStartsFrom: string
}

export interface GuardianInputFieldProps extends UserFormCommonProps {
  guardianFirstPersonName: string
  guardianFirstPersonContactNumber: string
  guardianFirstPersonAddress: string
  guardianSecondPersonName: string
  guardianSecondPersonContactNumber: string
  guardianSecondPersonAddress: string
}

export interface UserSelectRoleInputFieldProps {
  formik: FormikProps<IProfileDetails>
  role: string
}

 export interface UserBy{
  id: number;
  name: string;
  image_url: string;
}
export interface IProfileDetails {
  addedByUser?: UserBy;
  updatedByUser?: UserBy;
  userId?: string | number
  profileUrl: File | string
  firstName: string
  createdBy: number | null
  createdAt: string
  updatedBy: string | null
  lastName: string
  added_by?: string | null
  slackUserName: string
  lastUpdateDate: string
  slackUserNumber: string
  status: SelectInputValue[]
  lateEntryTime: string | Date
  fullDayMinutes: string
  halfDayMinutes: string
  earlyDayMinutes: string
  aadhaarCardNumber: string
  slackUrl: string
  paidLeaveStartsFrom: string | Date
  officeMaxValidTime: string | Date
  salary: string
  joiningDate: string | Date
  userEmail: string
  birthDate: string | Date
  designation: string
  contactEmail: string
  address: string
  area: string
  state: SelectInputValue[]
  role: string
  city: string
  postalCode: string
  mobile: string
  altMobile: string
  guardianFirstPersonName: string
  guardianFirstPersonContactNumber: string
  guardianFirstPersonAddress: string
  guardianSecondPersonName: string
  guardianSecondPersonContactNumber: string
  guardianSecondPersonAddress: string
  nextIncrementDate: string | Date
  panNumber: string
  bankDetails: string
  extraInformation: string
}
export interface AddAttendanceInformationProps extends UserFormCommonProps {
  fullDayMinutes: string
  halfDayMinutes: string
  officeMaxValidTime: string
  earlyDayMinutes: string
  lateEntryTime: string
}

export interface AddUserPayLoad {
  name:string
  email:string
  first_name:string
  last_name:string
  contact:string
  role_id :string 
  status:string
  alternate_contact : string
  birth_date:string
  next_increment_date:string
  joining_date:string
  designation:string
  contact_email:string
  slack_url:string
  address:string
  area : string
  state:string
  city: string
  postal_code: string
  guadian_1_name: string
  guadian_1_address: string
  late_entry_time: string
  fullday_minutes: string
  halfday_minutes: string
  earlyday_minutes: string
  guadian_1_contact: string
  guadian_2_name: string
  guadian_2_contact: string
  guadian_2_address: string
  slack_username: string
  basic_salary: string
  pan_number: string
  aadhar_number: string
  bank_details: string
  extra_information: string
  paid_leave_starts_from: string
  user_image: File
}

export interface UserResponseField {
  updated_by_user?: updateUserDetails
  added_by_user?: updateUserDetails
  deleted_by?: string | number | null
  updated_by: string | null
  name: string
  email: string
  updated_at?: string
  created_at?: string
  added_by?: number | null
  first_name: string
  last_name: string
  contact: string
  role_id: {id: number; name: string}
  status: string
  alternate_contact: string
  birth_date: string
  joining_date: string
  designation: string
  contact_email: string
  slack_url: string
  slack_username: string
  slack_user_number: string
  office_max_valid_time: string
  address: string
  area: string
  state: string
  city: string
  next_increment_date: string
  postal_code: string
  guadian_1_name: string
  guadian_1_address: string
  guadian_1_contact: string
  late_entry_time: string
  fullday_minutes: string
  halfday_minutes: string
  earlyday_minutes: string
  guadian_2_name: string
  guadian_2_contact: string
  guadian_2_address: string
  basic_salary: number
  pan_number: string
  aadhar_number: string
  bank_details: string
  extra_information: string
  paid_leave_starts_from: string
  image_url: string
}

export interface DatePickerProps {
  formik: InputFormikProps
  name: string
  onBlur?: (name: string) => void
  min?: string
  isTimeAlsoRequired?: boolean
  isRequired?: boolean
  title?: string
  col?: number
  disabled?: boolean
  className?: string
  maxDate?: string
  label?: string
}
