/* eslint-disable react-hooks/exhaustive-deps */
import {useFormik} from 'formik'
import React, {useCallback, useEffect, useState} from 'react'
import './Form.scss'
import {CheckListKeys, TaskFormValues} from '../Components/Modal/Modal'
import MainTaskDetails from '../Components/Steps/TaskDetails/TaskDetails'
import {Strings} from 'app/resource/Strings'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {TaskFormValidation} from 'app/utils/ValidationSchema'
import {IRootState, useAppDispatch} from 'app/redux/store'
import {Message} from 'app/utils/AlertMessage'
import {useSelector} from 'react-redux'
import {TaskActions} from 'app/redux/TaskSlice/TaskSlice'
import Button from 'app/Components/Button/Button'
import {PATHS} from 'config/paths/paths'
import constant from 'config/const/const'
import {getUserToken} from 'services/AuthServices'
import {SelectInputValue} from 'app/pages/Projects/Components/Modal/Modal'
import {
  IAddTaskPayLoad,
  addTaskAction,
  editTaskAction,
  getIndividualTaskAction,
  updateCheckListAction,
} from 'app/redux/TaskSlice/TaskAsyncThunk'
import {initialTaskValues} from 'app/FormikIntialValues/FormikIntialValues'
import UpdateDetailsSection from 'app/Components/UpadateDetailSection'
import {TaskResponseFields} from 'app/redux/TaskSlice/TaskType'
import {Loader} from 'app/Components/Loader/Loader'
import {Card} from 'react-bootstrap'
import TaskTracker from '../Components/TaskTracker/TaskTracker'
import moment from 'moment'
import {convertMinutesToHours} from 'app/Components/CustomTable/CustomColoums/TaskColoum'
import {
  getAllProjectsAction,
  getIndividualUProjectAction,
} from 'app/redux/ProjectSlice/ProjectAyscThunk'

const Form = () => {
  const currentDate = moment(new Date()).format('YYYY-MM-DD')
  const {list: userList, currentUserProfileDetails} = useSelector(
    (state: IRootState) => state.UserStateData
  )

  const {
    specificProject,
    list: projectList,
    currentProjectId,
    total
  } = useSelector((state: IRootState) => state.ProjectStateData)
  const {isLoading, taskCheckList, specificTask} = useSelector(
    (state: IRootState) => state.TaskStateData
  )
  const [assignUserId, setAssignUserId] = useState<number | null>(null)
  const [assignQAId, setAssignQAId] = useState<number | null>(null)
  const param = useParams()
  const token = getUserToken()
  const navigator = useNavigate()
  const dispatch = useAppDispatch()
  const {pathname} = useLocation()

  useEffect(() => {
    if(projectList?.length !== total || total === 0) {
      dispatch(
        getAllProjectsAction({
          token,
          status: 'active',
          userId: currentUserProfileDetails?.id,
          limit: constant.page.maxSize,
          page: constant.page.defaultNumber,
        })
      )
    }
  }, [dispatch, currentUserProfileDetails?.id, total, projectList])
  const formik = useFormik<TaskFormValues>({
    initialValues: {
      ...initialTaskValues,
    },
    validationSchema: TaskFormValidation,
    onSubmit: (formValue) => {
      if (!pathname.includes(constant.taskPathEndPoints.taskAdd)) {
        editPageHandlerSubmit(formValue)
      } else {
        addPageHandlerSubmit(formValue)
      }
    },
  })
  const getUserDetails = (userId: number) => {
    const user = userList?.find((user) => Number(user.id) === userId)
    if (user) {
      return [
        {
          id: userId,
          label: user?.name!,
        },
      ]
    }
    return []
  }

  const convertToIdToArrayFormat = (id: number | string, isUser = false) => {
    return [
      {
        label: id?.toString(),
        id,
      },
    ]
  }

  useEffect(() => {
    if (param.taskId) {
      const id = Number(param.taskId)
      dispatch(getIndividualTaskAction({token, id})).then((res) => {
        const formValues = res.payload?.data as TaskResponseFields
        if (formValues) {
          dispatch(TaskActions.updateSpecificPTask(formValues))
          dispatch(TaskActions.editAndDeleteCheckList(formValues?.taskchecklist))
          setAssignUserId(formValues.assigned_user)
          setAssignQAId(formValues.assigned_qa)
        } else {
          navigator('*')
        }
      })
    } else {
      dispatch(TaskActions.editAndDeleteCheckList([]))
      formik.resetForm({
        values: {
          ...initialTaskValues,
          startDate: currentDate,
          endDate: currentDate,
          parentTask: [],
          project: [
            {
              id: specificProject?.id,
              label: specificProject.name,
            },
          ],
        },
      })
    }
  }, [param.taskId, token, currentProjectId])

  useEffect(() => {
    if (param.taskId && specificTask?.name) {
      formik.resetForm({
        values: {
          ...formik.values,
          assignTo: getUserDetails(specificTask.assigned_user),
          qa: getUserDetails(specificTask.assigned_qa),
          project: [
            {
              id: specificTask?.project?.id,
              label: specificTask?.project?.name,
            },
          ],
          trackedTime: convertMinutesToHours(Number(specificTask?.trackedTime)),
          createdAt: specificTask.created_at,
          createdBy: specificTask.created_by,
          updatedBy: specificTask.last_updated_by,
          updatedAt: specificTask.updated_at,
          checkList: specificTask?.taskchecklist,
          percentage: specificTask.percentage,
          name: specificTask?.name || '',
          description: specificTask?.description || '',
          startDate: specificTask?.start_date ? specificTask.start_date : currentDate,
          endDate: specificTask?.end_date ? specificTask.end_date : currentDate,
          estimatedTime: specificTask?.estimated_time?.toString() || '',
          isTaskBillable: specificTask?.is_task_billable === 0 ? false : true,
          priority: convertToIdToArrayFormat(specificTask?.priority) || [],
          status: convertToIdToArrayFormat(specificTask?.task_status) || [],
          type: convertToIdToArrayFormat(specificTask?.task_type) || [],
          comment: specificTask?.comment || '',
          addedByUser: specificTask?.added_by_user,
          updatedByUser: specificTask?.updated_by_user,
          parentTask: specificTask?.parent_id
            ? [
                {
                  id: specificTask?.parent_id,
                  label: specificTask?.parent_task_name,
                },
              ]
            : [],
        },
      })
    }
  }, [specificTask?.name])
  useEffect(() => {
    if (assignUserId && specificProject?.name) {
      const userDetails = specificProject?.team_members?.find(
        (user) => Number(user.id) === Number(assignUserId)
      )
      if (userDetails) {
        formik.setFieldValue('assignTo', [
          {
            id: assignUserId,
            label: userDetails?.label,
          },
        ])
      } else {
        formik.setFieldValue('assignTo', [])
      }
    }
  }, [assignUserId, specificProject?.name])

  useEffect(() => {
    if (assignQAId && specificProject?.name) {
      const userDetails = specificProject?.team_members?.find(
        (user) => Number(user.id) === Number(assignQAId)
      )
      if (userDetails) {
        formik.setFieldValue('qa', [
          {
            id: assignQAId,
            label: userDetails?.label,
          },
        ])
      } else {
        formik.setFieldValue('qa', [])
      }
    }
  }, [assignQAId, specificProject?.name])
  const updateActiveTaskIdHandler = useCallback((id: number) => {
    dispatch(TaskActions.setActiveTaskId(id))
  }, [])
  /**
   * Set for API integration
   * @param formValue
   *
   */
  const getInputId = (details: SelectInputValue[]) => {
    return details?.[0]?.id
  }

  const updateTask = (APIPayload: IAddTaskPayLoad) => {
    dispatch(editTaskAction(APIPayload)).then((res) => {
      const data = res.payload as {status: boolean | undefined; message: string}
      if (data.status) {
        alertMessage('success', Strings.taskUpdatedSuccessfully, '')
      }
    })
  }
  const getCheckListTitle = (checkList: CheckListKeys[]) => {
    const titles = checkList.map((item) => {
      return item.name
    })
    return {checklists: titles}
  }
  /**
   * use For checklists update
   */

  const getCheckListIdAndChecked = (checkList: CheckListKeys[]) => {
    const titles = checkList.map((item) => {
      return {
        id: item.id?.toString(),
        is_checked: item.is_checked ? '1' : '0',
      }
    })
    return titles
  }
  const addPageHandlerSubmit = (formValue: TaskFormValues) => {
    /**
     * @description API call for add task
     * @param APIPayload
     * @returns {Promise}
     * This is use for future purpose
     * Future APIPayload Object structure
     */
    const APIPayload = {
      token: getUserToken(),
      items: {
        name: formValue.name,
        parent_id: formValue.parentTask ? getInputId(formValue.parentTask) : null,
        project_id: getInputId(formValue.project),
        description: formValue.description,
        assigned_user: getInputId(formValue.assignTo),
        assigned_qa: getInputId(formValue.qa),
        start_date: formValue.startDate ? (formValue.startDate as string) : '',
        end_date: formValue.endDate ? (formValue.endDate as string) : '',
        estimated_time: formValue.estimatedTime,
        percentage: formValue.percentage,
        is_task_billable: formValue.isTaskBillable ? '1' : '0',
        priority: getInputId(formValue.priority),
        task_status: getInputId(formValue.status),
        task_type: getInputId(formValue.type),
        comment: formValue.comment,
        checklist_json:
          taskCheckList.length > 0
            ? JSON.stringify(getCheckListTitle(taskCheckList))
            : JSON.stringify({
                checklists: [],
              }),
      },
    }

    dispatch(addTaskAction(APIPayload)).then((res) => {
      const data = res.payload as {status: boolean | undefined; message: string; id: number}
      if (data?.status) {
        Message(Strings.taskAddedSuccessfully, 'success', '').then((response) => {
          if (response?.isConfirmed) {
            const editTaskPath = PATHS.task.edit
              .replaceAll(':id', `${currentProjectId}`)
              .replace(':taskId', `${data?.id}`)
            navigator(editTaskPath)
            dispatch(getIndividualUProjectAction({token, id: Number(currentProjectId)}))
          }
        })
      } else {
        const error = data.message
        alertMessage('error', error, '')
      }
    })
  }

  const editPageHandlerSubmit = (formValue: TaskFormValues) => {
    const APIPayload = {
      id: Number(param.taskId),
      token: getUserToken(),
      items: {
        name: formValue.name,
        parent_id: formValue.parentTask ? getInputId(formValue.parentTask) : null,
        project_id: getInputId(formValue.project),
        description: formValue.description,
        assigned_user: getInputId(formValue.assignTo),
        assigned_qa: getInputId(formValue.qa),
        start_date: formValue.startDate ? (formValue.startDate as string) : '',
        end_date: formValue.endDate ? (formValue.endDate as string) : '',
        estimated_time: formValue.estimatedTime,
        percentage: formValue.percentage,
        is_task_billable: formValue.isTaskBillable ? '1' : '0',
        priority: getInputId(formValue.priority),
        task_status: getInputId(formValue.status),
        task_type: getInputId(formValue.type),
        comment: formValue.comment,
        checklist_json: JSON.stringify({
          checklists: [],
        }),
      },
    }
    if (formValue.checkList.length > 0) {
      dispatch(
        updateCheckListAction({
          token,
          taskId: Number(param?.taskId),
          checkList: getCheckListIdAndChecked(taskCheckList),
        })
      ).then((res) => {
        const data = res.payload as {status: boolean | undefined; message: string}
        if (data.status) {
          updateTask(APIPayload)
        } else {
          const error = data.message
          alertMessage('error', error, '')
        }
      })
      return
    }
    updateTask(APIPayload)
  }

  const alertMessage = (icon: 'error' | 'success' | 'warning', text: string, title: string) => {
    Message(title, icon, text).then((result) => {
      if (result.isConfirmed && icon === 'success') {
        dispatch(getIndividualUProjectAction({token, id: Number(currentProjectId)}))
        formik.setSubmitting(false)
      }
      if (result.isConfirmed && icon === 'error') {
        dispatch(TaskActions.resetErrorState())
      }
    })
  }

  const handlerBlurEvent = (name: string) => {
    formik.setFieldTouched(name, true)
  }

  return (
    <>
      {/* <PageTitle breadcrumbs={addTaskBreadcrumbs}>
        {pathname.includes(constant.taskPathEndPoints.taskAdd) ? Strings.addTask : Strings.editTask}
      </PageTitle> */}
      {param?.taskId && currentUserProfileDetails?.id === assignUserId && (
        <Card className='card-flush mt-6 mb-8 mt-xl-9 p-0'>
          <div className='card-header align-items-center'>
            <div
              className='card-toolbar my-1 justify-content-between justify-content-sm-start column-gap-5'
              data-select2-id='select2-data-164-wp82'
            >
              <TaskTracker
                taskId={Number(param?.taskId)}
                userId={Number(assignUserId)}
                hasTaskStart={specificTask?.isTaskRunning}
                onUpdateTask={updateActiveTaskIdHandler}
              />
            </div>
          </div>
        </Card>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <form className='form' onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <MainTaskDetails
            formik={formik}
            name='name'
            handlerBlurEvent={handlerBlurEvent}
            description='description'
            project='project'
            assignTo='assignTo'
            taskId={param?.taskId ? Number(param.taskId) : null}
            QA='qa'
            checkList='checkList'
            startDate='startDate'
            endDate='endDate'
            estimatedTime='estimatedTime'
            isTaskBillable='isTaskBillable'
            percentage='percentage'
            priority='priority'
            parentTask='parentTask'
            status='status'
            type='type'
            comment='comment'
            attachment='attachment'
            parentTaskID='parentTaskID'
          />
          {(formik.values.createdBy || formik.values.updatedBy) && (
            <UpdateDetailsSection
              id={formik.values.updatedBy}
              title={Strings.updateDetails}
              createdById={formik.values.createdBy}
              lastUpdateDate={formik.values.updatedAt}
              lastCreateDate={formik.values.createdAt}
              createDetails={formik.values.addedByUser}
              updateDetails={formik.values.updatedByUser}
            />
          )}
          <Button
            isCancelButtonRequired={true}
            isValid={formik.isValid}
            dirty={formik.dirty}
            type='submit'
            disabled={formik.isSubmitting}
          >
            {pathname.includes(constant.taskPathEndPoints.taskAdd)
              ? Strings.addNewTask
              : Strings.updateTask}
          </Button>
        </form>
      )}
    </>
  )
}
export default Form
