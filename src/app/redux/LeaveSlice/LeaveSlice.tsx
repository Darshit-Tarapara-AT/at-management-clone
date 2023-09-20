import { createSlice } from '@reduxjs/toolkit';
import { InitialLeaveState } from './LeaveTypes';
import { Strings } from 'app/resource/Strings';
import { getAllLeavesAction, getFilterLeaveAction, getIndividualLeaveAction, getSearchLeaveAction, getUserLeaveActions, getUserLeaveCalendarDataAction } from './LeaveAyscThunk';
import constant from 'config/const/const';

const initialState: InitialLeaveState = {
  list: [],
  isLoading: false,
  userLeaveList: [],
  page: constant.page.defaultNumber,
  total:  constant.page.defaultTotal,
  nextPageUrl: null,
  duplicateList: [],
  previousPagePath: '',
  leaveCalendarData: [],
  isSuccess: false,
  isLeaveSideBarLinkClicked: false,
  error: '',
  previousPageUrl: null,
  limit: constant.page.size,
}
const slice = createSlice({
  name: 'leaves',
  initialState,
  reducers: {
    toggleSideBarMenu(state, action) {
      state.isLeaveSideBarLinkClicked = action.payload
    },
    addLeave(state, action) {
      state.list.push(action.payload)
      state.isLoading = false
    },
    editLeaveItems(state, action) {
      state.list = action.payload
    },
    updatePreviousPagePathState(state, action) {
      state.previousPagePath = action.payload
    },
    setLoadingState(state) {
      state.isLoading = true
    },
    setCurrentPageSize(state, action) {
      state.limit = action.payload
    },
    editUser(state, action) {
      state.list = action.payload
      state.isLoading = false
    },
    setCurrentPage(state, action) {
      state.page = Math.abs(state.page + action.payload.currentPage)
    },
    resetState(state) {
      state.isLoading = false
      state.isSuccess = false
      state.list = [...state.duplicateList]
    },
    resetErrorState(state) {
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLeavesAction.pending, (state: InitialLeaveState) => {
        state.isLoading = true
      })
      .addCase(getAllLeavesAction.fulfilled, (state: InitialLeaveState, { payload }) => {
        if (payload) {
          state.list = payload?.data
          state.total = payload?.total
          state.previousPageUrl = payload.prev_page_url
          state.duplicateList = payload?.data
          state.nextPageUrl = payload.next_page_url
          state.page = payload?.current_page
        } else {
          state.list = []
          state.list = []
          state.error = Strings.noMatchFound
          state.total =  constant.page.defaultTotal
          state.page = constant.page.defaultNumber
          state.limit = constant.page.size
        }
        state.isLoading = false
      })
      .addCase(getAllLeavesAction.rejected, (state: InitialLeaveState) => {
        state.isLoading = false
      })
      .addCase(getSearchLeaveAction.pending, (state: InitialLeaveState) => { })
      .addCase(getSearchLeaveAction.fulfilled, (state: InitialLeaveState, { payload }) => {
        if (payload) {
          state.list = payload?.data
          state.total = payload?.total
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.page = payload?.current_page
        } else {
          state.list = []
          state.error = Strings.noMatchFound
          state.total =  constant.page.defaultTotal
          state.page = constant.page.defaultNumber
          state.limit = constant.page.size
        }
        state.isLoading = false
      })
      .addCase(getSearchLeaveAction.rejected, (state: InitialLeaveState) => {
        state.isLoading = false
      })
      .addCase(getIndividualLeaveAction.pending, (state: InitialLeaveState) => {
        state.isLoading = true
      })
      .addCase(getIndividualLeaveAction.fulfilled, (state: InitialLeaveState, { payload }) => {
        state.isLoading = false
      })
      .addCase(getIndividualLeaveAction.rejected, (state: InitialLeaveState) => {
        state.isLoading = false
      })
      .addCase(getUserLeaveActions.pending, (state: InitialLeaveState) => {
        state.isLoading = true
      })
      .addCase(getUserLeaveActions.fulfilled, (state: InitialLeaveState, { payload }) => {
        if (payload) {
          state.userLeaveList = payload?.data
          state.total = payload?.total
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.page = payload?.current_page
        }
        else {
          state.userLeaveList = []
          state.error = Strings.noMatchFound
          state.total =  constant.page.defaultTotal
          state.page = constant.page.defaultNumber
          state.limit = constant.page.size
        }
        state.isLoading = false
      }).addCase(getUserLeaveActions.rejected, (state: InitialLeaveState) => {
        state.isLoading = false
      })
      .addCase(getFilterLeaveAction.pending, (state: InitialLeaveState) => {

      })
      .addCase(getFilterLeaveAction.fulfilled, (state: InitialLeaveState, { payload }) => {
        if (payload) {
          state.list = payload?.data
          state.total = payload?.total
          state.previousPageUrl = payload.prev_page_url
          state.duplicateList = payload?.data
          state.nextPageUrl = payload.next_page_url
          state.page = payload?.current_page
        }
        else {
          state.list = []
          state.error = Strings.noMatchFound
          state.total =  constant.page.defaultTotal
          state.page = constant.page.defaultNumber
          state.limit = constant.page.size
        }


      })
      .addCase(getFilterLeaveAction.rejected, (state: InitialLeaveState) => {

      })
      .addCase(getUserLeaveCalendarDataAction.pending, (state: InitialLeaveState) => {
        state.isLoading = true
      })
      .addCase(getUserLeaveCalendarDataAction.fulfilled, (state: InitialLeaveState, { payload }) => {
        if (payload) {
        state.leaveCalendarData = payload
        }
        state.isLoading = false
      })
      .addCase(getUserLeaveCalendarDataAction.rejected, (state: InitialLeaveState) => {
        state.isLoading = false
      })
  },
})

export const leaveReducer = slice.reducer
export const leaveActions = slice.actions
