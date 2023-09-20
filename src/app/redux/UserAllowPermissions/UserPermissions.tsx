import { createSlice } from '@reduxjs/toolkit'
import { getUserPermissionsAction } from './UserPermissionsAyscThunk'

import { InitialState } from './UserPermissionsType'

const initialState: InitialState = {
  userPermissions: {
    user: {
      add: false,
      edit: false,
      delete: false,
      filter: false,
      view: false,
      list: false,
    },
    role: {
      list: false,
      view: false,
      delete: false,
      edit: false,
      add: false,
    },
    credential: {
      list: true,
      view: true,
      delete: true,
      edit: true,
      add: true,
      filter: true,
    },
    permission: {
      list: false,
      view: false,
      delete: false,
      edit: false,
      add: false,
    },
    policy: {
      add: false,
      filter:  false,
      allhistory:  false,
      history:  false,
      list: false,
      edit: false,
      view: false,
      delete: false
    },
    lead: {
      list: false,
      view: false,
      delete: false,
      filter: false,
      edit: false,
      add: false,
    },
    client: {
      list: false,
      edit: false,
      delete: false,
      view: false,
      filter: false,
    },
    project: {
      list: false,
      view: false,
      filter: false,
      delete: false,
      edit: false,
      add: false,
      viewPrivate: false,
      editPrivate: false,
      portfolio: false,
      archive:false
    },
    task: {
      list: false,
      view: false,
      delete: false,
      backlogStage: false,
      edit: false,
      bulkOperation: false,
      filter: false,
      add: false,
    },
    attendance: {
      correction: true,
      add: true,
      editCorrection: false,
      deleteCorrection: false,
      viewCorrection: false,
      list: true,
      view: true,
      taskEntry: true,
      masterList: false,
      deleteMasterList: false,
      taskCorrection: false,
      viewMasterList: false,
      editMasterList: false,
    },
    holiday: {
      holidayList: false,
      addHoliday: false,
      editHoliday: false,
      deleteHoliday: false
    },
    profile: {
      view: false,
      delete: false,
      edit: false,
    },
    ip: {
      view: false,
      delete: false,
      edit: false,
      add: false,
      list: false,
    },
    leave: {
      add: false,
      addMaster: false,
      addUser: false,
      view: false,
      deleteMaster: false,
      deleteUser: false,
      editMater: false,
      editUser: false,
      filter: false,
      List: false,
      masterList: false,
      userCalender: false,
      userList: false,
      viewMaster: false,
      viewUser: false,
    },
    dashboard: {
      list: false,
      recentTask: false,
      upcomingBirthday: false,
      upcomingWorkAnniversary: false,
      todayOnLeave: false,
      allOnlineUser: false,
      lastOfflineUsers: false
    },
    performance: {
      list: false,
      billingWorkHours: false,
      filter: false,
      billingWorkUser: false,
    },
  },
  isLoaded: true
}


const userPermissionSlice = createSlice({
  name: 'userPermissions',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserPermissionsAction.pending, (state: InitialState) => {
        state.isLoaded = true
      })
      .addCase(getUserPermissionsAction.fulfilled, (state: InitialState, {payload}) => {
        if (payload?.status && payload?.data) {
          state.userPermissions = {...payload?.data}
        }
        state.isLoaded = false
      })
      .addCase(getUserPermissionsAction.rejected, (state: InitialState) => {
        state.isLoaded = false
      })
  },
})

export const userPermissionReducer = userPermissionSlice.reducer
export const userPermissionAction = userPermissionSlice.actions
