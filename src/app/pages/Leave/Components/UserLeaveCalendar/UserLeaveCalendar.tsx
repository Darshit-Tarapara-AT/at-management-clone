import {PageLink, PageTitle} from '_metronic/layout/core'
import {Card} from 'app/Components/Card/Card'
import Calendar from 'app/Components/Fullcalendar/Fullcalendar'
import {Loader} from 'app/Components/Loader/Loader'
import {getUserLeaveCalendarDataAction} from 'app/redux/LeaveSlice/LeaveAyscThunk'
import {IRootState, useAppDispatch} from 'app/redux/store'
import {Strings} from 'app/resource/Strings'
import {PATHS} from 'config/paths/paths'
import moment from 'moment'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import {getUserToken} from 'services/AuthServices'

const LeaveBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
]

const UserLeaveCalendar = () => {
  const dispatch = useAppDispatch()
  const {leaveCalendarData, isLoading} = useSelector((state: IRootState) => state.leaveStateData)
  const {year, month} = useParams()
  const navigator = useNavigate()
  const showPreviousYearData = (month: number, year: number) => {
    const path = PATHS.leave.userCalender
      ?.replace(':month', `${month}`)
      ?.replace(':year', `${year}`)
    navigator(path)
  }
  const token = getUserToken()
  useEffect(() => {
    if (month && year && token) {
      dispatch(
        getUserLeaveCalendarDataAction({
          token,
          month,
          year,
          view: 'month',
        })
      )
    }
  }, [month, year, token, dispatch])

  let previousStartDate: string[] = []
  let previousEndDates: string[] = []
  let previousTitle: string[] = []
  const calendar =
    leaveCalendarData.length > 0
      ? leaveCalendarData.map((event) => {
          const endDate = new Date(event.end)
          endDate.setDate(endDate.getDate() + 1)
          if (
            previousStartDate.includes(event.start) &&
            previousTitle.includes(event.title) &&
            previousEndDates.includes(event.end)
          ) {
            return {
              ...event,
              title: '',
              className: ['hide-line '],
            }
          }
          previousTitle.push(event.title)
          previousEndDates.push(event.end)
          previousStartDate.push(event.start)
          return {
            ...event,
            title: event.leaveType === 'Absent' ? event.title : '',
            backgroundColor: event.backgroundColor,
            end: moment(endDate).format('YYYY-MM-DD'),
            classNames :event?.backgroundColor ? [] : ['blank-event-border'],
            display: ((event.title !== '') && (event.backgroundColor !== '') && (event.leaveType === '')) ? 'background' : '',
          }
        })
      : []

  const currentMonth = month && Number(month) < 10 ? `0${month}` : `${month}`

  return (
    <>
      <PageTitle breadcrumbs={LeaveBreadcrumbs}>{Strings.leaveCalender}</PageTitle>
      {calendar.length === 0 || isLoading ? (
        <Loader />
      ) : (
        <Card>
          <div className='card-body'>
            <Calendar
              data={calendar}
              initialDate={`${year}-${currentMonth}-01`}
              onNextOrPrevClick={showPreviousYearData}
            />
          </div>
        </Card>
      )}
    </>
  )
}

export default UserLeaveCalendar
