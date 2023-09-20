import { ClientFormValues } from "app/pages/Client/Components/Modal/Modal"
import { SelectInputValue } from "app/pages/Projects/Components/Modal/Modal"
import { string } from "yup"

export interface ProjectInformation {
  id : number|string
  takenHours? :string
  name :string
  shortName: string
  code?: string
  updated_at?: string
  client :string
  updatedBy?: {image_url: string, name: string}
  esimationHours: string
  projectManager :SelectInputValue[]
  team: string
  progressStatus :string
  type  :string
  status :{label:string, id : string|number}[]
  slackUrl :string
  startDate : Date |string
  endDate : Date | string
  logo: File | string
  industries: string
  technologies: {label:string, value : string|number}[]
  projectType: {label:string, value : string|number}[]
  tagInput: string[]
  color: string
  description: string
  ftpDetails: string
  tools :{label:string, value : string|number}[]
  demoSite: string
  demoSiteCredentials: string
  showInPortfolio: boolean
  liveSiteUrl: string
  liveSiteCredentials: string
  attachment: string | File
}

export interface InitialProjectState {
  list: ProjectInformation[]
  tempList: ProjectInformation[]
  parentTask: ParentTaskType[]
  duplicateList: ProjectInformation[]
  currentProjectId: number | string
  isError: boolean
  status: string
  isLoading: boolean
  specificProject: editProjectActionPayload
  page: number
  total : number
  nextPageUrl: null | string
  isSuccess: boolean
  isProjectSideBarLinkClicked: boolean
  error: string
  previousPageUrl: null | string
  limit: number
}

export interface addLeadActionPayLoad {
  payload: ProjectInformation
}

export interface addProjectActionPayload {
  name: string
  short_name: string
  client_id: string | number
  estimation_hours: string
  project_manager: string | number
  team: string,
  progress_status: string | number
  client_type: string | number
  billing_type: string | number
  status: string | number
  slack_url: string
  start_date: string
  end_date: string
}

export interface ParentTaskType {
  id: number
  parent_id: number | null,
  project_id: number,
  name: string,
  description: string,
  assigned_user: number,
  assigned_qa: number,
  start_date: string
  end_date: string
  estimated_time: number
  percentage: number
  is_task_billable: string
  priority: string
  task_status: string
  task_type:string
  comment: string,
  created_by: number
  last_updated_by: string
  created_at: string
  updated_at: string
  deleted_at: string
}

export interface TeamMemberFields {
  designation: string ,email: string , label: string, user_image: string, id: number
}
export interface editProjectActionPayload extends addProjectActionPayload {
  created_at?: string
  created_by?: number | null
  client?: ClientFormValues
  image_url?: string
  updated_at?: string
  open_tasks?: string
  trackedTime?: number
  show_in_portfolio: boolean
  logo: File | string
  industries: string | number
  id?: number
  team_members?:TeamMemberFields[]
  tag: string
  taken_hours?: string
  lastUpdatedBy?: {image_url: string, name: string}
  technologies: string | number
  project_type: string | number
  color: string
  description: string
  last_updated_by?: number
  tools: string | number
  demo_site: string
  demo_site_credentials: string
  live_site_url: string
  live_site_credentials: string
  added_by_user: {id: number, name: string, image_url: string}
  updated_by_user: {id: number, name: string, image_url: string}
}