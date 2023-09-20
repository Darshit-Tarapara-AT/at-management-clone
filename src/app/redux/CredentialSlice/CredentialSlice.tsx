import {createSlice, isAnyOf} from '@reduxjs/toolkit'
import {
  deleteCredentialActionParams,
  initialState as initialCredentialState,
  assignPermissionsPayload,
} from './CredentialsTypes'
import {
  addCredentialAction,
  getCredentials,
  getIndividualCredentialAction,
  getSearchCredentialsList,
} from './CredentialAyscThunk'
import {Strings} from 'app/resource/Strings'
import constant from 'config/const/const'

const initialState: initialCredentialState = {
  isLoading: false,
  page: 1,
  total: 1,
  duplicateList: [],
  currentUser: { name: '', id: 0 },
  previousPageUrl: null,
  assignPermissions: [],
  nextPageUrl: null,
  isSuccess: false,
  error: '',
  credentialDetail: '',
  isCredentialSideBarLinkClicked: false,
  limit: constant.page.size,
  list: [],
}
const slice = createSlice({
  name: 'Credentials',
  initialState,
  reducers: {
    setLoadingState(state) {
      state.isLoading = true
    },
    deleteCredential(state, action: deleteCredentialActionParams) {
      const newList = state.list.filter((Credential) => Credential.id !== action.payload)
      state.list = newList
    },
    editCredentials(state, action) {
      state.list = action.payload
      state.isLoading = false
    },
    setCurrentPageSize(state, action) {
      state.limit = action.payload
    },

    searchCredentialsList(state, action) {
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
      state.isLoading = false
      state.isSuccess = false
      state.assignPermissions = []
      state.list = []
      state.error = ''
    },
    resetErrorState(state) {
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(getCredentials.pending), (state: initialCredentialState) => {
        state.isLoading = true
      })
      .addMatcher(isAnyOf(getCredentials.fulfilled), (state: initialCredentialState, {payload}) => {
        if (payload) {
          state.list = payload?.data
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.duplicateList = payload?.data
          state.page = payload?.current_page
          state.total = payload?.total
          // state.duplicateList = payload?.data
        } else {
          state.list = []
        }
        state.isLoading = false
      })
      .addMatcher(isAnyOf(getCredentials.rejected), (state: initialCredentialState, payload) => {
        state.isLoading = false
      })
      .addMatcher(isAnyOf(addCredentialAction.pending), (state: initialCredentialState) => {
        state.isLoading = true
      })
      .addMatcher(
        isAnyOf(addCredentialAction.fulfilled),
        (state: initialCredentialState, action) => {
          state.isLoading = false
          const {payload} = action
          if (payload) {
            state.isSuccess = true
            return
          }
          state.isSuccess = false
          state.error = 'This Credential already assign'
        }
      )
      .addMatcher(isAnyOf(addCredentialAction.rejected), (state: initialCredentialState) => {
        state.isLoading = false
      })
      .addMatcher(
        isAnyOf(addCredentialAction.pending),

        (state: initialCredentialState) => {
          state.isLoading = false
        }
      )
      .addMatcher(
        isAnyOf(addCredentialAction.fulfilled),

        (state: initialCredentialState, action) => {
          state.isLoading = false
          const {payload} = action
          if (payload) {
            state.isSuccess = true
            return
          }
          state.isSuccess = false
          state.error = 'This Credential already assign'
        }
      )
      .addMatcher(
        isAnyOf(addCredentialAction.rejected),

        (state: initialCredentialState) => {
          state.isLoading = false
        }
      )
      .addMatcher(
        isAnyOf(getIndividualCredentialAction.pending),
        (state: initialCredentialState) => {
          state.isLoading = false
        }
      )
      .addMatcher(
        isAnyOf(getIndividualCredentialAction.fulfilled),
        (state: initialCredentialState, {payload}) => {
          state.isLoading = false
        }
      )
      .addMatcher(
        isAnyOf(getIndividualCredentialAction.rejected),
        (state: initialCredentialState) => {
          state.isLoading = false
        }
      )
      .addMatcher(isAnyOf(getSearchCredentialsList.pending), (state: initialCredentialState) => {})
      .addMatcher(
        isAnyOf(getSearchCredentialsList.fulfilled),
        (state: initialCredentialState, {payload}) => {
          if (payload) {
            state.list = payload?.data
            state.previousPageUrl = payload.prev_page_url
            state.nextPageUrl = payload.next_page_url
            state.duplicateList = payload?.data
            state.page = payload?.current_page
            state.total = payload?.total
          } else {
            state.list = []
            state.error = Strings.noMatchFound
            state.page = constant.page.defaultNumber
            state.total = constant.page.defaultTotal;
            state.limit = constant.page.size;
          }
          state.isLoading = false
        }
      )
      .addMatcher(
        isAnyOf(getSearchCredentialsList.rejected),
        (state: initialCredentialState, payload) => {
          state.isLoading = false
        }
      )
  },
})

export const credentialReducer = slice.reducer
export const credentialActions = slice.actions
