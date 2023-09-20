import { createSlice } from '@reduxjs/toolkit'
import { AttendanceCalendarResponseFields, InitialAttendanceState, MonthlyAnalysisResponsePayload } from './AttendanceTypes';
import attendanceData from "app/assets/data/attendancetaskcorrection.json"
import { getAllHolidayListAction, getUserAttendanceCalendarDataAction, getUserAttendanceCalendarListAction } from './AttendanceAyscThunk';
import constant from 'config/const/const';
import { Strings } from 'app/resource/Strings';
import { PageLink } from '_metronic/layout/core';
import { PATHS } from 'config/paths/paths';

export const userAttendanceBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
]

export const masterAttendanceBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.masterAttendance,
    path: PATHS.attendance.masterList,
    isSeparator: false,
    isActive: false,
  },
]

const initialState: InitialAttendanceState = {
  list: [],
  calenderDetails: [],
  isAttendanceDataFetched: false,
  holidayList: [],
  masterList: attendanceData["attendance.masterList"],
  taskCorrectionList: attendanceData["attendance.correction"],
  analysisData: [],
  page: constant.page.defaultNumber,
  total: constant.page.defaultTotal,
  limit: constant.page.size,
  attendanceCalendarBreadcrumbs: userAttendanceBreadcrumbs,
  error: "",
  attendanceMontlyData: [],
  monthlyLeaveData: [],
  previousPageUrl: null,
  nextPageUrl: null,
  isLoading: false
}
const slice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    resetCalenderDetails(state) {
      state.calenderDetails = []
    },
    setLoadingState(state) {
      state.isLoading = true
    },
    resetMasterListDetails(state) {
      state.masterList = []
      state.isLoading = false
    },
    updateAttendanceBreadcrumbs(state, action) {
      state.attendanceCalendarBreadcrumbs = action.payload
    },
    setCurrentPageSize(state, action) {
      state.limit = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserAttendanceCalendarDataAction.pending, (state, {payload} ) => {
    state.isAttendanceDataFetched = true
    })
    .addCase(getUserAttendanceCalendarDataAction.fulfilled, (state, {payload} ) => {
      const response  = payload as  {
        data: AttendanceCalendarResponseFields[],
        analysisData: MonthlyAnalysisResponsePayload[]
        attendanceMontlyData: MonthlyAnalysisResponsePayload[]
        leaveMontlyData:MonthlyAnalysisResponsePayload[]
      }
      if(response?.data?.length > 0) {
        state.calenderDetails = response?.data
        state.analysisData = response?.analysisData
        state.attendanceMontlyData = response?.attendanceMontlyData
        state.monthlyLeaveData = response?.leaveMontlyData
      }
      state.isAttendanceDataFetched = false
    })
    .addCase(getUserAttendanceCalendarDataAction.rejected, (state, {payload} ) => {
      state.isAttendanceDataFetched = false
    })


    builder.addCase(getUserAttendanceCalendarListAction.pending, (state, {payload} ) => {
      state.isAttendanceDataFetched = true
      })

      .addCase(getUserAttendanceCalendarListAction.fulfilled, (state, {payload} ) => {
        if(payload?.data) {
          state.masterList = payload?.data
          state.previousPageUrl = payload?.prev_page_url
          state.nextPageUrl = payload?.next_page_url
          state.page = payload?.current_page
          state.total = payload?.total
          state.limit = payload?.per_page
        }
        else {
          state.masterList = payload?.data
          state.previousPageUrl = payload?.prev_page_url
          state.nextPageUrl = payload?.next_page_url
          state.page = payload?.current_page
          state.total = payload?.total
          state.limit = constant.page.size
        }
        state.isAttendanceDataFetched = false
      })

      .addCase(getUserAttendanceCalendarListAction.rejected, (state, {payload} ) => {
        state.isAttendanceDataFetched = false
      })

    builder.addCase(getAllHolidayListAction.pending, (state, {payload} ) => {
      state.isAttendanceDataFetched = true
      })
      .addCase(getAllHolidayListAction.fulfilled, (state, {payload} ) => {
        if(payload?.data) {
          state.holidayList = payload?.data
          state.total = payload?.total
          state.limit = payload?.per_page
          state.page = payload?.current_page
        }
        else {
          state.holidayList = []
          state.error = Strings.noMatchFound
          state.total =  constant.page.defaultTotal
          state.page = constant.page.defaultNumber
          state.limit = constant.page.size
        }
         state.isAttendanceDataFetched = false
       })
       .addCase(getAllHolidayListAction.rejected, (state, {payload} ) => {
         state.isAttendanceDataFetched = false
       })
  },
})

export const AttendanceReducer = slice.reducer
export const AttendanceActions = slice.actions
