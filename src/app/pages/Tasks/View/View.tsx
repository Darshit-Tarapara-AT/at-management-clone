/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import { Strings } from 'app/resource/Strings'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ShowDetails from 'app/Components/showDetails/ShowDetails'
import moment from 'moment'
import UpdateDetailsSection from 'app/Components/UpadateDetailSection'
import { PATHS } from 'config/paths/paths'
import { getUserToken } from 'services/AuthServices'
import { TaskResponseFields } from 'app/redux/TaskSlice/TaskType'
import { getAllTasksActions, getIndividualTaskAction } from 'app/redux/TaskSlice/TaskAsyncThunk'
import { Loader } from 'app/Components/Loader/Loader'
import { FormikKeys } from 'app/Components/TextArea'
import { Card } from 'react-bootstrap'
import TaskTracker from '../Components/TaskTracker/TaskTracker'
import { TaskActions } from 'app/redux/TaskSlice/TaskSlice'
import { convertMinutesToHours } from 'app/Components/CustomTable/CustomColoums/TaskColoum'
import constant from 'config/const/const'
import { convertToIndianDateFormat } from 'app/utils/helper'


export const formatLastUpdateDate = (date: string) => {
  return moment(date)?.format("DD-MM-YYYY hh:mm:ss A")
}
const Details = () => {
  const token = getUserToken()
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>('')
  const { list, currentUserProfileDetails } = useSelector((state: IRootState) => state.UserStateData)
  const { parentTask: projectParentTask, currentProjectId } = useSelector((state: IRootState) => state.ProjectStateData);
  const {  specificTask } = useSelector((state: IRootState) => state.TaskStateData);
  const { userPermissions } = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const params = useParams()
  useEffect(() => {
    setError("");
  }, [])

  const DetailsBreadcrumbs: Array<PageLink> = [
    {
      title: Strings.home,
      path: PATHS.home,
      isSeparator: false,
      isActive: false,
    },
    {
      title: Strings.projects,
      path: PATHS.project.list,
      isSeparator: false,
      isActive: true,
    },
    {
      title: Strings.tasks,
      path: PATHS.task.list.replace(":id",`${currentProjectId}`),
      isSeparator: false,
      isActive: true,
    }
  ]


  useEffect(() => {
    if (token) {
      const id = Number(params.taskId)
      dispatch(getIndividualTaskAction({ token, id })).then((res) => {
        const formValues = res.payload?.data as TaskResponseFields
        if (formValues) {
          dispatch(TaskActions.updateSpecificPTask(formValues))
        } else {
          setError(Strings.taskDetailsNotFound)
        }
      })
    }
  }, [dispatch, token, currentProjectId])


  const updateActiveTaskIdHandler = useCallback((id: number) => {
    dispatch(TaskActions.setActiveTaskId(id))
  }, [])
  const alertErrorMessage = () => {
    return (
      <div className="card mb-5 mb-xl-10 form-container p-9 text-center">
        <h2>{error}</h2>
      </div>
    )
  }
  const billableSwitch = () => {
    return (
      <div className="form-check form-switch form-check-custom form-check-solid">
        <input className="form-check-input" type="checkbox" value="" id="flexSwitchChecked" disabled ={true} checked={specificTask?.is_task_billable === 1
        }  wfd-id="id18" />
      </div>
    )
  }
const getUserName = (id: number) => {
  return list?.find((item) => item.id === id)?.name
}


const getParentProjectDetails = useCallback((projectId: number) => {
  if (projectParentTask) {
    const parentTask = projectParentTask?.find((project) => Number(project.id) === projectId);
   return parentTask?.name
  }
  return '';
}, [projectParentTask])

  const checkListsJSX = () => {
    return specificTask?.taskchecklist?.length > 0 && (
      specificTask?.taskchecklist?.map((item) => {
        return (
          <div className='row mb-2'>
          <div className='col-lg-9 d-flex align-items-center mt-2'>
            <label className="form-check form-check-custom form-check-solid me-9 mb-2">
              <input disabled = {true} className="form-check-input me-3" type="checkbox" value="" checked={item.is_checked  === 1 ? true : false} wfd-id="id24" />{item.name}
            </label>
          </div>
        </div>
        )
      })
    )
  }
  const getLabelFromKey = (status: string) => {
    const strings: FormikKeys = { ...Strings }
    return strings[status]
  }
  const taskDetailsValue = [
    {
      label: Strings.name,
      value: specificTask?.name || '',
    },
    {
      label: Strings.description,
      value: specificTask?.description || '',
    },
    {
      label: Strings.project,
      value: specificTask?.project?.name || '',
    },
    {
      label: Strings.assignedTo,
      value: getUserName(specificTask?.assigned_user) || '',
    },
    {
      label: Strings.qa,
      value: getUserName(specificTask?.assigned_qa) || '',
    },
    {
      label: Strings.parentTask,
      value: specificTask?.parent_id ? getParentProjectDetails(specificTask?.parent_id)  : ''
    },
    {
      label: Strings.startDate,
      value: convertToIndianDateFormat(specificTask?.start_date) || '',
    },
    {
      label: Strings.endDate,
      value: convertToIndianDateFormat(specificTask?.end_date) || ' ',
    },
    {
      label: Strings.estimatedTimeInHours,
      value: convertMinutesToHours(specificTask?.estimated_time) + " " + Strings.hours || ' ',
    },
    {
      label: Strings.trackedTime,
      value: convertMinutesToHours(Number(specificTask?.trackedTime))  + " " + Strings.hours,
    },
    {
      label: Strings.percentage,
      value: specificTask?.percentage + "%" || '',
    },
    {
      label: Strings.isTaskBillable,
      isComponentsType: true,
      value: billableSwitch ,
    },
    {
      label: Strings.priority,
      value: getLabelFromKey(specificTask?.priority) || '',
    },
    {
      label: Strings.taskStatus,
      value: getLabelFromKey(specificTask?.task_status) || '',
    },
    {
      label: Strings.taskType ,
      value: getLabelFromKey(specificTask?.task_type) || '',
    },
    {
      label: Strings.comment,
      value: specificTask?.comment || '',
    },
    {
      label: Strings.checkList,
      isComponentsType: true,
      value: checkListsJSX ,
    },
  ]

  if (error) {
    return (
      <>
        <PageTitle path={PATHS.task.list} breadcrumbs={DetailsBreadcrumbs}>
          {Strings.taskView}
        </PageTitle>
        {alertErrorMessage()}
      </>
    )
  }
  return (
    <>
      {Object.values(specificTask).length === 0 && !error ? (
        <Loader />
      ) : (
      <>
      {currentUserProfileDetails?.id === specificTask?.assigned_user &&(
      <Card className='card-flush mt-6 mb-8 mt-xl-9 p-0'>
      <div className="card-header align-items-center">
          <div className="card-toolbar my-1 justify-content-between justify-content-sm-start column-gap-5" data-select2-id="select2-data-164-wp82">
            <TaskTracker taskId={Number(params?.taskId)} hasTaskStart = {specificTask?.isTaskRunning} userId={specificTask?.assigned_user} onUpdateTask={updateActiveTaskIdHandler}/>
          </div>
      </div>
  </Card>
      )}
  
        <ShowDetails
          title={Strings.view}
          id=''
          data={taskDetailsValue}
          isEditAllow={userPermissions?.task?.edit}
          path={`project/${params?.id}/task/${params?.taskId}/edit`}
          buttonText={Strings.editTask}
        />
        <UpdateDetailsSection
          lastUpdateDate={specificTask?.updated_at || ''}
          id={specificTask?.last_updated_by || null}
          createdById={Number(specificTask?.created_by)}
          title={Strings.updateDetails}
          lastCreateDate={specificTask?.created_at || ''}
          createDetails={specificTask?.added_by_user}
          updateDetails={specificTask?.updated_by_user}
        />

      </>)}

    </>
  )
}
export default Details
