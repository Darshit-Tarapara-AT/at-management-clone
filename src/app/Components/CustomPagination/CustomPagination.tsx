import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { CustomPaginationProps } from 'app/Modal/Modal'

const mappedLabel = (label: string, pagination: string[]): string => {

  if (label === '&laquo; Previous') {
    return 'Previous'
  }

  if (label === 'Next &raquo;') {
    return 'Next'
  }

  return label
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  keys,
  onButtonClick,
  totalCount,
  limit,
  nextPageUrl
}) => {

  const [paginationCount, setPaginationCount] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const totalNumber = Math.ceil(totalCount! / limit!)

    let pagination = []
    pagination.push("Previous")
    for (let i = 1; i <= totalNumber; i++) {
      pagination.push(i + "")
    }
    pagination.push("Next")
    setPaginationCount(pagination);
  }, [limit, totalCount]);

  const setCurrentPageKey = (page: string | number) => {
    if (page === 'Next' && nextPageUrl !== '') {
      page = +currentPage + 1
      setCurrentPage((preViewState) => +preViewState + 1)
    }
    if (page === 'Previous' && currentPage !== 1) {
      page = +currentPage - 1
      setCurrentPage((preViewState) => +preViewState - 1)
    }
    return page
  };

  const handlerPagination = (page: string) => {
    const currentPageUrl = setCurrentPageKey(page);
    onButtonClick(currentPageUrl)
    if (page !== 'Previous' && page !== 'Next') {
      setCurrentPage(+page)
    }
  }
  const showPreviousAndNextButton = (label: string, pagination: string[]) => {
    if (pagination.length > 3) {
      return <button
        className={clsx('page-link next-pagination-btn', {
          'page-text': label === 'Previous' || label === 'Next',
          'me-5': label === 'Previous',
        })}

        disabled = {label === "Next" && nextPageUrl === "" ? true : false}
        onClick={() => handlerPagination(label)}
        style={{ cursor: 'pointer' }}
        type='button'
      >
        {mappedLabel(label, pagination)}
      </button>
    }
  }


  return (
    <div className='row mb-10 mr-10'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div id='kt_table_users_paginate'>
          <ul className='pagination'>
            {paginationCount.length > 0 && paginationCount.map((label, index, pagination) => {
              return (
                <li
                  key={index}
                  className={clsx('page-item', {
                    previous: label === 'Previous',
                    next: label === 'Next',
                    active: Number(label) === Number(currentPage)
                  })}
                >
                  {label === "Previous" || label === "Next" ? showPreviousAndNextButton(label, pagination) : (<button
                    className={clsx('page-link', {
                      'page-text': label === 'Previous' || label === 'Next',
                      'me-5': label === 'Previous',
                    })}
                    onClick={() => handlerPagination(label)}
                    style={{ cursor: 'pointer' }}
           
                    type='button'
                  >
                    {mappedLabel(label, pagination)}
                  </button>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CustomPagination
