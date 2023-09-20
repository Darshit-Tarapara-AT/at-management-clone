import { createAsyncThunk } from '@reduxjs/toolkit'
import constant from 'config/const/const';
import { getAllOnlineUser, getAllLastOfflineUsers, getAllRecentTasks, getAllTodayOnLeave, getAllUpcomingBirthday, getAllUpcomingWorkAnniversary } from 'services/DashboardServices';


export const getRecentTasksAction = createAsyncThunk('dashboard/RecentTasks', async (payload: {token:string}) => {
  try {
    const response = await getAllRecentTasks(payload.token);
    if (response?.status === constant.APIResponse.defaultStratusCode) {
      return {
        status : response?.status,
        data : response?.data?.data
      }
    }
    else if (response?.status === constant.APIResponse.errorStatusCode) {
      return response?.data?.message
    }
    else {
      return response?.data?.message
    }
  } catch (error) {
    return error
  }
})

export const getUpcomingBirthdayAction = createAsyncThunk('dashboard/UpcomingBirthday', async (payload: {token:string}) => {
  try {
    const response = await getAllUpcomingBirthday(payload.token);
    if (response?.status === constant.APIResponse.defaultStratusCode) {
      return {
        status : response?.status,
        data : response?.data?.data
      }
    }
    else if (response?.status === constant.APIResponse.errorStatusCode) {
      return response?.data?.message
    }
    else {
      return response?.data?.message
    }
  } catch (error) {
    return error
  }
})

export const getUpcomingWorkAnniversaryAction = createAsyncThunk('dashboard/UpcomingWorkAnniversary', async (payload: {token:string}) => {
  try {
    const response = await getAllUpcomingWorkAnniversary(payload.token);
    if (response?.status === constant.APIResponse.defaultStratusCode) {
      return {
        status : response?.status,
        data : response?.data?.data
      }
    }
    else if (response?.status === constant.APIResponse.errorStatusCode) {
      return response?.data?.message
    }
    else {
      return response?.data?.message
    }
  } catch (error) {
    return error
  }
})

export const getTodayOnLeaveAction = createAsyncThunk('dashboard/TodayOnLeave', async (payload: {token:string}) => {
  try {
    const response = await getAllTodayOnLeave(payload.token);
    if (response?.status === constant.APIResponse.defaultStratusCode) {
      return {
        status : response?.status,
        data : response?.data?.data
      }
    }
    else if (response?.status === constant.APIResponse.errorStatusCode) {
      return response?.data?.message
    }
    else {
      return response?.data?.message
    }
  } catch (error) {
    return error
  }
})

export const getLastOfflineUsersAction = createAsyncThunk('dashboard/LastOfflineUsers', async (payload: {token:string}) => {
  try {
    const response = await getAllLastOfflineUsers(payload.token);
    if (response?.status === constant.APIResponse.defaultStratusCode) {
      return {
        status : response?.status,
        data : response?.data?.data
      }
    }
    else if (response?.status === constant.APIResponse.errorStatusCode) {
      return response?.data?.message
    }
    else {
      return response?.data?.message
    }
  } catch (error) {
    return error
  }
})

export const getAllOnlineUserAction = createAsyncThunk('dashboard/AllOnlineUser', async (payload: {token:string}) => {
  try {
    const response = await getAllOnlineUser(payload.token);
    if (response?.status === constant.APIResponse.defaultStratusCode) {
      return {
        status : response?.status,
        data : response?.data?.data
      }
    }
    else if (response?.status === constant.APIResponse.errorStatusCode) {
      return response?.data?.message
    }
    else {
      return response?.data?.message
    }
  } catch (error) {
    return error
  }
})