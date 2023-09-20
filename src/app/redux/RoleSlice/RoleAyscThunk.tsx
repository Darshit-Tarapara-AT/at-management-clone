import { createAsyncThunk } from '@reduxjs/toolkit'
import { SearchQueryPayload } from 'app/Modal/Modal'
import constant from 'config/const/const'
import {
  addNewRole,
  deleteRole,
  getAllRoles,
  editRole,
  getIndividualRolePermissionsList,
  fetchSearchRoles,
} from 'services/RoleService'
export interface FormRolePayload {
  name: string
  id?: number
  default_role:string
  label : string
  token : string
  permissions: number[]
}
export interface deletePayload {
  token: string
  id: number
}

export const getRoles = createAsyncThunk(
  'roles/getRoles',
  async (payload: {token: string, page: number , size?:number, query?: string}, { dispatch, getState }) => {
    try {
      const response = await getAllRoles(payload.token, payload.page,payload.size,payload.query || "")
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

export const addRoleAction = createAsyncThunk('roles/addRole', async (payload: FormRolePayload) => {
  try {
    const response = await addNewRole(payload.token,payload)
    return response?.data?.data
  } catch (error) {
    return error
  }
})

export const deleteRoleAction = createAsyncThunk(
  'roles/deleteRole',
  async (payload: deletePayload, { dispatch }) => {
    try {
      const response = await deleteRole(payload.token, payload.id)
      if (response?.data?.status) {
        dispatch(getRoles({ token: payload.token, page: constant.page.defaultNumber }))
      }
      return response?.data?.status
    } catch (error) {
      return error
    }
  }
)

export const editRoleAction = createAsyncThunk(
  'roles/editRole',
  async (payload: FormRolePayload, { dispatch }) => {
    try {
      const response = await editRole(payload.token,payload.id!, payload.name, payload.permissions, payload.default_role, payload.label)
      return { status: response?.data?.status, message: response?.data?.message }
    } catch (error) {
      return error
    }
  }
)
export const getIndividualUserAssignPermissions = createAsyncThunk(
  'roles/getIndividualUserAssignPermissions',
  async (payload: {token:string, id:number}, { dispatch }) => {
    try {
      const response = await getIndividualRolePermissionsList(payload.token, payload.id)
      if (response?.data?.status) {
        const permissionId = response?.data?.data?.permissions?.map((permission: any) => permission?.id)
        return {
         permissionId,
       ...response?.data?.data
      }
      }
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)

export const getSearchRolesList = createAsyncThunk(
  'roles/searchRoles',
  async (payload:SearchQueryPayload, { dispatch }) => {
    try {
      const response = await fetchSearchRoles(payload.token,payload.query,payload.page || constant.page.defaultNumber, payload.size || constant.page.size)
      if (response?.data?.status) {
       return response?.data?.data
      }
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)
