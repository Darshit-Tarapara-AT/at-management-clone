import { updateUserDetails } from 'app/Components/UpadateDetailSection'
import { UpdateDetailsAPIpayload } from 'app/Modal/Modal'
import { SelectInputValue } from 'app/pages/Projects/Components/Modal/Modal'
import {FormikProps} from 'formik'
interface FormCommonProps {
  handlerBlurEvent:(name:string) => void
  formik: FormikProps<LeadFormValues>
}
export interface LeadContactDetailsProps extends FormCommonProps  {
  firstContactSourceOptions:{id:string, name:string}[]
  address: string
  area: string
  state: string
  city: string
  postalCode: string
  country: string
  stateOptions: {name: string, code:string}[]
  addBy:string
  comments :string
  firstContactSource:string
  leadType : string
}
export interface LeadFormValues extends UpdateDetailsAPIpayload {
  updated_by_user: updateUserDetails
  added_by_user: updateUserDetails
  name: string
  email: string
  company_name: string
  website: string
  lead_select_date: [] | [Date]
  deadLineTime: Date
  deadLineDate: Date | string
  account: SelectInputValue[]
  position: SelectInputValue[]
  deadLineReminder: Date | string
  note:string,
  phone: number | string
  contactEmailValue: string
  mobile: number | string
  skype_id: string
  linkedin_url: string
  lead_status: SelectInputValue[]
  updated_at?: string
  created_at?: string
  updated_by?: number | null
  created_by?: number | null
  address: string
  area: string
  country: SelectInputValue[]
  state: string
  last_contact_date :[] |[Date] | string | Date
  city: string
  postal_code: number | string
  first_contact_source: SelectInputValue[]
  comments: string
  lead_type: SelectInputValue[]
  lead_title: string
  lead_description: string
  lead_regular_contact_source: SelectInputValue[]
  given_price: number | string
  reason: string
  contact_url: string
  lead_contact_email: string[]
}
export interface AddUserPayLoad {
  name: string
  email: string
  first_name: string
  last_name: string
  contact: string
  role_id: string
  status: string
  alternate_contact: string
  birth_date: string
  next_increment_date: string
  joining_date: string
  designation: string
  contact_email: string
  slack_url: string
  address: string
  area: string
  state: string
  city: string
  postal_code: string
  guadian_1_name: string
  guadian_1_address: string
  guadian_1_contact: string
  guadian_2_name: string
  guadian_2_contact: string
  guadian_2_address: string
  basic_salary: string
  pan_number: string
  aadhar_number: string
  bank_details: string
  extra_information: string
  paid_leave_starts_from: string
  user_image: File
}
export interface UserResponseField {
  name: string
  email: string
  company_name: string
  website: string
  phone: number
  mobile: number
  skype_id: string
  linkedin_url: string
  lead_status: 'Active' | 'pending' | 'block' | 'cancel'
  address: string
  area: string
  country: string
  state: string
  city: string
  postal_code: number
  added_by: string
  first_contact_source: string
  comments: string
  lead_type: 'freelancer' | 'company'
  lead_title: string
  lead_description: string
  lead_regular_contact_source: string
  given_price: number
  actual_price: number
  reason: string
  contact_url: string
  lead_contact_email: string
}
type SelectInputOptionType =   {id:string, name:string}[]
export interface LeadPersonalDetailsProps extends FormCommonProps {
  name: string
  email: string
  companyName: string
  lastContactDate: string
  deadLineReminder: string
  accountOptions: SelectInputOptionType
  positionOptions: SelectInputOptionType
  leadStatusDate: string
  note: string
  deadLineTime: string
  deadLineDate: string
  website: string
  emailInputValue: string
  leadStatusOptions: SelectInputOptionType
  phone: string
  mobile: string
  reason: string
  skypeId: string
  linkedinUrl: string
  leadStatus: string
}
export interface LeadInformationProps extends FormCommonProps {

  leadTitle : string
  leadDescription : string
  leadRegularContactSource : string
  givenPrice : string
  actualPrice : string
  contactUrl : string
  contactEmailValue:string
  leadContactEmail : string
  regularContactSource: {id:string, name:string}[]
} 
