import {IRootState, useAppDispatch} from 'app/redux/store'
import {Fragment, useEffect} from 'react'
import {Outlet, useLocation, useParams} from 'react-router-dom'
import {getUserToken} from 'services/AuthServices'
import {
  getAllHolidayListAction,
  getUserAttendanceCalendarDataAction,
} from 'app/redux/AttendanceSlice/AttendanceAyscThunk'
import {getSingleTaskEntryAction, taskCorrectionRequestAction} from 'app/redux/TaskSlice/TaskAsyncThunk'
import constant from 'config/const/const'
import {TaskActions} from 'app/redux/TaskSlice/TaskSlice'
import {useSelector} from 'react-redux'
import {AttendanceActions} from 'app/redux/AttendanceSlice/AttendanceSlice'
import {PATHS} from 'config/paths/paths'
import { getAllProjectsAction } from 'app/redux/ProjectSlice/ProjectAyscThunk'

const AttendanceLayOut = () => {
  const dispatch = useAppDispatch()
  const {currentUserProfileDetails} = useSelector((state: IRootState) => state.UserStateData)
  const {list, total} = useSelector((state: IRootState) => state.ProjectStateData)
  const {calenderDetails} = useSelector((state: IRootState) => state.AttendanceStateData)
  const {pathname} = useLocation()
  const {month, year, date, userId} = useParams()
  const token = getUserToken()
  useEffect(() => {
    if (month && year && token && calenderDetails.length === 0 ) {
      dispatch(
        getUserAttendanceCalendarDataAction({
          token,
          month,
          year,
          view: 'month',
          userId: userId ? Number(userId) : currentUserProfileDetails?.id,
        })
      )
    }
  }, [month, year, token, dispatch, userId, calenderDetails])
  // useEffect(() => {
  //   if(list?.length === 0) {
  //     dispatch(
  //       getAllProjectsAction({
  //         token,
  //         status: 'active',
  //         userId: currentUserProfileDetails?.id,
  //         limit: constant.page.maxSize,
  //         page: constant.page.defaultNumber,
  //       })
  //     )
  //   }
  // }, [dispatch, currentUserProfileDetails?.id])
  useEffect(() => {
    if (pathname === PATHS.attendance.holiday.list && token) {
      dispatch(
        getAllHolidayListAction({
          token,
          page: constant.page.defaultNumber,
          size: constant.page.size,
        })
      )
    }
  }, [pathname])

  useEffect(() => {
    if (month && year && token && date) {
      dispatch(
        getSingleTaskEntryAction({
          token,
          page: 1,
          date,
          month,
          size: '',
          year,
          user_id: userId ? Number(userId) : currentUserProfileDetails?.id,
        })
      ).then(() => {
          dispatch(taskCorrectionRequestAction({
            token,
            page: 1,
            fromDate: '',
            toDate: '',
            userId: userId && (userId !== "0" || Number(userId) !== 0) ? userId : currentUserProfileDetails?.id?.toString(),
            status: '',
            queryFilter: '',
          }))
      })
    }
    return () => {
      dispatch(TaskActions.resetState())
    }
  }, [month, year, userId, token, dispatch, date, currentUserProfileDetails?.id?.toString()])
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  )
}

export {AttendanceLayOut}
