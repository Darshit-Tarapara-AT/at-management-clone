import { updateUserDetails } from 'app/Components/UpadateDetailSection'
import { UserBy } from 'app/pages/Users/Components/Modal/Modal'
import {FormikProps} from 'formik'

interface FormCommonProps {
  handlerBlurEvent: (name: string) => void
  formik: FormikProps<ProjectFormValues>
}

export interface SelectInputValue {
  id: any
  label: string
}
export interface SelectInputOptionsFields {
  value:string|number, label : string
}

export interface ProjectFormValues {
  updatedByUser: UserBy
  addedByUser: UserBy
  name: string
  shortName: string
  client: SelectInputValue[]
  esimationHours: string
  lastUpdatedDate: string
  lastUpdatedBy: {image_url: string, name: string}
  projectManager: SelectInputValue[]
  team: SelectInputValue[]
  progressStatus: SelectInputValue[]
  type: SelectInputValue[]
  billingType: SelectInputValue[]
  tags: string[]
  status:SelectInputValue[]
  slackUrl: string
  startDate: [] | [Date] | Date | string
  endDate:  [] | [Date] | Date | string
  showInPortfolio: boolean
  logo: File | string
  industries: SelectInputValue[]
  technologies: SelectInputValue[]
  projectType: SelectInputValue[]
  tagInput: string | string[]
  color: string
  description: string
  ftpDetails: string
  tools: SelectInputValue[]
  demoSite: string
  demoSiteCredentials: string
  liveSiteUrl: string
  liveSiteCredentials: string
  attachment: string | File
}

export interface ProjectPayload {
  name: string
  code: string
  client: string
  total_hours: string
  project_manager: string
  team: string[]
  progress_status: string
  type: string
  tags: string[]
  status: string
  slackUrl: string
  start_date: Date | string
  end_date: Date | string
  show_in_portfolio: boolean
  logo: File | string
  industries: string
  technologies:string[]
  project_type: string[]
  color: string
  description: string
  ftp_details: string
  tools: string[]
  demo_site: string
  demo_site_credentials: string
  live_site_url: string
  live_site_credentials: string
  attachment: File
}
export interface MainProjectDetailsFormProps extends FormCommonProps {
  name: string
  shortName: string
  client: string
  esimationHours: string
  projectManager: string
  isTitleRequired?: boolean
  formik: any
  statusOption: SelectInputOptionsFields[]| []
  team: string
  progressStatus: string
  type: string
  status: string
  clientTypeOption:SelectInputOptionsFields[]| []
  slackUrl: string
  projectTypeOptions: SelectInputOptionsFields[]| []
  progressStatusOptions: SelectInputOptionsFields[]| []
  startDate: string
  endDate: string
  projectType: string
}
export interface ExtraProjectDetailsFormProps extends FormCommonProps {
  logo: string
  industries: string
  technologies: string
  statusOption?:SelectInputOptionsFields[]| []
  showInPortfolio: string
  color: string
  description: string
  tagInput: string
  formik: any
  ftpDetails: string
  toolsOptions: SelectInputOptionsFields[]| []
  industriesOptions: SelectInputOptionsFields[]| []
  technologiesOptions: SelectInputOptionsFields[]| []
  demoSite: string
  setLogoURL: React.Dispatch<React.SetStateAction<string>>
  logoUrl: string
  demoSiteCredentials: string
  tools: string
  liveSiteUrl: string
  liveSiteCredentials: string
  attachment: string
}

export interface DetailsPageProps {
  id: number
}
export interface NavLinksProps {
    title: string
    path: string
    isAllow: boolean
  
}

export interface ArchiveProps {
  status:string
}
export interface DetailsProfileSectionProps {
  logo?: string
  projectName?: string
  team: string[]
  openTask?: string
  tags?: string[]
  projectStatus?: string,
  estimateHour: string
  arrowColor: string
  budgetSpent?: string
  navLinks: NavLinksProps[]
  estimateHourArrowIcon: string
  dueDate: string
  editId: number
}

export interface LastestFiltItemProps {
  name: string
  title: string
  url: string
  day: string
}

export interface GeneralDetailsPageFormValue {
  addedByUser: updateUserDetails
  updatedByUser: updateUserDetails

  tags: string[]
  showInPortfolio: boolean
  logo: File | string
  industries: SelectInputValue[]
  technologies: SelectInputValue[]
  lastUpdatedBy: {image_url: string, name: string}
  lastUpdatedDate: string
  projectType: SelectInputValue[]
  tagInput: string | string[]
  color: string
  description: string
  tools: SelectInputValue[]
  demoSite: string
  demoSiteCredentials: string
  liveSiteUrl: string
  liveSiteCredentials: string
}


export interface PrivateDetailsPageFormValue {
  name: string
  shortName: string
  client: SelectInputValue[]
  esimationHours: string
  projectType: SelectInputValue[]
  projectManager: SelectInputValue[]
  team: SelectInputValue[]
  progressStatus: SelectInputValue[]
  type: SelectInputValue[]
  billingType: SelectInputValue[]
  status:SelectInputValue[]
  slackUrl: string
  startDate: [] | [Date] |Date
  endDate:  [] | [Date] |Date
  addedByUser: UserBy
  updatedByUser: UserBy
}