/* eslint-disable react-hooks/exhaustive-deps */
import {lazy, FC, Suspense, useEffect} from 'react'
import {Route, Routes, Navigate, useLocation, useNavigate, useParams} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import Roles from 'app/pages/Roles/Lists'
import Permissions from 'app/pages/Permission/Lists'
import {useSelector} from 'react-redux'
import {IRootState, useAppDispatch} from 'app/redux/store'
import {getUserToken} from 'services/AuthServices'
import {ErrorsLayout} from 'app/pages/ErrorPage/ErrorPage'
import MainLayOut from '_metronic/layout/MainLayOut/MainLayOut'
import {ProjectLayOut} from '_metronic/layout/ProjectLayOut'
import CredentialLayout from '_metronic/layout/CredentialLayout'
import {UIActions} from 'app/redux/UISlice/UISlice'
import {PATHS} from 'config/paths/paths'
import {PageLink, PageTitle} from '_metronic/layout/core'
import GeneralDetails from 'app/pages/Projects/pages/GeneralDetails/GeneralDetails'
import ViewGeneralDetails from 'app/pages/Projects/View/pages/GeneralDetails/GeneralDetails'
import PrivateDetails from 'app/pages/Projects/pages/PrivateDetails/PrivateDetails'
import Users from 'app/pages/Projects/pages/Users/User'
import Activity from 'app/pages/Projects/pages/Activity/Activity'
import Tasks from 'app/pages/Projects/pages/Tasks/Tasks'
import Files from 'app/pages/Projects/pages/Files/Files'
import {Strings} from 'app/resource/Strings'
import {AttendanceLayOut} from '_metronic/layout/AttendanceLayOut'
import Portfolio from 'app/pages/Projects/Portfolio/Portfolio'
import Archive from 'app/pages/Projects/Components/Archive/Archive'
import LeaveLayOut from '_metronic/layout/LeaveLayOut'
import { TimeTrackerProvider } from 'app/context/TimeTrackerContext'
import DashboardLayOut from '_metronic/layout/DashboardLayOut'

const generalDetailsBreadCrumbs: Array<PageLink> = [
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
    isActive: false,
  },
]
const PrivateRoutes = () => {
  const {pathname} = useLocation()
  const {date, month, year} = useParams()
  const navigator = useNavigate()
  const dispatch = useAppDispatch()
  const {isAuth} = useSelector((state: IRootState) => state.AuthStateData)
  const {currentProjectId} = useSelector((state: IRootState) => state.ProjectStateData)
  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const token = getUserToken()
  const {project} = userPermissions
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const UserListPage = lazy(() => import('../pages/Users/Lists'))
  const UserForm = lazy(() => import('../pages/Users/Form/Form'))
  const PermissionForm = lazy(() => import('../pages/Permission/Form'))
  const RoleForm = lazy(() => import('../pages/Roles/Form/Form'))
  const PolicyForm = lazy(() => import('../pages/Policy/Form'))
  const Policy = lazy(() => import('../pages/Policy/Lists/Lists'))
  const PolicyHistory = lazy(() => import('../pages/Policy/History/History'))
  const ViewPolicy = lazy(() => import('../pages/Policy/View/View'))
  const ViewCredential = lazy(() => import('../pages/Credentials/View/View'))
  const LeadForm = lazy(() => import('../pages/Lead/Form/Form'))
  const ViewLead = lazy(() => import('../pages/Lead/View/View'))
  const Leads = lazy(() => import('../pages/Lead/Lists'))
  const Clients = lazy(() => import('../pages/Client/Lists'))
  const ClientForm = lazy(() => import('../pages/Client/Form/Form'))
  const ViewClient = lazy(() => import('../pages/Client/View/View'))
  const ProjectForm = lazy(() => import('../pages/Projects/Form/Form'))
  const Projects = lazy(() => import('../pages/Projects/Lists'))
  const UserDetails = lazy(() => import('../pages/Users/Details/Details'))
  const ViewProfile = lazy(() => import('../pages/Profile/View/View'))
  const IpAddress = lazy(() => import('../../app/pages/IpAddress/Lists'))
  const IpAddressForm = lazy(() => import('../pages/IpAddress/Form'))
  const MasterLeaveList = lazy(
    () => import('../pages/Leave/Components/MasterLeaveList/MasterLeaveList')
  )
  const MasterAttendanceList = lazy(() => import('../pages/Attendance/pages/MasterList/MasterList'))
  const TaskEntry = lazy(() => import('../pages/Attendance/pages/TaskEntry/Taskentry'))
  const BillingWorkHours = lazy(() => import('../pages/Performance/Billingwork/Billingwork'))
  const BillingWorkUser = lazy(() => import('../pages/Performance/MyBillingWork/MyBillingWork'))
  const MyLeaveList = lazy(() => import('../pages/Leave/Components/MyLeaveList/MyLeaveList'))
  const UserLeaveCalendar = lazy(
    () => import('../pages/Leave/Components/UserLeaveCalendar/UserLeaveCalendar')
  )
  const MyAttendance = lazy(() => import('../pages/Attendance/pages/MyAttendance/MyAttendance'))
  const HolidayList = lazy(
    () => import('../pages/Attendance/pages/Holiday/HoilidayListing/HoilidayListing')
  )
  const CorrectionList = lazy(() => import('../pages/Attendance/pages/Correction/List/List'))
  const HolidayForm = lazy(() => import('../pages/Attendance/pages/Holiday/Form/Form'))
  const ViewLeave = lazy(() => import('../pages/Leave/View/View'))
  const AddLeaveForm = lazy(() => import('../pages/Leave/Form'))
  const currentTheme = localStorage.getItem('kt_theme_mode_value')
  const CredentialList = lazy(() => import('../pages/Credentials/Lists'))
  const DashboardList = lazy(() => import('../pages/dashboard/Dashboard'))
  const CredentialForm = lazy(() => import('../pages/Credentials/Form/Form'))


  const addTaskBreadcrumbs: Array<PageLink> = [
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
      isActive: false,
    },
    {
      title: Strings.tasks,
      path: PATHS.task.list.replace(":id",`${currentProjectId}`),
      isSeparator: false,
      isActive: true,
    },
  ]
  const taskBreadcrumbs: Array<PageLink> = [
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
      isActive: false,
    },
  ]
  useEffect(() => {
    if (currentTheme) {
      dispatch(UIActions.toggleTheme(currentTheme))
    }
  }, [currentTheme])

  
  useEffect(() => {
    const alreadyLogin = token || isAuth
    const isAuthPage = pathname.includes('/validate') || pathname.includes('/login')
    if (isAuthPage && alreadyLogin) {
      navigator(PATHS.home)
    }
  }, [pathname, token, isAuth])

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route element={<DashboardLayOut />}>
          <Route path='auth/*' element={<Navigate to='/dashboard' />} />
          {/* Pages */}
          <Route
            path='/dashboard'
            element={
              <SuspensedView>
                <TimeTrackerProvider>
                  <DashboardList />
                </TimeTrackerProvider>
              </SuspensedView>
            }
          />
        </Route>
        {/* <Route path='builder' element={<BuilderPageWrapper />} /> */}
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        {/* <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        /> */}
        {/* <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        /> */}
        {/* <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        /> */}
        {/* <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        /> */}

        {/* <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        /> */}
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {userPermissions?.user?.add ? (
          <Route
            path={PATHS.user.add}
            element={
              <SuspensedView>
                <UserForm />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}
        {userPermissions?.user?.edit ? (
          <Route
            path={PATHS.user.edit}
            element={
              <SuspensedView>
                <UserForm />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}
        {userPermissions?.user?.list ? (
          <Route
            path={PATHS.user.list}
            element={
              <SuspensedView>
                <UserListPage />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}
        {userPermissions?.user?.view ? (
          <Route
            path={PATHS.user.view}
            element={
              <SuspensedView>
                <UserDetails />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}
        {userPermissions?.role?.list ? (
          <Route
            path={PATHS.role.list}
            element={
              <SuspensedView>
                <Roles />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}
        {userPermissions?.role?.add ? (
          <Route
            path={PATHS.role.add}
            element={
              <SuspensedView>
                <RoleForm />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}
        {userPermissions?.role?.edit ? (
          <Route
            path={PATHS.role.edit}
            element={
              <SuspensedView>
                <RoleForm />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}
        {userPermissions?.permission?.list ? (
          <Route
            path={PATHS.permission.list}
            element={
              <SuspensedView>
                <Permissions />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}

        {userPermissions?.permission?.add ? (
          <Route
            path={PATHS.permission.add}
            element={
              <SuspensedView>
                <PermissionForm />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}

        {userPermissions?.permission?.edit ? (
          <Route
            path={PATHS.permission.edit}
            element={
              <SuspensedView>
                <PermissionForm />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}
        {userPermissions?.policy?.list ? (
          <Route
            path={PATHS.policy.list}
            element={
              <SuspensedView>
                <Policy />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}
        {userPermissions?.policy?.add ? (
          <Route
            path={PATHS.policy.add}
            element={
              <SuspensedView>
                <PolicyForm />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}

        <Route
          path={PATHS.policy.history}
          element={
            <SuspensedView>
              <PolicyHistory />
            </SuspensedView>
          }
        />
        <Route
          path={PATHS.policy.viewHistory}
          element={
            <SuspensedView>
              <PolicyHistory />
            </SuspensedView>
          }
        />
        {userPermissions?.policy?.edit ? (
          <Route
            path={PATHS.policy.edit}
            element={
              <SuspensedView>
                <PolicyForm />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}
        {userPermissions?.policy?.view ? (
          <Route
            path={PATHS.policy.view}
            element={
              <SuspensedView>
                <ViewPolicy />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}

        {userPermissions?.lead?.add ? (
          <Route
            path={PATHS.lead.add}
            element={
              <SuspensedView>
                <LeadForm />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}
        {userPermissions?.lead?.list ? (
          <Route
            path={PATHS.lead.list}
            element={
              <SuspensedView>
                <Leads />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}

        {userPermissions?.lead?.edit ? (
          <Route
            path={PATHS.lead.edit}
            element={
              <SuspensedView>
                <LeadForm />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}
        {userPermissions?.lead?.view ? (
          <Route
            path='/lead/:id/view'
            element={
              <SuspensedView>
                <ViewLead />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}

        {userPermissions?.client?.edit ? (
          <Route
            path={PATHS.client.edit}
            element={
              <SuspensedView>
                <ClientForm />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}

        {userPermissions?.client?.list ? (
          <Route
            path={PATHS.client.list}
            element={
              <SuspensedView>
                <Clients />
              </SuspensedView>
            }
          />
        ) : (
          <Route path='*' element={<ErrorsLayout />} />
        )}

        {userPermissions?.client?.view && (
          <Route
            path={PATHS.client.view}
            element={
              <SuspensedView>
                <ViewClient />
              </SuspensedView>
            }
          />
        )}
        <Route element={<ProjectLayOut />}>
          {userPermissions?.project?.list ? (
            <Route
              path={PATHS.project.list}
              element={
                <SuspensedView>
                  <Projects />
                </SuspensedView>
              }
            />
          ) : (
            <Route path='*' element={<ErrorsLayout />} />
          )}

          <Route
            path={PATHS.project.portfolio}
            element={
              <SuspensedView>
                <Portfolio />
              </SuspensedView>
            }
          />

          <Route
            path={PATHS.project.archive}
            element={
              <SuspensedView>
                <Archive />
              </SuspensedView>
            }
          />

          {userPermissions?.project?.add ? (
            <Route
              path={PATHS.project.add}
              element={
                <SuspensedView>
                  <ProjectForm />
                </SuspensedView>
              }
            />
          ) : (
            <Route path='*' element={<ErrorsLayout />} />
          )}
          {project.edit && (
            <Route
              path={PATHS.project.edit}
              element={
                <>
                  <PageTitle breadcrumbs={generalDetailsBreadCrumbs}>
                    {Strings.generalDetails}
                  </PageTitle>
                  <GeneralDetails />
                </>
              }
            />
          )}
          {project.view && (
            <Route
              path={PATHS.project.view}
              element={
                <>
                  <PageTitle breadcrumbs={generalDetailsBreadCrumbs}>
                    {Strings.generalDetails}
                  </PageTitle>
                  <ViewGeneralDetails />
                </>
              }
            />
          )}
          {project.editPrivate && (
            <Route
              path={PATHS.project.editPrivateDetails}
              element={
                <>
                  <PageTitle breadcrumbs={generalDetailsBreadCrumbs}>
                    {Strings.privateDetails}
                  </PageTitle>
                  <PrivateDetails />
                </>
              }
            />
          )}

          <Route
            path={PATHS.project.users}
            element={
              <>
                <PageTitle breadcrumbs={generalDetailsBreadCrumbs}>{Strings.users}</PageTitle>
                <Users />
              </>
            }
          />
          <Route
            path={PATHS.project.activity}
            element={
              <>
                <PageTitle breadcrumbs={generalDetailsBreadCrumbs}>{Strings.activity}</PageTitle>
                <Activity />
              </>
            }
          />
          {userPermissions?.task?.list && (
            <Route
              path={PATHS.task.list}
              element={
                <>
                  <PageTitle breadcrumbs={taskBreadcrumbs}>{Strings.tasks}</PageTitle>
                  <Tasks />
                </>
              }
            />
          )}
          {userPermissions?.task?.add && (
            <Route
              path={PATHS.task.add}
              element={
                <>
                  <PageTitle breadcrumbs={addTaskBreadcrumbs}>{Strings.addTask}</PageTitle>
                  <Tasks />
                </>
              }
            />
          )}

          {userPermissions?.task?.view && (
            <Route
              path={PATHS.task.view}
              element={
                <>
                  <PageTitle breadcrumbs={addTaskBreadcrumbs}>{Strings.view}</PageTitle>
                  <Tasks />
                </>
              }
            />
          )}
          {userPermissions?.task?.edit && (
            <Route
              path={PATHS.task.edit}
              element={
                <>
                  <PageTitle breadcrumbs={addTaskBreadcrumbs}>{Strings.editTask}</PageTitle>
                  <Tasks />
                </>
              }
            />
          )}
          <Route
            path={PATHS.project.files}
            element={
              <>
                <PageTitle breadcrumbs={generalDetailsBreadCrumbs}>{Strings.files}</PageTitle>
                <Files />
              </>
            }
          />
        </Route>
        <Route element={<AttendanceLayOut />}>
          <Route
            path={PATHS.attendance.masterAttendanceCalender}
            element={
              <SuspensedView>
                <MyAttendance />
              </SuspensedView>
            }
          />
          {userPermissions?.attendance?.taskEntry && (
            <Route
              path={PATHS.attendance.taskEntry}
              element={
                <SuspensedView>
                  <TaskEntry />
                </SuspensedView>
              }
            />
          )}
     
            <Route
              path={PATHS.attendance.masterTaskEntry}
              element={
                <SuspensedView>
                  <TaskEntry />
                </SuspensedView>
              }
            />
      
          <Route
            path={PATHS.attendance.attendance}
            element={
              <SuspensedView>
                <MyAttendance />
              </SuspensedView>
            }
          />
          {userPermissions?.holiday?.holidayList && (
            <Route
              path={PATHS.attendance.holiday.list}
              element={
                <SuspensedView>
                  <HolidayList />
                </SuspensedView>
              }
            />
          )}
        </Route>
        {userPermissions?.profile?.view && (
          <Route
            path={PATHS.profile.view}
            element={
              <SuspensedView>
                <ViewProfile />
              </SuspensedView>
            }
          />
        )}
        <Route element={<CredentialLayout />}>
          <Route
            path={PATHS.credential.add}
            element={
              <SuspensedView>
                <CredentialForm />
              </SuspensedView>
            }
          />
          <Route
            path={PATHS.credential.edit}
            element={
              <SuspensedView>
                <CredentialForm />
              </SuspensedView>
            }
          />
          <Route
            path={PATHS.credential.view}
            element={
              <SuspensedView>
                <ViewCredential />
              </SuspensedView>
            }
          />
          <Route
            path='/credentials'
            element={
              <SuspensedView>
                <CredentialList />
              </SuspensedView>
            }
          />
        </Route>
        {userPermissions?.ip?.list && (
          <Route
            path={PATHS.ip.list}
            element={
              <SuspensedView>
                <IpAddress />
              </SuspensedView>
            }
          />
        )}
        {userPermissions?.ip?.add && (
          <Route
            path={PATHS.ip.add}
            element={
              <SuspensedView>
                <IpAddressForm />
              </SuspensedView>
            }
          />
        )}
        {userPermissions?.ip?.edit && (
          <Route
            path={PATHS.ip.edit}
            element={
              <SuspensedView>
                <IpAddressForm />
              </SuspensedView>
            }
          />
        )}
        <Route element={<AttendanceLayOut />}>
          <Route
            path={PATHS.attendance.masterAttendanceCalender}
            element={
              <SuspensedView>
                <MyAttendance />
              </SuspensedView>
            }
          />
        
          <Route
            path={PATHS.attendance.attendance}
            element={
              <SuspensedView>
                <MyAttendance />
              </SuspensedView>
            }
          />
          {userPermissions?.holiday?.holidayList && (
            <Route
              path={PATHS.attendance.holiday.list}
              element={
                <SuspensedView>
                  <HolidayList />
                </SuspensedView>
              }
            />
          )}
        </Route>

        <Route
          path={PATHS.attendance.correction}
          element={
            <SuspensedView>
              <CorrectionList />
            </SuspensedView>
          }
        />

        {userPermissions?.holiday?.editHoliday && (
          <Route
            path={PATHS.attendance.holiday.edit}
            element={
              <SuspensedView>
                <HolidayForm />
              </SuspensedView>
            }
          />
        )}
        <Route
          path={PATHS.attendance.holiday.add}
          element={
            <SuspensedView>
              <HolidayForm />
            </SuspensedView>
          }
        />
        {/* This code will be use in feature attendance*/}
        {/* {userPermissions?.attendance?.taskEntry && (
          <Route
            path={PATHS.attendance.taskEntry}
            element={
              <SuspensedView>
                <MasterLeaveList />
              </SuspensedView>
            }
          />
        )} */}
        {userPermissions?.attendance?.masterList && (
          <Route
            path={PATHS.attendance.masterList}
            element={
              <SuspensedView>
                <MasterAttendanceList />
              </SuspensedView>
            }
          />
        )}
        <Route
          path={PATHS.performance.billingWorkHours}
          element={
            <SuspensedView>
              <BillingWorkHours />
            </SuspensedView>
          }
        />
        <Route
          path={PATHS.performance.billingWorkUser}
          element={
            <SuspensedView>
              <BillingWorkUser />
            </SuspensedView>
          }
        />
        <Route element={<LeaveLayOut />}>
          {userPermissions?.leave?.masterList && (
            <Route
              path={PATHS.leave.masterList}
              element={
                <SuspensedView>
                  <MasterLeaveList />
                </SuspensedView>
              }
            />
          )}
          {userPermissions?.leave?.add && (
            <Route
              path={PATHS.leave.add}
              element={
                <SuspensedView>
                  <AddLeaveForm />
                </SuspensedView>
              }
            />
          )}
          {userPermissions?.leave?.userList && (
            <Route
              path={PATHS.leave.myList}
              element={
                <SuspensedView>
                  <MyLeaveList />
                </SuspensedView>
              }
            />
          )}
          {(userPermissions?.leave?.viewUser || userPermissions?.leave?.viewMaster) && (
            <Route
              path={PATHS.leave.view}
              element={
                <SuspensedView>
                  <ViewLeave hasMasterViewPage={true} />
                </SuspensedView>
              }
            />
          )}
          {userPermissions?.leave?.userCalender && (
            <Route
              path={PATHS.leave.userCalender}
              element={
                <SuspensedView>
                  <UserLeaveCalendar />
                </SuspensedView>
              }
            />
          )}
          {userPermissions?.leave?.editUser && (
            <Route
              path={PATHS.leave.edit}
              element={
                <SuspensedView>
                  <AddLeaveForm />
                </SuspensedView>
              }
            />
          )}
        </Route>
      </Route>
      <Route path='*' element={<ErrorsLayout />} />
      <Route path='/not-found' element={<ErrorsLayout />} />
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })

  return <Suspense fallback={<TopBarProgress />}>{<MainLayOut>{children}</MainLayOut>}</Suspense>
}

export {PrivateRoutes}
