import { createSlice } from '@reduxjs/toolkit'
import { addUserActionPayLoad, InitialUserState } from './UserTypes'
import { addUserAction, getAllUsersAction, getSearchUsersList, getUserFilterAction, getUserProfileActions } from './UserAyscThunk'
import { Strings } from 'app/resource/Strings'
import constant from 'config/const/const'


const initialState: InitialUserState = {
  list: [],
  isLoading: false,
  isUserReadPolicy: constant.policy.userReadPolicyValue,
  isSearch: false,
  currentUserProfileDetails: {
    id: 0,
    image_url: '',
    first_name: "",
    last_name: '',
    joining_date: '',
    email: '',
    birth_date: '',
    designation: '',
    role_id: {
      id: 0,
      name: '',
      guard_name: '',
      created_at: '',
      updated_at: '',
      default_role: constant.page.role.defaultRole,
    },
    contact_email: '',
    address: '',
    area: '',
    state: '',
    city: '',
    postal_code: '',
    contact: '',
    alternate_contact: '',
    guadian_1_name: '',
    guadian_1_contact: '',
    slack_url: '',
    guadian_1_address: '',
    guadian_2_name: '',
    guadian_2_contact: '',
    guadian_2_address: '',
    aadhar_number: "",
    last_login: "",
    paid_leave_starts_from: "",
    next_increment_date: '',
    pan_number: '',
    basic_salary: '',
    bank_details: '',
    created_at: "",
    updated_at: "",
    deleted_at: null,
    extra_information: '',
    role: '',
  },
  duplicateList: [],
  page: constant.page.defaultNumber,
   total :   constant.page.defaultTotal,
  isCheckAll: false,
  isUserDataFetched:false,
  isCheck: [],
  nextPageUrl: null,
  isSuccess: false,
  isUserSideBarLinkClicked: false,
  error: '',
  previousPageUrl: null,
  limit: constant.page.size,
  isCurrentUserDataFetch: false
}
const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleSideBarMenu(state, action) {
      state.isUserSideBarLinkClicked = action.payload;
    },
    addUser(state, action: addUserActionPayLoad) {
      state.list.push(action.payload)
      state.isLoading = false
    },
    setLoadingState(state, action) {
      state.isLoading = action.payload
    },
    editUser(state, action) {
      state.list = action.payload
      state.isLoading = false
    },
    setCurrentPage(state, action) {
      state.page = action.payload
    },
    setCurrentPageSize(state, action) {
      state.limit = action.payload
    },
    setCurrentPagePaginationUsers(state, action) {
      state.duplicateList = [...action.payload]
    },
    resetState(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.list = [...state.duplicateList]
    },
    setSelectedRow(state) {
      state.isCheckAll = !state.isCheckAll
      if (!state.isCheckAll) {
        state.isCheck = []
      }
    },
    selectedSingleRow(state, { payload }) {
      state.isCheck = [...state.isCheck, payload.id]
      if (!payload.isChecked) {
        state.isCheck = state.isCheck.filter(item => item !== payload.id)
      }
    },
    resetErrorState(state) {
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersAction.pending, (state: InitialUserState) => {
        state.isLoading = true
      })
      .addCase(getAllUsersAction.fulfilled, (state: InitialUserState, { payload }) => {
        if (payload) {
          state.list = payload?.data
          state.total = payload?.total
          state.duplicateList = payload?.data
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.page = payload?.current_page
        }
        else {
          state.list = []
          state.error = Strings.noMatchFound;
         state.limit=constant.page.size;
         state.total= constant.page.defaultTotal;
          state.page=constant.page.defaultNumber
        }
        state.isLoading = false
      })
      .addCase(getAllUsersAction.rejected, (state: InitialUserState) => {
        state.isLoading = false
      }).addCase(addUserAction.pending, (state: InitialUserState) => {
        state.isLoading = true
      })
      .addCase(addUserAction.fulfilled, (state: InitialUserState, { payload }) => {
        state.isLoading = false
      })
      .addCase(addUserAction.rejected, (state: InitialUserState) => {
        state.isLoading = false
      }).addCase(getSearchUsersList.pending, (state: InitialUserState) => {
        state.isSearch = true
      })
      .addCase(getSearchUsersList.fulfilled, (state: InitialUserState, { payload }) => {
        if (payload?.data) {
          state.list = payload?.data;
          state.total = payload?.total
          state.duplicateList = payload?.data
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.page = payload?.current_page
        }
        else {
          state.list = []
          state.limit = constant.page.size;
          state.total =  constant.page.defaultTotal;
          state.page = constant.page.defaultNumber
        }
        state.isSearch = false
      })
      .addCase(getSearchUsersList.rejected, (state: InitialUserState) => {
        state.isSearch = false
      }).addCase(getUserProfileActions.pending, (state: InitialUserState) => {
        state.isLoading = true
      })
      .addCase(getUserProfileActions.fulfilled, (state: InitialUserState, { payload }) => {
        if (payload?.userInfo) {
          state.currentUserProfileDetails = { ...payload.userInfo }
          state.isUserReadPolicy = payload?.isUserReadPolicy
        }
        state.isLoading = false;
      })
      .addCase(getUserProfileActions.rejected, (state: InitialUserState) => {
        state.isLoading = false
      }).addCase(getUserFilterAction.pending, (state: InitialUserState) => {
        state.isUserDataFetched = false
      })  
      .addCase(getUserFilterAction.fulfilled, (state: InitialUserState, { payload }) => {
        if(payload) {
          state.list = payload?.data
          state.total = payload?.total
          state.duplicateList = payload?.data
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.page = payload?.current_page
        }
        else {
          state.list = []
         state.limit=constant.page.size;
         state.total= constant.page.defaultTotal;
          state.page=constant.page.defaultNumber
        }
        state.isUserDataFetched = true
      })
      .addCase(getUserFilterAction.rejected, (state: InitialUserState) => {
        state.isUserDataFetched = false
      })
  }
})

export const userReducer = slice.reducer
export const UserActions = slice.actions
