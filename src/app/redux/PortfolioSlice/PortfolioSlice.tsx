import {createSlice,isAnyOf} from '@reduxjs/toolkit'
import {initialPortfolioState} from './PortfolioTypes'
import { getIndividualPortfolioAction, getPortfolio, getPortfolioAction, getSearchPortfolioAction } from './PortfolioAyscThunk'
import { Strings } from 'app/resource/Strings'
import constant from 'config/const/const'

const initialState: initialPortfolioState = {
  isLoading: false,
  hasSearchEmpty: false,
  duplicateList: [],
  total: constant.page.defaultTotal,
  previousPageUrl: null,
  nextPageUrl: null,
  module: [],
  isSuccess: false,
  page: constant.page.defaultNumber,
  error: '',
  limit: constant.page.size,
  list: [],
  portfolioListProperties: []
}
const slice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setLoadingState(state) {
      state.isLoading = true
    },
    setCurrentPageSize(state, action) {
      state.limit = action.payload
    },
    setCurrentPage(state, action) {
      state.page = action.payload
    },

    resetState(state) {
      state.isLoading = false
      state.isSuccess = false
      state.list = []
      state.error = ''
    },
  },
  extraReducers: (builder) =>{
    builder
      .addMatcher(isAnyOf(getPortfolio.pending), (state: initialPortfolioState) => {
        state.isLoading = true
      })
      .addMatcher(isAnyOf(getPortfolio.fulfilled), (state: initialPortfolioState, {payload}) => {
        if (payload?.data) {
          state.portfolioListProperties = payload?.data
        }else {
          state.portfolioListProperties =[]

        }
        state.isLoading = false
      })
      .addMatcher(isAnyOf(getPortfolio.rejected), (state: initialPortfolioState, payload) => {
        state.isLoading = false
      })

      .addMatcher(isAnyOf(getIndividualPortfolioAction.pending), (state: initialPortfolioState) => {
        state.isLoading = true
      })
      .addMatcher(isAnyOf(getIndividualPortfolioAction.fulfilled), (state: initialPortfolioState, {payload}) => {
        if (payload) {
          state.portfolioListProperties = payload?.data?.data
        }
        state.isLoading = false
      })
      .addMatcher(isAnyOf(getIndividualPortfolioAction.rejected), (state: initialPortfolioState, payload) => {
        state.isLoading = false
      })


      .addMatcher(isAnyOf(getSearchPortfolioAction.pending), (state: initialPortfolioState) => {
        state.isLoading = true
      })
      .addMatcher(isAnyOf(getSearchPortfolioAction.fulfilled), (state: initialPortfolioState, {payload}) => {
        if (payload?.data) {
          state.list = payload?.data
          state.total = payload?.total
          state.duplicateList = payload?.data
          state.previousPageUrl = payload.prev_page_url
          state.nextPageUrl = payload.next_page_url
          state.page = payload?.current_page
          state.limit = payload?.per_page
        }else {
          state.list = []
          state.error = Strings.noMatchFound
          state.limit = constant.page.size;
          state.total = constant.page.defaultTotal;
          state.page = constant.page.defaultNumber

        }
        state.isLoading = false
      })
      .addMatcher(isAnyOf(getSearchPortfolioAction.rejected), (state: initialPortfolioState, payload) => {
        state.isLoading = false
      })
    },
})

export const portfolioReducer = slice.reducer
export const portfolioActions = slice.actions
