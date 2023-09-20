import React, { Fragment, useEffect } from 'react'
import './CustomActionCell.scss'
import { MenuComponent } from '_metronic/assets/ts/components'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { deleteRoleAction } from 'app/redux/RoleSlice/RoleAyscThunk'
import { AlertMessage } from 'app/utils/AlertMessage'
import { useAppDispatch } from 'app/redux/store'
import { getUserToken } from 'services/AuthServices'
import { deletePermissionAction } from 'app/redux/PermissionSlice/PermissionAyscThunk'
import { deleteUserAction } from 'app/redux/UserSlice/UserAyscThunk'
import { deletePolicyAction } from 'app/redux/PolicySlice/PolicyAyscThunk'
import { IRootState } from 'app/redux/store'
import { deleteProjectAction } from 'app/redux/ProjectSlice/ProjectAyscThunk'
import { deleteMultipleTaskCorrectionAction, deleteTaskAction, taskCorrectionRequestAction } from 'app/redux/TaskSlice/TaskAsyncThunk'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress, faEdit, faEye, faHistory, faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteIPAddressAction } from 'app/redux/ipAddressSlice/ipAddressAyscThunk'
import { deleteLeadAction } from 'app/redux/LeadSlice/LeadAyscThunk'
import { deleteClientAction } from 'app/redux/ClientsSlice/ClientsAyscThunk'
import { Strings } from 'app/resource/Strings';
import { deleteLeaveAction } from 'app/redux/LeaveSlice/LeaveAyscThunk';
import { PATHS } from 'config/paths/paths'
import { FormikKeys } from 'app/Components/TextArea'
import { TaskActions } from 'app/redux/TaskSlice/TaskSlice'
import constant from 'config/const/const'
import TaskTracker from 'app/pages/Tasks/Components/TaskTracker/TaskTracker'
import { deleteCredentialAction } from 'app/redux/CredentialSlice/CredentialAyscThunk'
import Style from 'config/colors/colors'
import { getCurrentDateAndTimeAndRedirectToAttendance } from 'app/pages/Attendance/pages/MasterList/MasterList'
import { AttendanceActions } from 'app/redux/AttendanceSlice/AttendanceSlice'
import { deleteMultiPleTaskCorrection } from 'services/TaskService'

interface ActionCellProps {
  id: number
  path: string
  deleteItem?: boolean
  editItem?: boolean
  hasSplitRequired?: boolean
  viewItem?: boolean
  viewAttendancePath?: string
  assignUserId?: number
  isTaskRunning?: boolean
  onUpdateTask?: (id: number) => void
  onClick?: (id: number) => void
}
interface AllowPermissionsKey {
  [index: string]: any
}
const CustomActionCell: React.FC<ActionCellProps> = ({
  deleteItem,
  editItem,
  viewItem,
  assignUserId,
  isTaskRunning,
  viewAttendancePath,
  hasSplitRequired,
  ...props
}) => {
  const {  currentProjectId } = useSelector((state: IRootState) => state.ProjectStateData);
  const navigator = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const userToken = getUserToken()
  const { currentUserProfileDetails } = useSelector((state: IRootState) => state.UserStateData)
  const { userPermissions } = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const AllPermissions: AllowPermissionsKey = { ...userPermissions }
  const permissionKey = props.path.split('/')?.[1]
  const allowPermissions = AllPermissions?.[permissionKey]

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])
  const getActionButtonClassName= (color: string) => {
return `btn btn-icon border border-${color} btn-color-${color} btn-sm me-1 action-btn`
  }

  const deleteItemHandler = (selectedId: number | string) => {
    const id = Number(selectedId)
    const task_correction_request_id = Number(selectedId)
    const page = props.path.split('/')[1]

    switch (page) {
      case 'permission':
        AlertMessage().then((result) => {
          if (result.isConfirmed) {
            dispatch(deletePermissionAction({ token: userToken, id: id }))
          }
        })
        break
      case 'role':
        AlertMessage().then((result) => {
          if (result.isConfirmed) {
            dispatch(deleteRoleAction({ token: userToken, id: id }))
          }
        })
        break
      case 'policy':
        AlertMessage().then((result) => {
          if (result.isConfirmed) {
            dispatch(deletePolicyAction({ token: userToken, id }))
          }
        })
        break

      case 'user':
        AlertMessage().then((result) => {
          if (result.isConfirmed) {
            dispatch(deleteUserAction({ token: userToken, id }))
          }
        })
        break
      case 'lead':
        AlertMessage().then((result) => {
          if (result.isConfirmed) {
            dispatch(deleteLeadAction({ token: userToken, id }))
          }
        })
        break

        case 'attendance':
          AlertMessage().then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteMultipleTaskCorrectionAction({ token: userToken, task_correction_request_id }))
            }
          })
          break

      case 'client':
        AlertMessage().then((result) => {
          if (result.isConfirmed) {
            dispatch(deleteClientAction({ token: userToken, id }))
          }
        })
        break
      case 'task':
        AlertMessage().then((result) => {
          if (result.isConfirmed) {
            dispatch(deleteTaskAction({ token: userToken, id }))
          }
        })
        break;
        case 'taskCorrection':
          AlertMessage().then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteMultipleTaskCorrectionAction({ token: userToken, task_correction_request_id:("id")}))
            }
          })
          break;

      case 'ip':
        AlertMessage().then((result) => {
          if (result.isConfirmed) {
            dispatch(deleteIPAddressAction({ token: userToken, id }))
          }
        })
        break
      case 'leave':
        AlertMessage().then((result) => {
          if (result.isConfirmed) {
            dispatch(deleteLeaveAction({ token: userToken, id }))
          }
        })
        break
        case 'task-list':
          AlertMessage().then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteTaskAction({ token: userToken, id }))
            }
          })
          break
        case "credential":
          AlertMessage().then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteCredentialAction({ token: userToken, id }))
            }
          })
          break

      default:
        AlertMessage().then((result) => {
          if (result.isConfirmed) {
            if(pathname.includes("/task-list")) {
              dispatch(deleteTaskAction({ token: userToken, id }));
              return
            }
            dispatch(deleteProjectAction({ token: userToken, id }))
          }
        })
        break
    }
  }

  const editItemHandler = (id: number | string) => {
    if(hasSplitRequired) {
      navigator(props.path);
      return
    }
    if(props.path.includes(Strings.holidayPathKey?.toLocaleLowerCase())) {
      navigator(props.path);
      return
    }
    const path: FormikKeys = PATHS
    let currentKey = permissionKey
    let dynamicPath= ''
    if(pathname?.includes(constant.taskPathEndPoints.taskList)) {
      currentKey = Strings.taskPathKey
      dynamicPath  = path[currentKey].edit?.replaceAll(constant.taskPathEndPoints.taskId, id).replaceAll(":id", currentProjectId);
      dispatch(TaskActions.setDynamicallyCurrentPath(PATHS.task.view.replaceAll(constant.taskPathEndPoints.taskId, `${id}`).replaceAll(":id", `${currentProjectId}`)))
    }
    else {
      dynamicPath = path[currentKey].edit?.replaceAll(":id", id)
    }
    navigator(dynamicPath)
  }
  const viewPageHandler = (id: number) => {
    if(viewAttendancePath) {
      navigator(viewAttendancePath);
      return
    }
    const path: FormikKeys = PATHS
    let currentKey = permissionKey
    let dynamicPath= ''
    if(pathname?.includes(constant.taskPathEndPoints.taskList)) {
      currentKey = Strings.taskPathKey
      dynamicPath  = path[currentKey].view?.replaceAll(constant.taskPathEndPoints.taskId, id).replaceAll(":id", currentProjectId);
      dispatch(TaskActions.setDynamicallyCurrentPath(PATHS.task.view.replaceAll(constant.taskPathEndPoints.taskId, `${id}`).replaceAll(":id", `${currentProjectId}`)))
    }
    else {
      dynamicPath = path[currentKey].view?.replaceAll(":id", id)
    }
    navigator(dynamicPath)
  }
  const viewPolicyHistoryHandler = (id: number) => {
    navigator(`/policy/history/${id}/view`)
  }
  const viewUserDetailsHandler = (id: number) => {
    navigator(`/user/${id}/details`)
  }
  const viewUserAttendanceDetailsHandler = (url?: string) => {
       const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
          if (newWindow) newWindow.opener = null;
  }

  const navigatorToTaskListHandler = (id: number) => {
    const path = PATHS.task.list.replace(":id", id.toString())
    dispatch(TaskActions.setDynamicallyCurrentPath(path));
    navigator(path)
  }

  return (
    <div className='action-container'>
      {pathname.includes(constant.taskPathEndPoints.taskList) && assignUserId === currentUserProfileDetails?.id && <TaskTracker hasTaskStart = {isTaskRunning} onUpdateTask ={props.onUpdateTask} taskId={props.id} hasListingPage ={true} userId={assignUserId!} />}
      {!props.path.includes(`/${Strings.user}`) && !props.path.includes(`/${Strings.attendance?.toLocaleLowerCase()}`) && viewItem && (
        <span
          className={getActionButtonClassName(Style.bootstrapClassColor.warning)}
          title='View'
          id='view'
          onClick={() => viewPageHandler(props.id)}
        >
          <FontAwesomeIcon icon={faEye} data-toggle="tooltip" className="svg-icon svg-icon-3" title={Strings.view} titleId='view' />
        </span>
      )}
      {props.path.includes(`/${Strings.user}`) && viewItem && (
        <span
          className={getActionButtonClassName(Style.bootstrapClassColor.warning)}
          title='View'
          id='view'
          onClick={() => viewUserDetailsHandler(props.id)}
        >
          <FontAwesomeIcon icon={faEye} data-toggle="tooltip" className="svg-icon svg-icon-3" title={Strings.view} titleId='view' />
        </span>
      )
      }
        {props.path.includes(`/${Strings.attendance?.toLocaleLowerCase()}`) && viewItem && (
        <span
          className={getActionButtonClassName(Style.bootstrapClassColor.warning)}
          title='View'
          id='view'
          onClick={() => viewUserAttendanceDetailsHandler(`${props.path}`)}
        >
          <FontAwesomeIcon icon={faEye} data-toggle="tooltip" className="svg-icon svg-icon-3" title={Strings.view} titleId='view' />
        </span>
      )
      }
      <>
        {editItem && (
          <span
            className={getActionButtonClassName(Style.bootstrapClassColor.success)}
            title={Strings.edit}
            onClick={() => editItemHandler(props.id)}
          >
            <FontAwesomeIcon icon={faEdit} className="svg-icon svg-icon-3" title={Strings.edit} />
          </span>
        )}
        {deleteItem && !props.path.includes(`/${Strings.user}`) ? (
          <span
            className={getActionButtonClassName(Style.bootstrapClassColor.danger)}
            title={Strings.delete}
            onClick={() => deleteItemHandler(props.id)}
          >
            
            <FontAwesomeIcon icon={faTrash} className="svg-icon svg-icon-3" title={Strings.delete} />
          </span>
        ) : deleteItem && props.id !== 1 && currentUserProfileDetails?.id !== props.id && (
          <span
            className={getActionButtonClassName(Style.bootstrapClassColor.danger)}
            title={Strings.delete}
            onClick={() => deleteItemHandler(props.id)}
          >
            <FontAwesomeIcon icon={faTrash} className="svg-icon svg-icon-3" title={Strings.delete} />
          </span>
        )}
        {props.path.includes(PATHS.policy.list) && allowPermissions?.history && (
          <span
            className={getActionButtonClassName(Style.bootstrapClassColor.info)}
            onClick={() => viewPolicyHistoryHandler(props.id)}
            title={Strings.viewHistory}
          >
            <FontAwesomeIcon icon={faHistory} className="svg-icon svg-icon-3" title={Strings.viewHistory} data-toggle="tooltip" />
          </span>
        )}
        {pathname.includes(PATHS.project.list) && userPermissions?.task?.list && (
          <span
            className={getActionButtonClassName(Style.bootstrapClassColor.info)}
            onClick={() => navigatorToTaskListHandler(props.id)}
            title={Strings.tasks}
          >
            <FontAwesomeIcon icon={faBarsProgress} className="svg-icon svg-icon-3" title={Strings.tasks} data-toggle="tooltip" />
          </span>
        )}
      </>
    </div>
  )
}

export default CustomActionCell
