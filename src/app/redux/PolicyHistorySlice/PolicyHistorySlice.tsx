import { createSlice } from '@reduxjs/toolkit'
import { getPolicyLogs, getIndividualPolicyLogsAction} from './PolicyHistoryAyscThunk'
import {
  initialPolicyLogState,
} from './PolicyHistoryTypes'
import constant from 'config/const/const'

const initialState: initialPolicyLogState = {
  list: [],
  isLoading: false,
  total : constant.page.defaultTotal,
  previousPageUrl: null,
  nextPageUrl: null,
  individualHistoryTotal: constant.page.defaultTotal,
  isSuccess: false,
  page: constant.page.defaultNumber,
  error: "",
  limit: constant.page.size
}
const slice = createSlice({
  name: 'policyHistory',
  initialState,
  reducers: {
    resetState(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.list =[];
     state.limit=constant.page.size;
    },
    resetErrorState(state) {
      state.error = ''
    },
    setCurrentPageSize(state, action) {
      state.limit = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPolicyLogs.pending, (state: initialPolicyLogState) => {
        state.isLoading = true
      })  
      .addCase(getPolicyLogs.fulfilled, (state: initialPolicyLogState, { payload }) => {
        if(payload) {
          state.list = payload?.data
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.page = payload?.current_page;
          state.total = payload?.total;
        }
        else {
          state.list = []
        }
        state.isLoading = false
    
      })
      .addCase(getPolicyLogs.rejected, (state: initialPolicyLogState) => {
        state.isLoading = false
      }).addCase(getIndividualPolicyLogsAction.pending, (state: initialPolicyLogState) => {
        state.isLoading = true
      })  
      .addCase(getIndividualPolicyLogsAction.fulfilled, (state: initialPolicyLogState, { payload }) => {
  
        if(payload) {
          state.list = payload?.data
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.page = payload?.current_page;
          state.individualHistoryTotal = payload?.total;
        }
        state.isLoading = false
      })
      .addCase(getIndividualPolicyLogsAction.rejected, (state: initialPolicyLogState) => {
        state.isLoading = false
      })
  },
})

export const policyHistoryReducer = slice.reducer;
export const policyHistoryActions = slice.actions;
