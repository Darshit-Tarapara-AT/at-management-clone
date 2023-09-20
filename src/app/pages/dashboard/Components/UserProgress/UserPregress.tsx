import React from 'react'
import RecentTasks from '../RecentTasks'
import {useSelector} from 'react-redux'
import {IRootState} from 'app/redux/store'
import TimeTracker from './TimeTracker/TimeTracker'
import AttendanceDetails from './AttendanceDetails/AttendanceDetails'

const UserProgress = () => {
  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)
  return (
    <div className='row g-5 gx-xl-10 mb-5 mb-xl-10'>
      <TimeTracker />
      <AttendanceDetails />
      {userPermissions?.dashboard?.recentTask && <RecentTasks />}
    </div>
  )
}

export default UserProgress