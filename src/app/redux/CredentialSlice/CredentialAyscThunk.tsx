import {createAsyncThunk} from '@reduxjs/toolkit'
import constant from 'config/const/const'
import {
  addNewCredential,
  deleteCredential,
  getAllCredentials,
  fetchSearchCredentials,
  editCredential,
  getIndividualCredential,
} from 'services/CredentialService'
import { IRootState } from '../store'
import { formatSelectOptionId } from 'app/utils/helper'
export interface AddCredentialPayload {
  name: string
  id?: number
  client_ids: number[]
  role_ids: number[]
  token: string
  user_ids: number[]
  description: string
  project_ids: number[]
}

export interface EditCredentialPayload {
  name: string
  id: number
  client_ids: number[]
  role_ids: number[]
  token: string
  user_ids: number[]
  description: string
  project_ids: number[]
}


export interface deletePayload {
  token: string
  id: number
}

export interface SearchCredentialPayload {
  token: string
  page: number,
  query?: string,
  size: string,
  role: '',
  user: '',
  client: '',
}

export const getCredentials = createAsyncThunk(
  'credentials/getCredentials',
  async (
    payload: {token: string; page: number; size?: number; query?: string, role:any, client:string, user:any},
    {getState}
  ) => {
    try {
      const {credentialStateData} = getState() as IRootState
      const {limit} = credentialStateData
      const response = await getAllCredentials(
        payload.token,
        payload.page,
        payload.size || limit,
        payload.query || '',
        payload.role || '',
        payload.client || '',
        payload.user || ''
      )
      if (response?.status === 200) {
        return response?.data?.data
      } else if (response?.status === 401) {
        return response?.data?.message
      }
    } catch (error) {
      return error
    }
  }
)

export const addCredentialAction = createAsyncThunk(
  'credentials/addCredential',
  async (payload: AddCredentialPayload) => {
    try {
      const response = await addNewCredential(payload.token, payload)
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)

export const deleteCredentialAction = createAsyncThunk(
  'credentials/deleteCredential',
  async (payload: {id: number, token:string}, { dispatch }) => {
    try {
      const response = await deleteCredential(payload.token, payload.id)
      if (response?.data?.status) {
        dispatch(getCredentials({token: payload.token, page: constant.page.defaultNumber,role:"",client:"",user:"" }))
      }
      return response?.data?.status
    } catch (error) {
      return error
    }
  }
)

export const editCredentialAction = createAsyncThunk(
  'credentials/editCredential',
  async (payload: EditCredentialPayload) => {
    try {
      const response = await editCredential(payload.token,payload.id,payload)
      return { status: response?.data?.status, message: response?.data?.message }
    } catch (error) {
      return error
    }
  }
)


export const getIndividualCredentialAction = createAsyncThunk(
  'credentials/getIndividualCredentialAction',
  async (payload: {token: string; id: number}, {dispatch}) => {
    try {
      const response = await getIndividualCredential(payload.token, payload.id)
      if (response?.data?.status) {
        return response?.data?.data
      }
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)

export const getSearchCredentialsList = createAsyncThunk(
  'credentials/searchCredentials',
  async (payload: SearchCredentialPayload, {dispatch}) => {
    try {
      const response = await fetchSearchCredentials(
        payload.token,
        payload.query ||'',
        payload.page,
        payload.role || '',
        payload.user || '',
        payload.client || '',
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
