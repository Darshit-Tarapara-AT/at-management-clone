/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Card } from 'app/Components/Card/Card'
import { CustomTable } from 'app/Components/CustomTable/CustomTable'
import SectionHeader from 'app/Components/SectionHeader/SectionHeader'
import { Strings } from 'app/resource/Strings'
import { useSelector } from 'react-redux'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { getUserToken } from 'services/AuthServices'
import { LeadActions } from 'app/redux/LeadSlice/LeadSlice'
import {
  setColumnBasedOnPermission,
  setTotalPageCount,
} from 'app/utils/helper'
import {  getSearchLeadAction } from 'app/redux/LeadSlice/LeadAyscThunk'
import BaseUIPagination from 'app/Components/BaseUIPagination/BaseUIPagination'
import { SelectInputValue } from 'app/pages/Projects/Components/Modal/Modal'
import debounce from 'lodash.debounce'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { MyLeaveColumns } from 'app/Components/CustomTable/CustomColoums/MyLeavecoloum'
import { getUserLeaveActions } from 'app/redux/LeaveSlice/LeaveAyscThunk'
import { PATHS } from 'config/paths/paths'
import constant from 'config/const/const'
import { leaveActions } from 'app/redux/LeaveSlice/LeaveSlice'

const initialState = {
  employee: [{ id: '', label: Strings.employee }],
  status: [{ id: '', label: Strings.leaveStatus }],
  type: [{ id: '', label: Strings.type }],
  startDate: [{ id: new Date().toLocaleDateString(), label: Strings.leaveStartDate }],
}

const LeaveBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
]

export const LeaveList = () => {
  const dispatch = useAppDispatch()
  const token = getUserToken()
  const { error, userLeaveList, total, limit, page } = useSelector((state: IRootState) => state.leaveStateData)
  const [search, setSearch] = useState('')
  const { userPermissions } = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const data = [...MyLeaveColumns]
  const [filterAttr, setFilterAttr] = useState(initialState)
  const filterActionsLeaveColumns = setColumnBasedOnPermission(
    'Actions',
    data,
    userPermissions.leave
  )
  useEffect(() => {
    if (token) {
      dispatch(getUserLeaveActions({
        token: token,
        page: constant.page.defaultNumber
      }))
    }
    dispatch(leaveActions.updatePreviousPagePathState(Strings.myLeaves))
    return () => {
      dispatch(leaveActions.updatePreviousPagePathState(Strings.myLeaves))
    }
  }, [token, dispatch])
const {deleteUser, editUser, viewUser} = userPermissions?.leave
  const rows = useMemo(() => {
    const newList =
    userLeaveList &&
    userLeaveList?.map((item, index) => {
        const currentIndex = limit * (page - 1) + (index + 1)
        return {
          ...item,
          index: currentIndex,
          deleteItem: deleteUser,
          editItem: editUser,
          viewItem: viewUser
        }
      })
    return newList
  }, [limit, userLeaveList, page, deleteUser, editUser, viewUser])

  const { status } = filterAttr
  const columns = React.useMemo(() => filterActionsLeaveColumns, [filterActionsLeaveColumns])
  const totalPage = setTotalPageCount(total, limit)
  const paginationHandler = (currentPageKey: string | number) => {
    const page = Number(currentPageKey)
    dispatch(getUserLeaveActions({
      token: token,
      page
    }))
  }

  const pageSizeChangeHandler = (size: number) => {
    const payload = {
      token,
      page: constant.page.defaultNumber,
      query: search,
      size,
    }
    dispatch(leaveActions.setCurrentPageSize(size))
    dispatch(getUserLeaveActions(payload))
  }

  const searchListHandler = (searchValue: string) => {
    dispatch(
      getSearchLeadAction({
        token,
        query: searchValue,
        page: constant.page.defaultNumber,
        status: status?.[0]?.id,
      })
    )
    return
  }
  const handlerFilterOptions = (filterKey: string, filterValue: SelectInputValue[]) => {
    setFilterAttr((prevState) => {
      return {
        ...prevState,
        [filterKey]: filterValue,
      }
    })
  }

  const submitFilterHandler = () => {
    const payload = {
      token,
      page: constant.page.defaultNumber,
      query: search,
      status: status[0]?.id,
      limit,
    }
    dispatch(getSearchLeadAction(payload))
  }
  const searchValueChangeHandler = (searchValue: string) => {
    setSearch(searchValue)
  }

  const toggleSideBar = () => {
    dispatch(LeadActions.toggleSideBarMenu(true))
  }
  const optimizedSearchHandler = useCallback(debounce(searchListHandler, constant.timer.defaultSearchTimer), [])
  return (
    <>
      <PageTitle breadcrumbs={LeaveBreadcrumbs}>{Strings.myLeaves}</PageTitle>
      <Card className='user-card-container list-contain-card'>
        <SectionHeader
          path={PATHS.leave.add}
          checkedList={[]}
          isFilterPermissionAllow={false}
          isHeaderRequired= {false}
          onFilterSubmit={submitFilterHandler}
          onFilterChange={handlerFilterOptions}
          searchValue={search}
          searchTitle= ""
          isSearchAllow={false}
          onSearchValueChange={searchValueChangeHandler}
          buttonText={Strings.addLead}
          onAddButtonClick={toggleSideBar}
          list={userLeaveList}
          isAddPermissionAllow={false}
          className='user-section-header'
          onChange={optimizedSearchHandler}
        />
        <CustomTable data={rows || []} columns={columns} error={error} />
        <BaseUIPagination
          numPages={totalPage > 0 ? totalPage : constant.page.defaultCurrentPaginationNumber}
          page={page}
          searchInput={search}
          onPageChangeHandler={paginationHandler}
          pageSizeValue={[{ label: limit.toString(), id: limit }]}
          onPageSizeChangeHandler={pageSizeChangeHandler}
        />
      </Card>
    </>
  )
}
export default LeaveList
