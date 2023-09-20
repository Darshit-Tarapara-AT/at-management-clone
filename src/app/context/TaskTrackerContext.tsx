import React, {
  FC,
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import {getAllTasksActions, getIndividualTaskAction, getSearchTaskAction, startAndStopTaskAction} from 'app/redux/TaskSlice/TaskAsyncThunk'
import {getUserToken} from 'services/AuthServices'
import {useSelector} from 'react-redux'
import {IRootState, useAppDispatch} from 'app/redux/store'
import { useLocation, useParams } from 'react-router-dom'
import { TaskActions } from 'app/redux/TaskSlice/TaskSlice'
import constant from 'config/const/const'
import { TaskResponseFields } from 'app/redux/TaskSlice/TaskType'
import { PATHS } from 'config/paths/paths'
import { getRecentTasksAction } from 'app/redux/DashboardSlice/DashboardAyscThunk'
import { DashboardActions } from 'app/redux/DashboardSlice/DashboardSlice'

type TaskContextPropsState = {
  onStart: (taskStatus: string, taskId: number) => void
  onStop: (taskStatus: string, taskId: number) => void
  status: string
}

interface WithChildren {
  children: ReactNode
}
const initTaskContextPropsState = {
  onStart: () => {},
  onStop: () => {},
  status: '',
}
export const taskTrackerChangeStage = {
  pending: 'pending',
  inProgress: 'inProgress',
  success: 'success',
  error: 'error',
}

interface TaskTrackerResponse {
  status: boolean;
  message: string;
  data: {
    total: number;
    data: TaskResponseFields;
    prev_page_url: string;
    next_page_url: string;
    current_page: number
  }
}

export const TaskTrackerContext = createContext<TaskContextPropsState>(initTaskContextPropsState)

const useTaskTracker = () => {
  return useContext(TaskTrackerContext)
}

const TaskTrackerProvider: FC<WithChildren> = ({children}) => {
  const dispatch = useAppDispatch()
  const {pathname} = useLocation()
  const {taskId} = useParams();
  const token = getUserToken()
  const {currentProjectId} = useSelector((state: IRootState) => state.ProjectStateData)
  const {pending, inProgress, success} = taskTrackerChangeStage
  const [status, setStatus] = useState(pending)
  useEffect(() => {
    if (token && currentProjectId && pathname?.includes(constant.taskPathEndPoints.taskList)) {
      dispatch(getAllTasksActions({ token, page: constant.page.defaultNumber, projectId: currentProjectId?.toString() }));
    }
    return () => {
      dispatch(TaskActions.updateDuplicateListWhenBulkOperationComplete([]))
    }
  }, [dispatch, token, currentProjectId, pathname]);

  const callStartAndStopAPI = (taskStatus: string, currentTaskID: number) => {
      setStatus(inProgress)
      dispatch(
        startAndStopTaskAction({
          task_status: taskStatus,
          taskId: currentTaskID,
          projectId: currentProjectId?.toString(),
          token
        })
      ).then((res) => {
        const data = res?.payload as TaskTrackerResponse
        if (data?.status) {
          if(pathname === PATHS.dashboard.list) {
            dispatch(getRecentTasksAction({token})).then(() => {
              setStatus(success)
            })
          }
          else {
            dispatch(TaskActions.updateTaskList(data?.data));
            setStatus(success)
            if(taskId) {
              getSpecificTask(Number(taskId));
             }
          }
        }
      })
  }

  const getSpecificTask = (id: number) => {
    dispatch(getIndividualTaskAction({
      token,
      id
    })).then((res) => {
      if(res.payload) {
        dispatch(TaskActions.updateSpecificPTask(res.payload?.data));
        setStatus(success);
      }
    })
  }

  const startTaskTracker = (taskStatus: string, taskId: number) => {
    callStartAndStopAPI(taskStatus, taskId)
  }

  const stopTaskHandler = (taskStatus: string, taskId: number) => {
    callStartAndStopAPI(taskStatus, taskId)
  }

  const values = {
    status,
    onStart: startTaskTracker,
    onStop: stopTaskHandler,
  }
  return <TaskTrackerContext.Provider value={values}>{children}</TaskTrackerContext.Provider>
}

export {TaskTrackerProvider, useTaskTracker}
