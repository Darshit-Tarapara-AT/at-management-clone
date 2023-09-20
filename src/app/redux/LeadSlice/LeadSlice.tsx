
import { createSlice } from '@reduxjs/toolkit'
import { Strings } from 'app/resource/Strings';
import { addLeadAction, getAllLeadsAction, getIndividualLeadAction, getSearchLeadAction } from './LeadAyscThunk';
import { addLeadActionPayLoad, deleteLeadActionParams, InitialLeadState } from './LeadTypes'
import constant from 'config/const/const';

const initialState: InitialLeadState = {
  list: [],
  tempList: [],
  isLoading: false,
  page: constant.page.defaultNumber,
  total :  constant.page.defaultTotal,
  nextPageUrl: null,
  isSuccess: false,
  isLeadSideBarLinkClicked: false,
  error: '',
  previousPageUrl: null,
  limit: constant.page.size,
}
const slice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    toggleSideBarMenu(state, action) {
      state.isLeadSideBarLinkClicked = action.payload
    },
    addLeadItems(state, action: addLeadActionPayLoad) {
      state.list.push(action.payload)
      state.isLoading = false
    },
    editLeadItems(state, action) {
      state.list = action.payload
    },
    deleteLead(state, action: deleteLeadActionParams) {
      const newList = state.list.filter((lead) => lead.id !== action.payload)
      state.list = newList
    },
    setLoadingState(state) {
      state.isLoading = true
    },
    editUser(state, action) {
      state.list = action.payload
      state.isLoading = false
    },
    setCurrentPage(state, action) {
      state.page = Math.abs(state.page + action.payload.currentPage)
    },
    setCurrentPageSize(state, action) {
      state.limit = action.payload
    },
    resetState(state) {
      state.isLoading = false
      state.isSuccess = false
      state.list = []
    },
    resetErrorState(state) {
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIndividualLeadAction.rejected, (state: InitialLeadState) => {
        state.isLoading = false
      })
      .addCase(getIndividualLeadAction.pending, (state: InitialLeadState) => {
        state.isLoading = true
      })
      .addCase(getIndividualLeadAction.fulfilled, (state: InitialLeadState, {payload}) => {
        state.isLoading = false
      })
    .addCase(getAllLeadsAction.pending, (state: InitialLeadState) => {
      state.isLoading = true
    })  
    .addCase(getAllLeadsAction.fulfilled, (state: InitialLeadState, { payload }) => {
      if(payload) {
        state.list = payload?.data
        state.total = payload?.total
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
    .addCase(getAllLeadsAction.rejected, (state: InitialLeadState) => {
      state.isLoading = false
    }).addCase(addLeadAction.pending, (state: InitialLeadState) => {
      state.isLoading = true
    })
    .addCase(addLeadAction.fulfilled, (state: InitialLeadState, { payload }) => {
      state.isLoading = false
    })
    .addCase(addLeadAction.rejected, (state: InitialLeadState) => {
      state.isLoading = false
    }).addCase(getSearchLeadAction.pending, (state: InitialLeadState) => {
    })
    .addCase(getSearchLeadAction.fulfilled, (state: InitialLeadState, { payload }) => {
      if (payload) {
        state.list = payload?.data
        state.total = payload?.total
        state.previousPageUrl = payload.prev_page_url
        state.nextPageUrl = payload.next_page_url
        state.page = payload?.current_page
      }
      else {
        state.list = []
       state.total= constant.page.defaultTotal
        state.page=constant.page.defaultNumber
        state.limit= constant.page.size
        state.error = Strings.noMatchFound
      }
      state.isLoading = false
    })
    .addCase(getSearchLeadAction.rejected, (state: InitialLeadState) => {
      state.isLoading = false
    })
  }
})

export const LeadReducer = slice.reducer
export const LeadActions = slice.actions
