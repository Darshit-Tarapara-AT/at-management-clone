/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState, useCallback} from 'react'
import {Card} from 'app/Components/Card/Card'
import './List.scss'
import {CustomTable} from 'app/Components/CustomTable/CustomTable'
import SectionHeader from 'app/Components/SectionHeader/SectionHeader'
import {PageLink, PageTitle} from '_metronic/layout/core'
import {Strings} from 'app/resource/Strings'
import {policyColumns} from 'app/Components/CustomTable/CustomColoums/PolicyColoum'
import {useSelector} from 'react-redux'
import {IRootState, useAppDispatch} from 'app/redux/store'
import debounce from 'lodash.debounce'
import {policyActions} from 'app/redux/PolicySlice/PolicySlice'
import {
  getPolicy,
  getSearchPolicyList,
  getUnreadPolicyAction,
} from 'app/redux/PolicySlice/PolicyAyscThunk'
import {Loader} from 'app/Components/Loader/Loader'
import {getUserToken} from 'services/AuthServices'
import {
  setColumnBasedOnPermission,
  setFilterListSelectInputOptions,
  setTotalPageCount,
} from 'app/utils/helper'
import filterPolicy from 'app/assets/data/policy.json'
import BaseUIPagination from 'app/Components/BaseUIPagination/BaseUIPagination'
import {SelectInputValue} from 'app/pages/Projects/Components/Modal/Modal'
import {getRoles} from 'app/redux/RoleSlice/RoleAyscThunk'
import { PATHS } from 'config/paths/paths'
import constant from 'config/const/const'
import useListingAPIPayload, { payloadKeyList } from 'config/hooks/useListingAPIPayload'
import useFetchAPIBaseOnPermission from 'config/hooks/useFetchAPIBaseOnPermission'

const policyBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.policy,
    path: PATHS.policy.list,
    isSeparator: false,
    isActive: false,
  },
]
const initialState = {
  role:[{id:'', label:'Select a Role'}],
  status: [{id : '', label :Strings.active}],
}
const Lists = () => {
  const {list, isCheck, isLoading, total, error, page, limit, isSearch} = useSelector(
    (state: IRootState) => state.PolicyStateData
  )

  const {list: roleList} = useSelector((state: IRootState) => state.roleStateData)
  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const {isUserReadPolicy} = useSelector((state: IRootState) => state.UserStateData)

  const [filterAttr, setFilterAttr] = useState(initialState)
  const [searchInput, setSearchInput] = useState<string>('')
  const filterActionsPolicyColumn = setColumnBasedOnPermission(
    'Actions',
    policyColumns,
    userPermissions.policy,
    userPermissions.policy.history
  )
  const token = getUserToken()
  const {role, status} = filterAttr
  const userRoles = roleList?.map((item) => {
    return {
      id: item.id?.toString(),
      label: item.label,
    }
  })
  const shortDescription = (str: string) => {
    const regex = /(<([^>]+)>)/gi
    return str.length > constant.APIResponse.defaultStratusCode ? str.replace(regex, '').substring(0, constant.APIResponse.defaultStratusCode) + '...' : str
  }
  const rows = useMemo(() => {
    const newList = list?.map((item, index) => {
      const currentIndex = limit * (page - 1) + (index + 1)
      return {
        ...item,
        index:currentIndex,
        description: <div className='description' dangerouslySetInnerHTML={{ __html: shortDescription(item.description) }} />,
        deleteItem: userPermissions?.policy?.delete,
        editItem: userPermissions?.policy?.edit,
        viewItem: userPermissions?.policy?.view
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
      options: setFilterListSelectInputOptions(filterPolicy.policy['status']),
      filterKey: 'status',
      value: filterAttr,
    },
  ]
  const columns = useMemo(() => filterActionsPolicyColumn, [filterActionsPolicyColumn])
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (token) {
      if(list?.length > 0) return
      if (isUserReadPolicy === constant.policy.defaultUserReadPolicyValue) {
        dispatch(
          getUnreadPolicyAction({
            token,
            page: constant.page.defaultNumber,
            size: constant.page.size,
            role: role[0]?.id || '',
            status: status?.[0]?.id?.toLowerCase() || '',
          })
        )
      } else {
        dispatch(
          getPolicy({
            token,
            page: constant.page.defaultNumber,
            size: constant.page.size,
            role: role[0]?.id || '',
            status: status?.[0]?.id?.toLowerCase() || '',
          })
        )
      }
    }
  }, [dispatch, token, isUserReadPolicy])
  const paginationHandler = (currentPageNumber: string | number) => {
    const page = Number(currentPageNumber)
    if (isUserReadPolicy === constant.policy.defaultUserReadPolicyValue) {
      dispatch(
        getUnreadPolicyAction({
          token,
          page: page,
          size: constant.page.size,
          role: role[0]?.id || '',
          status: status?.[0]?.id?.toLowerCase() || '',
        })
      )
      return
    }
    dispatch(getPolicy(
      { token,
        page: page,
        size: constant.page.size,
      }))
  }
  const handlerSearchChange = (searchValue: string) => {
    setSearchInput(searchValue)
  }
  const searchListHandler = (searchValue: string) => {
    if (isUserReadPolicy === constant.policy.defaultUserReadPolicyValue) {
      callUnreadPolicyList(searchValue);
      return
    }
    const payload = {
      token,
      page: constant.page.defaultNumber,
      role : role[0]?.id,
      query: searchValue,
      size: limit,
      status: status?.[0]?.id?.toLowerCase() || '',
    }
    dispatch(getSearchPolicyList(payload))
  }
  const pageSizeChangeHandler = (size: number) => {
    dispatch(policyActions.setCurrentPageSize(size));
    if (isUserReadPolicy === constant.policy.defaultUserReadPolicyValue) {
      dispatch(
        getUnreadPolicyAction({
          token,
          page: constant.page.defaultNumber,
          size,
          role: role[0]?.id || '',
          status: status?.[0]?.id?.toLowerCase() || '',
        })
      )
      return
    }
    dispatch(getPolicy({
      token,
      page: constant.page.defaultNumber,
      size,
      role : role[0]?.id,
      status: status?.[0]?.id?.toLowerCase() || '',
      query: searchInput
    }))
  }
  const handlerFilterOptions = (filterKey: string, filterValue: SelectInputValue[]) => {
    setFilterAttr((prevState) => {
      return {
        ...prevState,
        [filterKey]: filterValue,
      }
    })
  }

  const callUnreadPolicyList = (searchValue = searchInput) => {
      dispatch(
        getUnreadPolicyAction({
          token,
          page: constant.page.defaultNumber,
          size: constant.page.size,
          query: searchValue,
          role: role[0]?.id || '',
          status: status?.[0]?.id?.toLowerCase() || '',
        })
      )
  }

  const submitFilterHandler = () => {
    if (isUserReadPolicy === constant.policy.defaultUserReadPolicyValue) {
      callUnreadPolicyList();
      return
    }
    const payload = {
      token,
      page: constant.page.defaultNumber,
      role : role[0]?.id,
      query: searchInput,
      size: limit,
      status: status?.[0]?.id?.toLowerCase() || '',
    }
    dispatch(getPolicy(payload))
  }
  const toggleSideBar = () => {
    dispatch(policyActions.toggleSideBarMenu(true))
  }
  const optimizedSearchHandler = useCallback(debounce(searchListHandler, constant.timer.defaultSearchTimer), [role, status])
  const totalPage = setTotalPageCount(total, limit)
  return (
    <>
      {(isLoading || isSearch) && list?.length === 0 ? (
        <Loader />
      ) : (
        <>
          <PageTitle
            breadcrumbs={policyBreadcrumbs}
            buttontitle={Strings.addPolicy}
            path='/policy/add'
            hasAddPermission={userPermissions.policy.add}
          >
            {Strings.policyListing}
          </PageTitle>
          <Card className='list-contain-card'>
            <SectionHeader
              path='/policy/add'
              filtersOptions={filtersOptions}
              setFilterAttr={setFilterAttr}
              isFilterRequired={true}
              isFilterLoading={isLoading}
              onFilterSubmit={submitFilterHandler}
              onFilterChange={handlerFilterOptions}
              onChange={optimizedSearchHandler}
              onSearchValueChange={handlerSearchChange}
              isFilterPermissionAllow={userPermissions?.policy?.filter}
              checkedList={isCheck || []}
              searchInput={searchInput}
              onAddButtonClick={toggleSideBar}
              list={list}
              buttonText={Strings.addPolicy}
              isAddPermissionAllow={false}
              searchTitle={Strings.searchPolicy}
            />

            <CustomTable error={error} data={rows || []} columns={columns} />
            <BaseUIPagination
              onPageSizeChangeHandler={pageSizeChangeHandler}
              pageSizeValue={[{label: limit.toString(), id: limit}]}
              numPages={totalPage > constant.page.role.allRolePageSize ? totalPage : constant.page.defaultNumber}
              page={page}
              searchInput={searchInput}
              onPageChangeHandler={paginationHandler}
            />
          </Card>
        </>
      )}
    </>
  )
}

export default Lists
