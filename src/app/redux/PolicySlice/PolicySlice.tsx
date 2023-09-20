import {createSlice} from '@reduxjs/toolkit'
import {initialPolicyState, addPolicyActionParams} from './PolicyTypes'
import {
  addPolicyAction,
  getPolicy,
  getSearchPolicyList,
  getUnreadPolicyAction,
} from './PolicyAyscThunk'
import {addPolicyRolePayload} from './PolicyTypes'
import {setErrorMessage} from 'app/utils/helper'
import {Strings} from 'app/resource/Strings'
import constant from 'config/const/const'
const initialState: initialPolicyState = {
  list: [],
  isLoading: false,
  page: constant.page.defaultNumber,
  previousPageUrl: null,
  nextPageUrl: null,
  duplicateList: [],
  isSearch: false,
  hasSearchEmpty: false,
  isPolicyRead: constant.policy.userReadPolicyValue,
  isPolicySideBarLinkClicked: false,
  isCheckAll: false,
  total: constant.page.defaultTotal,
  policyRole: [],
  limit: constant.page.size,
  isCheck: [],
  isSuccess: false,
  error: '',
}
const slice = createSlice({
  name: 'policy',
  initialState,
  reducers: {
    toggleSideBarMenu(state, action) {
      state.isPolicySideBarLinkClicked = action.payload
    },
    addPolicy(state, action: addPolicyActionParams) {
      state.isLoading = false
    },
    addIndividualPolicy(state, action) {
      state.list = [{...action.payload.list}]
      state.isPolicyRead = action.payload.isPolicyRead
    },
    setLoadingState(state) {
      state.isLoading = true
    },

    editPolicy(state, action) {
      state.list = action.payload
      state.isLoading = false
    },
    resetState(state) {
      state.isLoading = false
      state.policyRole = []
      state.error = ''
      state.list = [...state.duplicateList]
      state.isSuccess = false
    },
    setCurrentPagePaginationPolicy(state, action) {
      state.list = [...action.payload]
    },
    searchPolicyList(state, action) {
      if (action.payload.length > 0) {
        state.hasSearchEmpty = false
      } else {
        state.hasSearchEmpty = true
      }
      state.list = action.payload
    },
    setCurrentPageSize(state, action) {
      state.limit = action.payload
    },
    resetPolicyListingState(state) {
      state.list = []
    },
    setSelectedRow(state) {
      state.isCheckAll = !state.isCheckAll
      state.isCheck = state.list.map((data) => data.id)
      if (!state.isCheckAll) {
        state.isCheck = []
      }
    },
    selectedSingleRow(state, {payload}) {
      state.isCheck = [...state.isCheck, payload.id]
      if (!payload.isChecked) {
        state.isCheck = state.isCheck.filter((item) => item !== payload.id)
      }
    },
    addPolicyRoles(state, action: addPolicyRolePayload) {
      if (action.payload.isChecked) {
        state.policyRole.push(action.payload.id)
      } else {
        const newPolicyRoleList = state.policyRole.filter((id) => id !== action.payload.id)
        state.policyRole = newPolicyRoleList
      }
    },
    resetErrorState(state) {
      state.error = ''
    },
    changeIsPolicyRead(state, action) {
      if (action.payload) {
        state.isPolicyRead = constant.page.defaultNumber
      } else {
        state.isPolicyRead = constant.policy.userReadPolicyValue
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPolicy.pending, (state: initialPolicyState) => {
        state.isLoading = true
      })
      .addCase(getPolicy.fulfilled, (state: initialPolicyState, {payload}) => {
        if (payload) {
          state.list = payload?.data
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.page = payload?.current_page
          state.total = payload?.total
          state.duplicateList = payload?.data
        } else {
          state.list = []
          state.total = constant.page.defaultTotal;
          state.limit = constant.page.size;
          state.page = constant.page.defaultNumber
        }
        state.isLoading = false
      })
      .addCase(getPolicy.rejected, (state: initialPolicyState) => {
        state.isLoading = false
      })

      .addCase(getUnreadPolicyAction.pending, (state: initialPolicyState) => {
        state.isLoading = true
      })
      .addCase(getUnreadPolicyAction.fulfilled, (state: initialPolicyState, {payload}) => {
        if (payload) {
          state.list = payload?.UnreadPolicy?.data
          state.previousPageUrl = payload?.UnreadPolicy?.prev_page_url
          state.nextPageUrl = payload?.UnreadPolicy?.next_page_url
          state.page = payload?.UnreadPolicy?.current_page
          state.total = payload?.UnreadPolicy?.total
          state.duplicateList = payload?.UnreadPolicy?.data
        } else {
          state.list = []
          state.total = constant.page.defaultTotal
          state.limit = constant.page.size
          state.page = constant.page.defaultNumber
        }
        state.isLoading = false
      })
      .addCase(getUnreadPolicyAction.rejected, (state: initialPolicyState) => {
        state.isLoading = false
      })

      .addCase(addPolicyAction.pending, (state: initialPolicyState) => {
        state.isLoading = true
      })
      .addCase(addPolicyAction.fulfilled, (state: initialPolicyState, {payload}) => {
        state.isLoading = false
        if (payload.status) {
          state.isSuccess = true
          return
        }
        state.isSuccess = false
        state.error = setErrorMessage(JSON.parse(payload.message).name[0])
      })
      .addCase(addPolicyAction.rejected, (state: initialPolicyState) => {
        state.isLoading = false
      })
      .addCase(getSearchPolicyList.pending, (state: initialPolicyState) => {})
      .addCase(getSearchPolicyList.fulfilled, (state: initialPolicyState, {payload}) => {
        if (payload) {
          state.list = payload?.data
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.page = payload?.current_page
          state.total = payload?.total
          state.duplicateList = payload?.data
        } else {
          state.list = []
          state.error = Strings.noMatchFound;
          state.total = constant.page.defaultTotal;
          state.limit = constant.page.size;
          state.page = constant.page.defaultNumber
        }
        state.isSearch = false
      })
      .addCase(getSearchPolicyList.rejected, (state: initialPolicyState) => {
        state.isSearch = false
      })
  },
})

export const policyReducer = slice.reducer
export const policyActions = slice.actions
