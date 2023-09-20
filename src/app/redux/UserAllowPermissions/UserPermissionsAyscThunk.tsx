import { createAsyncThunk } from '@reduxjs/toolkit'
import constant from 'config/const/const';
import { getAllowPermission } from 'services/AllowPermissionsService';


export const getUserPermissionsAction = createAsyncThunk('auth/userLogIn', async (payload: string) => {
  try {
    const response = await getAllowPermission(payload);
    if (response?.status === constant.APIResponse.defaultStratusCode) {
      return {
        status : response?.status,
        data : response?.data?.data
      }
    }
    else if (response?.status === constant.APIResponse.errorStatusCode) {
      return response?.data?.message
    }
    else {
      return response?.data?.message
    }
  } catch (error) {
    return error
  }
})
