import { createAsyncThunk } from '@reduxjs/toolkit'
import { IRootState } from '../store'
import { Message } from 'app/utils/AlertMessage';
import { Strings } from 'app/resource/Strings';
import { addNewLead, deleteLead, editLead, fetchSearchLeads, getAllLeads, getIndividualLead } from 'services/LeadService'
import { LeadFormValues } from 'app/pages/Lead/Components/Modal/Modal'
import { LeadInformation } from './LeadTypes';
import constant from 'config/const/const';
interface IGetLeadListPayLoad {
  page: number,
  token: string,
  query: string
  size?: number
  addedBy?: string
  status?: string
}
interface IAddLeadPayLoad {
  token: string,
  items : LeadInformation
}

export interface deletePayload {
  token: string
  id: number
}
export const getAllLeadsAction = createAsyncThunk(
  'leads/getAllLeadsAction',
  async (payload:
    IGetLeadListPayLoad, { dispatch, getState }) => {
    try {
      const { LeadStateData } = getState() as IRootState
      const { limit } = LeadStateData
      const response = await getAllLeads(payload.token,payload.page,payload.query ||"", payload.size|| limit)
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

export const addLeadAction = createAsyncThunk('leads/addLead', async (payload: IAddLeadPayLoad ) => {
  try {
    const response = await addNewLead(payload.token, payload.items)
    if(response.status === 500){ 
      Message(Strings.emailAlreadyExists, 'error', '');
      return 
    }
    return { status: response?.data?.status, message: response?.data?.message }
  } catch (error) {
    return error
  }
})

export const deleteLeadAction = createAsyncThunk(
  'leads/deleteLead',
  async (payload: deletePayload, { dispatch }) => {
    try {
      const response = await deleteLead(payload.token, payload.id)
      if (response?.data?.status) {
        dispatch(getAllLeadsAction({
          token: payload.token, page: constant.page.defaultNumber,
          query: ''
        }))
      }
      return response?.data?.status
    } catch (error) {
      return error
    }
  }
)

export const editLeadAction = createAsyncThunk(
  'leads/editLead',
  async (payload:{token:string, items:LeadFormValues, id : number} , { dispatch }) => {
    try {
      const response = await editLead(payload.token, payload.id, payload.items)
      return { status: response?.data?.status, message: response?.data?.message }
    } catch (error) {
      return error
    }
  }
)

export const getSearchLeadAction = createAsyncThunk(
  'leads/searchLeads',
  async (payload: IGetLeadListPayLoad, { dispatch }) => {
    try {
      const response = await fetchSearchLeads(payload.token, payload.query, payload.size|| constant.page.size, payload.addedBy, payload.status)
      if (response?.data?.status) {
       return response?.data?.data
      }
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)

export const getIndividualLeadAction= createAsyncThunk(
  'leads/getIndividualLead',
  async (payload: {token:string, id:number}, { dispatch }) => {
    try {
      const response = await getIndividualLead(payload.token, payload.id)
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)