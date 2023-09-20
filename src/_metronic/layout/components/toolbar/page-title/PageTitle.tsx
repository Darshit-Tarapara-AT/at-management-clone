import clsx from 'clsx'
import {useLayout} from '../../../core'
import {usePageData} from '../../../core/PageData'
import {Link} from 'react-router-dom'
import {Fragment} from 'react'
import Toolbutton, {AddButton} from '../Toolbarbuttons'

const PageTitle: React.FC<AddButton> = () => {
  const {pageTitle, pageDescription, pageBreadcrumbs,buttonText, currentPath, isAddPermissionAllow, buttonClassName, hideSVGValue} = usePageData()
  const {config, classes} = useLayout()
  const appPageTitleDirection = config.app?.pageTitle?.direction

  return (
    <Fragment>
      <div
        id='kt_page_title'
        data-kt-swapper='true'
        data-kt-swapper-mode='prepend'
        data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
        className={clsx(
          'page-title d-flex flex-wrap me-3',
          classes.pageTitle.join(' '),
          config.app?.pageTitle?.class,
          {
            'flex-column justify-content-center': appPageTitleDirection === 'column',
            'align-items-center': appPageTitleDirection !== 'column',
          }
        )}
      >
        {/* begin::Title */}
        {config.app?.pageTitle?.display && pageTitle && (
          <div className='d-flex align-items-center'>
            {/* {backPageURL && <BackPageNavigation url={backPageURL || ''} />} */}
            <h1
              className={clsx('page-heading d-flex text-dark fw-bold fs-3 my-0', {
                'flex-column justify-content-center': appPageTitleDirection,
                'align-items-center': !appPageTitleDirection,
              })}
            >
              {pageTitle}
              {pageDescription && config.app?.pageTitle && config.app?.pageTitle?.description && (
                <span
                  className={clsx('page-desc text-muted fs-7 fw-semibold', {
                    'pt-2': appPageTitleDirection === 'column',
                  })}
                >
                  {config.app?.pageTitle?.direction === 'row' && (
                    <span className='h-20px border-1 border-gray-300 border-start ms-3 mx-2'></span>
                  )}
                  {pageDescription}{' '}
                </span>
              )}
            </h1>
          </div>
        )}
        {/* end::Title */}

        {pageBreadcrumbs &&
          pageBreadcrumbs.length > 0 &&
          config.app?.pageTitle &&
          config.app?.pageTitle?.breadCrumb && (
            <>
              {config.app?.pageTitle?.direction === 'row' && (
                <span className='h-20px border-gray-300 border-start mx-4'></span>
              )}
              <ul className='breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 mt-2'>
                {Array.from(pageBreadcrumbs).map((item, index, array) => (
                  <Fragment key={`${index}-dashMark`}>
                    <li
                      className={clsx('breadcrumb-item', {
                        'text-dark': !item.isSeparator && item.isActive,
                        'text-muted': !item.isSeparator && !item.isActive,
                      })}
                    >
                      <Link className='text-muted text-hover-primary' to={item.path}>
                        {item.title}
                      </Link>
                    </li>
                    <li className='breadcrumb-item'>
                      <span className='bullet bg-gray-400 w-5px h-2px'></span>
                    </li>
                  </Fragment>
                ))}
                <li className='breadcrumb-item text-muted'>{pageTitle}</li>
              </ul>
            </>
          )}
      </div>
      <Toolbutton buttonClassName = {buttonClassName} isAddPermissionAllow={isAddPermissionAllow} buttonText={buttonText} path={currentPath} hideSVGValue={hideSVGValue}/>
    </Fragment>
  )
}

export {PageTitle}
