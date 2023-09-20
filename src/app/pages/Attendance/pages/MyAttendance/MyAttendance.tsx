import Calendar from 'app/Components/Fullcalendar/Fullcalendar'
import React, {useEffect, useMemo} from 'react'
import MonthlyAnalysis from '../../components/MontlyAnalysis/MontlyAnalysis'
import {Card} from 'react-bootstrap'
import {Strings} from 'app/resource/Strings'
import Style from 'config/colors/colors'
import {useNavigate, useParams} from 'react-router-dom'
import {PATHS} from 'config/paths/paths'
import {PageLink, PageTitle} from '_metronic/layout/core'
import {useDispatch, useSelector} from 'react-redux'
import {IRootState} from 'app/redux/store'
import {Loader} from 'app/Components/Loader/Loader'
import { AttendanceActions, masterAttendanceBreadcrumbs, userAttendanceBreadcrumbs } from 'app/redux/AttendanceSlice/AttendanceSlice'
let eventGuid = 0


export const getTitleAndColor = (minutes: number = -1) => {
  const data = {
    color: '',
    title: '',
  }
  if (minutes <= 270) {
    data['title'] = Strings.halfDay
    data['color'] = Style.attendanceCalendarBackground.halfDay
  }
  if (minutes > 270 && minutes <= 480) {
    data['title'] = Strings.earlyLeave
    data['color'] = Style.attendanceCalendarBackground.earlyLeave
  }
  if (minutes > 480) {
    data['title'] = Strings.fullDay
    data['color'] = Style.attendanceCalendarBackground.fullDay
  }
  if (minutes === 0) {
    data['title'] = Strings.absent
    data['color'] = Style.attendanceCalendarBackground.absent
  }
  if (minutes < 0) {
    data['title'] = 'Diwali'
    data['color'] = Style.attendanceCalendarBackground.holidayColor
  }

  return data
}
//Feat(ATM, Attendance) : :Change the analysisData structure when API side will done;
export function createEventId() {
  return String(eventGuid++)
}
const salaryRelateFields = ["Official Working Days", "Actual Present Days", "Total Payable Days", "Salary", "Leave Adjustment Days"]
const MyAttendance = () => {
  const dispatch = useDispatch()
  const {userId} = useParams()
  const {calenderDetails, isAttendanceDataFetched, analysisData,attendanceMontlyData,monthlyLeaveData: leaveMontlyData, attendanceCalendarBreadcrumbs} = useSelector(
    (state: IRootState) => state.AttendanceStateData
  )
  const navigator = useNavigate()

  useEffect(() => {
    if(userId) {
      dispatch(AttendanceActions.updateAttendanceBreadcrumbs(masterAttendanceBreadcrumbs))
    }else {
      dispatch(AttendanceActions.updateAttendanceBreadcrumbs(userAttendanceBreadcrumbs))
    }
  },[userId])
  const redirectToTaskEntryPage = (path: string) => {
    dispatch(AttendanceActions.resetCalenderDetails())
    navigator(path)
  }

  const calendar = useMemo(() => {
    if (calenderDetails.length === 0) return []
    const data = calenderDetails?.map((details, index) => {
      return {
        ...details,
        display: details?.backgroundColor ? 'background' : '',
        classNames: details?.backgroundColor ? ['title'] : ['blank-event-border'],
      }
    })
    return data
  }, [calenderDetails])

  const showPreviousYearData = (month: number, year: number) => {
    dispatch(AttendanceActions.resetCalenderDetails())
    let path = ''
    if(userId) {
      path = PATHS.attendance.masterAttendanceCalender.replace(':month', `${month}`)?.replace(':year', `${year}`)?.replace(':userId', `${userId}`)
    }
    else {
      path = PATHS.attendance.attendance?.replace(':month', `${month}`)?.replace(':year', `${year}`)
    }
    navigator(path)
  }

  const leftSideData = attendanceMontlyData
    ?.filter((item, index) => salaryRelateFields?.includes(item.label))
    ?.map((item) => {
      if (item?.label?.toLocaleLowerCase()?.includes(Strings.salary.toLocaleLowerCase())) {
        return {
          ...item,
          value: `${item.value} %`,
        }
      }
      return item
    })
  const rightSideData = leaveMontlyData?.filter((item, index) => {
    return !salaryRelateFields?.includes(item.label)
  }).map((item) => {
    if(item.label === "Late Entry Time") {
      return {
        ...item,
        label: Strings.lateEntry
      }
    }
    if(item.label === "Paid Leave") {
      return {
        ...item,
        label: Strings.leave
      }
    }
    return item
  })

  return (
    <>
      <PageTitle breadcrumbs={attendanceCalendarBreadcrumbs}>{Strings.attendance}</PageTitle>
      {(isAttendanceDataFetched || calendar?.length === 0)   ? (
        <Loader />
      ) : (
        <>
          <Card style={{border: '0px'}}>
            <div className='card-body'>
              <Calendar
                data={calendar}
                userId={userId}
                onDateSelected={redirectToTaskEntryPage}
                onNextOrPrevClick={showPreviousYearData}
                initialDate={calendar[0]?.start}
              />
            </div>
          </Card>
          <div className='row g-5 g-xl-8 mt-5'>
            <div className='page-title d-flex flex-column justify-content-center flex-wrap me-3'>
              <h1 className='page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0'>
                {Strings.monthlyAnalysis}
              </h1>
            </div>
            <MonthlyAnalysis data={leftSideData} />
            <MonthlyAnalysis data={rightSideData} />
          </div>
        </>
      )}
    </>
  )
}

export default MyAttendance
