/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useMemo, useCallback, useState } from 'react'
import { Card } from 'app/Components/Card/Card'
import { CustomTable } from 'app/Components/CustomTable/CustomTable'
import { useSelector } from 'react-redux'
import { getUserToken } from 'services/AuthServices'
import SectionHeader from 'app/Components/SectionHeader/SectionHeader'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { Strings } from 'app/resource/Strings'
import { permissionColumns } from 'app/Components/CustomTable/CustomColoums/PermissionsColoum'
import { permissionActions } from 'app/redux/PermissionSlice/PermissionSlice'
import { useAppDispatch } from 'app/redux/store'
import debounce from 'lodash.debounce'
import { getPermissions, getSearchPermissionsList } from 'app/redux/PermissionSlice/PermissionAyscThunk'
import { Loader } from 'app/Components/Loader/Loader'
import { IRootState } from 'app/redux/store'
import { setColumnBasedOnPermission, setTotalPageCount } from 'app/utils/helper'
import BaseUIPagination from 'app/Components/BaseUIPagination/BaseUIPagination'
import { PATHS } from 'config/paths/paths'
import constant from 'config/const/const'
import useFetchAPIBaseOnPermission from 'config/hooks/useFetchAPIBaseOnPermission'
import useListingAPIPayload, { payloadKeyList } from 'config/hooks/useListingAPIPayload'

const permissionBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.permission,
    path: PATHS.permission.list,
    isSeparator: false,
    isActive: false,
  },
]

const Lists = () => {
  const { list: permissionList, isLoading, total, error, limit,page } = useSelector((state: IRootState) => state.permissionStateData);
  const { userPermissions } = useSelector((state: IRootState) => state.UserPermissionsStateData);
  const [search, setSearch] = useState('')
  const filterActionsPermissionColumn = setColumnBasedOnPermission("Actions", permissionColumns, userPermissions.permission);
  const permissionPayload = useListingAPIPayload(payloadKeyList.permissions, constant.page.size)
  useFetchAPIBaseOnPermission(userPermissions.permission.list, getPermissions, permissionPayload, false, permissionList)
  const rows = useMemo(() => {
    const newList = permissionList?.map((item: any,index: number) => {
      const currentIndex = (limit * (page-1)) + (index+1);
      return {
        ...item,
        index: currentIndex,
        deleteItem: userPermissions?.permission?.delete,
        editItem: userPermissions?.permission?.edit,
        viewItem: false,
      }
    })
    return newList
  }, [permissionList,page]);
  const columns = useMemo(() => filterActionsPermissionColumn, [filterActionsPermissionColumn])
  const dispatch = useAppDispatch()
  const userToken = getUserToken()
  
  const paginationHandler = (currentPageKey: string | number) => {
    const page = Number(currentPageKey);
    dispatch(getPermissions({ token: userToken, page: page, query: search }))
  }

  const searchListHandler = (searchValue: string) => {
    const payload = {
      token: userToken,
      page: constant.page.defaultNumber,
      size: constant.page.size,
      query: searchValue,
    }
    dispatch(getSearchPermissionsList(payload))
  }
  
  const pageSizeChangeHandler = (size: number) => {
    dispatch(permissionActions.setCurrentPageSize(size))
    dispatch(getPermissions({ token: userToken, page: constant.page.defaultNumber, query: search, size }))
  }

  const toggleSideBar = () => {
    dispatch(permissionActions.toggleSideBarMenu(true));
  }
  
  const searchValueChangeHandler = (searchValue: string) => {
    setSearch(searchValue)
  }
  
  const optimizedSearchHandler = useCallback(debounce(searchListHandler, constant.timer.defaultSearchTimer), [])
  
  return (
    <Fragment>
      {isLoading && permissionList?.length === 0 ? <Loader /> : <>
      <PageTitle breadcrumbs={permissionBreadcrumbs}>{Strings.permissionListing}</PageTitle>
      <Card className='list-contain-card'>
        <SectionHeader
          path={PATHS.permission.add}
          list={permissionList || []}
          isAddPermissionAllow={userPermissions?.permission?.add}
          checkedList={[]}
          searchValue={search}
          onSearchValueChange={searchValueChangeHandler}
          onAddButtonClick={toggleSideBar}
          buttonText={Strings.addPermission}
          searchTitle={Strings.searchPermission}
          title={Strings.permission}
          onChange={optimizedSearchHandler}
        />
            <CustomTable data={rows || []} error={error} columns={columns} />
            <BaseUIPagination
              numPages={setTotalPageCount(total, limit)}
              onPageSizeChangeHandler={pageSizeChangeHandler}
              pageSizeValue={[{ label: limit.toString(), id: limit }]}
              searchInput={search}
              onPageChangeHandler={paginationHandler} />
      </Card>
    </>}
    </Fragment>
   
  )
}

export default Lists
