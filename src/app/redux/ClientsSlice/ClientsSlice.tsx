import { createSlice } from '@reduxjs/toolkit';
import {  InitialClientState } from './ClientsTypes';
import data from 'app/assets/data/clients.json';
import { getAllClientAction, getIndividualClientAction, getSearchClientsAction } from './ClientsAyscThunk';
import { Strings } from 'app/resource/Strings';
import constant from 'config/const/const';
const clientData = [...data.clients];

const initialState: InitialClientState = {
  list: clientData,
  tempList: [],
  isLoading: false,
  page: constant.page.defaultNumber,
  total :  constant.page.defaultTotal,
  nextPageUrl: null,
  duplicateList: [],
  isSuccess: false,
  isClientSideBarLinkClicked: false,
  error: '',
  previousPageUrl: null,
  limit: constant.page.size,
}
const slice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    toggleSideBarMenu(state,action) {
      state.isClientSideBarLinkClicked = action.payload;
    },
    editClientItems(state, action) {
      state.list = action.payload
    },
    setLoadingState(state) {
      state.isLoading = true
    },
    setCurrentPageSize(state, action){
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
      state.isLoading = false;
      state.isSuccess = false;
      state.list = [...state.duplicateList];
    },
    resetErrorState(state) {
      state.error = ''
    },
  },extraReducers:(builder) => {
    builder
    .addCase(getAllClientAction.pending, (state: InitialClientState) => {
      state.isLoading = true
    })  
    .addCase(getAllClientAction.fulfilled, (state: InitialClientState, { payload }) => {
      if(payload) {
        state.list = payload?.data
        state.total = payload?.total
        state.previousPageUrl = payload.prev_page_url
        state.duplicateList = payload?.data
        state.nextPageUrl = payload.next_page_url
        state.page = payload?.current_page
      }
      else {
        state.list = []
      }
      state.isLoading = false
    
    })
    .addCase(getAllClientAction.rejected, (state: InitialClientState) => {
      state.isLoading = false
    }).addCase(getSearchClientsAction.pending, (state: InitialClientState) => {
    })
    .addCase(getSearchClientsAction.fulfilled, (state: InitialClientState, { payload }) => {
      if (payload) {
        state.list = payload?.data
        state.total = payload?.total
        state.previousPageUrl = payload.prev_page_url
        state.nextPageUrl = payload.next_page_url
        state.page = payload?.current_page
      }
      else {
        state.list = []
        state.error = Strings.noMatchFound
        state.total =  constant.page.defaultTotal
        state.page = constant.page.defaultNumber
        state.limit=  constant.page.size
      }
      state.isLoading = false
    })
    .addCase(getSearchClientsAction.rejected, (state: InitialClientState) => {
      state.isLoading = false
    }).addCase(getIndividualClientAction.pending, (state: InitialClientState) => {
      state.isLoading = true
    })
    .addCase(getIndividualClientAction.fulfilled, (state: InitialClientState, { payload }) => {
      state.isLoading = false
    })
    .addCase(getIndividualClientAction.rejected, (state: InitialClientState) => {
      state.isLoading = false
    })
  }
  
})

export const clientsReducer = slice.reducer
export const clientsActions = slice.actions
