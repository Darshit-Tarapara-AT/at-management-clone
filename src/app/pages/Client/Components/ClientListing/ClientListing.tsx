/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useState } from 'react'
import clientData from 'app/assets/data/clients.json'
import { Strings } from 'app/resource/Strings'
import { ClientColumns } from 'app/Components/CustomTable/CustomColoums/ClientColoums'
import { useSelector } from 'react-redux'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { getUserToken } from 'services/AuthServices'
import { LeadActions } from 'app/redux/LeadSlice/LeadSlice'
import { setColumnBasedOnPermission, setFilterListSelectInputOptions, setUserOptionForSelectField } from 'app/utils/helper'
import { getSearchClientsAction } from 'app/redux/ClientsSlice/ClientsAyscThunk'
import List from 'app/Components/List/List'
import { SelectInputValue } from 'app/pages/Projects/Components/Modal/Modal'
import debounce from 'lodash.debounce'
import { clientsActions } from 'app/redux/ClientsSlice/ClientsSlice'
import constant from 'config/const/const'

const initialState = {
  addedBy: [{ id: '', label: Strings.addedBy }],
  account: [{ id: '', label: Strings.account }],
  position: [{ id: '', label: Strings.position }],
  status: [{ id: '', label: Strings.status }],
}
const statusOptions = [
  {
    id: Strings.cancelled.toLocaleLowerCase(),
    label: Strings.cancelled
  },
  {
    id: Strings.confirmed.toLocaleLowerCase(),
    label: Strings.confirmed
  }
]
export const ClientListing = () => {
  const dispatch = useAppDispatch();
  const columnsData = [...ClientColumns]
  const [filterAttr, setFilterAttr] = useState(initialState)
  const [search, setSearch] = useState('')
  const { list: allUsers } = useSelector((state: IRootState) => state.UserStateData)
  const { userPermissions } = useSelector((state: IRootState) => state.UserPermissionsStateData);
  const { error, list, total, limit, page } = useSelector((state: IRootState) => state.ClientStateData);
  const addByOptions = setUserOptionForSelectField(allUsers || [], ['bde', 'admin'])
  const filterActionsClientColumns = setColumnBasedOnPermission("Actions", columnsData, userPermissions.client);
  const token = getUserToken();
  const columns = React.useMemo(() => filterActionsClientColumns, [filterActionsClientColumns])
  const { addedBy, account, position, status } = filterAttr
  const user = addByOptions?.map((item) => {
    return {
      id: item.id,
      label: item.name,
    }
  })
  const row = useMemo(() => {
    const newList = list?.map((item) => {
      return {
        ...item,
        deleteItem: userPermissions?.client?.delete,
        editItem: userPermissions?.client?.edit,
        viewItem: userPermissions?.client?.view
      }
    });
    return newList
  }, [list])
  const filtersOptions = [
    {
      title: Strings.addedBy,
      options: user,
      filterKey: 'addedBy',
      value: filterAttr,
      isAutoFill: true
    },
    {
      title: Strings.account,
      options: setFilterListSelectInputOptions(clientData['client.account']),
      filterKey: 'account',
      value: filterAttr,
      isAutoFill: true
    },
    {
      title: Strings.position,
      options: setFilterListSelectInputOptions(clientData['client.position']),
      filterKey: 'position',
      value: filterAttr,
      isAutoFill: true
    },
    {
      title: Strings.status,
      options: statusOptions,
      filterKey: Strings.statusKey,
      value: filterAttr,
      isAutoFill: true
    },
  ]
  const pageSizeChangeHandler = (size: number) => {
    dispatch(clientsActions.setCurrentPageSize(size))
    dispatch(
      getSearchClientsAction({
        token,
        size,
        query: search,
        page: constant.page.defaultNumber,
        addedBy: addedBy?.[0]?.id,
        position: position?.[0]?.id,
        account: account?.[0]?.id,
        status: status?.[0]?.id
      })
    )
  }
  const paginationHandler = (currentPageKey: string | number) => {
    const page = Number(currentPageKey);
    dispatch(
      getSearchClientsAction({
        token,
        size: limit,
        query: search,
        page,
        addedBy: addedBy?.[0]?.id,
        position: position?.[0]?.id,
        account: account?.[0]?.id,
        status: status?.[0]?.id
      })
    )
  }

  const searchListHandler = (searchValue: string) => {
    dispatch(
      getSearchClientsAction({
        token,
        query: searchValue,
        page: constant.page.defaultNumber,
        addedBy: addedBy?.[0]?.id,
        position: position?.[0]?.id,
        account: account?.[0]?.id,
        status: status?.[0]?.id
      })
    )
  }

  const toggleSideBar = () => {
    dispatch(LeadActions.toggleSideBarMenu(true));
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
    dispatch(
      getSearchClientsAction({
        token,
        query: search,
        page: constant.page.defaultNumber,
        addedBy: addedBy?.[0]?.id,
        position: position?.[0]?.id,
        account: account?.[0]?.id,
        status: status?.[0]?.id
      })
    )
  }

  const searchValueChangeHandler = (searchValue: string) => {
    setSearch(searchValue)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimizedSearchHandler = useCallback(debounce(searchListHandler,500), [addedBy, account, position])

  return (
    <>
      <List
        path='/client/add'
        searchTitle={Strings.search}
        title={Strings.client}
        checkedList={[]}
        buttonText={Strings.addClient}
        filtersOptions={filtersOptions}
        onAddButtonClick={toggleSideBar}
        onFilterChange={handlerFilterOptions}
        isFilterPermissionAllow={userPermissions?.client?.filter}
        onFilterSubmit={submitFilterHandler}
        list={list}
        isAddPermissionAllow={false}
        className='user-section-header'
        onChange={optimizedSearchHandler}
        pageSizeValue={[]}
        onSearchValueChange={searchValueChangeHandler}
        page={page}
        searchInput={''}
        onPageChangeHandler={paginationHandler}
        isLoading={false}
        searchValue={search}
        limit={limit}
        error={error}
        row={row}
        columns={columns || []}
        onPageSizeChangeHandler={pageSizeChangeHandler}
        total={total}
        numPages={0}
      />
    </>

  )
}
