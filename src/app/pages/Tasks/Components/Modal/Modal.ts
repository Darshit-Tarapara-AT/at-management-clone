import { updateUserDetails } from 'app/Components/UpadateDetailSection'
import { UpdateDetailsAPIpayload } from 'app/Modal/Modal'
import {SelectInputValue} from 'app/pages/Projects/Components/Modal/Modal'
import {FormikProps} from 'formik'

export interface CheckListKeys {
  id: number
  task_id?: number
  name: string
  is_checked: number
  created_by?: number | null
  last_updated_by?: number | null
  updated_at?: string
}
interface FormCommonProps {
  handlerBlurEvent: (name: string) => void
  formik: FormikProps<TaskFormValues>
}

export interface TaskFormValues extends UpdateDetailsAPIpayload {
  updatedByUser?: updateUserDetails
  addedByUser?: updateUserDetails
  name: string
  description: string
  project: SelectInputValue[]
  assignTo: SelectInputValue[]
  qa: SelectInputValue[]
  checkList: CheckListKeys[]
  percentage: string
  startDate: [] | [Date] | string
  endDate: [] | [Date] | string
  parentTask: SelectInputValue[]
  estimatedTime: string
  trackedTime: string
  isTaskBillable: boolean
  priority: SelectInputValue[]
  status: SelectInputValue[]
  type: SelectInputValue[]
  comment: string
  attachment: File | string
}

export interface TaskPayload {
  name: string
  parent_id: number
  project_id: number
  description: string
  assigned_user: number
  assigned_qa: number
  start_date: string
  end_date: string
  estimated_time: string
  percentage: string
  is_task_billable: string
  priority: string
  task_status: string
  task_type: string
  comment: string
  checklist_json: string
}
export interface MainTaskDetailsFormProps extends FormCommonProps {
  name: string
  description: string
  project: string
  percentage: string
  assignTo: string
  QA: string
  startDate: string
  endDate: string
  taskId: null | number
  estimatedTime: string
  checkList: string
  isTaskBillable: string
  parentTask: string
  priority: string
  status: string
  type: string
  comment: string
  attachment: string
  parentTaskID: string
}
