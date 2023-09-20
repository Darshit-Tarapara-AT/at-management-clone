import { createAsyncThunk } from '@reduxjs/toolkit'
import { IRootState, store } from '../store'
import { MultiTaskAssignPayload, MultiTaskChangeStatusPayload, StartStopTaskTrackerPayload, addNewTask, assignMultiTaskToUser, changeMultiPleTaskStatus, deleteMultiPleTask, deleteTask, editTask, fetchSearchTasks, getAllTasks, getIndividualTask, startAndStopTaskService, updateTaskCheckList, CheckListPayload, addNewCheckList, addCheckListenerPayload, editCheckListenerPayload, editCheckListItem, deleteCheckList, deleteCheckListenerPayload, SingleDayTaskEntryPayload, getSingleDateEntry, dailyTaskSlackNotification, taskCorrectionRequest, deleteMultiPleTaskCorrection, AddTaskCorrectionPayload, addNewTaskEntryCorrection, TaskCorrectionListPayload, EditTaskCorrectionPayload, updateTaskEntryCorrection, TaskCorrectionStatusUpdatePayload, updateTaskEntryCorrectionStatus } from '../../../services/TaskService';
import {  TaskPayload } from 'app/pages/Tasks/Components/Modal/Modal';
import { deletePayload } from '../RoleSlice/RoleAyscThunk';
import constant from 'config/const/const';
import { getIndividualUProjectAction } from '../ProjectSlice/ProjectAyscThunk';


interface IGetLeadListPayLoad {
  page: number,
  token: string
  projectId: string
  size?: number
}
export interface IAddTaskPayLoad {
  token: string,
  id?: number,
  items: TaskPayload
}
export interface IFilterTaskPayload {
  page: number
  limit?: number
  projectId: number
  parentTask?: string
  endDate?: string
  token: string
  query?: string
  assignUser?: string
  isTaskBillable?: string
  status?: string
  taskType?: string
}

export const getAllTasksActions = createAsyncThunk(
  'tasks/getAllTask',
  async (payload:
    IGetLeadListPayLoad, { dispatch, getState }) => {
    try {
      const response = await getAllTasks(payload.token, payload.page,payload?.projectId, payload.size )
      if (response?.status === constant.APIResponse.defaultStratusCode) {
        return response?.data?.data
      } else if (response?.status === constant.APIResponse.errorStatusCode) {
        return response?.data?.message
      }
    } catch (error) {
      return error
    }
  }
)

export const addTaskCorrectionRequestAction = createAsyncThunk(
  'tasks/addTaskCorrectionRequest',
  async (payload:
    AddTaskCorrectionPayload, {dispatch, getState}) => {
    try {
      const response = await addNewTaskEntryCorrection(payload)
      if(response?.data?.status) {
        const currentDate = new Date(payload?.start_time);
       const {UserStateData} = store.getState();
        dispatch(getSingleTaskEntryAction({
          token: payload.token, page: 1,
          date: `${currentDate?.getDate()}`,
          month: `${currentDate?.getMonth() + 1}`,
          user_id:  UserStateData?.currentUserProfileDetails?.id,
          year: `${currentDate?.getFullYear()}`
        }))
      }
      return  {
        data: response?.data?.data,
        message: response?.data?.message,
        status: response?.data?.status
      }
    } catch (error) {
      return error
    }
  }
)

export const editTaskCorrectionRequestAction = createAsyncThunk(
  'tasks/editTaskCorrectionRequest',
  async (payload:
    EditTaskCorrectionPayload, {dispatch}) => {
    try {
      const response = await updateTaskEntryCorrection(payload)
      if (response?.status === constant.APIResponse.defaultStratusCode) {
        return response?.data?.data
      } else if (response?.status === constant.APIResponse.errorStatusCode) {
        return response?.data?.message
      }
    } catch (error) {
      return error
    }
  }
)

export const updateTaskCorrectionRequestStatusAction = createAsyncThunk(
  'tasks/updateTaskCorrectionRequestStatus',
  async (payload:
    TaskCorrectionStatusUpdatePayload, {dispatch}) => {
    try {
      const response = await updateTaskEntryCorrectionStatus(payload)
      if (response?.status === constant.APIResponse.defaultStratusCode) {
        return response?.data
      } else if (response?.status === constant.APIResponse.errorStatusCode) {
        return response?.data
      }
    } catch (error) {
      return error
    }
  }
)

export const startAndStopTaskAction = createAsyncThunk('tasks/changeMultiPleTaskStatus',
async (payload: StartStopTaskTrackerPayload) => {
  try {
    const response = await startAndStopTaskService(payload.token, payload)
      return  {
        status: response?.data?.status,
        message: response?.data?.message,
        data: response?.data?.data
    }
  } catch (error) {
    return error
  }
})

export const updateCheckListAction = createAsyncThunk('tasks/updateCheckListAction',
async (payload: CheckListPayload) => {
  try {
    const response = await updateTaskCheckList(payload)
      return  {
        status: response?.data?.status,
        message: response?.data?.message
    }
  } catch (error) {
    return error
  }
})

export const addCheckListAction = createAsyncThunk('tasks/addNewCheckListItem',
async (payload: addCheckListenerPayload) => {
  try {
    const response = await addNewCheckList(payload);
    if (response?.status === constant.APIResponse.defaultStratusCode) {
      return response?.data?.data?.taskchecklist
    } else if (response?.status === constant.APIResponse.errorStatusCode) {
      return response?.data?.message
    }
  } catch (error) {
    return error
  }
})

export const editCheckListItemAction = createAsyncThunk('tasks/editNewCheckListItem',
async (payload: editCheckListenerPayload) => {
  try {
    const response = await editCheckListItem(payload);
    if (response?.status === constant.APIResponse.defaultStratusCode) {
      return response?.data?.data?.taskchecklist
    } else if (response?.status === constant.APIResponse.errorStatusCode) {
      return response?.data?.message
    }
  } catch (error) {
    return error
  }
})

export const addTaskAction = createAsyncThunk('tasks/addTask', async (payload: IAddTaskPayLoad) => {
  try {
    const response = await addNewTask(payload.token, payload.items)
    return { status: response?.data?.status, message: response?.data?.message, id: response?.data?.data?.data?.[0]?.id }
  } catch (error) {
    return error
  }
})


export const assignMultipleTaskToUserAction = createAsyncThunk('tasks/assignMultipleUser',
async (payload: MultiTaskAssignPayload) => {
  try {
    const response = await assignMultiTaskToUser(payload)
      return  {
        status: response?.data?.status,
        message: response?.data?.message
    }
  } catch (error) {
    return error
  }
})

export const changeMultipleTaskStatusAction = createAsyncThunk('tasks/changeMultiPleTaskStatus',
async (payload: MultiTaskChangeStatusPayload) => {
  try {
    const response = await changeMultiPleTaskStatus(payload)
      return  {
        status: response?.data?.status,
        message: response?.data?.message
    }
  } catch (error) {
    return error
  }
})

export const dailyTaskSlackNotificationAction = createAsyncThunk('tasks/dailyTaskSlackNotification',
async (userToken:string , { dispatch }) => {
  try {
    const response = await dailyTaskSlackNotification(userToken)
    return  response?.data?.status
    
  } catch (error) {
    return error
  }
})


export const editTaskAction = createAsyncThunk(
  'tasks/editTasks',
  async (payload: IAddTaskPayLoad, { dispatch }) => {
    const id = payload.id || 0;
    try {
      const response = await editTask(payload.token, id, payload.items)
      return { status: response?.data?.status, message: response?.data?.message }
    } catch (error) {
      return error
    }
  }
)

export const getSearchTaskAction = createAsyncThunk(
  'tasks/searchTasks',
  async (payload: IFilterTaskPayload, { dispatch }) => {
    try {
      const response = await fetchSearchTasks(payload)
      if (response?.status === constant.APIResponse.defaultStratusCode) {
        return response?.data?.data
      } else if (response?.status === constant.APIResponse.errorStatusCode) {
        return response?.data?.message
      }
    } catch (error) {
      return error
    }
  }
)


export const getSearchTaskCorrectionAction = createAsyncThunk(
  'tasks/searchTasks',
  async (payload: IFilterTaskPayload, { dispatch }) => {
    try {
      const response = await fetchSearchTasks(payload)
      if (response?.status === constant.APIResponse.defaultStratusCode) {
        return response?.data?.data
      } else if (response?.status === constant.APIResponse.errorStatusCode) {
        return response?.data?.message
      }
    } catch (error) {
      return error
    }
  }
)

export const getSingleTaskEntryAction = createAsyncThunk(
  'tasks/getSingleDayTaskEntry',
  async (payload: SingleDayTaskEntryPayload, { dispatch }) => {
    try {
      const response = await getSingleDateEntry(payload);
      if (response?.status === constant.APIResponse.defaultStratusCode) {
        return response?.data?.data
      } else if (response?.status === constant.APIResponse.errorStatusCode) {
        return response?.data?.message
      }
    } catch (error) {
      return error
    }
  }
)

export const taskCorrectionRequestAction = createAsyncThunk(
  'tasks/taskCorrectionRequest',
  async (
    payload: { token: string; page: number; size?:number; toDate:string, fromDate: string,  userId: string, status:string, queryFilter:string} ,
    { getState }
    ) => {
    try {
      const {TaskStateData} = getState() as IRootState
      const {limit} = TaskStateData
      const response = await taskCorrectionRequest(
        payload.token,
        payload.page,
        payload.size || limit,
        payload.fromDate,
        payload.toDate,
        payload.userId ,
        payload.status,
        payload.queryFilter,
        );
        if (response?.status === constant.APIResponse.defaultStratusCode) {
          return response?.data?.data
        } else if (response?.status === constant.APIResponse.errorStatusCode) {
        return response?.data?.message
      }

    } catch (error) {
      return error
    }
  }
)

export const deleteMultipleTaskCorrectionAction = createAsyncThunk(
  'tasks/deleteMultipleTaskCorrection',
  async (payload: {token: string, task_correction_request_id: any}, { dispatch }) => {
    try {
      const response = await deleteMultiPleTaskCorrection(payload.token, payload.task_correction_request_id)
      if (response?.data?.status) {
        dispatch(taskCorrectionRequestAction({
          token: payload.token,
          page: constant.page.defaultNumber,
          toDate: '',
          fromDate: '',
          userId: '',
          status: '',
          queryFilter: ''
        }))
      }
      return response?.data?.status
    } catch (error) {
      return error
    }
  }
)

export const deleteTaskAction = createAsyncThunk(
  'tasks/deleteTask',
  async (payload: deletePayload, { dispatch }) => {
    try {
      const { ProjectStateData } = store.getState() as IRootState
      const { currentProjectId } = ProjectStateData
      const response = await deleteTask(payload.token, payload.id)
      if (response?.data?.status) {
        dispatch(getAllTasksActions({ token: payload.token, page: constant.page.defaultNumber,projectId:currentProjectId?.toString(),}));
        dispatch(getIndividualUProjectAction({ token: payload.token, id: Number(currentProjectId) }))
      }
      return response?.data?.status
    } catch (error) {
      return error
    }
  }
)

export const deleteMultipleTaskAction = createAsyncThunk(
  'tasks/deleteMultiTask',
  async (payload: {token: string, taskId: string}, { dispatch }) => {
    try {
      const { ProjectStateData } = store.getState() as IRootState
      const { currentProjectId } = ProjectStateData
      const response = await deleteMultiPleTask(payload.token, payload.taskId)
      if (response?.data?.status) {
        dispatch(getAllTasksActions({ token: payload.token, page: constant.page.defaultNumber,projectId:currentProjectId?.toString(),}))
      }
      return response?.data?.status
    } catch (error) {
      return error
    }
  }
)

export const getIndividualTaskAction = createAsyncThunk(
  'tasks/getSingleTask',
  async (payload: {token: string, id: number}, { dispatch }) => {
    try {
      const response = await getIndividualTask(payload.token, payload.id)
      if (response?.data?.status) {
       return {
        data: response?.data?.data,
        status: response?.data?.status
       }
      }
      return response?.data?.data?.data
    } catch (error) {
      return error
    }
  }
)


export const deleteCheckListItemAction = createAsyncThunk('tasks/updateCheckListAction',
async (payload: deleteCheckListenerPayload) => {
  try {
    const response = await deleteCheckList(payload.token, payload.taskId, payload.checkListId);
    if (response?.status === constant.APIResponse.defaultStratusCode) {
      return response?.data?.data?.taskchecklist
    } else if (response?.status === constant.APIResponse.errorStatusCode) {
      return response?.data?.message
    }
  } catch (error) {
    return error
  }
})