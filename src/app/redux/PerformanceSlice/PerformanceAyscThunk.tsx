import { createAsyncThunk } from '@reduxjs/toolkit'
import { IRootState, store } from '../store'
import constant from 'config/const/const';
import { getAllPerformance } from 'services/PerformanceServices';


export interface IFilterPerformancePayload {
  selectProject: number
  page: number
  endDate?: string
  token: string
  query?: string
  selectClient?: string
  selectUser?: string
  projectType?: string
  projectStatus?: string
  isBillable?:string
}


export const getAllPerformanceActions = createAsyncThunk(
  'performance/getAllPerformance',
  async (payload:
    IFilterPerformancePayload, { dispatch, getState }) => {
    try {
      const { PerformanceStateData } = getState() as IRootState
      const { limit } = PerformanceStateData
      const response = await getAllPerformance(payload.token,payload.page )
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

