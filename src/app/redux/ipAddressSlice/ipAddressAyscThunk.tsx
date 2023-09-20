import { createAsyncThunk } from '@reduxjs/toolkit'
import { addIpAddressActionParams, editIpAddressActionParams } from './ipAddressTypes'
import { addNewIpAddress, deleteIPAddress, editIpAddress, fetchSearchIPAddress, getAllIPAddress, getCurrentIPAddress, getIndividualIpAddress } from 'services/iPService'
import { IRootState } from '../store'
import { ipActions } from './ipAddressSlice'
import constant from 'config/const/const'

interface deleteRolePayload {
  token: string
  id: number
}

export const addIpAddressAction = createAsyncThunk('ip/addIpAddress', async (payload: addIpAddressActionParams) => {
  try {
    const response = await addNewIpAddress(payload.token,payload.ip_address, payload.name)
    return {
      message: response?.data?.message,
      status: response?.data?.status,
      data: response?.data?.data
    }
  } catch (error) {
    return error
  }
})

export const editIpAddressAction = createAsyncThunk('ip/editIpAddress', async (payload: editIpAddressActionParams) => {
  try {
    const response = await editIpAddress(payload.token,payload.id,payload.ip_address, payload.name)
    return {
      message: response?.data?.message,
      status: response?.data?.status,
      data: response?.data?.data
    }
  } catch (error) {
    return error
  }
})

export const getIndividualIpAction = createAsyncThunk(
  'ip/getSingleIp',
  async (payload: {token:string, id:number}, { dispatch }) => {
    try {
      const response = await getIndividualIpAddress(payload.token, payload.id)
      if (response?.data?.status) {
       return response?.data?.data
      }
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)

export const getIPAddress = createAsyncThunk(
  'ip/getAllIpAddress',
  async (payload: {page: number; token: string; size?: number; query?: string}, {getState}) => {
    try {
      const {IpAddressStateData} = getState() as IRootState
      const {limit} = IpAddressStateData
      const response = await getAllIPAddress(
        payload.token,
        payload.page,
        payload.size || limit,
        payload.query || ''
      )
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

export const getSearchIPAddressList = createAsyncThunk(
  'ip/searchIpAddress',
  async (payload: {token: string; query: string; page: number; limit: number}, {dispatch}) => {
    try {
      const response = await fetchSearchIPAddress(
        payload.token,
        payload.query,
        payload.page,
        payload.limit
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

export const deleteIPAddressAction = createAsyncThunk(
  'ip/deleteIpAddress',
  async (payload: deleteRolePayload, {dispatch}) => {
    try {
      const response = await deleteIPAddress(payload.token, payload.id)
      if (response?.data?.status) {
        dispatch(getIPAddress({token: payload.token, page: constant.page.defaultNumber}))
      }
      return response?.data?.status
    } catch (error) {
      return error
    }
  }
)

export const getCurrentUserIPAddress = createAsyncThunk(
  "ip/currentIp" ,
  async (payload:"", {dispatch}) => {
    try {
      const response = await getCurrentIPAddress();
      dispatch(ipActions.updateIpAddress(response?.data?.ipString))
      return response?.data?.status
    } catch (error) {
      return error
    }
  }
)
