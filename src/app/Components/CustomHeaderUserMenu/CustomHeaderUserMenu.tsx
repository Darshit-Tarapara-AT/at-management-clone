/* eslint-disable jsx-a11y/anchor-is-valid */
import {toAbsoluteUrl} from '_metronic/helpers'
import {useAuth} from 'app/pages/auth'
import {Strings} from 'app/resource/Strings'
import {useSelector} from 'react-redux'
import {IRootState} from 'app/redux/store'

import {NavLink} from 'react-router-dom'
import {HeaderMenuProps} from '_metronic/layout/components/header'
import { PATHS } from 'config/paths/paths'
import { capitalizeFirstLetter } from 'app/utils/helper'

const CustomHeaderMenu: React.FC<HeaderMenuProps> = ({showMenuDropdownClass}) => {
  const {logout} = useAuth()
  const {currentUserProfileDetails} = useSelector((state: IRootState) => state.UserStateData)
  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img
              alt='Logo'
              src={
                currentUserProfileDetails?.image_url || toAbsoluteUrl('/media/avatars/300-1.jpg')
              }
            />
          </div>
          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {capitalizeFirstLetter(currentUserProfileDetails?.first_name)}{' '}
              {currentUserProfileDetails?.last_name}
            </div>
            <span className='fw-bold text-muted  fs-7'>{currentUserProfileDetails?.email}</span>
            <span className='fw-bold text-muted  fs-7'>
              {capitalizeFirstLetter(currentUserProfileDetails?.role_id?.name)}
            </span>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>
      {userPermissions?.profile?.view && (
        <div className='menu-item px-5'>
          <NavLink to={PATHS.profile.view} className='menu-link px-5'>
            {Strings.viewProfile}
          </NavLink>
        </div>
      )}
      <div className='separator my-2'></div>
      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          {Strings.signOut}
        </a>
      </div>
    </div>
  )
}

export {CustomHeaderMenu}
