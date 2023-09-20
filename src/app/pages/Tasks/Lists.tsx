import { Strings } from 'app/resource/Strings'
import React, { useEffect } from 'react'
import { PageLink, PageTitle } from '_metronic/layout/core'
import {TaskListing} from './Components/TaskListing/TaskListing'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { Loader } from 'app/Components/Loader/Loader'
import { PATHS } from 'config/paths/paths'
import { getUserToken } from 'services/AuthServices'
import { getAllTasksActions } from 'app/redux/TaskSlice/TaskAsyncThunk'
import constant from 'config/const/const'
import { TASK_DETAILS_KEY } from './Components/TaskTracker/TaskTracker'
import { TaskActions } from 'app/redux/TaskSlice/TaskSlice'
import { getItem } from 'app/utils/storage'
import { useLocation } from 'react-router-dom'


const Lists = () => {
  const { isLoading, currentTaskPath } = useSelector((state: IRootState) => state.TaskStateData);
  const { currentProjectId } = useSelector((state: IRootState) => state.ProjectStateData);
  const dispatch = useDispatch()
  const {pathname} = useLocation()
  useEffect(() => {
      dispatch(TaskActions.setDynamicallyCurrentPath(PATHS.task.list?.replace(":id", currentProjectId?.toString())));
  }, [pathname])

  return (
    <>
    {isLoading ? <Loader /> : <>
      {/* <PageTitle breadcrumbs={taskBreadcrumbs}>{Strings.taskListing}</PageTitle> */}
      <TaskListing />
    </>}
    </>
  )
}
export default Lists;
