import {createSlice} from '@reduxjs/toolkit'
import {setErrorMessage} from 'app/utils/helper'
import {getOtp, userSignIn} from './AuthAyscThunk'
import {InitialState} from './AuthTypes'

const initialState: InitialState = {
  isAuth: false,
  isLoading: false,
  isSuccess: false,
  loggedEmail: "",
  authErrorMessage: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuth = true
    },
    logOut(state) {
      state.isAuth = false
    },
    addLoginUserEmail(state, action) {
      state.loggedEmail = action.payload
    },
    resetErrorState(state) {
      state.authErrorMessage = ''
    },
    resetSuccessState(state) {
      state.isSuccess = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOtp.pending, (state: InitialState) => {
        state.isLoading = true
      })
      .addCase(getOtp.fulfilled, (state: InitialState, {payload}) => {
        const loginUrl = payload?.loginLink
        if (loginUrl) {
          state.isLoading = false
          return
        }
        state.authErrorMessage = setErrorMessage(payload?.message)
        state.isLoading = false
      })
      .addCase(getOtp.rejected, (state: InitialState) => {
        state.isLoading = false
      })
      .addCase(userSignIn.pending, (state: InitialState) => {
        state.isLoading = true
      })
      .addCase(userSignIn.fulfilled, (state: InitialState, {payload}) => {
        const token = payload?.token
        if (token) {
          state.isAuth = true
          state.isLoading = false
          return
        }
        const error = setErrorMessage(payload)
        state.isLoading = false
        state.authErrorMessage = error
      })
      .addCase(userSignIn.rejected, (state: InitialState) => {
        state.isLoading = false
      })
  },
})

export const authReducer = authSlice.reducer
export const authAction = authSlice.actions
