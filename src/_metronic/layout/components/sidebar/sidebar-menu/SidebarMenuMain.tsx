/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import {useSelector, useDispatch} from 'react-redux'
import {IRootState} from 'app/redux/store'
import {Strings} from 'app/resource/Strings'
import {UIActions} from 'app/redux/UISlice/UISlice'
import { PATHS } from 'config/paths/paths'

const SidebarMenuMain = () => {
  const dispatch = useDispatch()
  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const {
    isLeadSideBarLinkClicked,
    isPermissionSideBarLinkClicked,
    isPolicySideBarLinkClicked,
    isProjectSideBarLinkClicked,
    isRoleSideBarLinkClicked,
    isUserSideBarLinkClicked,
    isIpSideBarLinkClicked,
    isPerformanceSideBarLinkClicked,
  } = useSelector((state: IRootState) => state.UIStateData.menuItem)
  const {role, permission, user, policy, lead, client, project, ip,leave, credential ,attendance,performance, holiday } = userPermissions

  const toggleSideMenuItem = (sideBarKey: string) => {
    dispatch(UIActions.toggleSideBarMenu(sideBarKey))
  }
  const setAttendanceAndLeavePath = (path: string) => { 
    const currentDate = new Date();
    const myCalenderPath = path?.replace(":month", `${currentDate.getMonth() + 1}`)?.replace(":year", `${currentDate.getFullYear()}`);
return myCalenderPath
  }

  return (

    <>
     <SidebarMenuItem to={PATHS.dashboard.list} title={Strings.dashboard} hasBullet={false} icon={'/media/icons/duotune/communication/com012.svg'}/>
      {!user.list && !user.add ? (
        <></>
      ) : (
        <SidebarMenuItemWithSub
          to={PATHS.user.list}
          title={Strings.users}
          sideBarKey={'isUserSideBarLinkClicked'}
          isClicked={isUserSideBarLinkClicked || false}
          fontIcon='bi-sticky'
          onClick={toggleSideMenuItem}
          icon='/media/icons/duotune/communication/com006.svg'
        >
          {user.list && <SidebarMenuItem to={PATHS.user.list} title= {Strings.users} hasBullet={true} />}
          {user.add && <SidebarMenuItem to={PATHS.user.add} title={Strings.addUser} hasBullet={true} />}
        </SidebarMenuItemWithSub>
      )}
      {!role.list && !role.add ? (
        <></>
      ) : (
        <SidebarMenuItemWithSub
          to={PATHS.role.list}
          title={Strings.role}
          sideBarKey={'isRoleSideBarLinkClicked'}
          isClicked={isRoleSideBarLinkClicked}
          onClick={toggleSideMenuItem}
          fontIcon='bi-sticky'
          icon='/media/icons/duotune/general/gen051.svg'
        >
          {role.list && <SidebarMenuItem to={PATHS.role.list} title={Strings.roles} hasBullet={true} />}
          {role.add && <SidebarMenuItem to={PATHS.role.add} title={Strings.addRole} hasBullet={true} />}
        </SidebarMenuItemWithSub>
      )}

      {!permission?.add && !permission?.list ? (
        <></>
      ) : (
        <SidebarMenuItemWithSub
          to={PATHS?.permission?.list}
          title={Strings.permission}
          sideBarKey={'isPermissionSideBarLinkClicked'}
          isClicked={isPermissionSideBarLinkClicked}
          onClick={toggleSideMenuItem}
          fontIcon='bi-sticky'
          icon='/media/icons/duotune/general/gen005.svg'
        >
          {permission?.list && (
            <SidebarMenuItem to={PATHS?.permission?.list} title={Strings.permission} hasBullet={true} />
          )}
          {permission?.add && (
            <SidebarMenuItem to={PATHS?.permission?.add} title={Strings.addPermission} hasBullet={true} />
          )}
        </SidebarMenuItemWithSub>
      )}

      {!policy.list && !policy.add ? (
        <></>
      ) : (
        <SidebarMenuItemWithSub
          to={PATHS.policy.list}
          title={Strings.policy}
          sideBarKey={'isPolicySideBarLinkClicked'}
          isClicked={isPolicySideBarLinkClicked}
          onClick={toggleSideMenuItem}
          fontIcon='bi-sticky'
          icon='/media/icons/duotune/communication/com012.svg'
        >
          {policy.list && <SidebarMenuItem to={PATHS.policy.list} title={Strings.policy} hasBullet={true} />}
          {policy.add && <SidebarMenuItem to={PATHS.policy.add} title={Strings.addPolicy} hasBullet={true} />}
        </SidebarMenuItemWithSub>
      )}
      {!lead.list && !lead.add ? (
        <></>
      ) : (
        <SidebarMenuItemWithSub
          to={PATHS.lead.list}
          sideBarKey={'isLeadSideBarLinkClicked'}
          title={Strings.lead}
          isClicked={isLeadSideBarLinkClicked}
          onClick={toggleSideMenuItem}
          fontIcon='bi-sticky'
          icon='/media/icons/duotune/communication/com012.svg'
        >
          {lead.list && <SidebarMenuItem to={PATHS.lead.list} title={Strings.lead} hasBullet={true} />}
          {lead.add && <SidebarMenuItem to={PATHS.lead.add} title={Strings.addLead} hasBullet={true} />}
        </SidebarMenuItemWithSub>
      )}

      {client.list && (
          <SidebarMenuItem to={PATHS.client.list} title={Strings.clients} hasBullet={false} icon={'/media/icons/duotune/communication/com012.svg'}/>
      )}


      {(project.list || project?.add) && (
        <SidebarMenuItemWithSub
          to={PATHS.project.list}
          sideBarKey='isProjectSideBarLinkClicked'
          title={Strings.projects}
          isClicked={isProjectSideBarLinkClicked}
          onClick={toggleSideMenuItem}
          fontIcon='bi-sticky'
          icon='/media/icons/duotune/abstract/abs042.svg'
        >
          {project?.list && (
            <SidebarMenuItem to={PATHS.project.list} title={Strings.projects} hasBullet={true} />
          )}
          {project?.add && (
            <SidebarMenuItem to={PATHS.project.add} title={Strings.addProject} hasBullet={true} />
          )}
          {project?.archive  && <SidebarMenuItem to={PATHS.project.archive} title={Strings.archiveProjects} hasBullet={true} />}
          {project?.portfolio  && <SidebarMenuItem to={PATHS.project.portfolio} title={Strings.portfolio} hasBullet={true} />}
        </SidebarMenuItemWithSub>
      )}

      {(ip.list || ip?.add) && (
        <SidebarMenuItemWithSub
          to={PATHS.ip.list}
          title={Strings.accessability}
          sideBarKey='isIpSideBarLinkClicked'
          isClicked={isIpSideBarLinkClicked}
          onClick={toggleSideMenuItem}
          fontIcon='bi-sticky'
          icon='/media/icons/duotune/communication/com012.svg'
        >
          {ip?.list && (
            <SidebarMenuItem to={PATHS.ip.list} title={Strings.ipAddress} hasBullet={true} />
          )}
        </SidebarMenuItemWithSub>
      )}
      {(credential?.list || credential?.add ) && (
        <SidebarMenuItemWithSub
          to='/Credentials'
          title={Strings.credentials}
          sideBarKey={'isRoleSideBarLinkClicked'}
          isClicked={isRoleSideBarLinkClicked}
          onClick={toggleSideMenuItem}
          fontIcon='bi-sticky'
          icon='/media/icons/duotune/general/gen051.svg'
        >
          {credential.list && <SidebarMenuItem to={PATHS.credential.list} title={Strings.credentialsList} hasBullet={true} />}
          {credential.add && <SidebarMenuItem to={PATHS.credential.add} title={Strings.newCredential} hasBullet={true} />}
        </SidebarMenuItemWithSub>)}

        <SidebarMenuItemWithSub
          to={PATHS.attendance.list}
          title={Strings.Calendar}
          sideBarKey={'isRoleSideBarLinkClicked'}
          isClicked={isRoleSideBarLinkClicked}
          onClick={toggleSideMenuItem}
          fontIcon='bi-sticky'
          icon='/media/icons/duotune/communication/com012.svg'
        >
          {/* {attendance?.list && (
          {attendance?.taskEntry && (
            <SidebarMenuItem to={PATHS.attendance.taskEntry} title={Strings.taskEntry} hasBullet={true} />
            )} */}
            <SidebarMenuItem to={setAttendanceAndLeavePath(PATHS.attendance.attendance)} title={Strings.myAttendance} hasBullet={true} />
            {holiday?.holidayList && <SidebarMenuItem to={PATHS.attendance.holiday.list} title={Strings.holiday} hasBullet={true} />}
            {attendance?.masterList && <SidebarMenuItem to={PATHS.attendance.masterList} title={Strings.adminCalendar} hasBullet={true} />}
            {attendance?.taskCorrection && <SidebarMenuItem to={PATHS.attendance.correction} title={Strings.taskCorrection} hasBullet={true} />}
        </SidebarMenuItemWithSub>

        {(leave.masterList || leave?.add || leave?.userList ||leave?.userCalender) && (
        <SidebarMenuItemWithSub
          to={PATHS.leave.myList}
          title={Strings.leave}
          sideBarKey='isIpSideBarLinkClicked'
          isClicked={isIpSideBarLinkClicked}
          onClick={toggleSideMenuItem}
          fontIcon='bi-sticky'
          icon='/media/icons/duotune/communication/com012.svg'
        >
          {leave?.userList && (
            <SidebarMenuItem to={PATHS.leave.myList} title={Strings.myLeaves} hasBullet={true} />
          )}
          {leave?.add && (
            <SidebarMenuItem to={PATHS.leave.add} title={Strings.addLeave} hasBullet={true} />
            )}
          {leave?.userCalender && (
            <SidebarMenuItem to={setAttendanceAndLeavePath(PATHS.leave.userCalender)} title={Strings.userLeave} hasBullet={true} />
          )}
          {leave?.masterList && (
              <SidebarMenuItem to={PATHS.leave.masterList} title={Strings.masterLeaves} hasBullet={true} />
            )}
        </SidebarMenuItemWithSub>
      )}


        <SidebarMenuItemWithSub
        to={PATHS.performance.list}
        title={Strings.performance}
        sideBarKey='isPerformanceSideBarLinkClicked'
        isClicked={isPerformanceSideBarLinkClicked}
        icon={'/media/icons/duotune/communication/com012.svg'}
        >
      {<SidebarMenuItem to={PATHS.performance.billingWorkHours} title={Strings.billing} hasBullet={true} />}
      {<SidebarMenuItem to={PATHS.performance.billingWorkUser} title={Strings.myBillableWork} hasBullet={true} />}

      </SidebarMenuItemWithSub>



      
    </>
  )
}

export {SidebarMenuMain}
