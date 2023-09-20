import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllPolicyLogs, getIndividualPolicyLog } from 'services/PolicyHistoryService';
import { IRootState } from '../store';
import constant from 'config/const/const';

export const getPolicyLogs = createAsyncThunk(
  'policyHistory/getPolicyLogs',
  async (payload: { page: number; token: string,role?:string, size?:number, status?:string  }, {  getState }) => {
    try {
      const { PolicyHistoryStateData } = getState() as IRootState
      const { limit } = PolicyHistoryStateData
    
      const response = await getAllPolicyLogs(payload.token, payload.page, payload.role || "", payload.size || limit)
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

export const getIndividualPolicyLogsAction = createAsyncThunk(
  'policyHistory/ getIndividualPolicyLogsAction ',
  async (payload: {token:string,page:number,id:number, size?:number }, {  getState }) => {
    try {
      const response = await getIndividualPolicyLog(payload.token,payload.page, payload.id, payload.size || constant.page.size)
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

