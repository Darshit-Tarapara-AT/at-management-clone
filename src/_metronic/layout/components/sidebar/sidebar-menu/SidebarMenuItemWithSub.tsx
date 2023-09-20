import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'
import {useLocation} from 'react-router'
import {checkIsActive, KTSVG, WithChildren} from '../../../../helpers'
import {useLayout} from '../../../core'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  onClick?: (key: string) => void
  hasBullet?: boolean
  sideBarKey: string
  isClicked?: boolean
  isMega?: boolean
}

const SidebarMenuItemWithSub: React.FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet,
  isMega = false,
  isClicked,
  onClick
}) => {
  const {pathname} = useLocation()
  const {config} = useLayout()
  const {app} = config;
  const menuItemRef = useRef<HTMLDivElement>(null)
  const styles = {
    backgroundColor: '#1E1E2D',
  }
  useEffect(() => {
   if(  menuItemRef.current ) {
    menuItemRef.current.setAttribute('data-kt-menu-trigger', "hover")
    menuItemRef.current.setAttribute('data-kt-menu-placement', "right-start")
   }
  }, [])

  return (
    <div
    ref={menuItemRef} className='menu-item menu-lg-down-accordion me-lg-1'
    >
      <span className={clsx('menu-link py-3', {
          active: checkIsActive(pathname, to),
        })}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && app?.sidebar?.default?.menu?.iconType === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        ) }
        {fontIcon && app?.sidebar?.default?.menu?.iconType === 'font' && (
          <i className={clsx('bi fs-3', fontIcon)}></i>
        )}
        <span className='menu-title'>{title}</span>
        <span className='menu-arrow'></span>
      </span>
      <div className={clsx(
          'menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown',
          isMega ? 'w-100 w-lg-850px p-5 p-lg-5' : 'menu-rounded-0 py-lg-4 w-lg-225px'
        )}
        style={styles}
        data-kt-menu-dismiss='true'>
        {children}
      </div>
    </div>
  )
}

export {SidebarMenuItemWithSub}
