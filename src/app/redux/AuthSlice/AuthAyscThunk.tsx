import {createAsyncThunk} from '@reduxjs/toolkit'
import {setItem} from 'app/utils/storage'
import constant from 'config/const/const'
import {getLogInLink, userLogin as userLogIn} from 'services/AuthServices'

interface getOtpPayLoad {
  email: string
  custom_url: string
}
interface userLogInPayLoad {
  encryptedEmail: string
  encryptedOtp: string
}

export const getOtp = createAsyncThunk(
  'auth/getOtp',
  async (payload: getOtpPayLoad, {dispatch}) => {
    try {
      const response = await getLogInLink(payload.email, payload.custom_url)
      if (response?.status === constant.APIResponse.defaultStratusCode) {
        return {
          status: response?.data?.status,
          message: response?.data?.message,
          loginLink: response?.data?.data?.LoginURL,
        }
      } else if (response?.status === constant.APIResponse.errorStatusCode) {
        return response?.data?.message
      }
    } catch (error) {
      return error
    }
  }
)

export const userSignIn = createAsyncThunk('auth/userLogIn', async (payload: userLogInPayLoad) => {
  try {
    const response = await userLogIn(payload.encryptedEmail, payload.encryptedOtp)
    if (response?.status === constant.APIResponse.defaultStratusCode) {
      const loginUser = {
        token:   response?.data?.data?.token,
        status:  response?.data.status,
        message: response?.data.message,
      };
       setItem(constant.localStorageKey.loginToken, JSON.stringify(loginUser));
      return  response?.data?.data
    }
    else if(response?.status === constant.APIResponse.errorStatusCode) {
      return response?.data?.message
    }
  } catch (error) {
    return error
  }
})
