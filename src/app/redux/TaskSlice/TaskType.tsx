import {TaskFormValues} from 'app/pages/Tasks/Components/Modal/Modal'
import {editProjectActionPayload} from '../ProjectSlice/ProjectTypes'
import {number} from 'yup'
import { updateUserDetails } from 'app/Components/UpadateDetailSection'
type ModifiedTaskFormValues = Omit<TaskFormValues, 'startDate' | 'endDate'>

interface SelectedProjectTaskListPayload {
  [index: number]: TaskResponseFields[]
}

export interface TaskResponsePayload {
  id: number
  name: string
  assigned_to: string
  takenHours: string
  estimationHours: string
  deleteItem?: boolean
  editItem?: boolean
  viewItem?: boolean
  end_date: string
  check_list: string
  percentage: string
}

export interface TaskEntryCorrectionResponse {
  id: number
  timeline_id: number
  task_id: number
  project_id: number
  description: string
  user_id: number
  start_time: string
  end_time: string
  difference_minutes:number
  status: string
  created_by: number
  last_updated_by: number
  created_at: string
  updated_at: string
  deleted_at: string
  project_name: string
  user_name: string
  task_name: string
}

export interface TaskEntryCorrectionResponsePayload {
  data: {
    data: TaskEntryCorrectionResponse[];
    current_page: number;
    total: number;
  };
  status: boolean;
  message: string;
}
export interface SingleTaskEntryResponsePayload {
  end_time: string
  id: number
  timeline_id: number
  project_id:number
  hasTaskCorrectionItem?: boolean
  isTaskRunning: boolean
  index: number
  status: string
  difference_minutes:number
  project_name: string
  start_time: string
  task_name: string
  task_status: string
  trackedTime: number
  description: string
  task_correction: TaskEntryCorrectionResponse[]
}

export interface TaskEntryRecordsPayload {
  totalInHours: string
  totalMinutes: string
  totalTime: string
}
export interface TaskResponseFields {
  updated_by_user?: updateUserDetails
  isTaskRunning?: boolean
  added_by_username: string
  id: number
  parentTaskName?: string
  name: string
  parent_task_name: string
  trackedTime: string
  assigned_user: number
  takenHours: string
  estimationHours: string
  deleteItem?: boolean
  editItem?: boolean
  viewItem?: boolean
  end_date: string
  start_date: string
  check_list: string
  percentage: string
  is_task_billable: number
  priority: string
  task_status: string
  project_id: number
  task_type: string
  comment: string
  created_by: number | null
  last_updated_by: number | null
  created_at: string
  tracked_time?: number
  updated_at: string
  description: string
  assigned_qa: number
  estimated_time: number
  parent_id: null | number
  project: editProjectActionPayload
  added_by_user: {id : number, name: string, image_url: string}
  updated_by_username: {id : number, name: string, image_url: string}
  taskchecklist: {
    id: number
    task_id: number
    name: string
    is_checked: number
    created_by: number | null
    last_updated_by: number | null
    created_at: string
    updated_at: string
  }[]
}
export interface InitialTaskState {
  list: TaskResponseFields[]
  hasEditTaskCorrection: boolean
  currentTaskPath: string
  previousActiveTask: number
  selectedProjectId: number[]
  activeTaskId: string | number
  selectedProjectTaskList: SelectedProjectTaskListPayload
  hasUserEditTaskEntry: boolean
  taskEntryCorrectionList: TaskEntryCorrectionResponse[]
  // newTaskEntryCorrectionList:SingleTaskEntryResponsePayload[]
  currentTaskCorrectionEditRow: number
  taskCheckList: any[]
  totalTaskTrackRecords: TaskEntryRecordsPayload
  checkedTaskId: number[]
  taskEntry: SingleTaskEntryResponsePayload[]
  newTaskEntry:SingleTaskEntryResponsePayload[]
  tempList: TaskResponsePayload[]
  isTaskCheckListLoading: boolean
  specificTask: TaskResponseFields
  isLoading: boolean
  page: number
  duplicateList: TaskResponsePayload[]
  total: number
  nextPageUrl: null | string
  isSuccess: boolean
  isTaskSideBarLinkClicked: boolean
  error: string
  previousPageUrl: null | string
  limit: number
  taskCorrectionList: {
    id: string
    to_date: string
    from_date: string
    status: string
    user_id: string
  }[]
}

export interface addTaskActionPayload {
  payload: any
}
