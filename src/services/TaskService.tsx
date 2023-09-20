import { hasError, hasSuccess } from './ApiHelpers'
import { appClient } from './NetworkService'
import apiConfig from 'config/api'
import { TaskPayload } from 'app/pages/Tasks/Components/Modal/Modal';
import { IFilterTaskPayload } from 'app/redux/TaskSlice/TaskAsyncThunk';
import { removeTokenFieldFromPayload } from './CredentialService';

export interface MultiTaskAssignPayload {
  token: string;
  taskId: string;
  userId: string;
}

export interface AddTaskCorrectionPayload {
  token: string;
  timeline_id: string;
  task_id: number;
  project_id: number;
  start_time: string;
  end_time: string;
  difference_minutes: string
  status: string
}

export interface EditTaskCorrectionPayload extends AddTaskCorrectionPayload{
id: number
}

export interface TaskCorrectionStatusUpdatePayload{
  id: number;
  token: string;
  status: string;
}

export interface StartStopTaskTrackerPayload {
  token: string;
  taskId: number;
  projectId: string;
  task_status: string;
}

export interface SingleDayTaskEntryPayload {
  size?: string
  date: string
  page: number
  month: string
  user_id: number
  year: string
  token: string;
}


export interface NewSingleDayTaskEntryPayload{
  size?: string
  date: string
  page: number
  month: string
  user_id: number
  year: string
  token: string;
}

export interface TaskCorrectionListPayload {
  size: string;
  page: number;
  token: string;
}

export interface MultiTaskChangeStatusPayload {
  token: string;
  taskId: string;
  status: string;
}

export interface addCheckListenerPayload {
  token: string;
  taskId: number;
  name: string;
}

export interface taskCorrectionRequestPayload {
  token:string;
  page:number;
  limit?: number;
  fromDate:number;
  query: string
  toDate:number;
  userId:number;
  status: string;
}

export interface editCheckListenerPayload extends addCheckListenerPayload{
checkListId: number;
}
export interface deleteCheckListenerPayload {
  token: string;
  taskId: number;
  checkListId: number;
}
export interface CheckListPayload {
taskId: number
token: string;
checkList: {id: string, is_checked: string}[]
}


export async function getAllTasks(userToken: string, page: number,projectId: string, limit =10) {
  try {
    const payload = {
      page,
      size: limit,
      project_id: projectId ? Number(projectId) : ''
    }
    const response = await appClient.post(apiConfig.task.list, payload, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
}

export async function addNewTaskEntryCorrection(payload: AddTaskCorrectionPayload) {
  try {
    const response = await appClient.post(apiConfig.task.addTaskCorrectionRequest, removeTokenFieldFromPayload(payload), {
      headers: {
        'Authorization': `Bearer ${payload.token}`
      }
    })
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
}

export async function updateTaskEntryCorrection(payload: EditTaskCorrectionPayload) {
  try {
    const response = await appClient.post(apiConfig.task.updateTaskCorrectionList + "/" + payload.id, removeTokenFieldFromPayload(payload), {
      headers: {
        'Authorization': `Bearer ${payload.token}`
      }
    })
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
}

export async function updateTaskEntryCorrectionStatus(payload: TaskCorrectionStatusUpdatePayload) {
  try {
    const response = await appClient.post(apiConfig.task.updateTaskCorrectionStatus + "/" + payload.id, removeTokenFieldFromPayload(payload), {
      headers: {
        'Authorization': `Bearer ${payload.token}`
      }
    })
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
}


export async function getFilterTasks(userToken: string, payload: any) {
  const {
    page, limit, projectId, query, assignUser, endDate, isTaskBillable, status, taskType
  } = payload
  const APIpayload = {
    page,
    size: limit,
    project_id: projectId,
    queryFilter: query,
    assigned_user: assignUser,
    end_date: endDate,
    is_task_billable: isTaskBillable,
    task_status: status,
    task_type: taskType,
  }
  try {
    const response = await appClient.post(apiConfig.task.list, APIpayload, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
}

export async function updateTaskCheckList(payload: CheckListPayload) {
  try {
 const formData = new FormData();
 const checkList = JSON.stringify({
  checklists:  payload.checkList
 })
formData.append("checklist_json", checkList)

    const response = await appClient.post(apiConfig.task.updateCheckList + '/' + payload.taskId, formData, {
      headers: {
        'Authorization': `Bearer ${payload.token}`
      }
    })
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
}

export async function deleteTask(userToken: string, id: number) {
  try {
    const response = await appClient.delete(apiConfig.task.list + "/" + id, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    console.log("testing for the ",response)
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}



export async function deleteMultiPleTaskCorrection(userToken: string, id: string) {
  try {
    const payload = {
      task_correction_request_id: id
    }

    const response = await appClient.post(apiConfig.task.deleteMCorrectionRequests, payload, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}



export async function deleteMultiPleTask(userToken: string, id: string) {
  try {
    const payload = {
      task_id: id
    }

    const response = await appClient.post(apiConfig.task.deleteMultiple, payload, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function addNewTask(userToken: string, payload: TaskPayload) {
  try {
    const response = await appClient.post(apiConfig.task.add, payload, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function dailyTaskSlackNotification(userToken: string) {
  try {
    const response = await appClient.post(apiConfig.task.dailyTaskSlackNotification,{}, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function addNewCheckList(payload: addCheckListenerPayload) {
  try {
    const APIPayload = {
      task_id: payload.taskId,
      name: payload.name
    }
    const response = await appClient.post(apiConfig.task.addCheckList, APIPayload, {
      headers: {
        'Authorization': `Bearer ${payload.token}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function startAndStopTaskService(userToken: string, payload: StartStopTaskTrackerPayload) {
  try {
    const APIpayload ={
      task_id: payload.taskId,
      task_status: payload.task_status,
      project_id: payload.projectId
    }
    const response = await appClient.post(apiConfig.task.track, APIpayload, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function assignMultiTaskToUser(payload: MultiTaskAssignPayload) {
  try {
    const APIpayload ={
      task_id: payload.taskId,
      user_id: payload.userId
    }
    const response = await appClient.post(apiConfig.task.assignMultiple, APIpayload, {
      headers: {
        'Authorization': `Bearer ${payload.token}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function changeMultiPleTaskStatus(payload: MultiTaskChangeStatusPayload) {
  try {
    const APIpayload ={
      task_id: payload.taskId,
      task_status: payload.status
    }
    const response = await appClient.post(apiConfig.task.multiPleTaskStatus, APIpayload, {
      headers: {
        'Authorization': `Bearer ${payload.token}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function taskCorrectionRequest(
  token: string,
  page: number,
  size: number,
  start_time?: string,
  end_time?:string,
  user_id?:string,
  status?:string,
  queryFilter?:string
) {
  try {
    const payload = { size: size,page:page,  from_date: start_time, to_date: end_time, user_id: user_id, queryFilter:status}
    const response = await appClient.post(apiConfig.task.taskCorrectionRequest, removeTokenFieldFromPayload(payload),{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}




export async function editTask(userToken: string, id: number, payload: TaskPayload) {
  try {
    const response = await appClient.post(apiConfig.task.update + "/" + id, payload, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function editCheckListItem(payload: editCheckListenerPayload) {
  try {
    const APIPayload = {
      task_id: payload.taskId,
      name: payload.name
    }
    const response = await appClient.post(apiConfig.task.editCheckListItem + "/" + payload.checkListId, APIPayload, {
      headers: {
        'Authorization': `Bearer ${payload.token}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export const fetchSearchTasks = async (payload: IFilterTaskPayload) => {
  const {
    page, limit, projectId, query, assignUser, endDate, isTaskBillable, status, taskType, parentTask
  } = payload
  const APIpayload = {
    page,
    size: limit || 10,
    project_id: projectId,
    parent_id: parentTask,
    queryFilter: query,
    assigned_user: assignUser,
    end_date: endDate,
    is_task_billable: isTaskBillable,
    task_status: status,
    task_type: taskType,
  }
  try {
    const response = await appClient.post(apiConfig.task.list, APIpayload, {
      headers: {
        'Authorization': `Bearer ${payload.token}`
      }
    })
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
};

export async function getIndividualTask(userToken: string, id: number) {
  try {
    const response = await appClient.get(apiConfig.task.individual + "/" + id, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function getSingleDateEntry(payload: SingleDayTaskEntryPayload) {
  try {
    const response = await appClient.post(apiConfig.task.singleDayEntry ,removeTokenFieldFromPayload(payload), {
      headers: {
        'Authorization': `Bearer ${payload.token}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function deleteCheckList(userToken: string, id: number, checkListId: number) {
  try {
    const payload = {
      task_id: id
    }

    const response = await appClient.post(apiConfig.task.deleteCheckList + "/" + checkListId, payload, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

