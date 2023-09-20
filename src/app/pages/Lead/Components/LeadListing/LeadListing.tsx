/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useMemo, useState} from 'react'
import leadData from 'app/assets/data/lead.json'
import {Card} from 'app/Components/Card/Card'
import {CustomTable} from 'app/Components/CustomTable/CustomTable'
import SectionHeader from 'app/Components/SectionHeader/SectionHeader'
import {Strings} from 'app/resource/Strings'
import {LeadColumns} from 'app/Components/CustomTable/CustomColoums/LeadColoums'
import {useSelector} from 'react-redux'
import {IRootState, useAppDispatch} from 'app/redux/store'
import {getUserToken} from 'services/AuthServices'
import {setFilterListSelectInputOptions} from 'app/utils/helper'
import {LeadActions} from 'app/redux/LeadSlice/LeadSlice'
import {
  setColumnBasedOnPermission,
  setTotalPageCount,
  setUserOptionForSelectField,
} from 'app/utils/helper'
import {getAllLeadsAction, getSearchLeadAction} from 'app/redux/LeadSlice/LeadAyscThunk'
import BaseUIPagination from 'app/Components/BaseUIPagination/BaseUIPagination'
import {SelectInputValue} from 'app/pages/Projects/Components/Modal/Modal'
import debounce from 'lodash.debounce'
import { PATHS } from 'config/paths/paths'
import constant from 'config/const/const'

const initialState = {
  addedBy: [{id: '', label: Strings.selectAddedBy}],
  status: [{id: '', label: Strings.leadStatus}],
}

export const LeadListing = () => {
  const dispatch = useAppDispatch()
  const {list: allUsers} = useSelector((state: IRootState) => state.UserStateData)
  const {error, list, total, limit, page} = useSelector((state: IRootState) => state.LeadStateData)
  const [search, setSearch] = useState('')
  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const data = [...LeadColumns]
  const leadStatusOptions = leadData['lead.status']
  const [filterAttr, setFilterAttr] = useState(initialState)
  const filterActionsLeadColumns = setColumnBasedOnPermission('Actions', data, userPermissions.lead)
  const token = getUserToken()
  const addByOptions = setUserOptionForSelectField(allUsers || [], ['bde', 'admin'])
  const rows = useMemo(() => {
    const newList =
      list &&
      list?.map((item, index) => {
        const currentIndex = limit * (page - 1) + (index + 1)
        return {
          ...item,
          index: currentIndex,
          deleteItem: userPermissions?.lead?.delete,
          editItem: userPermissions?.lead?.edit,
          viewItem: userPermissions?.lead?.view
        }
      })
    return newList
  }, [limit, list, page])
  const user = addByOptions?.map((item) => {
    return {
      id: item.id,
      label: item.name,
    }
  })

  const {addedBy, status} = filterAttr
  const columns = React.useMemo(() => filterActionsLeadColumns, [filterActionsLeadColumns])
  const filtersOptions = [
    {
      title: Strings.addedBy,
      options: user,
      filterKey: 'addedBy',
      value: filterAttr,
    },
    {
      title: 'Status',
      options: setFilterListSelectInputOptions(leadStatusOptions),
      filterKey: 'status',
      value: filterAttr,
    },
  ]
  const totalPage = setTotalPageCount(total, limit)

  const paginationHandler = (currentPageKey: string | number) => {
    const page = Number(currentPageKey)
    dispatch(getAllLeadsAction({token, page, size: limit, query: search}))
  }

  const pageSizeChangeHandler = (size: number) => {
    const payload = {
      token,
      page: constant.page.defaultNumber,
      query: search,
      size,
    }
    dispatch(LeadActions.setCurrentPageSize(size))
    dispatch(getAllLeadsAction(payload))
  }

  const searchListHandler = (searchValue: string) => {
    dispatch(
      getSearchLeadAction({
        token,
        query: searchValue,
        page: constant.page.defaultNumber,
        addedBy: addedBy?.[0]?.id,
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
      addedBy: addedBy[0]?.id,
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
  const optimizedSearchHandler = useCallback(debounce(searchListHandler, constant.timer.defaultSearchTimer), [addedBy, status])
  return (
    <Card className='user-card-container list-contain-card'>
      <SectionHeader
        path={PATHS.lead.add}
        searchTitle={Strings.searchLead}
        title={Strings.lead}
        checkedList={[]}
        isFilterPermissionAllow={userPermissions?.lead?.filter}
        onFilterSubmit={submitFilterHandler}
        onFilterChange={handlerFilterOptions}
        searchValue={search}
        onSearchValueChange={searchValueChangeHandler}
        filtersOptions={filtersOptions}
        buttonText={Strings.addLead}
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
        pageSizeValue={[{label: limit.toString(), id: limit}]}
        onPageSizeChangeHandler={pageSizeChangeHandler}
      />
    </Card>
  )
}
