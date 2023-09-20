import {createAsyncThunk} from '@reduxjs/toolkit'
import { getAllProjects } from 'services/ProjectService'
import { IRootState } from '../store'
import constant from 'config/const/const'

interface IGetProjectListPayLoad {
  page: number,
  token:string 
}

export const getAllProjectsAction = createAsyncThunk(
  'myProjects/getAllMyProjects',
  async (payload:
    IGetProjectListPayLoad, { dispatch, getState }) => {
    try {
      const { MyProjectsStateData } = getState() as IRootState
      const { limit } = MyProjectsStateData;
      const response = await getAllProjects(payload.token,payload.page, "active", limit)
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