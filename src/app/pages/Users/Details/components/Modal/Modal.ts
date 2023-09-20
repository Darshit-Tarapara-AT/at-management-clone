import {FormikProps} from 'formik'
export interface ViewProfileDetails {
  userId?: string | number
  profileUrl: string
  firstName: string
  lastName: string
  status: string
  aadhaarCardNumber: string
  slackUrl: string
  paidLeaveStartsFrom: string
  officeMaxValidTime: string
  salary: string
  joiningDate: string
  userEmail: string
  birthDate: string
  designation: string
  contactEmail: string
  address: string
  area: string
  lateEntryTime: string
  fullDayMinutes: string
  halfDayMinutes: string
  earlyDayMinutes: string
  state: string
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
  nextIncrementDate: string
  panNumber: string
  bankDetails: string
  extraInformation: string
}

interface UserFormCommonProps {
  formik: FormikProps<ViewProfileDetails>
}
export interface ContactDetailsProps extends UserFormCommonProps  {

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
  slackUrl:string
  firstName: string
  lastName: string
  birthDate: string
  designation: string
  contactEmail: string
}

export interface SalaryInformationProps  extends UserFormCommonProps{
  nextIncrementDate: string
  bankDetails: string
  aadhaarCardNumber:string
  extraInformation: string
  panNumber: string
  role : string
  salary:string
  paidLeaveStartsFrom : string
  officeMaxValidTime :string
}

export interface AttendanceInformationProps  extends UserFormCommonProps{
  fullDayMinutes: string
  halfDayMinutes : string
  earlyDayMinutes : string
  lateEntryTime : string
}

export interface GuardianInputFieldProps  extends UserFormCommonProps   {

  guardianFirstPersonName: string
  guardianFirstPersonContactNumber: string
  guardianFirstPersonAddress: string
  guardianSecondPersonName: string
  guardianSecondPersonContactNumber: string
  guardianSecondPersonAddress: string
}

export interface UserSelectRoleInputFieldProps {
  formik: FormikProps<ViewProfileDetails>
  role: string
}
