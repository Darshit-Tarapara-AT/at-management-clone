import { createAsyncThunk } from '@reduxjs/toolkit'
import { IRootState, store } from '../store'
import { Message } from 'app/utils/AlertMessage';
import { Strings } from 'app/resource/Strings';
import { addNewProject, deleteProject, editProject, fetchSearchProject, getAllProjects, getIndividualProject, getProjectParentTask } from 'services/ProjectService'
import { addProjectActionPayload, editProjectActionPayload } from './ProjectTypes';
import constant from 'config/const/const';
interface GetProjectsPayload {
  page: number,
  token:string
  userId?: number| string
  status: string
  limit?: number
}

export interface SearchProjectQueryPayload  extends GetProjectsPayload {
  query: string
  clientTypeFilter: string
  billingTypeFilter: string
}
export const getAllProjectsAction = createAsyncThunk(
  'projects/getAllProjects',
  async (payload:GetProjectsPayload, { dispatch, getState }) => {

    try {
      const { ProjectStateData } = getState() as IRootState
      const { limit } = ProjectStateData
      const response = await getAllProjects(payload.token,payload.page, payload.status || "",  payload.userId!,payload.limit || limit)
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

export const getAllProjectsParentTaskAction = createAsyncThunk(
  'projects/getAllProjectParentTask',
  async (payload: {id: number, token: string}, { dispatch, getState }) => {
    try {
      const response = await getProjectParentTask(payload.token,payload.id)
      if (response?.status === constant.APIResponse.defaultStratusCode) {
        return response?.data?.data?.maintasks
      } else if (response?.status === constant.APIResponse.errorStatusCode) {
        return response?.data?.message
      }
    } catch (error) {
      return error
    }
  }
)

export const addProjectAction = createAsyncThunk('projects/addProject', async (payload: {token:string, items:addProjectActionPayload} ) => {
  try {
    const response = await addNewProject(payload.token, payload.items)
    if(response.status === 500){
      Message(Strings.emailAlreadyExists, 'error', '');
      return 
    }
    return { status: response?.data?.status, message: response?.data?.message }
  } catch (error) {
    return error
  }
})

export const deleteProjectAction = createAsyncThunk(
  'projects/deleteProject',
  async (payload: {id: number,  token:string}, { dispatch, getState }) => {
    try {
      const response = await deleteProject(payload.token, payload.id)
      if (response?.data?.status) {
        const { UserStateData, ProjectStateData } = getState() as IRootState
        const { currentUserProfileDetails } = UserStateData
        const userId = currentUserProfileDetails?.id
        dispatch(getAllProjectsAction({token: payload.token, page: constant.page.defaultNumber,status: ProjectStateData?.status, userId }))
      }
      return response?.data?.status
    } catch (error) {
      return error
    }
  }
)

export const editProjectAction = createAsyncThunk(
  'projects/editProject',
  async (payload:{token:string, items: editProjectActionPayload, id : number} , { dispatch }) => {
    try {
      const response = await editProject(payload.token, payload.id, payload.items)
      return { status: response?.data?.status, message: response?.data?.message }
    } catch (error) {
      return error
    }
  }
)

export const getSearchProjectsAction = createAsyncThunk(
  'projects/searchProjects',
  async (payload: SearchProjectQueryPayload, { dispatch }) => {
    try {
      const response = await fetchSearchProject(payload)
      if (response?.data?.status) {
       return response?.data?.data
      }
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
);

export const getIndividualUProjectAction = createAsyncThunk(
  'projects/getSingleProject',
  async (payload: {token: string, id: number}, { dispatch }) => {
    try {
      const response = await getIndividualProject(payload.token, payload.id)
      if (response?.data?.status) {
       return {
        data: response?.data?.data,
        status: response?.data?.status
       }
      }
      return response?.data?.data?.data
    } catch (error) {
      return error
    }
  }
)
