import {configureStore} from '@reduxjs/toolkit'
import {authReducer} from './AuthSlice/AuthSlice'
import {permissionReducer} from './PermissionSlice/PermissionSlice'
import {policyReducer} from './PolicySlice/PolicySlice'
import {roleReducer} from './RoleSlice/RoleSlice'
import {userReducer} from './UserSlice/UserSlice'
import {useDispatch} from 'react-redux'
import {policyHistoryReducer} from './PolicyHistorySlice/PolicyHistorySlice'
import {userPermissionReducer} from './UserAllowPermissions/UserPermissions'
import {LeadReducer} from './LeadSlice/LeadSlice'
import {clientsReducer} from './ClientsSlice/ClientsSlice'
import {ProjectReducer} from './ProjectSlice/ProjectSlice'
import {myProjectsDataReducer} from './MyProjectsDataSlice/MyProjectsDataSlice'
import {TaskReducer} from './TaskSlice/TaskSlice'
import {portfolioReducer} from './PortfolioSlice/PortfolioSlice'
import { ipReducer } from './ipAddressSlice/ipAddressSlice'
import { UIReducer } from './UISlice/UISlice'
import { leaveReducer } from './LeaveSlice/LeaveSlice'
import { AttendanceReducer } from './AttendanceSlice/AttendanceSlice'
import { credentialReducer } from './CredentialSlice/CredentialSlice'
import { DashboardReducer } from './DashboardSlice/DashboardSlice'
import { PerformanceReducer } from './PerformanceSlice/PerformanceSlice'


export const store = configureStore({
  reducer: {
    AuthStateData: authReducer,
    roleStateData: roleReducer,
    credentialStateData: credentialReducer,
    permissionStateData: permissionReducer,
    UserStateData: userReducer,
    PolicyStateData: policyReducer,
    IpAddressStateData: ipReducer,
    UIStateData: UIReducer,
    PolicyHistoryStateData: policyHistoryReducer,
    LeadStateData: LeadReducer,
    UserPermissionsStateData: userPermissionReducer,
    MyProjectsStateData: myProjectsDataReducer,
    ClientStateData: clientsReducer,
    portfolioStateData: portfolioReducer,
    ProjectStateData: ProjectReducer,
    DashboardStateDate: DashboardReducer,
    TaskStateData: TaskReducer,
    PerformanceStateData: PerformanceReducer,
    AttendanceStateData: AttendanceReducer,
    leaveStateData: leaveReducer
  },
})
export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;