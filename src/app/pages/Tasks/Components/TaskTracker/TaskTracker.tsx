/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPause, faPlay} from '@fortawesome/free-solid-svg-icons'
import {Strings} from 'app/resource/Strings'
import { TaskTrackerContext, taskTrackerChangeStage } from 'app/context/TaskTrackerContext'
import { useDispatch, useSelector } from 'react-redux'
import { TaskActions } from 'app/redux/TaskSlice/TaskSlice'
import { IRootState } from 'app/redux/store'
interface TaskTrackerProps {
  hasListingPage?: boolean
  taskId: number
  onUpdateTask?: (id: number) => void
  userId: number
  hasTaskStart?: boolean
}
const START_TRACKER = 'start'
const END_TRACKER = 'stop'
export const TASK_DETAILS_KEY = 'taskDetails';

const TaskTracker: React.FC<TaskTrackerProps> = ({
  hasListingPage,
  taskId,
  hasTaskStart
}) => {
  const dispatch = useDispatch()
  const { activeTaskId} = useSelector((state: IRootState) => state.TaskStateData)
const {status, onStart, onStop} = useContext(TaskTrackerContext)
  const iconStyle = {
    margin: '0px 5px',
  }

  const startTaskChangeHandler = () => {
    dispatch(TaskActions.setActiveTaskId(taskId))
      onStart(START_TRACKER, taskId)
  }

  const stopTaskHandler = () => {
    onStop(END_TRACKER, taskId)
  }

  const taskListing = () => {
    return !hasTaskStart ? (
      <span
        className='btn btn-icon btn-bg-success btn-color-light btn-sm me-1 action-btn'
        title={Strings.startTask}
        id='startTask'
        onClick={startTaskChangeHandler}
      >
        <FontAwesomeIcon
          icon={faPlay}
          data-toggle='tooltip'
          className='svg-icon svg-icon-3 btn-color-light'
          title={Strings.startTask}
          titleId='startTask'
        />
      </span>
    ) : (
      <span
        className='btn btn-icon btn-bg-danger btn-color-light btn-sm me-1 action-btn'
        title={Strings.stopTask}
        id='stopTask'
        onClick={stopTaskHandler}
      >
        <FontAwesomeIcon
          icon={faPause}
          data-toggle='tooltip'
          className='svg-icon svg-icon-3 btn-color-light'
          title={Strings.stopTask}
          titleId='stopTask'
        />
      </span>
    )
  }

  if (status === taskTrackerChangeStage.inProgress && Number(activeTaskId) === taskId ) {
    return (
      <span className='btn btn-icon btn-bg-warning btn-color-light btn-sm me-1 action-btn'>
        <span className='spinner-border spinner-border-sm align-middle'></span>
      </span>
    )
  }

  return (
    <>
      {hasListingPage ? (
        taskListing()
      ) : (
        <>
          {!hasTaskStart ? (
            <button
              type='button'
              className='btn btn-sm btn-success mt-3'
              onClick={startTaskChangeHandler}
            >
              {Strings.startTask}
              <FontAwesomeIcon icon={faPlay} style={iconStyle} />
            </button>
          ) : (
            <button type='button' className='btn btn-sm btn-danger mt-3' onClick={stopTaskHandler}>
              {Strings.stopTask}
              <FontAwesomeIcon icon={faPause} style={iconStyle} />
            </button>
          )}
        </>
      )}
    </>
  )
}

export default TaskTracker