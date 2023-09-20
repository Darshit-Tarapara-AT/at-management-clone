/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Card} from 'app/Components/Card/Card'
import {CustomTable} from 'app/Components/CustomTable/CustomTable'
import SectionHeader from 'app/Components/SectionHeader/SectionHeader'
import {Strings} from 'app/resource/Strings'
import {useSelector} from 'react-redux'
import {IRootState, useAppDispatch} from 'app/redux/store'
import {Loader} from 'app/Components/Loader/Loader'
import {getUserToken} from 'services/AuthServices'
import { setColumnBasedOnPermission, setTotalPageCount} from 'app/utils/helper'
import BaseUIPagination from 'app/Components/BaseUIPagination/BaseUIPagination'
import constant from 'config/const/const'
import debounce from 'lodash.debounce'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { PATHS } from 'config/paths/paths'
import { AttendanceActions } from 'app/redux/AttendanceSlice/AttendanceSlice'
import { getUserAttendanceCalendarListAction } from 'app/redux/AttendanceSlice/AttendanceAyscThunk'
import { masterAttandanceColumns } from 'app/Components/CustomTable/CustomColoums/MasterAttandance'

export const getCurrentDateAndTimeAndRedirectToAttendance = () => {
  const selectedDate = new Date()
  const year = selectedDate?.getFullYear()
  const month = selectedDate?.getMonth() + 1
  const viewTaskEntryPath = PATHS?.attendance?.attendance?.replace(":month", `${month}`)?.replace(":year", `${year}`).replace(":date", `${selectedDate?.getDate()}` );
  return viewTaskEntryPath
}

const masterListBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
]
const MasterList = () => {
  const dispatch = useAppDispatch()
  const {masterList,isAttendanceDataFetched,limit,total, page,error } = useSelector(
    (state: IRootState) => state.AttendanceStateData
  )
  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const token = getUserToken()
  const [search, setSearch] = useState('')

  const rows = useMemo(() => {
    const newList = masterList?.map((item,index) => {
      const currentIndex = limit * (page - 1) + (index + 1)
      return {
        ...item,
        index: currentIndex,
        deleteItem: false,
        editItem: false,
        viewItem: userPermissions?.attendance?.viewMasterList,
      }
    })
    return newList
  }, [masterList,page])

  const filterActionsMasterAttendanceColumns = setColumnBasedOnPermission(
    'Actions',
    masterAttandanceColumns,
    userPermissions.attendance,
    userPermissions.attendance.viewMasterList
  )

  const columns = useMemo(() => filterActionsMasterAttendanceColumns, [filterActionsMasterAttendanceColumns])
  useEffect(() => {
  if (token) {
    dispatch(getUserAttendanceCalendarListAction({
      token:token,
      page: constant.page.defaultNumber,
      size: constant.page.size,
      month: '',
      year: ''
    }))
  }
},[dispatch,token])

  const paginationHandler = (currentPageKey: string | number) => {
    const page = Number(currentPageKey)
    dispatch(getUserAttendanceCalendarListAction({
      token,
      queryFilter: '',
      page,
      size: constant.page.size,
      month: '',
      year: ''
    }))
  }

  const getPayload = () => {
    return {
      token,
      page,
      size: limit,
    }
  }

  const searchListHandler = (searchValue: string) => {
    const payload: any = {
      ...getPayload(),
      queryFilter: searchValue,
    }
    dispatch(AttendanceActions.setCurrentPageSize(constant.page.size))
    dispatch(getUserAttendanceCalendarListAction(payload))
  }

  const pageSizeChangeHandler = (size: number) => {
    dispatch(AttendanceActions.setCurrentPageSize(size))
    const payload = {
      token: token,
      page: constant.page.defaultNumber,
      size,
      month: '',
      year: ''
    }
    dispatch(getUserAttendanceCalendarListAction(payload))
  }
  const searchValueChangeHandler = (searchValue: string) => {
    setSearch(searchValue)
  }
  const totalPage = setTotalPageCount(total, limit)

  const optimizedSearchHandler = useCallback(debounce(searchListHandler, constant.timer.defaultSearchTimer), [])
  return (
    <>
        <PageTitle breadcrumbs={masterListBreadcrumbs}>{Strings.userAttendanceList}</PageTitle>
      {isAttendanceDataFetched || masterList?.length === 0 ? <Loader /> : <Card className='user-card-container list-contain-card mt-6'>
        <SectionHeader
          path=''
          checkedList={[]}
          onSearchValueChange={searchValueChangeHandler}
          searchValue={search}
          searchTitle={Strings.search}
          isFilterPermissionAllow={false}
          list={masterList }
          onChange={optimizedSearchHandler}
          isAddPermissionAllow={false}
          className='user-section-header'
        />
        <CustomTable data={rows || []} columns={columns} error={error} />
        <BaseUIPagination
          onPageSizeChangeHandler={pageSizeChangeHandler}
          numPages={totalPage > 0 ? totalPage : constant.page.defaultCurrentPaginationNumber}
          page={page}
          searchInput={search}
          onPageChangeHandler={paginationHandler}
          pageSizeValue={[{id: limit.toString(), label: limit.toString()}]}
        />
      </Card>}
    </>
  )
}

export default MasterList