import { createSlice } from '@reduxjs/toolkit'
import { setErrorMessage } from 'app/utils/helper'
import { addPermissionAction, editPermissionAction, getAllModuleAction, getEditPermissionList, getPermissions, getSearchPermissionsList} from './PermissionAyscThunk'
import {
  deletePermissionActionParams,
  addPermissionActionParams,
  initialPermissionState,
} from './PermissionTypes'
import { Strings } from 'app/resource/Strings'
import constant from 'config/const/const'
const initialState: initialPermissionState = {
  list: [],
  isLoading: false,
  hasSearchEmpty: false,
  duplicateList: [],
  total : constant.page.defaultTotal,
  isPermissionSideBarLinkClicked: false,
  previousPageUrl: null,
  nextPageUrl: null,
  totalModules: constant.page.defaultTotal,
  module :[],
  isSuccess: false,
  page: constant.page.defaultNumber,
  error: "",
  limit: constant.page.size
}
const slice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    toggleSideBarMenu(state,action) {
      state.isPermissionSideBarLinkClicked = action.payload;
    },
    addPermission(state, action: addPermissionActionParams) {
      state.list.push(action.payload);
      state.isLoading = false
    },
    setLoadingState(state) {
      state.isLoading = true
    },
    deletePermission(state, action: deletePermissionActionParams) {
      const newList = state.list.filter((permission) => permission.id !== action.payload)
      state.list = newList
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
       state.error = ''
      state.list = [...state.duplicateList];
    },
    resetErrorState(state) {
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPermissions.pending, (state: initialPermissionState) => {
        state.isLoading = true
      })  
      .addCase(getPermissions.fulfilled, (state: initialPermissionState, { payload }) => {
        if(payload) {
          state.list = payload?.data
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.duplicateList = payload?.data
          state.page = payload?.current_page;
          state.total = payload?.total;
        }
        else {
          state.list = []
        }
        state.isLoading = false
      
      })
      .addCase(getPermissions.rejected, (state: initialPermissionState) => {
        state.isLoading = false
      }).addCase(addPermissionAction.pending, (state: initialPermissionState) => {
        state.isLoading = true
      })
      .addCase(addPermissionAction.fulfilled, (state: initialPermissionState, { payload }) => {
        state.isLoading = false
        if (payload.status) {
          state.isSuccess = true
          return
        }
        state.isSuccess = false
        state.error = setErrorMessage(JSON.parse(payload.message).name[0]);
      })
      .addCase(addPermissionAction.rejected, (state: initialPermissionState) => {
        state.isLoading = false
      })
      .addCase(getEditPermissionList.pending, (state: initialPermissionState) => {
        state.isLoading = true
      })
      .addCase(getEditPermissionList.fulfilled, (state: initialPermissionState, { payload }) => {
        state.isLoading = false
      })
      .addCase(getEditPermissionList.rejected, (state: initialPermissionState) => {
        state.isLoading = false
      }).addCase(editPermissionAction.pending, (state: initialPermissionState) => {
        state.isLoading = true
      })
      .addCase(editPermissionAction.fulfilled, (state: initialPermissionState, { payload }) => {
        state.isLoading = false
        if (payload.status) {
          state.isSuccess = true
          return
        }
        state.isSuccess = false
        state.error = setErrorMessage(JSON.parse(payload.message).name[0]);
      })
      .addCase(editPermissionAction.rejected, (state: initialPermissionState) => {
        state.isLoading = false
      })
      .addCase(getSearchPermissionsList.pending, (state: initialPermissionState) => {
      })
      .addCase(getSearchPermissionsList.fulfilled, (state: initialPermissionState, { payload }) => {
        if (payload) {
          state.list = payload?.data;
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.duplicateList = payload?.data
          state.page = payload?.current_page;
          state.total = payload?.total;
        }
        else {
          state.list = []
          state.error = Strings.noMatchFound;
          state.limit=constant.page.size;
          state.total=constant.page.defaultTotal;
          state.page=constant.page.defaultNumber
        }
        state.isLoading = false
      })
      .addCase(getSearchPermissionsList.rejected, (state: initialPermissionState) => {
        state.isLoading = false
      })
      .addCase(getAllModuleAction.pending, (state: initialPermissionState) => {
        state.isLoading = true
      })
      .addCase(getAllModuleAction.fulfilled, (state: initialPermissionState, { payload }) => {
        if (payload) {
          state.module = payload
          state.totalModules = payload?.length
        }
        state.isLoading = false
      })
      .addCase(getAllModuleAction.rejected, (state: initialPermissionState) => {
        state.isLoading = false
      })
  },
})

export const permissionReducer = slice.reducer
export const permissionActions = slice.actions
