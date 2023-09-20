/* eslint-disable react-hooks/exhaustive-deps */
import React, {Fragment, useCallback, useEffect, useMemo, useState} from 'react'
import {Card} from 'app/Components/Card/Card'
import {CustomTable} from 'app/Components/CustomTable/CustomTable'
import {useSelector} from 'react-redux'
import {PageLink, PageTitle} from '_metronic/layout/core'
import SectionHeader from 'app/Components/SectionHeader/SectionHeader'
import {Strings} from 'app/resource/Strings'
import {IRootState, useAppDispatch} from 'app/redux/store'
import {getUserToken} from 'services/AuthServices'
import {Loader} from 'app/Components/Loader/Loader'
import {setColumnBasedOnPermission, setTotalPageCount} from 'app/utils/helper'
import BaseUIPagination from 'app/Components/BaseUIPagination/BaseUIPagination'
import debounce from 'lodash.debounce'
import { credentialActions } from 'app/redux/CredentialSlice/CredentialSlice'
import { getCredentials, getSearchCredentialsList } from 'app/redux/CredentialSlice/CredentialAyscThunk'
import { SelectInputValue } from '../Projects/Components/Modal/Modal'
import { credentialsColumns } from 'app/Components/CustomTable/CustomColoums/CredentialsColoums'
import constant from 'config/const/const'
import { current } from '@reduxjs/toolkit'
import { PATHS } from 'config/paths/paths'
const credentialBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: '/',
    isSeparator: false,
    isActive: false,
  },
]
const initialState = {
  role: [{id:'',label:Strings.selectRole}],
  user: [{id:'',label:Strings.selectUser}],
  client: [{id:'',label:Strings.selectClient}],
}

const Lists = () => {
  const {
    list: credentialsList,
    isLoading,
    total,
    error,
    page,
    limit,
  } = useSelector((state: IRootState) => state.credentialStateData)

  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const {currentUserProfileDetails} = useSelector((state: IRootState) => state.UserStateData)
  const [filterAttr, setFilterAttr] = useState(initialState)
  const {list: roleList} = useSelector((state: IRootState) => state.roleStateData)
  const {list: userList} = useSelector((state: IRootState) => state.UserStateData)
  const {list: clientList} = useSelector((state: IRootState) => state.ClientStateData)
  const dispatch = useAppDispatch()
  const userToken = getUserToken()
  const [search, setSearch] = useState('')
  const shortDescription = (str: string) => {
    const regex = /(<([^>]+)>)/gi
    return str?.length > constant.APIResponse.defaultStratusCode ? str.replace(regex, '').substring(0, constant.APIResponse.defaultStratusCode) + '...' : str
  }

  const rows = useMemo(() => {
    const newList = credentialsList?.map((item,index)=>{
      const currentIndex = limit * (page - 1) + (index + 1)
      return {
      ...item,
      index: currentIndex,
      description: <div className='description' dangerouslySetInnerHTML={{ __html: shortDescription(item.description) }} />,
      deleteItem: userPermissions?.credential?.delete,
      editItem: userPermissions?.credential?.edit,
      viewItem: userPermissions?.credential?.view
      }
    })
    return newList
  }, [credentialsList, page, currentUserProfileDetails.id])
  const userRoles = roleList?.map((item) => {
    return {
      id: item.id?.toString()|| '',
      label: item?.label || '',
    }
  })
  const users = userList?.map((item) => {
    return {
      id: item.id?.toString()|| '',
      label: item?.name || '',
    }
  })
  const client = clientList?.map((item) => {
    return {
      id: item.id?.toString() || '',
      label: item?.name || '',
    }
  })
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
      token : userToken,
      page : constant.page.defaultNumber,
      size : constant.page.size,
      role : filterAttr.role[0]?.id,
      client : filterAttr.client[0]?.id,
      user : filterAttr.user[0]?.id
    }
    dispatch(getCredentials(payload))
  }

  const filterActionsCredentialColumn = setColumnBasedOnPermission(
    'Actions',
    credentialsColumns,
    userPermissions.credential
  )

  const columns = useMemo(() => filterActionsCredentialColumn, [filterActionsCredentialColumn])
  useEffect(() => {
    if (userToken) {
      dispatch(credentialActions.resetState())
      dispatch(getCredentials({
        token: userToken,
        page: constant.page.defaultNumber,
        size: constant.page.size,
        role: currentUserProfileDetails.role_id.name.includes(constant.roles.admin)  ? '': currentUserProfileDetails.role_id?.id,
        client: '',
        user:  currentUserProfileDetails.role_id.name.includes(constant.roles.admin) ? '' : currentUserProfileDetails.id
      }))
    }
  }, [dispatch, userToken])


  const paginationHandler = (currentPageNumber: number | string) => {
    const page = Number(currentPageNumber)
    dispatch(getCredentials({
      token: userToken,
      page: page,
      size: constant.page.size,
      role: '',
      user: '',
      client: '',
      query: '',
    }))
  }

  const searchListHandler = (searchValue: string) => {
    const payload: any = {
      token: userToken,
      page: constant.page.defaultNumber,
      size: constant.page.size,
      query: searchValue,
    }
    dispatch(credentialActions.setCurrentPageSize(constant.page.size))
    dispatch(getSearchCredentialsList(payload))
  }

  const filtersOptions = [
    {
      title: Strings.role,
      options: userRoles,
      filterKey: 'role',
      value: filterAttr,
      isMultiSelect: false,
    },
    {
      title: Strings.user,
      options: users,
      filterKey: 'user',
      value: filterAttr,
      isMultiSelect: false,
    },
    {
      title: Strings.client,
      options: client,
      filterKey: 'client',
      value: filterAttr,
      isMultiSelect: false,
    },
  ]
  const pageSizeChangeHandler = (size: number) => {
    dispatch(credentialActions.setCurrentPageSize(size))
    const payload = {
      token:userToken,
      page: constant.page.defaultNumber,
      size: constant.page.size,
      role : filterAttr.role[0]?.id,
      client: filterAttr.client[0]?.id,
      user: filterAttr.user[0]?.id,
    }
    dispatch(getCredentials(payload))
  }
  const searchValueChangeHandler = (searchValue: string) => {
    setSearch(searchValue)
  }

  const optimizedSearchHandler = useCallback(debounce(searchListHandler, constant.timer.defaultSearchTimer), [])
  return (
    <Fragment>
    {isLoading && roleList?.length === 0 ? <Loader />  : <>
          <PageTitle breadcrumbs={credentialBreadcrumbs}
          buttontitle={Strings.newCredential}
          path={PATHS.credential.add}
          hasAddPermission={userPermissions.credential.add}
          >
            {Strings.credentialListing}
          </PageTitle>
          <Card className='list-contain-card'>
            <SectionHeader
                path='/credential/add'
                filtersOptions={filtersOptions}
                list={credentialsList}
                searchValue={search}
                isFilterPermissionAllow={userPermissions?.credential?.filter}
                searchTitle={Strings.searchCredentials}
                onSearchValueChange={searchValueChangeHandler}
                onFilterSubmit={submitFilterHandler}
                checkedList={[]}
                onFilterChange={handlerFilterOptions}
                buttonText={Strings.addCredentials}
                onChange={optimizedSearchHandler} isAddPermissionAllow={false}/>
            <CustomTable data={rows || []} columns={columns} error={error} />
            <BaseUIPagination
              numPages={setTotalPageCount(total, limit)}
              searchInput={search}
              onPageChangeHandler={paginationHandler}
              pageSizeValue={[{label: limit.toString(), id: limit}]}
              onPageSizeChangeHandler={pageSizeChangeHandler}
            />
          </Card>
        </>}
    </Fragment>
  )
}

export default Lists
