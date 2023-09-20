import {createSlice, isAnyOf} from '@reduxjs/toolkit'
import {
  InitialDashboardState,
} from './DashboardTypes'
import { getLastOfflineUsersAction, getRecentTasksAction, getTodayOnLeaveAction, getUpcomingBirthdayAction, getUpcomingWorkAnniversaryAction,getAllOnlineUserAction } from './DashboardAyscThunk'

const initialState: InitialDashboardState = {
  recentTask: [],
  isLoading: false,
  dashboard: true,
  upcomingBirthday: [],
  upcomingWorkAnniversary: [],
  todayOnLeave: [],
  allOnlineUser: [],
  lastOfflineUsers: []
}
const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLoadingState(state, action) {
      state.isLoading = action.payload
    },
    resetRecentTask(state) {
      state.isLoading = true
      state.recentTask = []
    },
  },
  extraReducers: (builder) =>{
    builder
      .addMatcher(isAnyOf(getRecentTasksAction.pending), (state: InitialDashboardState) => {
        // state.isLoading = true
      })
      .addMatcher(isAnyOf(getRecentTasksAction.fulfilled), (state: InitialDashboardState, {payload}) => {
        if (payload) {
          state.recentTask = payload?.data?.data
        }
      })
      .addMatcher(isAnyOf(getRecentTasksAction.rejected), (state: InitialDashboardState, payload) => {
      })
      .addMatcher(isAnyOf(getUpcomingBirthdayAction.pending), (state: InitialDashboardState) => {
      })
      .addMatcher(isAnyOf(getUpcomingBirthdayAction.fulfilled), (state: InitialDashboardState, {payload}) => {
        if (payload) {
          state.upcomingBirthday = payload?.data?.data
        }
      })
      .addMatcher(isAnyOf(getUpcomingBirthdayAction.rejected), (state: InitialDashboardState, payload) => {
      })
      .addMatcher(isAnyOf(getUpcomingWorkAnniversaryAction.pending), (state: InitialDashboardState) => {
      })
      .addMatcher(isAnyOf(getUpcomingWorkAnniversaryAction.fulfilled), (state: InitialDashboardState, {payload}) => {
        if (payload) {
          state.upcomingWorkAnniversary = payload?.data?.data
        }
      })
      .addMatcher(isAnyOf(getUpcomingWorkAnniversaryAction.rejected), (state: InitialDashboardState, payload) => {
      })

      .addMatcher(isAnyOf(getTodayOnLeaveAction.pending), (state: InitialDashboardState) => {
      })
      .addMatcher(isAnyOf(getTodayOnLeaveAction.fulfilled), (state: InitialDashboardState, {payload}) => {
        if (payload) {
          state.todayOnLeave = payload?.data?.data
        }
      })
      .addMatcher(isAnyOf(getTodayOnLeaveAction.rejected), (state: InitialDashboardState, payload) => {
      })
      .addMatcher(isAnyOf(getAllOnlineUserAction.pending), (state: InitialDashboardState) => {
      })
      .addMatcher(isAnyOf(getAllOnlineUserAction.fulfilled), (state: InitialDashboardState, {payload}) => {
        if (payload) {
          state.allOnlineUser = payload?.data?.data
        }
      })
      .addMatcher(isAnyOf(getAllOnlineUserAction.rejected), (state: InitialDashboardState, payload) => {
      })

      .addMatcher(isAnyOf(getLastOfflineUsersAction.pending), (state: InitialDashboardState) => {
        // state.isLoading = true
      })
      .addMatcher(isAnyOf(getLastOfflineUsersAction.fulfilled), (state: InitialDashboardState, {payload}) => {
        if (payload) {
          state.lastOfflineUsers = payload?.data?.data
        }
      })
      .addMatcher(isAnyOf(getLastOfflineUsersAction.rejected), (state: InitialDashboardState, payload) => {
      })
    },
})

export const DashboardReducer = slice.reducer
export const DashboardActions = slice.actions
