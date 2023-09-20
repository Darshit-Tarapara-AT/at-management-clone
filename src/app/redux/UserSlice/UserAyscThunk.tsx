import { createAsyncThunk } from '@reduxjs/toolkit'
import { addNewUser, editUser, fetchSearchUsers, getAllUsers, getFilterUsers, getIndividualUser, getUserDetails } from 'services/UserService'
import { AddUserPayLoad } from 'app/pages/Users/Components/Modal/Modal'
import { deleteUser } from 'services/UserService'
import { SearchQueryPayload } from 'app/Modal/Modal'
import { UserActions } from './UserSlice'
import constant from 'config/const/const'
export interface GetUserListPayload {
  page: number,
  token: string 
  size?: number
  role?: string
  status?: string
  query?: string
}
export interface filterUserPayload {
  page: number,
  role: string
  query: string
  limit: number
  token: string
  status: string
}

export const getAllUsersAction = createAsyncThunk(
  'users/getAllUsers',
  async (payload:GetUserListPayload, { dispatch, getState }) => {
    try {
      const response = await getAllUsers(payload.token,payload.page, payload.size, payload.role, payload.status, payload.query);
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

export const addUserAction = createAsyncThunk('users/addUsers', async (payload: {token:string, items:AddUserPayLoad} ) => {
  try {
    const response = await addNewUser(payload.token, payload.items)
    return { status: response?.data?.status, message: response?.data?.message }
  } catch (error) {
    return error
  }
})

export const deleteUserAction = createAsyncThunk(
  'users/deleteUser',
  async (payload: {id: number,  token: string}, { dispatch }) => {
    try {
      const response = await deleteUser(payload.token, payload.id)
      if (response?.data?.status) {
        dispatch(getAllUsersAction({token: payload.token, page: constant.page.defaultNumber,size: constant.page.size }))
      }
      return response?.data?.status
    } catch (error) {
      return error
    }
  }
)

export const editUserAction = createAsyncThunk(
  'users/editUser',
  async (payload:{token: string, items: AddUserPayLoad, id : number} , { dispatch }) => {
    try {
      const response = await editUser(payload.token, payload.id, payload.items)
      return { status: response?.data?.status, message: response?.data?.message }
    } catch (error) {
      return error
    }
  }
)
export const getIndividualUserAction = createAsyncThunk(
  'users/getSingleUser',
  async (payload: {token: string, id: number}, { dispatch }) => {
    try {
      dispatch(UserActions.setLoadingState(true))
      const response = await getIndividualUser(payload.token, payload.id)
      dispatch(UserActions.setLoadingState(false))
      if (response?.data?.status) {
       return response?.data?.data
      }
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)

export const getSearchUsersList = createAsyncThunk(
  'users/searchUsers',
  async (payload: SearchQueryPayload, { dispatch }) => {
    try {
      const response = await fetchSearchUsers(payload.token, payload.query?.replaceAll(' ', '')?.toLowerCase(),payload.role ||'' ,payload.status ||'', payload.page)
      if (response?.data?.status) {
       return response?.data?.data
      }
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)

export const getUserProfileActions = createAsyncThunk('users/getUserProfile', async (payload: string) => {
  try {
    const response = await getUserDetails(payload)
    if (response?.status === constant.APIResponse.defaultStratusCode) {
      return {
        userInfo: response?.data?.data?.userInfo,
        isUserReadPolicy: response?.data?.data?.show_policy_popup,
      }
    }
    else if (response?.status === constant.APIResponse.errorStatusCode) {
      return response?.data?.message
    }
  } catch (error) {
    return error
  }
})

export const getUserFilterAction= createAsyncThunk('users/filterUser', async (payload: filterUserPayload) => {
  try {
    const response = await getFilterUsers(payload.token,payload.page,payload.query, payload.role, payload.limit,payload.status)
    if (response?.status === constant.APIResponse.defaultStratusCode) {
      return response?.data?.data
    } else if (response?.status === constant.APIResponse.errorStatusCode) {
      return response?.data?.message
    }
  } catch (error) {
    return error
}})