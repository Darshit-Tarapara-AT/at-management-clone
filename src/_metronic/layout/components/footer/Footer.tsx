/* eslint-disable react/jsx-no-target-blank */
import { Strings } from 'app/resource/Strings'
import { useEffect } from 'react'
import { ILayout, useLayout } from '../../core'

const Footer = () => {
  const { config } = useLayout()
  const siteContactUsPageURL = process.env.REACT_APP_SITE_CONTACT_URL
  const siteAboutUsPageURL = process.env.REACT_APP_SITE_KNOW_US_URL
  useEffect(() => {
    updateDOM(config);
  }, [config])
  return (
    <>
      <div className='text-dark order-2 order-md-1'>
        <span className='text-muted fw-semibold me-1'>
          {new Date().getFullYear().toString()}&copy;
        </span>
        <a
          href='https://agreemtech.com/'
          target='_blank'
          className='text-gray-800 text-hover-primary'
        >
          {Strings.agreemTechnologies}
        </a>
      </div>

      <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
        <li className="menu-item">
          <a href={siteAboutUsPageURL} target="_blank" className="menu-link px-2">
            {Strings.about}
          </a>
        </li>
        <li className="menu-item">
          <a href={siteContactUsPageURL} target="_blank" className="menu-link px-2">
            {Strings.contactUs}
          </a>
        </li>
      </ul>
    </>
  )
}

const updateDOM = (config: ILayout) => {
  if (config.app?.footer?.fixed?.desktop) {
    document.body.classList.add('data-kt-app-footer-fixed', 'true')
  }

  if (config.app?.footer?.fixed?.mobile) {
    document.body.classList.add('data-kt-app-footer-fixed-mobile', 'true')
  }
}

export { Footer }
