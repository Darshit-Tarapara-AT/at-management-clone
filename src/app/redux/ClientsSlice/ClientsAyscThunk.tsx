import { createAsyncThunk } from '@reduxjs/toolkit'
import { IRootState } from '../store'
import { deleteClient, editClient, fetchSearchClients, getAllClients, getIndividualClient } from 'services/ClientService'
import constant from 'config/const/const'

interface GetClientListPayload {
  page: number,
  token:string 
  size?: number
}

interface SearchClientPayload extends GetClientListPayload{
 query: string
 size?: number
 addedBy: string
 position: string
 account: string
 status: string
}

export const getAllClientAction = createAsyncThunk(
  'clients/getAllClients',
  async (payload:GetClientListPayload, { dispatch, getState }) => {
    try {
      const { ClientStateData } = getState() as IRootState
      const { limit } = ClientStateData
      const response = await getAllClients(payload.token,payload.page, payload.size ||limit)
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

export const deleteClientAction = createAsyncThunk(
  'clients/deleteClient',
  async (payload: {id: number,  token:string}, { dispatch }) => {
    try {
      const response = await deleteClient(payload.token, payload.id)
      if (response?.data?.status) {
        dispatch(getAllClientAction({token: payload.token, page: constant.page.defaultNumber }))
      }
      return response?.data?.status
    } catch (error) {
      return error
    }
  }
)

export const editClientAction = createAsyncThunk(
  'clients/editClient',
  async (payload:{token:string, items: any, id : number} , { dispatch }) => {
    try {
      const response = await editClient(payload.token, payload.id, payload.items)
      return { status: response?.data?.status, message: response?.data?.message }
    } catch (error) {
      return error
    }
  }
)

export const getSearchClientsAction = createAsyncThunk(
  'clients/searchClients',
  async (payload: SearchClientPayload, { dispatch }) => {
    try {
      const response = await fetchSearchClients(payload.token, payload.query, payload.page, payload.addedBy, payload.position, payload.account, payload.size, payload.status)
      if (response?.data?.status) {
       return response?.data?.data
      }
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)

export const getIndividualClientAction = createAsyncThunk(
  'clients/getSingleClients',
  async (payload: {token: string, id: number}, { dispatch }) => {
    try {
      const response = await getIndividualClient(payload.token, payload.id)
      if (response?.data?.status) {
       return response?.data?.data
      }
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)
