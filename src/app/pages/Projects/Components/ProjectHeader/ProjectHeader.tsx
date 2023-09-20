/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import { Strings } from 'app/resource/Strings'
import { KTSVG } from '_metronic/helpers'
import { DetailsProfileSectionProps } from '../Modal/Modal'
import { IRootState } from 'app/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { UserPersonalInformation } from 'app/redux/UserSlice/UserTypes'
import { Modal } from 'app/Components/Modal/Modal'
import { capitalizeFirstLetter } from 'app/utils/helper'
import { PATHS } from 'config/paths/paths'
import { TaskActions } from 'app/redux/TaskSlice/TaskSlice'
import { setItem } from 'app/utils/storage'
import constant from 'config/const/const'
import { setColumnBackground } from 'app/Components/CustomTable/CustomColoums/ProjectColoums'
import { TeamMemberFields } from 'app/redux/ProjectSlice/ProjectTypes'

export interface ModalBodyProps {
  teamUserList: TeamMemberFields[]
}
export const ProjectHeader: React.FC<DetailsProfileSectionProps> = ({
  logo = '',
  projectName,
  openTask,
  projectStatus,
  navLinks,
  arrowColor,
  tags,
  estimateHourArrowIcon,
  team,
  dueDate,
  editId,
  estimateHour
}) => {

  const location = useLocation()
  const dispatch = useDispatch()
  const navigator = useNavigate();
  const { specificProject } = useSelector((state: IRootState) => state.ProjectStateData);
  const { userPermissions } = useSelector((state: IRootState) => state.UserPermissionsStateData);

  const navigateToAddTask = () => {
    const addTaskPath = PATHS.task.add.replaceAll(":id", `${editId}`);
    dispatch(TaskActions.setDynamicallyCurrentPath(addTaskPath));
    setItem("currentPath", addTaskPath);
    navigator(addTaskPath)
  }

  const navigateToTaskList = (path: string) => {

    if (path.includes(constant.taskPathEndPoints.taskAdd) || path.includes(constant.taskPathEndPoints.taskList) || path.includes(constant.taskPathEndPoints.view) || path.includes(constant.taskPathEndPoints.taskEdit)) {
      const listTaskPath = PATHS.task.list.replaceAll(":id", `${editId}`);
      dispatch(TaskActions.setDynamicallyCurrentPath(listTaskPath));
      setItem("currentPath", listTaskPath);
      navigator(listTaskPath)
    }
  }

  const teamMembers = (specificProject?.team_members && specificProject?.team_members?.length > 0)  ? specificProject?.team_members : []
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div
              className="d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px me-7 mb-4">
              <img className="mw-150px mh-150px" src={logo}
                alt="" />
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <span className='text-gray-800  fs-2 fw-bolder me-1'>
                    {projectName}
                  </span>
                  <span className={`${setColumnBackground(projectStatus ||'')} ml-2   py-0`}>{projectStatus}</span>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <div className="d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-400">
                    {tags?.join(",").replaceAll(",", ", ")}
                  </div>
                </div>
              </div>
              {userPermissions?.task?.add && (
                <div className="d-flex mb-4">
                  <button className="btn btn-sm btn-primary me-3" onClick={navigateToAddTask}>{Strings.addTask}</button>
                </div>
              )}
            </div>
            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  {dueDate && (
                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <div className='fs-4 fw-bold'>{moment(new Date(dueDate)).format("Do MMMM  YYYY")}</div>
                      </div>
                      <div className='fw-bold fs-6 text-gray-400'>{Strings.dueDate}</div>
                    </div>
                  )}
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      {/* For future use */}
                      {/* <KTSVG
                        path='/media/icons/duotune/arrows/arr065.svg'
                        className='svg-icon-3 svg-icon-danger me-2'
                      />  */}
                      <div className='fs-2  text-align-center fw-bolder'>{openTask}</div>
                    </div>
                    <div className='fw-bold fs-6 text-gray-400'>{Strings.openTask}</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path={estimateHourArrowIcon}
                        className={`svg-icon-3 ${arrowColor}`}
                      />
                      <div className='fs-2 fw-bolder'>{estimateHour}</div>
                    </div>
                    <div className='fw-bold fs-6 text-gray-400'>{Strings.hours}</div>
                  </div>
                  <div className="symbol-group symbol-hover mb-3">
                    {teamMembers?.length > 0 && <>
                      {teamMembers?.filter((item, index) => index < 5).map((item, index) => {
                        return (
                          <div key={`${index}`} className="symbol symbol-35px symbol-circle" title={item.label} data-bs-toggle="tooltip" aria-label="Michael Eberon" data-bs-original-title="Michael Eberon" data-kt-initialized="1">
                            <img alt="Pic" src={item?.user_image} />
                          </div>
                        )
                      })}
                      {(teamMembers?.length - 5) > 0 && <a className="symbol symbol-35px symbol-circle" data-bs-toggle="modal" data-bs-target="#kt_modal_view_users">
                        <span className="symbol-label bg-dark text-inverse-dark fs-8 fw-bold" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-original-title="View more users" data-kt-initialized="1">+{
                          teamMembers?.length - 5
                        }</span>
                      </a>}

                    </>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal id={"kt_modal_view_users"}>
          <ModalBody teamUserList={teamMembers} />
        </Modal>
        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            {navLinks.map((link, index) => {
              return link.isAllow ? (
                <li className='nav-item' key={`${index}`} onClick={() => navigateToTaskList(link.path)} >
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === link.path && 'active')
                    }
                    to={link.path}
                  >
                    {link.title}
                  </Link>
                </li>
              ) : []
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}


const ModalHeader = () => {
  return (
    <div className="text-center mb-13">
      <h1 className="mb-3">{Strings.projectsTeam}</h1>
      <div className="text-muted fw-semibold fs-5">
      </div>
    </div>
  )
}

const ModalBody: React.FC<ModalBodyProps> = ({
  teamUserList
}) => {
  return (
    <>
      <ModalHeader />
      {teamUserList?.map((user) => {
        return (
          <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed" key={`${user.id}`}>
            <div className="d-flex align-items-center">
              <div className="symbol symbol-35px symbol-circle">
                <img alt={user.label} src={user.user_image} />
              </div>
              <div className="ms-6">
                {user.label}
                  <span className="badge badge-light fs-8 fw-semibold ms-2">{capitalizeFirstLetter(user.designation)}
                  </span>
                <div className="fw-semibold text-muted">{user.email}m</div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
export default ProjectHeader 