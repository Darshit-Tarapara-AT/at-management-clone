import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllPermission, deletePermission, addNewPermission, getIndividualPermission, editPermission, fetchSearchPermissions, getAllModule } from 'services/PermissionService'
import { IRootState } from '../store'
import constant from "config/const/const"

interface addPermissionPayload {
  name: string
  label: string
  token: string
  module: string
}

interface EditPermissionPayload {
  name: string
  label: string
  module: string
  id: number
  token: string
}

interface SearchPermissionPayload {
  page: number
  size?: number,
  query: string
  token: string
}

interface GetPermissionPayload {
  page: number
  size?: number,
  query?: string
  token: string
}

interface deleteRolePayload {
  token: string
  id: number
}

export const getPermissions = createAsyncThunk(
  'permissions/getPermissions',
  async (payload: GetPermissionPayload, { getState }) => {
    try {
      const { permissionStateData } = getState() as IRootState
      const { limit } = permissionStateData
      const response = await getAllPermission(payload.token, payload.page, payload.query || '', payload.size || limit)
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

export const addPermissionAction = createAsyncThunk('permissions/addPermission', async (payload: addPermissionPayload) => {
  try {
    const response = await addNewPermission(payload.token, payload.name, payload.label, payload.module)
    return response?.data
  } catch (error) {
    return error
  }
})

export const deletePermissionAction = createAsyncThunk('permissions/deletePermission', async (payload: deleteRolePayload, { dispatch }) => {
  try {
    const response = await deletePermission(payload.token, payload.id);
    if (response?.data?.status) {
      dispatch(getPermissions({ token: payload.token, page: constant.page.defaultNumber }))
    }
    return response?.data?.status
  } catch (error) {
    return error
  }
})


export const getEditPermissionList = createAsyncThunk(
  'permissions/getEditPermissionList',
  async (payload: { token: string, id: number }, { dispatch }) => {
    try {
      const response = await getIndividualPermission(payload.token, payload.id)
      if (response?.data?.status) {
        return response?.data?.data
      }
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)

export const editPermissionAction = createAsyncThunk(
  'permissions/editPermission',
  async (payload: EditPermissionPayload, { dispatch }) => {
    try {
      const response = await editPermission(payload.token, payload.id, payload.name, payload.label, payload.module)
      return response?.data
    } catch (error) {
      return error
    }
  }
)

export const getSearchPermissionsList = createAsyncThunk(
  'permissions/searchPermissions',
  async (payload: SearchPermissionPayload, { dispatch }) => {
    try {
      const response = await fetchSearchPermissions(payload.token, payload.query, payload.page, payload.size || constant.page.size)
      if (response?.data?.status) {
        return response?.data?.data
      }
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)

export const getAllModuleAction = createAsyncThunk(
  'module/getAllModuleAction',
  async (payload: { page: number; token: string }, { getState }) => {
    try {
      const response = await getAllModule(payload.token, payload.page)
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
