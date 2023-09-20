import React, {useCallback, useEffect, useRef} from 'react'
import './Fullcalender.scss'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import {MyAttendanceCalenderProps} from 'app/pages/Attendance/modal'
import {PATHS} from 'config/paths/paths'
import Style from 'config/colors/colors'

  const Calendar: React.FC<MyAttendanceCalenderProps> = ({
  data,
  initialDate,
  onDateSelected,
  onNextOrPrevClick,
  userId
}) => {
  const calendarRef = useRef<FullCalendar>(null)
  const nextOrPrevClickHandler = useCallback(() => {

    if (onNextOrPrevClick && calendarRef?.current?.getApi().view.currentStart) {
      const currenDate = calendarRef?.current?.getApi().view.currentStart
      const year = currenDate?.getFullYear()
      const month = currenDate?.getMonth() +1
      onNextOrPrevClick(month , year)
    }
  }, [onNextOrPrevClick])
  /**
   * THis events used for showing any actions on any calender
   * @param selectInfo
   *
   */
  const handleDateSelect = (selectInfo: any) => {
    if (!onDateSelected) return
    const selectedDate = selectInfo?.start
    const year = selectedDate?.getFullYear()
    const month = selectedDate?.getMonth() + 1
    let viewTaskEntryPath = ''
    if(userId) {
      viewTaskEntryPath = PATHS?.attendance?.masterTaskEntry
      ?.replace(':month', `${month}`)
      ?.replace(':year', `${year}`)
      .replace(':date', `${selectedDate?.getDate()}`)
      .replace(':userId', `${userId}`)
    }
    else {
     viewTaskEntryPath = PATHS?.attendance?.taskEntry
      ?.replace(':month', `${month}`)
      ?.replace(':year', `${year}`)
      .replace(':date', `${selectedDate?.getDate()}`)
    }

    onDateSelected(viewTaskEntryPath)
  }
 
  return (
    <div className='demo-app'>
      <div className='demo-app-main'>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectAllow = {(e) => {
            const hasUserComeOnHoliday = data?.find((item) => item.title && item.start === e.startStr);
            const hasHoliday = data?.find((item) => item?.backgroundColor === Style.attendanceCalendarBackground.holidayColor && item.start === e.startStr);
             /**
             * This condition applies for weekend and holiday
             * If user come to the holiday or weekend then it is select that date else not
             */
            if(!hasUserComeOnHoliday || hasHoliday) {
              return false
            }
            return true
          }}
          firstDay={1}
          initialDate={initialDate}
          customButtons={{
            prev: {
              text: '<',
              click: function () {
                if (calendarRef.current) {
                  calendarRef?.current?.getApi().prev()
                  nextOrPrevClickHandler()
                }
              },
            },
            next: {
              text: '>',
              click: function () {
                if (calendarRef.current) {
                  calendarRef?.current?.getApi().next()
                  nextOrPrevClickHandler()
                }
              },
            },
            today: {
              text: 'Today',
              click: function () {
                if (calendarRef.current) {
                  calendarRef?.current?.getApi().today()
                  nextOrPrevClickHandler()
                }
              },
            },
          }}
          startParam=''
          themeSystem={'standard'}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={data} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
        />
      </div>
    </div>
  )
}

function renderEventContent(eventInfo: any) {
  const splitTitle = eventInfo.event.title?.split(',')

  return (
    <div className={`${eventInfo?.event?.classNames[1]}`}>
      <b>{eventInfo.timeText}</b>
      {splitTitle?.length > 0 ? (
        splitTitle?.map((item: string, index: number) => {
          return (
            <div key={`${index}`}>
              <i className={`${eventInfo?.event?.classNames[0]}`}>{item}</i>
            </div>
          )
        })
      ) : (
        <i className={`${eventInfo?.event?.classNames[0]}`}>{splitTitle}</i>
      )}
    </div>
  )
}
export default Calendar
