import { createSlice } from '@reduxjs/toolkit'
import {
  initialUIState,
} from './UITypes'

const menuItemInitialState = {
  isUserSideBarLinkClicked: false,
  isRoleSideBarLinkClicked: false,
  isPermissionSideBarLinkClicked: false,
  isPolicySideBarLinkClicked: false,
  isClientSideBarLinkClicked: false,
  isLeadSideBarLinkClicked: false,
  isTaskSideBarLinkClicked: false,
  isIpSideBarLinkClicked:false,
  isProjectSideBarLinkClicked: false,
  isAttendanceSideBarLinkClicked:false,
  isPerformanceSideBarLinkClicked: false
}
const initialState: initialUIState = {
  menuItem: {
    ...menuItemInitialState,
    isAttendanceSideBarLinkClicked: false,
  },
  currentTheme: "light"
}
const slice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    toggleTheme(state, action) {
      state.currentTheme = action.payload
    },
    toggleSideBarMenu(state,action) {
     state.menuItem = {
      ...state.menuItem,
      ...menuItemInitialState,
      [action.payload]: !state.menuItem[action.payload as keyof typeof menuItemInitialState]
     }
    },
  }
})

export const UIReducer = slice.reducer
export const UIActions = slice.actions
