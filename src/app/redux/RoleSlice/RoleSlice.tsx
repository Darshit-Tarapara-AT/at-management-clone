import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
  deleteRoleActionParams,
  initialState as initialRoleState,
  assignPermissionsPayload,
} from './RolesTypes'
import { addRoleAction, editRoleAction, getRoles, getIndividualUserAssignPermissions, getSearchRolesList } from './RoleAyscThunk'
import { Strings } from 'app/resource/Strings'
import constant  from 'config/const/const'

const initialState: initialRoleState = {
  list: [],
  isLoading: false,
  page: constant.page.defaultNumber,
   total :  constant.page.defaultTotal,
  duplicateList: [],
  currentUser: { name: "", id: constant.defaultUserId },
  previousPageUrl: null,
  assignPermissions: [],
  nextPageUrl: null,
  isSuccess: false,
  error: '',
  isRoleSideBarLinkClicked: false,
  limit: constant.page.size,
}
const slice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    toggleSideBarMenu(state, action) {
      state.isRoleSideBarLinkClicked = action.payload;
    },
    setLoadingState(state) {
      state.isLoading = true
    },
    deleteRole(state, action: deleteRoleActionParams) {
      const newList = state.list.filter((role) => role.id !== action.payload)
      state.list = newList
    },
    editRoles(state, action) {
      state.list = action.payload
      state.isLoading = false
    },
    setCurrentPageSize(state, action) {
      state.limit = action.payload
    },

    searchRolesList(state, action) {
      state.list = action.payload
    },
    addAssignPermissions(state, action: assignPermissionsPayload) {
      if (action.payload.isChecked) {
        state.assignPermissions.push(action.payload.id)
      } else {
        const newAssignPermissionsList = state.assignPermissions.filter(
          (id) => id !== action.payload.id
        )
        state.assignPermissions = newAssignPermissionsList
      }
    },
    resetState(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.assignPermissions = []
      state.error = ''
    },
    resetErrorState(state) {
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          getRoles.pending,
        ),
        (state: initialRoleState) => {
          state.isLoading = true
        }
      ).addMatcher(
        isAnyOf(
          getRoles.fulfilled,
        ),
        (state: initialRoleState, { payload }) => {
          if (payload) {
            state.list = payload?.data
            state.previousPageUrl = payload.prev_page_url
            state.nextPageUrl = payload.next_page_url
            state.duplicateList = payload?.data
            state.page = payload?.current_page
            state.total = payload?.total
            state.duplicateList = payload?.data
          }
          else {
            state.list = []
          }
          state.isLoading = false

        }
      ).addMatcher(
        isAnyOf(
          getRoles.rejected,
        ),
        (state: initialRoleState, payload) => {
          state.isLoading = false;

        }
      ).addMatcher(
        isAnyOf(
          addRoleAction.pending,
        ),
        (state: initialRoleState) => {
          state.isLoading = true
        }
      ).addMatcher(
        isAnyOf(
          addRoleAction.fulfilled,
        ),
        (state: initialRoleState, action) => {
          state.isLoading = false
          const { payload } = action
          if (payload) {
            state.isSuccess = true
            return
          }
          state.isSuccess = false
          state.error = 'This role already assign'
        }
      ).addMatcher(
        isAnyOf(
          addRoleAction.rejected,
        ),
        (state: initialRoleState) => {
          state.isLoading = false
        }
      ).addMatcher(
        isAnyOf(
          editRoleAction.pending,
        ),
        (state: initialRoleState) => {
          state.isLoading = false
        }
      ).addMatcher(
        isAnyOf(
          editRoleAction.fulfilled,
        ),
        (state: initialRoleState, action) => {
          state.isLoading = false
          const { payload } = action
          if (payload) {
            state.isSuccess = true
            return
          }
          state.isSuccess = false
          state.error = 'This role already assign'
        }
      ).addMatcher(
        isAnyOf(
          editRoleAction.rejected,
        ),
        (state: initialRoleState) => {
          state.isLoading = false
        }
      ).addMatcher(
        isAnyOf(
          getIndividualUserAssignPermissions.pending,
        ),
        (state: initialRoleState) => {
          state.isLoading = false
        }
      ).addMatcher(
        isAnyOf(
          getIndividualUserAssignPermissions.fulfilled,
        ),
        (state: initialRoleState, { payload }) => {
          state.isLoading = false;
        }
      ).addMatcher(
        isAnyOf(
          getIndividualUserAssignPermissions.rejected,
        ),
        (state: initialRoleState) => {
          state.isLoading = false
        }
      )
      .addMatcher(
        isAnyOf(
          getSearchRolesList.pending,
        ),
        (state: initialRoleState) => {
        }
      ).addMatcher(
        isAnyOf(
          getSearchRolesList.fulfilled,
        ),
        (state: initialRoleState, { payload }) => {
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
          state.page = constant.page.defaultNumber
          state.total =  constant.page.defaultTotal
          state.limit = constant.page.size
        }
        state.isLoading = false

        }
      ).addMatcher(
        isAnyOf(
          getSearchRolesList.rejected,
        ),
        (state: initialRoleState, payload) => {
          state.isLoading = false;
        }
      )

  },
})

export const roleReducer = slice.reducer
export const roleActions = slice.actions
