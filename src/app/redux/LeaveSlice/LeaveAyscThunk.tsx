import { createAsyncThunk } from '@reduxjs/toolkit'
import { IRootState } from '../store'
import { UserLeaveCalendarPayload, addNewLeave, deleteLeave, editLeave, fetchSearchLeave, getAllLeave, getFilterListLeave, getIndividualLeave, getUserLeave, getUserLeaveCalendarData } from 'services/LeaveService'
import constant from 'config/const/const'

export interface GetLeaveListPayload {
  page: number,
  token: string 
  statusFilter?: string
  size?: number
  information_type?: string
  userFilter?: string
  start_date?: string
  end_date?: string
}

export interface addLeavePayload {
  token: string
  start_date: string
  id?: number
  end_date: string
  comment?: string
  information_type: string
  status: string
  reason: string
  joining_date: string
}

interface SearchLeavePayload extends GetLeaveListPayload {
  query: string
  size?: number
  start_date: string
  end_date: string
  type: string
  employee: string
}

export const getAllLeavesAction = createAsyncThunk(
  'leave/getAllLeaveAction',
  async (payload:  GetLeaveListPayload, {dispatch, getState}) => {
    try {
      const { leaveStateData } = getState() as IRootState
      const { limit } = leaveStateData
      const response = await getAllLeave(payload.token,payload.page,  limit)
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

export const addLeaveAction = createAsyncThunk(
  'leave/list/master',
  async (payload: addLeavePayload) => {
    try {
      const response = await addNewLeave(payload.token, payload)
      return response?.data
    } catch (error) {
      return error
    }
  }
)

export const getUserLeaveCalendarDataAction = createAsyncThunk('leave/getLeaveCalendarData',
async (payload: UserLeaveCalendarPayload) => {
  try {
    const response = await getUserLeaveCalendarData(payload)
    if (response?.status === constant.APIResponse.defaultStratusCode) {
      return response?.data?.data
    } else if (response?.status === constant.APIResponse.errorStatusCode) {
      return response?.data?.message
    }
  } catch (error) {
    return error
  }
})

export const editLeaveAction = createAsyncThunk(
  'leave/edit/master',
  async (payload: addLeavePayload) => {
    try {
      const response = await editLeave(payload.token, payload)
      return response?.data
    } catch (error) {
      return error
    }
  }
)

export const deleteLeaveAction = createAsyncThunk(
  'leave/deleteLeave',
  async (payload: {id: number; token: string}, {dispatch}) => {
    try {
      const response = await deleteLeave(payload.token, payload.id)
      if (response?.data?.status) {
        dispatch(getAllLeavesAction({token: payload.token, page: constant.page.defaultNumber }))
      }
      return response?.data?.status
    } catch (error) {
      return error
    }
  }
)

export const getSearchLeaveAction = createAsyncThunk(
  'leave/searchleave',
  async (payload: SearchLeavePayload, {dispatch}) => {
    try {
      const response = await fetchSearchLeave(
        payload.token,
        payload.query,
        payload.page,
        payload.start_date,
        payload.end_date,
        payload?.type,
        payload.size
      )
      if (response?.data?.status) {
        return response?.data?.data
      }
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)

export const getIndividualLeaveAction = createAsyncThunk(
  'leave/getSingleLeave',
  async (payload: {token: string; id: number}, {dispatch}) => {
    try {
      const response = await getIndividualLeave(payload.token, payload.id)
      if (response?.data?.status) {
        return response?.data?.data
      }
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)

export const getUserLeaveActions = createAsyncThunk(
  'leave/getUserLeaves',
  async (payload: {token: string, page: number, size?: number}, { dispatch }) => {
    try {
      const response = await getUserLeave(payload.token, payload.page, payload.size)
      if (response?.data?.status) {
       return response?.data?.data
      }
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)

export const getFilterLeaveAction = createAsyncThunk(
  'policy/getSearchPolicy',
    async (payload: GetLeaveListPayload , { dispatch }) => {
      try {
        const response = await getFilterListLeave(payload)
        if (response?.data?.status) {
         return response?.data?.data
        }
        return response?.data?.data
      } catch (error) {
        return error
      }
    }
)

