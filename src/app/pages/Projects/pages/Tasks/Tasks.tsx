import constant from 'config/const/const';
import React, { lazy } from 'react'
import { useLocation } from 'react-router'
const TaskForm = lazy(() => import('app/pages/Tasks/Form/Form'));
const TaskListing = lazy(() => import('app/pages/Tasks/Lists'));
const TaskView = lazy(() => import('app/pages/Tasks/View/View'));
const Tasks = () => {
  const {pathname} = useLocation();

  return (
    <>
    {(pathname.includes(constant.taskPathEndPoints.taskAdd) || pathname.includes(constant.taskPathEndPoints.taskEdit)) &&  <TaskForm /> }
    {pathname.includes(constant.taskPathEndPoints.taskList) &&  <TaskListing/>}
    {pathname.includes(constant.taskPathEndPoints.view) &&  <TaskView/>}
    </>
  )
}

export default Tasks