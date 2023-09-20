/* eslint-disable react-hooks/exhaustive-deps */
import React, {Fragment, useCallback, useEffect, useMemo, useState} from 'react'
import {Card} from 'app/Components/Card/Card'
import {CustomTable} from 'app/Components/CustomTable/CustomTable'
import {useSelector} from 'react-redux'
import {PageLink, PageTitle} from '_metronic/layout/core'
import SectionHeader from 'app/Components/SectionHeader/SectionHeader'
import {Strings} from 'app/resource/Strings'
import {rolesColumns} from 'app/Components/CustomTable/CustomColoums/RolesColoum'
import {IRootState, useAppDispatch} from 'app/redux/store'
import {roleActions} from 'app/redux/RoleSlice/RoleSlice'
import {getRoles, getSearchRolesList} from 'app/redux/RoleSlice/RoleAyscThunk'
import {getUserToken} from 'services/AuthServices'
import {Loader} from 'app/Components/Loader/Loader'
import {setColumnBasedOnPermission, setTotalPageCount} from 'app/utils/helper'
import BaseUIPagination from 'app/Components/BaseUIPagination/BaseUIPagination'
import debounce from 'lodash.debounce'
import { PATHS } from 'config/paths/paths'
import constant from 'config/const/const'
const roleBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.roles,
    path: PATHS.role.list,
    isSeparator: false,
    isActive: false,
  },
]
const Lists = () => {
  const {
    list: roleList,
    isLoading,
    total,
    error,
    page,
    limit,
  } = useSelector((state: IRootState) => state.roleStateData)
  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const dispatch = useAppDispatch()
  const userToken = getUserToken()
  const [search, setSearch] = useState('')
  const rows = useMemo(() => {
    const newList = roleList?.map((item, index) => {
      const currentIndex = limit * (page - 1) + (index + 1)
      return {
        ...item,
        index: currentIndex,
        deleteItem: item.name.includes("admin") ? false : userPermissions?.role?.delete,
        editItem: userPermissions?.role?.edit,
        viewItem: false,
      }
    })
    return newList
  }, [roleList, page])
  const filterActionsRoleColumn = setColumnBasedOnPermission(
    'Actions',
    rolesColumns,
    userPermissions.role
  )
  const columns = useMemo(() => filterActionsRoleColumn, [filterActionsRoleColumn])
  useEffect(() => {

    if (userToken && roleList?.length === 0) {
      dispatch(getRoles({token: userToken, page: constant.page.defaultNumber,size: constant.page.size}))
    }
  }, [dispatch, userToken, roleList])

  const paginationHandler = (currentPageNumber: number | string) => {
    const page = Number(currentPageNumber)
    dispatch(getRoles({token: userToken, page: page,size: constant.page.size}))
  }

  const searchListHandler = (searchValue: string) => {
      const payload: any = {
        token: userToken,
        page: constant.page.defaultNumber,
        size: constant.page.size,
        query: searchValue,
      }
      dispatch(roleActions.setCurrentPageSize(constant.page.size))
      dispatch(getSearchRolesList(payload))
  }
  const pageSizeChangeHandler = (size: number) => {
    dispatch(roleActions.setCurrentPageSize(size))
    const payload = {
      token:userToken,page: constant.page.defaultNumber, size: size, query:search
    }
    dispatch(getRoles(payload))
  }
  const searchValueChangeHandler = (searchValue: string) => {
    setSearch(searchValue)
  }

  const toggleSideBar = () => {
    dispatch(roleActions.toggleSideBarMenu(true))
  }
  const optimizedSearchHandler = useCallback(debounce(searchListHandler, constant.timer.defaultSearchTimer), [])
  return (
    <Fragment>
      {isLoading && roleList?.length === 0 ? <Loader /> :<>
      <PageTitle breadcrumbs={roleBreadcrumbs}>{Strings.roleListing}</PageTitle>
      <Card className='list-contain-card'>
        <SectionHeader
          path= {PATHS.role.add}
          list={roleList}
          searchValue={search}
          searchTitle={Strings.searchRole}
          onSearchValueChange={searchValueChangeHandler}
          onAddButtonClick={toggleSideBar}
          checkedList={[]}
          buttonText={Strings.addRole}
          title={Strings.role}
          isAddPermissionAllow = {userPermissions?.role?.add}
          onChange={optimizedSearchHandler}
        />
          <CustomTable data={rows || []} columns={columns} error = {error} />
          <BaseUIPagination
            numPages={setTotalPageCount(total, limit)}
            searchInput={search}
            onPageChangeHandler={paginationHandler}
            pageSizeValue={[{label : limit.toString(), id: limit}]}
            onPageSizeChangeHandler={pageSizeChangeHandler}
          />
      </Card>
    </> }
    </Fragment>
  )
}

export default Lists
