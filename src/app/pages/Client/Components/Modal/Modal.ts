import { updateUserDetails } from 'app/Components/UpadateDetailSection'
import { UpdateAndCreateByType, UpdateDetailsAPIpayload } from 'app/Modal/Modal'
import { SelectInputValue } from 'app/pages/Projects/Components/Modal/Modal'
import {FormikProps} from 'formik'

interface FormCommonProps {
  handlerBlurEvent:(name:string) => void
  formik: FormikProps<ClientFormValues>
}
export interface ClientFormValues {
  updated_by_user?: updateUserDetails
  added_by_user?: updateUserDetails
  created_at?: string
  created_by?: UpdateAndCreateByType
  updated_at?: string
  updated_by?: UpdateAndCreateByType
  lead_regular_contact_source?: string
  added_by_username?: string
  name: string
  email: string
  company_name: string
  website: string
  lastUpdateDate: string
  mode_of_contacts: SelectInputValue[]
  last_update_date: string
  account?: SelectInputValue[]
  position?: SelectInputValue[]
  phone: number | string
  mobile: number | string
  skype_id: string
  linkedin_url: string
  frontend_added_by: number
  lead_status: string
  address: string
  area: string
  country: SelectInputValue[]
  state: string
  city: string
  postal_code: number | string
  added_by: string
  comments: string
  added_date: string
}

export interface ClientContactDetailsProps extends FormCommonProps  {
  status: string
  address: string
  area: string
  firstContactSourceOptions: {id:string, name:string}[]
  state: string
  city: string
  postalCode: string
  addedDate:string
  country: string
  stateOptions: {name: string, code:string}[]
  addBy: string
  comments: string
  firstContactSource: string
  leadType: string
}

export interface ClientPersonalDetailsProps extends FormCommonProps {
  name: string
  email: string
  companyName: string
  leadStatusDate: string
  note :string
  lastContactDate:string
  website: string
  phone: string
  mobile: string
  reason: string
  leadStatusOptions: {id:string, name:string}[]
  skypeId: string
  linkedinUrl: string
  leadStatus: string
}

export interface ClientStatusProps extends FormCommonProps {
  status: string
  addedBy: string
  selectClientStatusOptions: {value: string, label: string}[]
  modeOfContact: string
  addedDate: string
  lastUpdatedDate: string
}
