/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Card } from 'app/Components/Card/Card'
import { CustomTable } from 'app/Components/CustomTable/CustomTable'
import SectionHeader from 'app/Components/SectionHeader/SectionHeader'
import { Strings } from 'app/resource/Strings'
import { useSelector } from 'react-redux'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { getUserToken } from 'services/AuthServices'
import { setFilterListSelectInputOptions } from 'app/utils/helper'
import { LeadActions } from 'app/redux/LeadSlice/LeadSlice'
import {setColumnBasedOnPermission, setTotalPageCount} from 'app/utils/helper'
import BaseUIPagination from 'app/Components/BaseUIPagination/BaseUIPagination'
import { SelectInputValue } from 'app/pages/Projects/Components/Modal/Modal'
import debounce from 'lodash.debounce'
import { LeaveColumns } from 'app/Components/CustomTable/CustomColoums/LeaveColoum'
import filterLeave from 'app/assets/data/leaves.json'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { getAllLeavesAction, getFilterLeaveAction, getSearchLeaveAction } from 'app/redux/LeaveSlice/LeaveAyscThunk'
import { Loader } from 'app/Components/Loader/Loader'
import { leaveActions } from 'app/redux/LeaveSlice/LeaveSlice'
import { PATHS } from 'config/paths/paths'
import constant from 'config/const/const'

const initialState = {
  employee: [{ id: '', label: Strings.all }],
  status: [{ id: '', label: Strings.leaveStatus }],
  type: [{ id: '', label: Strings.type }],
  startDate: '',
  endDate: '',
}

const LeaveBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
]

export const MasterLeaveList = () => {
  const dispatch = useAppDispatch()
  const { list: allUsers } = useSelector((state: IRootState) => state.UserStateData)
  const { error, list, total, limit, page, isLoading } = useSelector((state: IRootState) => state.leaveStateData)
  const [search, setSearch] = useState('')
  const { userPermissions } = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const data = [...LeaveColumns]
  const [filterAttr, setFilterAttr] = useState(initialState)
  const filterActionsLeaveColumns = setColumnBasedOnPermission(
    'Actions',
    data,
    userPermissions.leave
  )

  const { deleteMaster, editMater, viewMaster } = userPermissions?.leave
  const token = getUserToken()
  useEffect(() => {
    if (token) {
      dispatch(getAllLeavesAction({
        token,
        page: constant.page.defaultNumber
      }))
    }
    dispatch(leaveActions.updatePreviousPagePathState(Strings.masterLeaves))
    return () => {
      dispatch(leaveActions.updatePreviousPagePathState(Strings.masterLeaves))
    }
  }, [dispatch, token])
  const rows = useMemo(() => {
    const newList =
      list &&
      list?.map((item, index) => {
        const currentIndex = limit * (page - 1) + (index + 1)
        return {
          ...item,
          index: currentIndex,
          deleteItem: deleteMaster,
          editItem: editMater,
          viewItem: viewMaster
        }
      })
    return newList
  }, [limit, list, page, viewMaster, editMater, deleteMaster])
  const user = allUsers?.map((item) => {
    return {
      label: item.name,
      id: item.id
    }
  })

  const { status } = filterAttr
  const columns = React.useMemo(() => filterActionsLeaveColumns, [filterActionsLeaveColumns])
  const filtersOptions = [
    {
      title: 'Status',
      options: setFilterListSelectInputOptions(filterLeave['leaves.status']),
      filterKey: 'status',
      value: filterAttr,
    },
    {
      title: 'employee',
      options: user,
      filterKey: 'employee',
      value: filterAttr,
    },
    {
      title: 'type',
      options: setFilterListSelectInputOptions(filterLeave['leaves.type']),
      filterKey: 'type',
      value: filterAttr,
    },
  ]
  const totalPage = setTotalPageCount(total, limit)

  const paginationHandler = (currentPageKey: string | number) => {
    const page = Number(currentPageKey)
    const payload = {
      token,
      page,
      statusFilter: filterAttr?.status?.[0].id,
      userFilter: filterAttr?.employee?.[0].id,
      start_date: filterAttr?.startDate as string,
      information_type: filterAttr?.type?.[0]?.id,
      end_date: filterAttr?.endDate,
      size: limit,
    }
    dispatch(getFilterLeaveAction(payload))
  }

  const pageSizeChangeHandler = (size: number) => {
    const payload = {
      token,
      page: constant.page.defaultNumber,
      size,
      statusFilter: filterAttr?.status?.[0].id,
      userFilter: filterAttr?.employee?.[0].id,
      start_date: filterAttr?.startDate ,
      information_type: filterAttr?.type?.[0]?.id,
      end_date: filterAttr?.endDate,
    }
    dispatch(leaveActions.setCurrentPageSize(size))
    dispatch(getFilterLeaveAction(payload))

  }

  const searchListHandler = (searchValue: string) => {
    dispatch(
      getSearchLeaveAction({
        token,
        query: searchValue,
        page: constant.page.defaultNumber,
        start_date: '',
        end_date: '',
        type: '',
        employee: '',
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
      statusFilter: filterAttr?.status?.[0]?.id,
      userFilter: filterAttr?.employee?.[0]?.id,
      start_date: filterAttr?.startDate as string,
      information_type: filterAttr?.type?.[0]?.id,
      end_date: filterAttr?.endDate,
      size: limit,
    }
    dispatch(getFilterLeaveAction(payload))
  }
  const searchValueChangeHandler = (searchValue: string) => {
    setSearch(searchValue)
  }

  const toggleSideBar = () => {
    dispatch(LeadActions.toggleSideBarMenu(true))
  }
  const optimizedSearchHandler = useCallback(debounce(searchListHandler, constant.timer.defaultSearchTimer), [status])
  return (
    <>
      <PageTitle breadcrumbs={LeaveBreadcrumbs}>{Strings.masterLeaves}</PageTitle>
      {isLoading ? <Loader /> : (
        <Card>
          <SectionHeader
            path={PATHS.leave.add}
            checkedList={[]}
            isFilterPermissionAllow={userPermissions?.leave?.masterList}
            onFilterSubmit={submitFilterHandler}
            onFilterChange={handlerFilterOptions}
            searchValue={search}
            isSearchAllow={false}
            onSearchValueChange={searchValueChangeHandler}
            filtersOptions={filtersOptions}
            buttonText={Strings.addLeave}
            onAddButtonClick={toggleSideBar}
            list={list}
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
      )}

    </>
  )
}
export default MasterLeaveList
