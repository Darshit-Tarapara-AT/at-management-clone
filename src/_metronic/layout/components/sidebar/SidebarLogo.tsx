import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {KTSVG} from '../../../helpers'
import {useLayout} from '../../core'
import {useEffect, useState} from 'react'
import Logo from 'app/assets/image/site-logo-new.png'
import favicon from 'app/assets/image/favicon.png'
const SidebarLogo = () => {
  const {config} = useLayout()
  const [isSideBarToggle, setIsSideBarToggle] = useState(false)

  useEffect(() => {
    if (isSideBarToggle) {
      document.body.setAttribute('data-kt-app-sidebar-minimize', 'on')
    } else {
      document.body.setAttribute('data-kt-app-sidebar-minimize', '')
    }
    return () => {
      document.body.removeAttribute('data-kt-app-sidebar-minimize')
    }
  }, [isSideBarToggle])
  const appSidebarDefaultMinimizeDesktopEnabled =
    config?.app?.sidebar?.default?.minimize?.desktop?.enabled
  const appSidebarDefaultCollapseDesktopEnabled =
    config?.app?.sidebar?.default?.collapse?.desktop?.enabled
  const toggleType = appSidebarDefaultCollapseDesktopEnabled
    ? 'collapse'
    : appSidebarDefaultMinimizeDesktopEnabled
    ? 'minimize'
    : ''
  const toggleState = appSidebarDefaultMinimizeDesktopEnabled ? 'active' : ''
  return (
    <div className='app-sidebar-logo px-6' id='kt_app_sidebar_logo'>
      <Link to='/dashboard'>
        <img
          alt='Logo'
          src={Logo}
          className='h-40px app-sidebar-logo-default'
          style={{zIndex: 999}}
        />
        <img alt='Logo' src={favicon} className='h-30px app-sidebar-logo-minimize' />
      </Link>

      {(appSidebarDefaultMinimizeDesktopEnabled || appSidebarDefaultCollapseDesktopEnabled) && (
        <div
          id='kt_app_sidebar_toggle'
          className={clsx(
            'app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary body-bg h-30px w-30px position-absolute top-50 start-100 translate-middle rotate',
            {active: isSideBarToggle}
          )}
          data-kt-toggle='true'
          onClick={() => setIsSideBarToggle((preViewState) => !preViewState)}
          data-kt-toggle-state={toggleState}
          data-kt-toggle-target='body'
          data-kt-toggle-name={`app-sidebar-${toggleType}`}
        >
          <KTSVG path='/media/icons/duotune/arrows/arr079.svg' className='svg-icon-2 rotate-180' />
        </div>
      )}
    </div>
  )
}

export {SidebarLogo}
