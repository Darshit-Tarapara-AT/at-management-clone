import {CustomHeaderMenu} from 'app/Components/CustomHeaderUserMenu/CustomHeaderUserMenu'
import clsx from 'clsx'
import {KTSVG} from '../../../helpers'
import {HeaderNotificationsMenu, Search, ThemeModeSwitcher} from '../../../partials'
import {useLayout} from '../../core'
import {useSelector} from 'react-redux'
import {IRootState} from 'app/redux/store'
import {useEffect, useState} from 'react'
import {MenuComponent} from '_metronic/assets/ts/components'
import {toggleDrawerMenu} from 'app/utils/helper'
const itemClass = 'ms-1 ms-lg-3'
const btnClass =
  'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px'
const userAvatarClass = 'symbol-35px symbol-md-40px'
const btnIconClass = 'svg-icon-1'

const Navbar = () => {
  const {config} = useLayout()
  const {currentUserProfileDetails} = useSelector((state: IRootState) => state.UserStateData)
  const [isToggle, setIsToggle] = useState(false)

  useEffect(() => {
    const resetToggleState = () => {
      setIsToggle(false)
      toggleDrawerMenu('#kt_activities', 'bg-body drawer drawer-end')
    }
    window.addEventListener('click', resetToggleState)
    return () => window.removeEventListener('click', resetToggleState)
  }, [])
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])
  const menuBarClass = isToggle ? 'show' : ''
  return (
    <div className='app-navbar flex-shrink-0'>
      {/* <div className={clsx('app-navbar-item align-items-stretch', itemClass)}>
        <Search />
      </div> */}

      {/* <div
        className={clsx('app-navbar-item', itemClass)}
        onClick={(e) => {
          e.stopPropagation()
          toggleDrawerMenu('#kt_activities', 'bg-body drawer drawer-end drawer-on')
        }}
      >
        <div id='kt_activities_toggle' className={btnClass}>
          <KTSVG path='/media/icons/duotune/general/gen032.svg' className={btnIconClass} />
        </div>
      </div> */}

      {/* <div className={clsx('app-navbar-item', itemClass)}>
        <div
          data-kt-menu-trigger="{default: 'hover'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          className={btnClass}
        >
          <KTSVG path='/media/icons/duotune/general/gen022.svg' className={btnIconClass} />
        </div>
        <HeaderNotificationsMenu />
      </div> */}

      <div className={clsx('app-navbar-item', itemClass)}>
        {/* <button
          className={clsx('position-relative', btnClass)}
          id='kt_drawer_chat_toggle'
          onClick={() => toggleDrawerMenu('#kt_drawer_chat', 'bg-body drawer drawer-end drawer-on')}
        >
          <KTSVG path='/media/icons/duotune/communication/com012.svg' className={btnIconClass} />
          <span className='bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink' />
        </button> */}
      </div>

      <div className={clsx('app-navbar-item', itemClass)}>
        <ThemeModeSwitcher toggleBtnClass={clsx('btn-active-light-primary btn-custom')} />
      </div>

      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'hover'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <img src={currentUserProfileDetails?.image_url} alt='' />
        </div>
        <CustomHeaderMenu showMenuDropdownClass={menuBarClass} />
      </div>

      {config.app?.header?.default?.menu?.display && (
        <div className='app-navbar-item d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-color-primary w-35px h-35px'
            id='kt_app_header_menu_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className={btnIconClass} />
          </div>
        </div>
      )}
    </div>
  )
}

export {Navbar}
