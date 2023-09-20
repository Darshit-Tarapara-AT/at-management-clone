interface UserDetailsListType {
  label: string
  value: string
}
interface GuardianDetailsListType {
  label: string
  value: string[]
}
export interface ContactDetailsProps {
  contactDetailsValues: UserDetailsListType[]
}
export interface PersonalDetailsProps {
  personalDetailsValues: UserDetailsListType[]
  buttonText: string
  path: string
  isPermission: boolean
}

export interface SalaryInformationProps {
  salaryDetailsValues: UserDetailsListType[]
  title: string
}

export interface GuardianInputFieldProps {
  guardianDetailsValues: GuardianDetailsListType[]
}

export interface AttendanceInformationProps {
  attendanceDetailsValues: UserDetailsListType[]
}
