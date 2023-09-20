import { Loader } from 'app/Components/Loader/Loader';
import { getAllOnlineUserAction, getLastOfflineUsersAction, getRecentTasksAction, getTodayOnLeaveAction, getUpcomingBirthdayAction, getUpcomingWorkAnniversaryAction } from 'app/redux/DashboardSlice/DashboardAyscThunk';
import { DashboardActions } from 'app/redux/DashboardSlice/DashboardSlice';
import { getUserLeaveCalendarDataAction } from 'app/redux/LeaveSlice/LeaveAyscThunk';
import { IRootState, useAppDispatch } from 'app/redux/store';
import constant from 'config/const/const';
import useFetchAPIBaseOnPermission from 'config/hooks/useFetchAPIBaseOnPermission';
import useListingAPIPayload, { payloadKeyList } from 'config/hooks/useListingAPIPayload';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom'
import { getUserToken } from 'services/AuthServices';


const DashboardLayOut = () => {
    const dispatch = useAppDispatch()
const {isLoading, recentTask, upcomingBirthday, upcomingWorkAnniversary, todayOnLeave, lastOfflineUsers, allOnlineUser} = useSelector((state: IRootState) => state.DashboardStateDate);
const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData);
const recentTaskPayload = useListingAPIPayload("", constant.page.dashboardPageSize.recentTask);
const upcomingBirthdayPayload = useListingAPIPayload("", constant.page.dashboardPageSize.upcomingBirthdays)
const upcomingAnniversaryPayload = useListingAPIPayload("", constant.page.dashboardPageSize.upcomingAnniversary)
const todayOnLeavePayload = useListingAPIPayload("", constant.page.dashboardPageSize.todayOnLeave)
const lastOfflineUsersPayload = useListingAPIPayload("", constant.page.dashboardPageSize.lastOffline)
const allOnlineUserPayload = useListingAPIPayload("", constant.page.dashboardPageSize.allOnline)

const updatedWorkanniversary = useMemo(() => {
return upcomingWorkAnniversary
},[upcomingWorkAnniversary])
const {hasLoading: hasRecentTaskFetch} = useFetchAPIBaseOnPermission(userPermissions?.dashboard?.recentTask,getRecentTasksAction, recentTaskPayload, false, recentTask, 1);
const {hasLoading: hasUpComingBirthdayFetched} = useFetchAPIBaseOnPermission(userPermissions?.dashboard?.upcomingBirthday,getUpcomingBirthdayAction, upcomingBirthdayPayload, false, upcomingBirthday, 1);
const {hasLoading: hasUpComingAnniversaryFetched} = useFetchAPIBaseOnPermission(userPermissions?.dashboard?.upcomingWorkAnniversary,getUpcomingWorkAnniversaryAction, upcomingAnniversaryPayload, false, updatedWorkanniversary, 1);
const {hasLoading: hasTodayOnLeaveFetch} = useFetchAPIBaseOnPermission(userPermissions?.dashboard?.todayOnLeave,getTodayOnLeaveAction, todayOnLeavePayload, false, todayOnLeave, 1);
const {hasLoading: hasAllUserFetched} = useFetchAPIBaseOnPermission(userPermissions?.dashboard?.lastOfflineUsers,getAllOnlineUserAction, allOnlineUserPayload, false, allOnlineUser, 1);
const {hasLoading: hasLastOfflineUserFetch} = useFetchAPIBaseOnPermission(userPermissions?.dashboard?.lastOfflineUsers,getLastOfflineUsersAction, lastOfflineUsersPayload, false, lastOfflineUsers, 1)

const isLoad = hasRecentTaskFetch || hasLastOfflineUserFetch || hasUpComingBirthdayFetched || hasUpComingAnniversaryFetched || hasTodayOnLeaveFetch || hasAllUserFetched

    return (
            <Fragment>
                {isLoad ? <Loader /> :  <Outlet />}
            </Fragment>
    )
}

export default DashboardLayOut