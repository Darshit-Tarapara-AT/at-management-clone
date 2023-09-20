import {KTSVG} from '_metronic/helpers'
import { usePageData } from '_metronic/layout/core'
import WorkStatus from 'app/pages/dashboard/Components/WorkStatus/WorkStatus'
import { TaskActions } from 'app/redux/TaskSlice/TaskSlice'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { Strings } from 'app/resource/Strings'
import { PATHS } from 'config/paths/paths'
import { useSelector } from 'react-redux'
import {useLocation, useNavigate, useParams} from 'react-router-dom'

export interface AddButton {
  path?: string
  buttonClassName?: string
  buttonText?: string
  isAddPermissionAllow?: boolean
  hideSVGValue?: boolean;
}

const Toolbutton: React.FC<AddButton> = ({...props}) => {
  const navigator = useNavigate()
  const dispatch = useAppDispatch()
  const {userId, date, month, year} = useParams()
  const {toggleTaskCorrectionForm } = usePageData()
  const {pathname} = useLocation()
  const { userPermissions } = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const { isLoading } = useSelector((state: IRootState) => state.DashboardStateDate)
  const { list } = useSelector(
    (state: IRootState) => state.PolicyStateData
  );

  return (
    <div className='d-flex align-items-center gap-2 gap-lg-3'>
          {userPermissions?.attendance?.viewCorrection && userId && pathname ===(`/attendance/task-entry/user/${userId}/date/${date}/${month}/${year}/view` ) ? (
      <button className='btn btn-sm btn-primary m-3' type='button' onClick={()=> navigator(`/attendance/user/${userId}/date/${month}/${year}/view`)}
      >
        {Strings.verifyOnCalendar}
      </button>
      ) : <></>
    }
      {!pathname.includes('/policy/history') &&  (
        <div className='me-0 my-1 mx-5'>
          {props.isAddPermissionAllow && (
            <button
              type='button'
              className={props.buttonClassName}
              onClick={() => {
                if(props.path) {
                  navigator(props.path!);
                  return
                }
                dispatch(TaskActions.updateHasEditTaskEntryCorrection(false))
                toggleTaskCorrectionForm()
              }}
            >
              {!props.hideSVGValue && <KTSVG path="/media/icons/duotune/arrows/arr075.svg" className="svg-icon-2" />}
              {props.buttonText}
            </button>
          )}
        </div>
      )}
      {pathname === PATHS.dashboard.list && !isLoading && <WorkStatus/>}
      {userPermissions?.policy?.allhistory && pathname ===('/policy' ) && list?.length>0?(
        <button className='btn btn-sm btn-primary m-3' type='button' onClick={()=> navigator('policy/history')}
        >
          {Strings.history}
        </button>
      ) : <></>}
    </div>
  )
}

export default Toolbutton
