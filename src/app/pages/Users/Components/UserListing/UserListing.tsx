/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Card } from 'app/Components/Card/Card'
import './UserListing.scss'
import { CustomTable } from 'app/Components/CustomTable/CustomTable'
import SectionHeader from 'app/Components/SectionHeader/SectionHeader'
import { Strings } from 'app/resource/Strings'
import { usersColumns } from 'app/Components/CustomTable/CustomColoums/UsersColoums'
import { useSelector } from 'react-redux'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { UserActions } from 'app/redux/UserSlice/UserSlice'
import { Loader } from 'app/Components/Loader/Loader'
import {
  getAllUsersAction,
  getSearchUsersList,
  getUserFilterAction,
} from 'app/redux/UserSlice/UserAyscThunk'
import { getUserToken } from 'services/AuthServices'
import useFetchAPIBaseOnPermission from 'config/hooks/useFetchAPIBaseOnPermission'
import {
  setColumnBasedOnPermission,
  setFilterListSelectInputOptions,
  setTotalPageCount,
} from 'app/utils/helper'
import filterUser from 'app/assets/data/user.json'
import BaseUIPagination from 'app/Components/BaseUIPagination/BaseUIPagination'
import { SelectInputValue } from 'app/pages/Projects/Components/Modal/Modal'
import debounce from 'lodash.debounce'
import { getRoles } from 'app/redux/RoleSlice/RoleAyscThunk'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { PATHS } from 'config/paths/paths'
import constant from 'config/const/const'
import useListingAPIPayload, { payloadKeyList } from 'config/hooks/useListingAPIPayload'
const usersBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.users,
    path: PATHS.user.list,
    isSeparator: false,
    isActive: false,
  },
]
const initialState = {
  role: [{ id: '', label: Strings.selectRole }],
  status: [{ id: 'active', label: Strings.active }],
}
export const UserListing = () => {
  const dispatch = useAppDispatch()
  const { error, list, isLoading, total, isCheck, limit, page, isUserDataFetched } = useSelector(
    (state: IRootState) => state.UserStateData
  )
  const { list: roleList, total: totalRoles } = useSelector((state: IRootState) => state.roleStateData)
  const { userPermissions } = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const [search, setSearch] = useState('')
  const [filterAttr, setFilterAttr] = useState(initialState)
  const duplicateUserColumns = [...usersColumns]

  const rolePayload =  useListingAPIPayload(payloadKeyList.roles, constant.page.maxSize);
  useFetchAPIBaseOnPermission(userPermissions?.role.list, getRoles, rolePayload, false, roleList, totalRoles)
  const filterActionsUserColumn = setColumnBasedOnPermission(
    'Actions',
    duplicateUserColumns,
    userPermissions.user
  )

  const token = getUserToken()
  const { role, status } = filterAttr

  const userRoles = roleList?.map((item) => {
    return {
      id: item.id?.toString(),
      label: item.label,
    }
  })
  useEffect(() => {
    if (token && list?.length === 0) {
      const payload = {
        token,
        page,
        query: search,
        role: role[0]?.id,
        status: status[0]?.id,
        limit,
      }
      dispatch(getUserFilterAction(payload))
    }

  }, [dispatch, token, list])
  const rows = useMemo(() => {
    const newList = list?.map((item) => {
      return {
        ...item,
        deleteItem: userPermissions?.user?.delete,
        editItem: userPermissions?.user?.edit,
        viewItem: userPermissions?.user?.view,
      }
    })
    return newList
  }, [list])
  const filtersOptions = [
    {
      title: 'Role',
      options: userRoles,
      filterKey: 'role',
      value: filterAttr,
    },
    {
      title: 'Status',
      options: setFilterListSelectInputOptions(filterUser.user['status']),
      filterKey: 'status',
      value: filterAttr,
    },
  ]
  const columns = React.useMemo(() => filterActionsUserColumn, [filterActionsUserColumn])
  const totalPage = setTotalPageCount(total, limit)
  const paginationHandler = (currentPageKey: string | number) => {
    const page = Number(currentPageKey)
    dispatch(getAllUsersAction({ token, page, size: limit, query: search,  status: status[0]?.id }))
  }

  const searchListHandler = (searchValue: string) => {
    const payload = {
      token,
      page: constant.page.defaultNumber,
      role: role[0]?.id,
      status: status[0]?.id,
      query: searchValue,
    }
    dispatch(UserActions.resetState())
    dispatch(getSearchUsersList(payload));
  }

  const pageSizeChangeHandler = (size: number) => {
    const payload = {
      token,
      page: constant.page.defaultNumber,
      query: search,
      role: role[0]?.id,
      status: status[0]?.id,
      size
    }
    dispatch(UserActions.setCurrentPageSize(size))
    dispatch(getAllUsersAction(payload))
  }

  const handlerFilterOptions = (filterKey: string, filterValue: SelectInputValue[]) => {
    setFilterAttr((prevState) => {
      return {
        ...prevState,
        [filterKey]: filterValue,
      }
    })
  }
  const searchValueChangeHandler = (searchValue: string) => {
    setSearch(searchValue)
  }

  const submitFilterHandler = () => {
    const payload = {
      token,
      page: constant.page.defaultNumber,
      query: search,
      role: role[0]?.id,
      status: status[0]?.id,
      limit,
    }
    dispatch(getUserFilterAction(payload))
  }

  const toggleSideBar = () => {
    dispatch(UserActions.toggleSideBarMenu(true))
  }
  const optimizedSearchHandler = useCallback(debounce(searchListHandler, constant.timer.defaultSearchTimer), [role, status])
  return (
    <>
      {!isUserDataFetched ? <Loader /> : (
        <>
          <PageTitle breadcrumbs={usersBreadcrumbs} path= {PATHS.user.add} buttontitle={Strings.addUser} hasAddPermission ={userPermissions?.user?.add}>{Strings.userListing}</PageTitle>
          <Card className='user-card-container list-contain-card'>
            <SectionHeader
              path= {PATHS.user.add}
              filtersOptions={filtersOptions}
              setFilterAttr={setFilterAttr}
              isFilterLoading={isLoading}
              searchTitle={Strings.search}
              title={Strings.user}
              searchValue={search}
              onSearchValueChange={searchValueChangeHandler}
              isFilterPermissionAllow={userPermissions?.user?.filter}
              isFilterRequired={true}
              onFilterSubmit={submitFilterHandler}
              onFilterChange={handlerFilterOptions}
              checkedList={isCheck || []}
              buttonText={Strings.addUser}
              onAddButtonClick={toggleSideBar}
              list={list || []}
              isAddPermissionAllow={false}
              className='user-section-header'
              onChange={optimizedSearchHandler}
            />
            <CustomTable data={rows || []} columns={columns} error={error} />
            <BaseUIPagination
              onPageSizeChangeHandler={pageSizeChangeHandler}
              numPages={totalPage > 0 ? totalPage : constant.page.defaultCurrentPaginationNumber}
              page={page}
              searchInput={search}
              onPageChangeHandler={paginationHandler}
              pageSizeValue={[{ id: limit.toString(), label: limit.toString() }]}
            />
          </Card>
        </>
      )}
    </>
  )
}
