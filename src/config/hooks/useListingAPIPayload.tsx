import {IRootState} from 'app/redux/store'
import constant from 'config/const/const'
import {PATHS} from 'config/paths/paths'
import { useCallback } from 'react'
import {useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import {getUserToken} from 'services/AuthServices'

export const payloadKeyList = {
  projects: 'projects',
  clients: 'clients',
  roles: 'roles',
  users: 'users',
  permissions: 'permissions',
  leave: 'leave',
  policy: 'policy',
  task: 'task',
  module: 'module',
}
const useListingAPIPayload = (payloadKey: string, size = 10) => {
  const token = getUserToken()
  const {pathname} = useLocation()
  const {status, currentProjectId} = useSelector((state: IRootState) => state.ProjectStateData)
  const {currentUserProfileDetails} = useSelector((state: IRootState) => state.UserStateData)

  const getListingPayload = useCallback(() => {
    switch (payloadKey) {
      case payloadKeyList.projects:
        return {
          token,
          page: constant.page.defaultNumber,
          status,
          userId: currentUserProfileDetails?.id,
          limit: pathname.includes(PATHS.project.list) ? constant.page.size : constant.page.maxSize,
        }
      case payloadKeyList.clients:
        return {
          token,
          page: constant.page.defaultNumber,
          size
        }
      case payloadKeyList.roles:
        return {
          token,
          page: constant.page.defaultNumber,
          size,
        }
      case payloadKeyList.policy:
        return {
          token,
          page: constant.page.defaultNumber,
          size,
        }
      case payloadKeyList.task:
        return {
          token,
          page: constant.page.defaultNumber,
          size,
          projectId: currentProjectId?.toString(),
        }
      case payloadKeyList.permissions:
        return {
          token,
          page: constant.page.defaultNumber,
          size,
        }
      case payloadKeyList.module:
        return {
          token,
          page: constant.page.defaultNumber,
          size,
        }
      case payloadKeyList.users:
        return {
          token,
          page: constant.page.defaultNumber,
          size,
        }
    default:
    return {
        token,
        page: constant.page.defaultNumber,
        size,
      }
    
    }
  },[token, currentProjectId, currentUserProfileDetails?.id, payloadKey, size, status, pathname])

  return getListingPayload()
}

export default useListingAPIPayload
