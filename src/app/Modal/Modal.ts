import {ClientFormValues} from 'app/pages/Client/Components/Modal/Modal'
import {LeadFormValues} from 'app/pages/Lead/Components/Modal/Modal'
import {
  GeneralDetailsPageFormValue,
  ProjectFormValues,
  SelectInputValue,
} from 'app/pages/Projects/Components/Modal/Modal'
import {TaskFormValues} from 'app/pages/Tasks/Components/Modal/Modal'
import {IProfileDetails} from 'app/pages/Users/Components/Modal/Modal'
import {FormikProps} from 'formik'
import React, {Dispatch} from 'react'
import {ViewProfileDetails} from 'app/pages/Users/Details/components/Modal/Modal'
import { updateUserDetails } from 'app/Components/UpadateDetailSection'
import { DateRange } from '@mui/x-date-pickers-pro/internals/models'
import dayjs from 'dayjs'

export type UpdateAndCreateByType = number | null
export interface CustomTableProps {
  data: any[]
  columns?: any
  error?: string
  classes?: string[]
  onChange?: () => void
}

export interface UpdateDetailsAPIpayload {
  createdAt: string
  createdBy: UpdateAndCreateByType
  updatedBy: UpdateAndCreateByType
  updatedAt: string
}
export interface CustomPaginationProps {
  keys: string
  nextPageUrl?: string
  totalCount?: number
  limit?: number
  onButtonClick: (page: string | number) => void
}

interface PolicyListFields {
  id: number
  title: string
  description: string
}

interface UsersListFields {
  id: number
  name: string
  avatar: string
  email: string
  role: string
  last_login: string
}
export interface Roles {
  id: number | string
  role: string
}
interface FilterOptions {
  title: string
  options: SelectInputValue[]
  filterKey: string
  value: any
  isMultiSelect?: boolean
  isAutoFill?: boolean
}

type FilterOptionsType = FilterOptions[]
export interface FilterListProps {
  filtersOptions?: FilterOptionsType
  setFilterAttr?: Dispatch<React.SetStateAction<any>>
  filterAttrValues?: string[]
  hasResetButtonRequired?: boolean
  isFilterLoading?: boolean
  isAutoFill?: boolean
  buttonText?: string
  onFilterSubmit?: () => void
  onFilterChange?: (key: string, value: any) => void
}

export interface SectionHeaderProps {
  path: string
  filtersOptions?: FilterOptionsType
  searchValue?: string
  onSearchValueChange?: (value: string) => void
  isFilterRequired?: boolean
  searchTitle?: string
  isHeaderRequired?: boolean
  hasResetButtonRequired?: boolean
  isAutoFill?: boolean
  isFilterLoading?: boolean
  isFilterPermissionAllow?: boolean
  searchInput?: string
  onFilterSubmit?: () => void
  setFilterAttr?: Dispatch<React.SetStateAction<any>>
  filterAttrValues?: string[]
  isAddPermissionAllow: boolean
  isSearchAllow?: boolean
  onAddButtonClick?: () => void
  onFilterChange?: (key: string, value: SelectInputValue[]) => void
  title?: string
  list: UsersListFields[] | PolicyListFields[] | any[]
  className?: string
  checkedList: number[]
  onChange?: (value: string) => void
  children?: JSX.Element
  buttonText?: string
}
export interface CustomCheckBoxProps {
  name: string
  label?: string
  value: string
  type: 'checkbox' | 'radio'
  formilk?: FormikProps<RolesFormValues>
}
export interface PermissionFormValues {
  updated_by_user?: updateUserDetails
  added_by_user?: updateUserDetails
  name: string
  label: string
  module: {id: string; label: string}[]
  added_by: string
  created_at?: string
  created_by?: UpdateAndCreateByType
  updated_at?: string
  updated_by?: UpdateAndCreateByType
  lastUpdated: string
}

export interface IpAddressFormValues {
  ipAddress: string
  addedBy: UpdateAndCreateByType
  createAt: string
  updatedBy: UpdateAndCreateByType
  updatedAt: string
  name: string
  added_by_user: updateUserDetails
  updated_by_user: updateUserDetails
}

export interface LeaveFormValues {
  approved_by_user?: updateUserDetails
  updated_by_user?: updateUserDetails
  added_by_user?: updateUserDetails
  start_date: [] | [Date] | any
  end_date: [] | [Date] | any
  addedBy: UpdateAndCreateByType
  updatedBy: UpdateAndCreateByType
  createdDate: string
  reason: string
  joining_date: [] | [Date] | any
  type: SelectInputValue[]
  status: SelectInputValue[]
  lastUpdateDate: string
  comment: string
  user: string
}

export interface HolidayFormValues extends UpdateDetailsAPIpayload {
  holidayDate: string
  name: string
  description: string
}

export interface TaskCorrectionFormValues {
  startTime: Date
  endTime: Date
  description: string
  project: SelectInputValue[]
  task: SelectInputValue[]
  startEndTimeArray?: DateRange<dayjs.Dayjs>
}

export interface AddTaskCorrectionFormValues {
  addStartTime: Date
  addEndTime: Date
  addDescription: string
  addProject: SelectInputValue[]
  addTask: SelectInputValue[]
  startEndTimeArray?: DateRange<dayjs.Dayjs>
}

export interface PolicyFormValues {
  updated_by_user?: updateUserDetails
  added_by_user?: updateUserDetails
  title: string
  description: string
  status: SelectInputValue[]
  policyRole: number[]
  lastUpdated: string
  created_by: string
  updated_by?: UpdateAndCreateByType
  created_at?: string
  updated_at?: string
}

export interface RolesFormValues {
  updated_by_user?: updateUserDetails
  added_by_user?: updateUserDetails
  name: string
  defaultRole: string
  assignPermissions: number[]
  label: string
  added_by: string
  created_at?: string
  created_by?: UpdateAndCreateByType
  updated_at?: string
  updated_by?: UpdateAndCreateByType
  lastUpdated: string
}

export interface CredentialsFormValues {
  updated_by_user?: updateUserDetails
  added_by_user?: updateUserDetails
  description?: string
  added_by: string
  created_at?: string
  created_by?: UpdateAndCreateByType
  updated_at?: string
  updated_by?: UpdateAndCreateByType
  lastUpdated: string
  name: string
  user: SelectInputValue[]
  role: SelectInputValue[]
  client: SelectInputValue[]
  project: SelectInputValue[]
  credentialDetail: ''
}

export interface PermissionTableProps {
  id?: number
  name: string
}

export interface PolicyTextEditorProps {
  formik: InputFormikProps
  label: string
  name: string
}
export interface CredentialTextEditorProps {
  formik: InputFormikProps
  label: string
  name: string
}
export interface CustomPaginationListType {
  [index: string]: any
}

export type ID = undefined | null | number

export interface AssignPermissionsProps {
  id: number
  formilk: FormikProps<RolesFormValues>
  name: string
}

export interface AssignPermissionsCheckBoxProps {
  name: string
  value: string
  id: number
  formilk: FormikProps<RolesFormValues>
}

export interface AuthLayOutProp {
  component: React.ElementType
}

export interface AssignPolicyRoleProps {
  id: number
  formilk: FormikProps<PolicyFormValues>
  name: string
  value: string
}

export interface AssignPolicyRoleCheckBoxProps {
  name: string
  value: string
  id: number
  formilk: FormikProps<PolicyFormValues>
}

export interface UserConsentProps {
  title: string
  id: number
}

export interface AssignPolicyRoleCheckBoxProps {
  name: string
  value: string
  id: number
  formilk: FormikProps<PolicyFormValues>
}

export interface UserConsentProps {
  title: string
  id: number
}
export interface SearchQueryPayload {
  token: string
  query: string
  page?: number
  status?: string
  size?: number
  role?: string
}

export type InputFormikProps =
  | FormikProps<IProfileDetails>
  | FormikProps<PolicyFormValues>
  | FormikProps<PermissionFormValues>
  | FormikProps<RolesFormValues>
  | FormikProps<LeadFormValues>
  | FormikProps<ClientFormValues>
  | FormikProps<ProjectFormValues>
  | FormikProps<TaskFormValues>
  | FormikProps<ViewProfileDetails>
  | FormikProps<GeneralDetailsPageFormValue>
  | FormikProps<IpAddressFormValues>
  | FormikProps<CredentialsFormValues>
  | FormikProps<LeaveFormValues>
  | FormikProps<HolidayFormValues>

export interface CustomTimePickerProps {
  formik: InputFormikProps
  min?: number
  max?: number
  col?: number
  name: string
  label?: string
  placeholder?: string
  onBlur?: (name: string) => void
}

export interface BaseUIPaginationProps {
  numPages: number
  page?: number
  searchInput?: string
  pageSizeValue?: SelectInputValue[]
  onPageChangeHandler: (page: number) => void
  onPageSizeChangeHandler?: (pageSize: number) => void
}
