/* eslint-disable react-hooks/exhaustive-deps */
import React, {Fragment, useEffect, useMemo, useState} from 'react'
import {Card} from 'app/Components/Card/Card'
import {CustomTable} from 'app/Components/CustomTable/CustomTable'
import {useSelector} from 'react-redux'
import {getUserToken} from 'services/AuthServices'
import SectionHeader from 'app/Components/SectionHeader/SectionHeader'
import {PageLink, PageTitle} from '_metronic/layout/core'
import {Strings} from 'app/resource/Strings'
import {useAppDispatch} from 'app/redux/store'
import {Loader} from 'app/Components/Loader/Loader'
import {IRootState} from 'app/redux/store'
import {setColumnBasedOnPermission, setTotalPageCount} from 'app/utils/helper'
import BaseUIPagination from 'app/Components/BaseUIPagination/BaseUIPagination'
import {getIPAddress, getSearchIPAddressList} from 'app/redux/ipAddressSlice/ipAddressAyscThunk'
import {ipActions} from 'app/redux/ipAddressSlice/ipAddressSlice'
import {IPaddressColumns} from 'app/Components/CustomTable/CustomColoums/IPAddressColoum'
import { PATHS } from 'config/paths/paths'
import constant from 'config/const/const'
const permissionBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.ipAddress,
    path: PATHS.ip.list,
    isSeparator: false,
    isActive: false,
  },
]

const Lists = () => {
  const {list, isLoading, total, error, limit, page} = useSelector(
    (state: any) => state.IpAddressStateData
  )
  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const [search, setSearch] = useState('')
  const filterActionsIpColumn = setColumnBasedOnPermission(
    'Actions',
    IPaddressColumns,
    userPermissions.ip
  ) 

  const rows = useMemo(() => {
    const newList = list?.map((item: any, index: number) => {
      const currentIndex = limit * (page - 1) + (index + 1)
      return {
        ...item,
        index: currentIndex,
        deleteItem: userPermissions?.ip?.delete,
        editItem: userPermissions?.ip?.edit,
        viewItem: userPermissions?.ip?.view
      }
    })
    return newList
  }, [limit, list, page])
  const columns = useMemo(() => filterActionsIpColumn, [filterActionsIpColumn])
  const dispatch = useAppDispatch()
  const userToken = getUserToken()

  useEffect(() => {
    if (userToken) {
      dispatch(getIPAddress({token: userToken, page: constant.page.defaultNumber}))
    }
  }, [dispatch, userToken])
  const paginationHandler = (currentPageKey: string | number) => {
    const page = Number(currentPageKey)
    dispatch(getIPAddress({token: userToken, page: page}))
  }

  const searchListHandler = (searchValue: string) => {
    if (searchValue) {
      const payload: any = {
        token: userToken,
        page: constant.page.defaultNumber,
        query: searchValue,
      }
      dispatch(getSearchIPAddressList(payload))
      return
    }
    dispatch(getIPAddress({token: userToken, page: constant.page.defaultNumber}))
  }
  const pageSizeChangeHandler = (size: number) => {
    dispatch(ipActions.setCurrentPageSize(size))
    dispatch(getIPAddress({token: userToken, page: constant.page.defaultNumber, size, query: search}))
  }

  const toggleSideBar = () => {
    dispatch(ipActions.toggleSideBarMenu(true))
  }

  const searchValueChangeHandler = (searchValue: string) => {
    setSearch(searchValue)
  }
  return (
    <>
      {isLoading && list?.length === 0 ? (
        <Loader />
      ) : (
        <>
          <PageTitle breadcrumbs={permissionBreadcrumbs}>{Strings.ipAddressListing}</PageTitle>
          <Card className='list-contain-card'>
            <SectionHeader
              path='/ip-address/add'
              list={list || []}
              isAddPermissionAllow={userPermissions?.ip?.add}
              checkedList={[]}
              onAddButtonClick={toggleSideBar}
              buttonText={Strings.addIpAddress}
              searchValue={search}
              onSearchValueChange={searchValueChangeHandler}
              searchTitle={Strings.searchIPaddress}
              title={Strings.ipAddress}
              onChange={searchListHandler}
            />
            <CustomTable data={rows || []} error={error} columns={columns} />
            <BaseUIPagination
              numPages={setTotalPageCount(total, limit)}
              searchInput={search}
              onPageSizeChangeHandler={pageSizeChangeHandler}
              pageSizeValue={[{label: limit.toString(), id: limit}]}
              onPageChangeHandler={paginationHandler}
            />
          </Card>
        </>
      )}
    </>
  )
}

export default Lists
