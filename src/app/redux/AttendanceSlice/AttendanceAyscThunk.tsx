import { createAsyncThunk } from '@reduxjs/toolkit'
import { IRootState, store } from '../store'
import { MultiTaskAssignPayload, MultiTaskChangeStatusPayload, addNewTask, assignMultiTaskToUser, changeMultiPleTaskStatus, deleteTask, editTask, fetchSearchTasks, getAllTasks, getIndividualTask, updateTaskCheckList, CheckListPayload, addNewCheckList, addCheckListenerPayload, editCheckListenerPayload, editCheckListItem, deleteCheckList, deleteCheckListenerPayload } from '../../../services/TaskService';
import { TaskPayload } from 'app/pages/Tasks/Components/Modal/Modal';
import { deletePayload } from '../RoleSlice/RoleAyscThunk';
import constant from 'config/const/const';
import { HolidayListPayload, UserCalendarPayload, editHoliday, getIndividualHoliday, addHoliday, deleteMultiPleHoliday, getAllHolidayList, getUserCalendarData, UserCalendarListPayload, getUserCalendarList } from 'services/Attendance';


interface IGetAttendanceListPayLoad {
  page: number,
  token: string
  projectId: string
  size?: number
}
export interface IAddAttendancePayLoad {
  token: string,
  id?: number,
  items: TaskPayload
}

export interface EditHolidayPayload{
  name: string
  id:number
  token: string
  holiday_date:string
  description:string
}
export interface IFilterAttendancePayload {
  page: number
  limit?: number
  projectId: number
  endDate?: string
  token: string
  query?: string
  assignUser?: string
  isTaskBillable?: string
  status?: string
  taskType?: string
}

export interface EditHolidayPayload extends AddHolidayPayload{
  id:number
 
}
export interface AddHolidayPayload {
  name: string
  token: string
  holiday_date:string
  description:string
}



export const getAllTasksActions = createAsyncThunk(
  'tasks/getAllTask',
  async (payload:
    IGetAttendanceListPayLoad, { dispatch, getState }) => {
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

export const addHolidayAction = createAsyncThunk(
  'holiday/addHoliday',
  async (payload: AddHolidayPayload) => {
    try {
      const response = await addHoliday(payload.token,payload)
      return { status: response?.data?.status, message: response?.data?.message }
    } catch (error) {
      return error
    }
  }
)

export const getUserAttendanceCalendarDataAction = createAsyncThunk('attendance/getAttendanceDetails',
async (payload: UserCalendarPayload) => {
  try {
    const response = await getUserCalendarData(payload)
    if (response?.status === constant.APIResponse.defaultStratusCode) {
      return response?.data?.data
    } else if (response?.status === constant.APIResponse.errorStatusCode) {
      return response?.data?.message
    }
  } catch (error) {
    return error
  }
})


export const getUserAttendanceCalendarListAction = createAsyncThunk('attendance/getAttendanceDetailsList',
async (payload: UserCalendarListPayload) => {
  try {
    const response = await getUserCalendarList(payload)
    if (response?.status === constant.APIResponse.defaultStratusCode) {
      return response?.data?.data
    } else if (response?.status === constant.APIResponse.errorStatusCode) {
      return response?.data?.message
    }

  } catch (error) {
    return error
  }
})


export const deleteMultipleHolidayAction = createAsyncThunk(
  'attendance/deleteMultiHoliday',
  async (payload: {token: string, holidayId: string}, { dispatch }) => {
    try {

      const response = await deleteMultiPleHoliday(payload.token, payload.holidayId)
      if (response?.data?.status) {
        dispatch(getAllHolidayListAction({ token: payload.token, page: constant.page.defaultNumber, size: constant.page.size}))
      }
      return response?.data?.status
    } catch (error) {
      return error
    }
  }
)

export const getAllHolidayListAction = createAsyncThunk('attendance/getAllHolidayListAction',
async (payload: HolidayListPayload) => {
  try {
    const response = await getAllHolidayList(payload)
    if (response?.status === constant.APIResponse.defaultStratusCode) {
      return response?.data?.data
    } else if (response?.status === constant.APIResponse.errorStatusCode) {
      return response?.data?.message
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

export const addTaskAction = createAsyncThunk('tasks/addTask', async (payload: IAddAttendancePayLoad) => {
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

export const editTaskAction = createAsyncThunk(
  'tasks/editTasks',
  async (payload: IAddAttendancePayLoad, { dispatch }) => {
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
  async (payload: IFilterAttendancePayload, { dispatch }) => {
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

export const deleteTaskAction = createAsyncThunk(
  'tasks/deleteTask',
  async (payload: deletePayload, { dispatch }) => {
    try {
      const { ProjectStateData } = store.getState() as IRootState
      const { currentProjectId } = ProjectStateData
      const response = await deleteTask(payload.token, payload.id)
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


export const getIndividualHolidayAction = createAsyncThunk(
  'tasks/getSingleTask',
  async (payload: {token: string, id: number}, { dispatch }) => {
    try {
      const response = await getIndividualHoliday(payload.token, payload.id)
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

export const editHolidayAction = createAsyncThunk(
  'holiday/editHoliday',
  async (payload: EditHolidayPayload) => {
    try {
      const response = await editHoliday(payload.token,payload.id,payload)
      return { status: response?.data?.status, message: response?.data?.message }
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