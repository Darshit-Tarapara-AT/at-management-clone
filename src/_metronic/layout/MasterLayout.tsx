import {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {HeaderWrapper} from './components/header'
import {ScrollTop} from './components/scroll-top'
import {Content} from './components/content'
import {Sidebar} from './components/sidebar'
import {
  DrawerMessenger,
  ActivityDrawer,
  InviteUsers,
  UpgradePlan,
  ThemeModeProvider,
} from '../partials'
import {PageDataProvider} from './core'
import {reInitMenu} from '../helpers'
import {ToolbarWrapper} from './components/toolbar'
import {useAppDispatch} from 'app/redux/store'
import {getUserToken} from 'services/AuthServices'
import {getUserPermissionsAction} from 'app/redux/UserAllowPermissions/UserPermissionsAyscThunk'
import {useSelector} from 'react-redux'
import {IRootState} from 'app/redux/store'
import {Loader} from 'app/Components/Loader/Loader'
import {getCurrentUserIPAddress} from 'app/redux/ipAddressSlice/ipAddressAyscThunk'
import { getUserProfileActions } from 'app/redux/UserSlice/UserAyscThunk'
import { FooterWrapper } from './components/footer'
import { TaskTrackerProvider } from 'app/context/TaskTrackerContext'
import useFetchAPIBaseOnPermission from 'config/hooks/useFetchAPIBaseOnPermission'

const MasterLayout = () => {
  const location = useLocation()
  const token = getUserToken()
  const dispatch = useAppDispatch()
  const {isLoaded, userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const {currentIP} = useSelector((state: IRootState) => state.IpAddressStateData)
  const {hasLoading} = useFetchAPIBaseOnPermission(userPermissions?.user.view, getUserProfileActions, token)
  useEffect(() => {
      dispatch(getCurrentUserIPAddress(''))
      /**
       * For future use
       */
      // dispatch(getAllProjectsAction({token,page:1}));
  }, [dispatch, location.pathname])
  useEffect(() => {
    if (currentIP && token) {
      dispatch(getUserPermissionsAction(token))
    }
  }, [currentIP, token, dispatch])
  useEffect(() => {
    reInitMenu()
  }, [location.key])


  return (
    <PageDataProvider>
      <ThemeModeProvider>
        <>
          {(isLoaded || hasLoading) ? (
            <Loader />
          ) : (
            <>
              <div className='d-flex flex-column flex-root app-root' id='kt_app_root' onClick={(e) => {
              }}>
                <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
                  <HeaderWrapper />
                  <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
                    <Sidebar />
                    <div className='app-main flex-column flex-row-fluid' style={{height: "100vh", overflowX: "hidden"}} id='kt_app_main'>
                      <div className='d-flex flex-column flex-column-fluid container'>
                        <ToolbarWrapper />
                        <Content>
                          <TaskTrackerProvider>
                          <Outlet />
                          </TaskTrackerProvider>
                        </Content>
                      </div>
                      <FooterWrapper />
                    </div>
                  </div>
                </div>
              </div>
              {/* begin:: Drawers */}
              <ActivityDrawer />
              <DrawerMessenger />
              {/* end:: Drawers */}
              {/* begin:: Modals */}
              <InviteUsers />
              <UpgradePlan />
              {/* end:: Modals */}
              <ScrollTop />
            </>
          )}
        </>
      </ThemeModeProvider>
    </PageDataProvider>
  )
}

export {MasterLayout}