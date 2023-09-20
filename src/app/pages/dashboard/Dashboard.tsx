import {IRootState} from 'app/redux/store'
import {Strings} from 'app/resource/Strings'
import {PageLink, PageTitle} from '_metronic/layout/core'
import {useSelector} from 'react-redux'
import {PATHS} from 'config/paths/paths'
import UpcomingWorkAnniversary from './Components/UpcomingWorkAnniversary'
import UpcomingBirthday from './Components/UpcomingBirthday'
import TodayOnLeave from './Components/TodayOnLeave'
import LastOfflineUsers from './Components/LastOfflineUser'
import AllOnlineUser from './Components/AllOnlineUser'
import UserProgress from './Components/UserProgress/UserPregress'
import Referral from './Components/UserProgress/Referral/Referral'
import StepCount from './Components/UserProgress/StepCount/StepCount'
import StepCountGraph from './Components/UserProgress/StepCountGraph/StepCountGraph'

const dashboardBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
]

const Dashboard = () => {
  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)

  return (
    <>

          <PageTitle breadcrumbs={dashboardBreadcrumbs}>{Strings.dashboard}</PageTitle>
          <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
            <UserProgress/>
            <StepCount/>
            <StepCountGraph />
            {userPermissions?.dashboard?.upcomingBirthday && <UpcomingBirthday />}
            {<Referral/>}
            {userPermissions?.dashboard?.upcomingWorkAnniversary && <UpcomingWorkAnniversary />}
            {userPermissions?.dashboard?.todayOnLeave && <TodayOnLeave/>}
            {userPermissions?.dashboard?.lastOfflineUsers && <LastOfflineUsers />}
            {userPermissions?.dashboard?.allOnlineUser && <AllOnlineUser />}
          </div>
    </>
  )
}
export default Dashboard
