import { createSlice } from '@reduxjs/toolkit'
import { addIpAddressAction, getIPAddress, getIndividualIpAction, getSearchIPAddressList} from './ipAddressAyscThunk'
import {
  initialIpAddressState,
} from './ipAddressTypes'
import { Strings } from 'app/resource/Strings'
import constant  from 'config/const/const'

const initialState: initialIpAddressState = {
  list: [],
  isLoading: false,
  hasSearchEmpty: false,
  duplicateList: [],
  total:  constant.page.defaultTotal,
  isIpSideBarLinkClicked: false,
  previousPageUrl: null,
  nextPageUrl: null,
  module :[],
  currentIP: null,
  isSuccess: false,
  page: constant.page.defaultNumber,
  error: "",
  limit: constant.page.size
}
const slice = createSlice({
  name: 'ip',
  initialState,
  reducers: {
    toggleSideBarMenu(state,action) {
      state.isIpSideBarLinkClicked = action.payload;
    },
    setLoadingState(state) {
      state.isLoading = true
    },
    setCurrentPageSize(state, action) {
      state.limit = action.payload
    },
    editPermission(state, action) {
      state.list = action.payload
      state.isLoading = false
    },
    setCurrentPagePaginationPermissions(state, action) {
      state.list = [...action.payload]
    },
    searchPermissionsList(state, action) {
      if (action.payload.length > 0) {
        state.hasSearchEmpty = false
      } else {
        state.hasSearchEmpty = true
      }
      state.list = action.payload
    },
    resetState(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.list = [...state.duplicateList];
    },
    resetErrorState(state) {
      state.error = ''
    },
    updateIpAddress(state, action) {
      state.currentIP = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
     .addCase(addIpAddressAction.pending, (state: initialIpAddressState) => {
        state.isLoading = true
      })
      .addCase(addIpAddressAction.fulfilled, (state: initialIpAddressState, { payload }) => {
        state.isLoading = false
      })
      .addCase(addIpAddressAction.rejected, (state: initialIpAddressState) => {
        state.isLoading = false
      })
      .addCase(getIndividualIpAction.pending, (state: initialIpAddressState) => {
        state.isLoading = true
      })
      .addCase(getIndividualIpAction.fulfilled, (state: initialIpAddressState, { payload }) => {
        state.isLoading = false
      })
      .addCase(getIndividualIpAction.rejected, (state: initialIpAddressState) => {
        state.isLoading = false
      }).addCase(getIPAddress.pending, (state: initialIpAddressState) => {
        state.isLoading = true
      })
      .addCase(getIPAddress.fulfilled, (state: initialIpAddressState, {payload}) => {
        if (payload) {
          state.list = payload?.data
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.duplicateList = payload?.data
          state.page = payload?.current_page
          state.total = payload?.total
        } else {
          state.list = []
        }
        state.isLoading = false
      })
      .addCase(getIPAddress.rejected, (state: initialIpAddressState) => {
        state.isLoading = false
      }).addCase(getSearchIPAddressList.pending, (state: initialIpAddressState) => {
      })
      .addCase(getSearchIPAddressList.fulfilled, (state: initialIpAddressState, {payload}) => {
        if (payload) {
          state.list = payload?.data
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.duplicateList = payload?.data
          state.page = payload?.current_page
          state.total = payload?.total
        } else {
          state.list = []
          state.error = Strings.noMatchFound;
          state.page=constant.page.defaultNumber
          state.total = constant.page.defaultTotal
         state.limit=constant.page.size
        }
        state.isLoading = false
      })
      .addCase(getSearchIPAddressList.rejected, (state: initialIpAddressState) => {
        state.isLoading = false
      })
  },
})

export const ipReducer = slice.reducer
export const ipActions = slice.actions
