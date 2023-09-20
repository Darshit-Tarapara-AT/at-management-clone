import React from 'react'
import { SectionHeaderProps } from 'app/Modal/Modal'
import { KTSVG } from '_metronic/helpers'
import { useLocation, useNavigate } from 'react-router-dom'
import './SectionHeader.scss'
import { FilterList } from '../FilterLIst/FilterLIst'
import { PATHS } from 'config/paths/paths'
import Style from 'config/colors/colors'


const SectionHeader: React.FC<SectionHeaderProps> = ({
  searchTitle,
  isSearchAllow = true,
  isHeaderRequired = true,
  isFilterPermissionAllow,
  title = '',
  isFilterRequired = false,
  
  ...props
}) => {
  const navigator = useNavigate()
  const { pathname } = useLocation()

  return (
    <>
      {isHeaderRequired ? (
        <div
          className={`card-header mt-2 border-0 pb-4 p-0 flex-column flex-lg-row`}
        >
          <div className="card-title flex-column">
            <h3 className="fw-bold mb-1">{title && title + " List"}</h3>
          </div>
          <div className='card-toolbar my-1 row-gap-1'>
            {props.path !==  PATHS.policy.list && searchTitle && (
              <div className='d-flex align-items-center position-relative my-1 me-4'>
                <KTSVG
                  path='/media/icons/duotune/general/gen021.svg'
                  className='svg-icon ki-duotone ki-magnifier fs-3 position-absolute ms-3 mb-1 z-index-2'
                />
                <input
                  style={{ background: Style.lightTheme.selectInput.background }}
                  type='text'
                  id="kt_filter_search"
                  onChange={(e) => {
                    props.onChange!(e.target.value);
                    if (props.onSearchValueChange) {
                      props.onSearchValueChange(e.target.value);
                    }
                  }}
                  data-kt-user-table-filter='search'
                  value={props.searchInput}
                  className='form-control form-control-solid form-select-sm w-150px ps-9'
                  wfd-id="id18"
                  placeholder={searchTitle || title}
                />
              </div>
            )}
            {isFilterPermissionAllow && (
              <FilterList
                filtersOptions={props.filtersOptions}
                onFilterChange={props.onFilterChange}
                onFilterSubmit={props.onFilterSubmit}
                setFilterAttr={props.setFilterAttr}
                isFilterLoading={props.isFilterLoading}
                hasResetButtonRequired={props.hasResetButtonRequired}
              />
            )}
            {!pathname.includes(PATHS.policy.history) && (
              <div className='me-0 my-1 mx-5'>
                {props.isAddPermissionAllow && (
                  <button
                  type='button'
                  className='btn btn-sm btn-primary'
                  onClick={() => {
                      props.onAddButtonClick!()
                      navigator(props.path)
                    }}
                  >
                    <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                    {props.buttonText}
                  </button>
                )}
              </div>
            )}
            {props.checkedList.length === 0 && props.children}
          </div>
        </div>
      ) : <></>}
    </>

  )
}

export default SectionHeader
