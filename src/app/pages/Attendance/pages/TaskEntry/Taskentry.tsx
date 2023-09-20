/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from 'app/Components/Card/Card'
import { Strings } from 'app/resource/Strings'
import { useSelector } from 'react-redux'
import { IRootState, useAppDispatch } from 'app/redux/store'
import './Taskentry.scss'
import { useFormik } from 'formik'
import { PATHS } from 'config/paths/paths'
import { PageLink, PageTitle, usePageData } from '_metronic/layout/core'
import { getCurrentDateAndTimeAndRedirectToAttendance } from '../MasterList/MasterList'
import {
  SingleTaskEntryResponsePayload,
  TaskEntryCorrectionResponse,
  TaskEntryCorrectionResponsePayload,
  TaskResponseFields,
} from 'app/redux/TaskSlice/TaskType'
import { useNavigate, useParams } from 'react-router-dom'
import { TaskActions } from 'app/redux/TaskSlice/TaskSlice'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faCancel, faEye, faPen } from '@fortawesome/free-solid-svg-icons'
import Style from 'config/colors/colors'
import {
  SELECT_INPUT_KEY,
  TEXT_AREA_KEY,
  allInputsStyles,
} from 'config/InputStyles/InputStyles'
import { Select } from 'baseui/select'
import { Textarea } from 'baseui/textarea'
import { AddTaskCorrectionFormValues, TaskCorrectionFormValues } from 'app/Modal/Modal'
import {
  initialEditTaskCorrectionValue,
  initialAddTaskCorrectionValue,
} from 'app/FormikIntialValues/FormikIntialValues'
import {
  AddTaskCorrectionFormValidationSchema,
  TaskCorrectionFormValidationSchema,
} from 'app/utils/ValidationSchema'
import { SelectInputValue } from 'app/pages/Projects/Components/Modal/Modal'
import { Fragment, useEffect, useState } from 'react'
import {
  addTaskCorrectionRequestAction,
  editTaskCorrectionRequestAction,
  getAllTasksActions,
  getSingleTaskEntryAction,
  updateTaskCorrectionRequestStatusAction,
} from 'app/redux/TaskSlice/TaskAsyncThunk'
import constant from 'config/const/const'
import { getUserToken } from 'services/AuthServices'
import {
  convertToMiliSecondsToMinute,
  convertToYYYYMMDDwithTimeFormat,
  getLastDayOfMonth,
  setColumnBasedOnPermission,
} from 'app/utils/helper'
import { Message } from 'app/utils/AlertMessage'
import { getAllProjectsAction } from 'app/redux/ProjectSlice/ProjectAyscThunk'
import { getSingleDateEntry } from 'services/TaskService'
import { AttendanceActions } from 'app/redux/AttendanceSlice/AttendanceSlice'
import api from 'config/api'
import { CustomTable } from 'app/Components/CustomTable/CustomTable'
import { TimePickerField } from './TimePickerField';
import { TimePickerEdit } from './TimePickerEdit';

const DetailsBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.attendance,
    path: getCurrentDateAndTimeAndRedirectToAttendance(),
    isSeparator: false,
    isActive: true,
  },
]

const TaskEntry = () => {
  const dispatch = useAppDispatch()
  const token = getUserToken()
  const [selectedTaskEntryTimeLineId, setSelectedTaskEntryTimeLineId] = useState(0)
  const [hasTaskCorrectionEdit, setHasTaskCorrectionEdit] = useState(false)
  const { hasTaskCorrectionFormShown, toggleTaskCorrectionForm } = usePageData()
  const { month, year, date, userId } = useParams()
  const {
    taskEntry,
    newTaskEntry,
    taskEntryCorrectionList,
    list: taskList,
    totalTaskTrackRecords,
    currentTaskCorrectionEditRow,
    hasUserEditTaskEntry,
    selectedProjectId,
    selectedProjectTaskList,
    error,
  } = useSelector((state: IRootState) => state.TaskStateData)
  const [taskCorrectionId, setTaskCorrectionId] = useState(0)
  const { currentUserProfileDetails } = useSelector((state: IRootState) => state.UserStateData)
  const { userPermissions } = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const { taskCorrectionList } = useSelector((state: IRootState) => state.TaskStateData)
  const { list } = useSelector((state: IRootState) => state.ProjectStateData)
  const { currentTheme } = useSelector((state: IRootState) => state.UIStateData)
  const navigator = useNavigate()
  useEffect(() => {
    dispatch(
      getAllProjectsAction({
        token,
        status: 'active',
        userId: currentUserProfileDetails?.id,
        limit: constant.page.maxSize,
        page: constant.page.defaultNumber,
      })
    )
  }, [dispatch])

  const defaultTime = new Date(year as unknown as number, Number(month) - 1, date as unknown as number)
  const editFormik = useFormik<TaskCorrectionFormValues>({
    initialValues: {
      ...initialEditTaskCorrectionValue,
      startTime: defaultTime,
      endTime: defaultTime,
    },
    validationSchema: TaskCorrectionFormValidationSchema,
    onSubmit: (formValue) => {
      const differentMinutes = convertToMiliSecondsToMinute(
        formValue.endTime.getTime() - formValue.startTime.getTime()
      )?.toString()
      const taskCorrection = taskEntryCorrectionList?.find(
        (item) => item.timeline_id === selectedTaskEntryTimeLineId
      )
      const payload = {
        token,
        timeline_id: selectedTaskEntryTimeLineId?.toString(),
        task_id: formValue.task?.[0]?.id,
        project_id: formValue.project?.[0]?.id,
        start_time: convertToYYYYMMDDwithTimeFormat(formValue.startTime),
        end_time: convertToYYYYMMDDwithTimeFormat(formValue.endTime),
        difference_minutes: differentMinutes,
        status: 'Pending',
        description: formValue.description,
      }
      if (hasTaskCorrectionEdit && taskCorrection) {
        const editPayload = {
          ...payload,
          id: taskCorrectionId > 0 ? taskCorrectionId : taskCorrection?.id,
        }
        dispatch(editTaskCorrectionRequestAction(editPayload)).then(({ payload }) => {
          if (payload?.status) {
            setSelectedTaskEntryTimeLineId(0)
            Message(Strings.taskCorrectionSuccessfullyUpdated, 'success', '')
            dispatch(TaskActions.setHasUserEditTaskEntry(false))
          } else {
            Message(error, 'error', '')
          }
        })
        return
      }
      dispatch(addTaskCorrectionRequestAction(payload)).then(({ payload }) => {
        const data = payload as TaskEntryCorrectionResponsePayload
        if (data?.status) {
          setSelectedTaskEntryTimeLineId(0)
          Message(Strings.taskCorrectionSuccessfullyAdded, 'success', '')
          dispatch(TaskActions.setHasUserEditTaskEntry(false))
        } else {
          Message(data?.message, 'error', '')
        }
      })
    },
  })

  /**
   * addFormik
   * 
   * Handle add task correction entry.
   */
  const addFormik = useFormik<AddTaskCorrectionFormValues>({
    initialValues: {
      ...initialAddTaskCorrectionValue,
      addStartTime: defaultTime,
      addEndTime: defaultTime,
    },
    validationSchema: AddTaskCorrectionFormValidationSchema,
    onSubmit: (formValue) => {
      const differentMinutes = convertToMiliSecondsToMinute(
        formValue.addEndTime.getTime() - formValue.addStartTime.getTime()
      )?.toString()

      const payload = {
        token,
        timeline_id: '0',
        task_id: formValue.addTask?.[0]?.id,
        project_id: formValue.addProject?.[0]?.id,
        start_time: convertToYYYYMMDDwithTimeFormat(formValue.addStartTime),
        end_time: convertToYYYYMMDDwithTimeFormat(formValue.addEndTime),
        difference_minutes: differentMinutes,
        description: formValue.addDescription,
        status: 'Pending',
      }
      dispatch(addTaskCorrectionRequestAction(payload)).then(({ payload }) => {
        if (payload) {
          Message(Strings.taskCorrectionSuccessfullyAdded, 'success', '')
          toggleTaskCorrectionForm();
        } else {
          Message(error, 'error', '')
        }
      })
    },
  })

  const getTaskCorrectionRequestItem = (taskCorrection: TaskEntryCorrectionResponse[]) => {
    if (selectedTaskEntryTimeLineId !== taskCorrection[0]?.id) {
      return (
        <Fragment>
          <tr className='bg-secondary'>
            <td></td>
            <td>{convertToTimeFormat(taskCorrection?.[0]?.start_time)}</td>
            <td>{convertToTimeFormat(taskCorrection?.[0]?.end_time)}</td>
            <td>{taskCorrection?.[0]?.project_name}</td>
            <td>{taskCorrection?.[0]?.task_name}</td>
            <td>{taskCorrection?.[0]?.difference_minutes}</td>
            <td></td>
          </tr>
          <tr className='bg-secondary'>
            <td></td>
            <td colSpan={5}>
              <p>{taskCorrection?.[0]?.description}</p>
            </td>
            <td>
              {userId && (
                <div className='d-flex'>
                  <button
                    type='button'
                    onClick={() => updateTaskCorrectionStatus('Rejected', taskCorrection[0])}
                    className='btn btn-sm btn-danger m-2 '
                  >
                    {Strings.rejected}
                  </button>
                  <button
                    type='button'
                    onClick={() => updateTaskCorrectionStatus('Confirmed', taskCorrection[0])}
                    className='btn btn-sm btn-success m-2'
                  >
                    {Strings.approve}
                  </button>
                </div>
              )}
            </td>
          </tr>
        </Fragment>
      )
    }
  }

  //TODO : Feat(ATM, Task correction structure) ::  Structure will be updated when API changes done
  const editTaskEntryHandler = (
    index: number,
    timeLineId: number,
    startTime: string,
    endTime: string,
    correctionId = 0,
    item: any
  ) => {
    const editTaskEntryData = taskEntryCorrectionList?.find((item) => {
      return startTime
        ? item?.timeline_id === timeLineId &&
        startTime === item.start_time &&
        endTime === item?.end_time
        : item?.timeline_id === timeLineId
    })

    if (correctionId > 0) {
      setTaskCorrectionId(correctionId)
    }

    if (editTaskEntryData) {
      setHasTaskCorrectionEdit(true)
      editFormik.resetForm({
        values: {
          ...initialEditTaskCorrectionValue,
          startTime: new Date(editTaskEntryData?.start_time),
          endTime: new Date(editTaskEntryData?.end_time),
          project: [
            {
              id: editTaskEntryData?.id,
              label: editTaskEntryData?.project_name,
            },
          ],
          task: [{ id: editTaskEntryData?.task_id, label: editTaskEntryData?.task_name }],
          description: editTaskEntryData?.description,
        },
      })
    } else {
      setHasTaskCorrectionEdit(false);
      editFormik.resetForm({
        values: {
          ...initialEditTaskCorrectionValue,
          startTime: item?.start_time ? new Date(item?.start_time) : defaultTime,
          endTime: item?.end_time ? new Date(item?.end_time) : defaultTime,
          project: [
            {
              id: item?.project_id,
              label: item?.project_name,
            },
          ],
          task: [
            {
              id: item?.id,
              label: item?.task_name
            }
          ],
        },
      })
    }
    dispatch(TaskActions.updateHasEditTaskEntryCorrection(true))

    if (hasTaskCorrectionFormShown) {
      toggleTaskCorrectionForm()
    }
    if (index === currentTaskCorrectionEditRow) {
      dispatch(TaskActions.setHasUserEditTaskEntry(false))
      dispatch(TaskActions.setCurrentTaskCorrectionEditRow(0))
      setSelectedTaskEntryTimeLineId(0)
    } else {
      dispatch(TaskActions.setHasUserEditTaskEntry(true))
      setSelectedTaskEntryTimeLineId(timeLineId)
      dispatch(TaskActions.setCurrentTaskCorrectionEditRow(index))
    }
  }

  const formatDate =
    year && month && date
      ? moment(new Date(Number(year), Number(month) - 1, Number(date))).format('DD MMMM YYYY')
      : ''
  const currenDate = new Date()

  const projectOptions = list?.map((item) => {
    return {
      label: item.name,
      id: item.id,
    }
  })

  const hasNextButtonShow =
    currenDate.getDate() > Number(date) || currenDate?.getMonth() >= Number(month)
  const iconStyle = {
    margin: '0px 5px',
    marginTop: '3px',
    fontSize: '13px',
  }

  const redirectToPreviewAndNextTaskEntry = (month: number, date: number) => {
    const year = new Date()?.getFullYear()
    let path = ''
    if (userId) {
      path = PATHS.attendance.masterTaskEntry
        .replace(':date', `${date}`)
        ?.replace(':month', `${month}`)
        ?.replace(':year', `${year}`)
        ?.replace(':userId', `${userId}`)
    } else {
      path = PATHS.attendance.taskEntry
        .replace(':date', `${date}`)
        ?.replace(':month', `${month}`)
        ?.replace(':year', `${year}`)
    }
    navigator(path)
  }
  const showPreviousDateTaskEntry = () => {
    let previousDate = Number(date) - 1
    let previousMonth = Number(month)
    if (previousDate === 0) {
      previousDate = getLastDayOfMonth(previousMonth, Number(year))
      previousMonth = previousMonth - 1
    }
    redirectToPreviewAndNextTaskEntry(previousMonth, previousDate)
  }

  const showNextDateTaskEntry = () => {
    let previousDate = Number(date) + 1
    let previousMonth = Number(month)
    const lastMonthDate = getLastDayOfMonth(previousMonth, Number(year))
    if (previousDate >= lastMonthDate) {
      previousDate = 1
      previousMonth = previousMonth + 1
    }
    redirectToPreviewAndNextTaskEntry(previousMonth, previousDate)
  }

  const totalHours = totalTaskTrackRecords?.totalTime
    ? totalTaskTrackRecords?.totalTime?.split(':')?.[0]
    : ''
  const totalMinute = totalTaskTrackRecords?.totalTime
    ? totalTaskTrackRecords?.totalTime?.split(':')?.[1]
    : ''

  const getTheHeaderHTMLTag = (title: string, index: number) => {
    const styleClass = index === 4 ? 'min-w-300px sorting' : index === 3 ? 'min-w-150px sorting' : 'min-w-50px sorting';
    return (
      <th
        key={`${index}`}
        className={styleClass}
        tabIndex={0}
        aria-controls='kt_profile_overview_table'
        rowSpan={1}
        colSpan={1}
      >
        {title}
      </th>
    )
  }
  const getTaskOptions = (tasks: TaskResponseFields[]) => {
    return tasks
      .filter((item) => {
        return item.assigned_user === currentUserProfileDetails?.id
      })
      .map((item) => {
        return {
          id: item.id,
          label: item.name,
        }
      })
  }
  const renderHeader = () => {
    const headers = [Strings.no, Strings.startTime, Strings.endTime, Strings.project, Strings.task, Strings.mins]
    return headers?.map((item, index) => getTheHeaderHTMLTag(item, index))
  }
  const convertToTimeFormat = (date: string): string => {
    return date ? moment(date).format('hh:mm A') : ''
  }

  const handlerProjectChanged = (param: SelectInputValue[], hasAddTaskCorrection = false) => {
    const projectId = param?.[0]?.id
    if (hasAddTaskCorrection) {
      addFormik.setFieldValue('addProject', param)
      addFormik.setFieldValue('addTask', [])
    } else {
      editFormik.setFieldValue('project', param)
      editFormik.setFieldValue('task', [])
    }
    if (selectedProjectId.includes(projectId)) return
    dispatch(TaskActions.updateSelectedProjectId(projectId))
    dispatch(
      getAllTasksActions({
        token: getUserToken(),
        page: 1,
        size: constant.page.maxSize,
        projectId: projectId,
      })
    ).then((response) => {
      const data = response?.payload?.data
      const tasks = { ...selectedProjectTaskList }
      if (!response?.payload?.data) {
        dispatch(
          TaskActions.updateSelectedTask({
            ...tasks,
            [projectId]: [],
          })
        )
      } else {
        dispatch(
          TaskActions.updateSelectedTask({
            ...tasks,
            [projectId]: data,
          })
        )
      }
    })
  }

  const handlerTaskChanged = (param: SelectInputValue[], hasAddTaskCorrection = false) => {
    if (hasAddTaskCorrection) {
      addFormik.setFieldValue('addTask', param)
    } else {
      editFormik.setFieldValue('task', param)
    }
  }
  const editButtonJsx = (
    currentIndex: number,
    timeline_id: number,
    item: any,
    startTime = '',
    endTime = '',
    correctionId = 0
  ) => {
    return (
      <button
        type='button'
        onClick={() =>
          editTaskEntryHandler(currentIndex, timeline_id, startTime, endTime, correctionId, item)
        }
        className='btn btn-sm btn-light m-0 m-2'
        style={{
          color: Style.darkTheme.selectInput.pagination.color,
        }}
      >
        <FontAwesomeIcon
          icon={
            currentTaskCorrectionEditRow === currentIndex && hasUserEditTaskEntry ? faCancel : faPen
          }
          className='button-icon '
        />
      </button>
    )
  }

  /**
   * renderFormColumn
   * 
   * Render Attendance Correction Form after click on edit button.
   * 
   * @param currentIndex 
   * @returns 
   */
  const renderFormColumn = (currentIndex: number) => {
    return (
      currentTaskCorrectionEditRow === currentIndex &&
      hasUserEditTaskEntry && (
        <>
          <tr className='even'>
            <td></td>
            <td colSpan={2}>
              <div className='my-1 mt-3'>
                  <TimePickerEdit
                    year={year}
                    date={date}
                    month={month}
                    showDefaultTime={false}
                    startTime={editFormik.values.startTime}
                    endTime={editFormik.values.endTime}
                    onChange={handleEditTimePickerChanges}
                  />
              </div>
            </td>
            <td>
              <div className='my-1 mt-3'>
                <Select
                  overrides={{
                    ...allInputsStyles(currentTheme, SELECT_INPUT_KEY),
                  }}
                  onChange={(params) => {
                    const value = params.value as SelectInputValue[]
                    handlerProjectChanged(value)
                  }}
                  value={editFormik.values.project}
                  placeholder={Strings.selectProject}
                  options={projectOptions}
                />
              </div>
            </td>
            <td>
              <div className='my-1 mt-3'>
                <Select
                  overrides={{
                    ...allInputsStyles(currentTheme, SELECT_INPUT_KEY),
                  }}
                  onChange={(params) => {
                    const value = params.value as SelectInputValue[]
                    handlerTaskChanged(value)
                  }}
                  value={editFormik.values.task}
                  placeholder={Strings.selectTask}
                  options={
                    selectedProjectTaskList[editFormik?.values?.project?.[0]?.id]?.length > 0 &&
                      editFormik?.values?.project.length > 0
                      ? getTaskOptions(
                        selectedProjectTaskList[editFormik?.values?.project?.[0]?.id]
                      )
                      : []
                  }
                />
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td className='pe-0' colSpan={4}>
              <div className='col'>
                <Textarea
                  name='description'
                  onChange={(e) => editFormik.setFieldValue('description', e.target.value)}
                  value={editFormik.values.description}
                  placeholder={Strings.description}
                  overrides={{
                    ...allInputsStyles(currentTheme, TEXT_AREA_KEY),
                    InputContainer: {
                      style: () => ({
                        width: '100%',
                      }),
                    },
                  }}
                />
              </div>
            </td>
            <td className='pb-0 align-top' colSpan={1}>
              <div className='d-flex align-items-center justify-content-end'>
                <div className='d-flex justify-content-start flex-column'>
                  <button
                    type='submit'
                    className='btn btn-sm btn-primary'
                    data-bs-target='#kt_modal_new_target'
                    disabled={!editFormik.dirty || !editFormik.isValid}
                  >
                    {hasTaskCorrectionEdit ? Strings.update : Strings.submit}
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </>
      )
    )
  }

  /**
   * This function updated task correction status
   * @param status = Reject | Confirmed
   * @returns
   */

  const updateTaskCorrectionStatus = (status: 'Rejected' | 'Confirmed', data: any) => {
    
    const payload = {
      token,
      status,
      id: data?.id,
    }
    dispatch(updateTaskCorrectionRequestStatusAction(payload)).then((response) => {
      
      if (response?.payload?.status) {
        setSelectedTaskEntryTimeLineId(0)
        const message = status === "Confirmed" ? Strings.taskCorrectionIsApprovedSuccessfully : Strings.taskCorrectionIsRejectedSuccessfully
        Message(message, 'success', '').then((res) => {
          if (res?.isConfirmed) {
            dispatch(getSingleTaskEntryAction({
              token,
              month: month as string,
              year: year as string,
              date: date as string,
              page: 1,
              size: "",
              user_id: userId ? Number(userId) : currentUserProfileDetails?.id
            }))
          }
        })

        dispatch(TaskActions.setHasUserEditTaskEntry(false))
      } else {
        Message(error, 'error', '')
      }
    })
  }


  const renderRows = (item: SingleTaskEntryResponsePayload, index: number) => {
    const addDotInTaskName = item.task_name.split('').length > 50 ? '...' : ''
    const currentIndex = index + 1
    return (
      <>
        <tr key={`${index}`}>
          <td>{currentIndex}</td>
          <td>
            <div className='d-flex align-items-center'>
              <div className='d-flex justify-content-start flex-column'>
                <span className=''> {convertToTimeFormat(item.start_time)}</span>
              </div>
            </div>
          </td>
          <td>
            <div className='d-flex align-items-center'>
              <div className='d-flex justify-content-start flex-column'>
                <span className=''> {convertToTimeFormat(item.end_time)}</span>
              </div>
            </div>
          </td>
          <td>
            <div className='d-flex align-items-center'>
              <div className='d-flex justify-content-start flex-column'>
                <span>{item.project_name}</span>
              </div>
            </div>
          </td>
          <td data-bs-trigger='hover' data-bs-toggle='tooltip' title={item.task_name}>
            <div className='d-flex align-items-center'>
              <div className='d-flex justify-content-start flex-column'>
                <span>{item.task_name?.slice(0, 50) + addDotInTaskName}</span>
              </div>
            </div>
          </td>
          <td>
            {item.trackedTime ? item?.trackedTime + ' ' : ''}
          </td>
          <td>
            <div className='d-flex align-items-center justify-content-end'>
              <div className='d-flex justify-content-start flex-row'>
                {!userId && editButtonJsx(currentIndex, item.timeline_id, item)}
              </div>
            </div>
          </td>
        </tr>
        {item?.task_correction?.length > 0 && item?.task_correction?.[0]?.status?.toLocaleLowerCase() === "pending" && getTaskCorrectionRequestItem(item?.task_correction)}
        {renderFormColumn(currentIndex)}
      </>
    )
  }

  const renderCorrectionRows = (item: SingleTaskEntryResponsePayload, index: number) => {
    if (item?.status !== "Pending") {
      return false;
    }
    const addDotInTaskName = item.task_name.split('').length > 50 ? '...' : ''
    const currentIndex = index + 1
    return (
      <>
        <tr className='bg-secondary'>
          <td></td>
          <td>{convertToTimeFormat(item.start_time)}</td>
          <td>{convertToTimeFormat(item.end_time)}</td>
          <td>{item.project_name}</td>
          <td>{item.task_name?.slice(0, 50) + addDotInTaskName}</td>
          <td>{item.difference_minutes ? item?.difference_minutes : ''}</td>
          <td></td>
        </tr>
        <tr className='bg-secondary'>
          <td></td>
          <td colSpan={5}>
            <p>{item?.description}</p>
          </td>
          <td>
            {userId && (
              <div className='d-flex'>
                <button
                  type='button'
                  onClick={() => updateTaskCorrectionStatus('Rejected', item)}
                  className='btn btn-sm btn-danger m-2 '
                >
                  {Strings.rejected}
                </button>
                <button
                  type='button'
                  onClick={() => updateTaskCorrectionStatus('Confirmed', item)}
                  className='btn btn-sm btn-success m-2'
                >
                  {Strings.approve}
                </button>
              </div>
            )}
          </td>
        </tr>
      </>
    )
  }

  /**
   * handleTimePickerChanges
   * 
   * Handle time picker changes for add time correction.
   * 
   * @param startDate 
   * @param endDate 
   */
  const handleTimePickerChanges = (startDate: any, endDate: any): void => {
    if (startDate) {
      addFormik.setFieldValue('addStartTime', startDate);
    }
    if (endDate) {
      addFormik.setFieldValue('addEndTime', endDate);
    }
  }

  const handleEditTimePickerChanges = (startDate: any, endDate: any): void => {
    if (startDate) {
      editFormik.setFieldValue('startTime', startDate);
    }
    if (endDate) {
      editFormik.setFieldValue('endTime', endDate);
    }
  }

  const handlerTimePickerChange = (updatedKey: string, currentDate: Date) => {
    const currentTime = moment(currentDate).format("HH:mm")?.split(":");
    const time = new Date(year as unknown as number, Number(month) - 1, date as unknown as number, Number(currentTime[0]), Number(currentTime[1]))

    if (updatedKey?.includes("add")) {
      addFormik.setFieldValue(updatedKey, time)
    }
    else {
      editFormik.setFieldValue(updatedKey, time)
    }
  }

  const renderAddTaskCorrection = () => {
    return (
      <Card className='card-flush mt-6 mb-0 mt-xl-9 p-0 pb-0 mb-6' id='task-entry-popup'>
        <div className='card-header'>
          <div className='card-title'>
            <h2>{Strings.addYourTaskCorrectionRequest}</h2>
          </div>
        </div>
        <form onSubmit={addFormik.handleSubmit}>
          <div className='card-body pt-0'>
            <div className='row'>
              <div className='col-md-6 col-12 col-lg-6 col-xl-6'>
                <div className='my-1 mt-3'>
                  <TimePickerField
                    year={year}
                    date={date}
                    month={month}
                    showDefaultTime={true}
                    startTime={addFormik.values.addStartTime}
                    endTime={addFormik.values.addStartTime}
                    onChange={handleTimePickerChanges}
                  />
                </div>
              </div>
              <div className='col-md-3 col-12 col-lg-3 col-xl-3'>
                <div className='my-1 mt-3'>
                  <Select
                    overrides={{
                      ...allInputsStyles(currentTheme, SELECT_INPUT_KEY),
                    }}
                    onChange={(params) => {
                      const value = params.value as SelectInputValue[]
                      handlerProjectChanged(value, true)
                    }}
                    placeholder={Strings.selectProject}
                    value={addFormik.values.addProject}
                    options={projectOptions}
                  />
                </div>
              </div>
              <div className='col-md-3 col-12 col-lg-3 col-xl-3'>
                <div className='my-1 mt-3'>
                  <Select
                    overrides={{
                      ...allInputsStyles(currentTheme, SELECT_INPUT_KEY),
                    }}
                    value={addFormik.values.addTask}
                    onChange={(params) => {
                      const value = params.value as SelectInputValue[]
                      handlerTaskChanged(value, true)
                    }}
                    placeholder={Strings.selectTask}
                    options={
                      selectedProjectTaskList[addFormik?.values?.addProject?.[0]?.id]?.length > 0 &&
                        addFormik?.values?.addProject.length > 0
                        ? getTaskOptions(
                          selectedProjectTaskList[addFormik?.values?.addProject?.[0]?.id]
                        )
                        : []
                    }
                  />
                </div>
              </div>
              <div className='col-md-8 col-12 col-lg-8 col-xl-8'>
                <div className='my-1 mt-3'>
                  <Textarea
                    placeholder={Strings.description}
                    value={addFormik.values.addDescription}
                    onChange={(e) => addFormik.setFieldValue('addDescription', e.target.value)}
                    overrides={{
                      ...allInputsStyles(currentTheme, TEXT_AREA_KEY),
                      InputContainer: {
                        style: () => ({
                          width: '100%',
                        }),
                      },
                    }}
                  />
                </div>
              </div>
              <div className='col-md-4 col-12 col-lg-4 col-xl-4'>
                <button
                  type='submit'
                  className='btn btn-sm btn-primary mt-3'
                  disabled={!addFormik.dirty || !addFormik.isValid}
                >
                  {hasTaskCorrectionEdit ? Strings.update : Strings.submit}
                </button>
              </div>
            </div>
          </div>
        </form>
      </Card>
    )
  }
  return (
    <>
      {hasTaskCorrectionFormShown && renderAddTaskCorrection()}
      <Card className='card-flush mt-6 mb-0 mt-xl-9 p-0 pb-0 mb-6 test'>
        <div className='card-header align-items-flex-start'>
          <div
            className='card-toolbar my-1 justify-content-between justify-content-sm-start column-gap-5 m-0'
            data-select2-id='select2-data-164-wp82'
          >
            <button
              type='button'
              style={{ color: Style.darkTheme.selectInput.pagination.color }}
              className={`btn btn-sm btn-light`}
              onClick={showPreviousDateTaskEntry}
            >
              <FontAwesomeIcon icon={faArrowLeft} style={iconStyle} />
              {Strings.prev}
            </button>
          </div>
          {hasNextButtonShow && (
            <div className=' d-flex justify-content-flex-end py-5 px-0'>
              <button
                type='button'
                className='btn btn-sm btn-light m-1'
                style={{ color: Style.darkTheme.selectInput.pagination.color }}
                onClick={showNextDateTaskEntry}
              >
                {Strings.next}
                <FontAwesomeIcon icon={faArrowRight} style={iconStyle} />
              </button>
            </div>
          )}
        </div>
      </Card>
      <Card className='user-card-container list-contain-card p-0'>
        <PageTitle
          breadcrumbs={DetailsBreadcrumbs}
          buttontitle={hasTaskCorrectionFormShown ? Strings.cancel : Strings.addTaskEntry}
          hasAddPermission={true}
          className='btn btn-sm btn-secondary m-1'
        >
          {Strings.taskEntry + ': ' + formatDate}
        </PageTitle>
        <div className='card-body'>
          <div className='table-responsive'>
            <div
              id='kt_profile_overview_table_wrapper'
              className='dataTables_wrapper dt-bootstrap4 no-footer'
            >
              <div className='table-responsive'>
                <div
                  id='kt_profile_overview_table_wrapper'
                  className='dataTables_wrapper dt-bootstrap4 no-footer'
                >
                  <div className='table-responsive'>
                    <form onSubmit={editFormik.handleSubmit}>
                      <table
                        id='kt_profile_overview_table'
                        className='table table-row-bordered table-row-dashed gy-4 align-middle fw-bold dataTable no-footer'
                      >
                        <thead className='fs-7 text-gray-400 text-uppercase'>
                          <tr>{renderHeader()}</tr>
                        </thead>
                        <tbody className='fs-6'>
                          {taskEntry?.length > 0 &&
                            taskEntry.map((item, index) => renderRows(item, index))}
                          <tr>
                            <td>{Strings.newTaskEntry}</td>
                          </tr>
                          {newTaskEntry?.length > 0 && newTaskEntry.map((item, index) => renderCorrectionRows(item, index))}
                          {/* This code use in feature */}
                          {/* {taskEntryCorrectionList?.length > 0 &&
                            taskEntryCorrectionList
                              ?.filter((item, index) => {
                                if(userId) {
                                  return  item.timeline_id === 0
                                }
                                return (
                                  item.timeline_id === 0 &&
                                  currentUserProfileDetails?.id === item?.user_id
                                  && userPermissions?.attendance?.taskCorrection
                                )
                              })
                              .map((item, index) => {
                                const currentIndex = taskEntry?.length + newTaskEntry?.length + index + 1
                                return (
                                  <Fragment key={`${index}`}>
                                    <tr className='bg-secondary'>
                                      <td>{currentIndex}</td>
                                      <td>{convertToTimeFormat(item?.start_time)}</td>
                                      <td>{convertToTimeFormat(item?.end_time)}</td>
                                      <td>{item?.project_name}</td>
                                      <td>{item?.task_name}</td>
                                      <td>{item?.difference_minutes + ' ' }</td>
                                    <td></td>
                                      <td>
                                      {!userId && (
                                            editButtonJsx(
                                              currentIndex,
                                              item.timeline_id,
                                              item.start_time,
                                              item.end_time,
                                              item.id
                                            )
                                      )}
                                  </td>
                                  </tr>
                                    <tr className='bg-secondary'>
                                      <td></td>
                                      <td colSpan={6}>
                                        <p>{item?.description}</p>
                                      </td>
                                      <td>
                                        {userId && item.status?.toLocaleLowerCase() === "pending" &&(
                                          <div className='d-flex'>
                                            <button
                                              type='button'
                                              onClick={() =>
                                                updateTaskCorrectionStatus('Rejected', item)
                                              }
                                              className='btn btn-sm btn-danger m-2 '
                                            >
                                              {Strings.rejected}
                                            </button>
                                            <button
                                              type='button'
                                              onClick={() =>
                                                updateTaskCorrectionStatus('Confirmed', item)
                                              }
                                              className='btn btn-sm btn-success m-2'
                                            >
                                              {Strings.approve}
                                            </button>
                                          </div>
                                        )}
                                      </td>
                                    </tr>
                                    {renderFormColumn(currentIndex)}
                                  </Fragment>
                                )
                              })} */}
                        </tbody>
                      </table>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card className='card-flush mt-6 mb-0 mt-xl-9 p-0 pb-0 '>
        <div className='row total-task-track-container'>
          <div className='col-lg-12 col-md-12 col-12'>
            <label className={`fw-bold col-form-label`}>{Strings.total + ':' + ' '}</label>
            <span className='fw-semibold text-gray-800 fs-6'>{` ${totalHours}`}</span>
            <span className='fw-semibold text-gray-800 fs-6'>
              {`  ${totalMinute ? totalMinute?.replace('m', 'M') : ''}`}
            </span>
          </div>
        </div>
      </Card>
    </>
  )
}

export default TaskEntry
