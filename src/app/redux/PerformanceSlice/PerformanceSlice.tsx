import {createSlice} from '@reduxjs/toolkit'
import data from 'app/assets/data/Performance.json'
import { initialPerformanceState } from './PerformanceTypes'
import constant from 'config/const/const'

const Performance = [...data.performance]
const PerformanceUser =data['performance.user']

const initialState: initialPerformanceState = {
  total: constant.page.defaultTotal,
  limit: 0,
  isLoading: false,
  page: constant.page.defaultNumber,
  error: '',
  client: '',
  project: '',
  list: Performance,
  userList:PerformanceUser
}
const slice = createSlice({
  name: 'performance',
  initialState,
  reducers: {},
})

export const PerformanceReducer = slice.reducer
export const PerformanceActions = slice.actions
