import React, {
  FC,
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import {getUserToken} from 'services/AuthServices'
import {useSelector} from 'react-redux'
import {IRootState, useAppDispatch} from 'app/redux/store'
import constant from 'config/const/const'
import Style from 'config/colors/colors'
import {getSingleTaskEntryAction} from 'app/redux/TaskSlice/TaskAsyncThunk'
import {SingleTaskEntryResponsePayload} from 'app/redux/TaskSlice/TaskType'

type TimeTrackerContextPropsState = {
  taskTrackHour: number
  processContainerBackground: string
  width: string
  onRefresh: () => void
}

interface WithChildren {
  children: ReactNode
}
const initTaskContextPropsState = {
  taskTrackHour: 0,
  processContainerBackground: '',
  width: '0%',
  status: '',
  onRefresh: () => {}
}

export const TimeTrackerContext =
  createContext<TimeTrackerContextPropsState>(initTaskContextPropsState)

const useTimeTracker = () => {
  return useContext(TimeTrackerContext)
}

const TimeTrackerProvider: FC<WithChildren> = ({children}) => {
  const dispatch = useAppDispatch()
  const token = getUserToken()
  const [taskTrackMinutes, setTaskTrackMinutes] = useState(0)
  const {taskEntry} = useSelector((state: IRootState) => state.TaskStateData)
  const {currentUserProfileDetails} = useSelector((state: IRootState) => state.UserStateData)
  const {fullday_minutes, halfday_minutes, earlyday_minutes, id} = currentUserProfileDetails

  const getLatestTaskEntry = useCallback(() => {
    const date = new Date()
    const currentMonth = date.getMonth() + 1
    const currentDate = date.getDate()
    const currentYear = date.getFullYear()
    if (currentMonth && currentDate && token && currentYear) {
      dispatch(
        getSingleTaskEntryAction({
          token,
          page: 1,
          date: currentDate?.toString(),
          month: currentMonth?.toString(),
          size: "",
          year: currentYear?.toString(),
          user_id: id
        })
      )
    }
  }, [dispatch, token, id])

  const calculateHours = (data: SingleTaskEntryResponsePayload[]) => {
    return data?.reduce((acc, item) => {
      return (acc += Number(item?.trackedTime))
    }, 0)
  }

  const calculateTrackTime = useCallback(() => {
    const startAndEndTimeTaskEntry = taskEntry?.filter((item) => item?.start_time && item?.end_time)
    const onlyStartTimeTaskEntry = taskEntry?.find((item) => item?.start_time && !item?.end_time)
    let totalTrackTime = 0
    if (onlyStartTimeTaskEntry) {
      const differentMinutes =
         new Date()?.getTime() - new Date(onlyStartTimeTaskEntry?.start_time)?.getTime()
         totalTrackTime = Math.abs(Math.floor(differentMinutes / 60000))
    }
    const totalTimeWithStateAndEndDate = calculateHours(startAndEndTimeTaskEntry) + totalTrackTime
    setTaskTrackMinutes(totalTimeWithStateAndEndDate)
  }, [taskEntry])
  
  useEffect(() => {
    getLatestTaskEntry()
  }, [token, dispatch, getLatestTaskEntry])

  useEffect(() => {
    calculateTrackTime()
  }, [calculateTrackTime])
  const calculateWidth = useCallback((trackedTime: number) => {
    if(trackedTime >= Number(fullday_minutes)) {
        return "100"
    }
    return Math.floor(trackedTime / Number(fullday_minutes) * 100)?.toString()
  },[fullday_minutes])

  const calculateWidthAndSetBackground = useMemo(() => {
    if (taskTrackMinutes <  Number(halfday_minutes)) {
      return {
        width: calculateWidth(taskTrackMinutes),
        processContainerBackground: Style.attendanceCalendarBackground.absent,
      }
    }
    if (
      taskTrackMinutes >= Number(halfday_minutes) &&
      taskTrackMinutes < Number(earlyday_minutes)
    ) {
      return {
        width: calculateWidth(taskTrackMinutes),
        processContainerBackground: Style.attendanceCalendarBackground.halfDay,
      }
    }
    if (
      taskTrackMinutes >= Number(earlyday_minutes) &&
      taskTrackMinutes < Number(fullday_minutes)
    ) {
      return {
        width: calculateWidth(taskTrackMinutes),
        processContainerBackground: Style.attendanceCalendarBackground.earlyLeave,
      }
    }
    if (
      taskTrackMinutes >= Number(fullday_minutes)
    ) {
      return {
        width: calculateWidth(taskTrackMinutes),
        processContainerBackground: Style.attendanceCalendarBackground.fullDay,
      }
    }
  }, [taskTrackMinutes, halfday_minutes, fullday_minutes, earlyday_minutes, calculateWidth])

const refreshTheTimer = () => {
    getLatestTaskEntry()
}
  const values = {
    onRefresh: refreshTheTimer,
    taskTrackHour: taskTrackMinutes,
    width: calculateWidthAndSetBackground?.width + "%" || '0%',
    processContainerBackground: calculateWidthAndSetBackground?.processContainerBackground!,
  }
  return <TimeTrackerContext.Provider value={values}>{children}</TimeTrackerContext.Provider>
}

export {TimeTrackerProvider, useTimeTracker}
