import * as React from 'react'
import {Pagination} from 'baseui/pagination'
import {BaseUIPaginationProps} from 'app/Modal/Modal'
import {Select} from 'baseui/select'
import { useState, useEffect} from 'react'
import constant from 'config/const/const'
import Style from 'config/colors/colors'
import { useSelector } from 'react-redux'
import { IRootState } from 'app/redux/store'
import { Strings } from 'app/resource/Strings'
import { PAGINATION_CHANGE_PAGE_KEY, PAGINATION_CHANGE_SIZE_KEY, allInputsStyles } from 'config/InputStyles/InputStyles'

interface BaseUIFocusType {
  $isFocused: boolean
}
const initialCurrentState = 1
const BaseUIPagination: React.FC<BaseUIPaginationProps> = ({
  numPages,
  onPageChangeHandler,
  page = 1,
  pageSizeValue,
  onPageSizeChangeHandler,
}) => {
  const {currentTheme} = useSelector((state: IRootState) => state.UIStateData)
  const [currentPage, setCurrentPage] = useState(initialCurrentState)

  useEffect(() => {
    setCurrentPage(page)
  }, [page])
  return (
    <div className='row mb-4 mt-4'>
      <div className='col-12 col-md-6 col-lg-6 col-xl-6 pb-2'>
      <Select
        options={constant.defaultPaginationOption}
        clearable={false}
        placeholder = {Strings.pagesSize}
        searchable={false}
        value={pageSizeValue}
        onChange={(params) => {
          if (onPageSizeChangeHandler) {
            const pageSize = params.value[0].id as number
            onPageSizeChangeHandler(pageSize)
            setCurrentPage(1)
          }
        }}
        overrides={{
          ...allInputsStyles(currentTheme, PAGINATION_CHANGE_SIZE_KEY)
        }}
      />
      </div>

      <div className='col-12 col-md-6 col-lg-6 col-xl-6'>
        <div className='float-end'>
          <Pagination
            numPages={numPages}
            currentPage={currentPage}
            onPageChange={({nextPage}) => {
              const page = Math.min(Math.max(nextPage, 1), numPages)
              setCurrentPage(page)
              onPageChangeHandler(page)
            }}
            overrides={{
           ...allInputsStyles(currentTheme, PAGINATION_CHANGE_PAGE_KEY)
            }}
          />
        </div>
      </div>
    </div>
  )
}
export default React.memo(BaseUIPagination)
