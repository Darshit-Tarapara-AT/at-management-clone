import React, { useEffect, useMemo, useState } from 'react'
import { Card } from 'app/Components/Card/Card'
import { CustomTable } from 'app/Components/CustomTable/CustomTable'
import SectionHeader from 'app/Components/SectionHeader/SectionHeader'
import { Strings } from 'app/resource/Strings'
import { ProjectColumns } from 'app/Components/CustomTable/CustomColoums/ProjectColoums'
import { useSelector } from 'react-redux'
import project from 'app/assets/data/project.json';
import { IRootState, useAppDispatch } from 'app/redux/store'
import { Loader } from 'app/Components/Loader/Loader'
import { getUserToken } from 'services/AuthServices'
import { setColumnBasedOnPermission, setFilterListSelectInputOptions, setTotalPageCount } from 'app/utils/helper'
import { ProjectActions } from 'app/redux/ProjectSlice/ProjectSlice'
import { getAllProjectsAction, getSearchProjectsAction } from 'app/redux/ProjectSlice/ProjectAyscThunk'
import BaseUIPagination from 'app/Components/BaseUIPagination/BaseUIPagination'
import { ArchiveProps, SelectInputValue } from '../Modal/Modal'
import { PATHS } from 'config/paths/paths'
import constant from 'config/const/const'
import { PageTitle } from '_metronic/layout/core'

const initialState = {
  billingType: [{id: '', label: Strings.selectBillingType}],
  clientType: [{id : '', label: Strings.selectClientType}],
}

export const ProjectListing : React.FC<ArchiveProps> = (props) => {
  const dispatch = useAppDispatch()
  const {error, list, isLoading, total, page, limit} = useSelector(
    (state: IRootState) => state.ProjectStateData
  )
  const {currentUserProfileDetails} = useSelector((state: IRootState) => state.UserStateData)
  const [searchValue, setSearchValue] = useState('')
  const [filterAttr, setFilterAttr] = useState(initialState)
  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const data = [...ProjectColumns]
  const filterActionsProjectColumns = setColumnBasedOnPermission("Actions", data, userPermissions.project);
  const {edit, view, delete:deleteItem} = userPermissions?.project
  const token = getUserToken();
  const rows = useMemo(() => {
    const newList =
      list &&
      list?.map((item, index) => {
          const currentIndex = limit * (page - 1) + (index + 1)
          return {
            ...item,
            index: currentIndex,
            deleteItem: deleteItem,
            editItem: edit,
            viewItem: view
          }
        })
    return newList
  }, [list, edit, view, deleteItem, limit, page])


  useEffect(() => {
dispatch(ProjectActions.resetSpecificProjects())
  },[dispatch])
  const columns = React.useMemo(() => filterActionsProjectColumns, [filterActionsProjectColumns])
  const filtersOptions = [
    {
      title: "Billing Type",
      options: setFilterListSelectInputOptions(project["project.billingType"]),
      filterKey: 'billingType',
      value: filterAttr,
    },
    {
      title: 'Status',
      options: setFilterListSelectInputOptions(project["project.clientType"]),
      filterKey: 'clientType',
      value: filterAttr,
    },
  ]

  const paginationHandler = (currentPageKey: string | number) => {
    const page = Number(currentPageKey);
    dispatch(getAllProjectsAction({ token, page, userId: setUserIdDynamicallyBaseOnRole(), status: props.status }))
  }

  const setUserIdDynamicallyBaseOnRole = () => {
    return currentUserProfileDetails?.role_id?.name?.includes(constant.roles.admin) ? "" : currentUserProfileDetails?.id
  }
  const pageSizeChangeHandler = (size: number) => {
    const payload = {
      token,
      page: constant.page.defaultNumber,
      query: searchValue,
      status: props.status,
      userId:  setUserIdDynamicallyBaseOnRole(),
      clientTypeFilter: filterAttr.clientType?.[0].id,
      billingTypeFilter: filterAttr.billingType?.[0].id,
      limit: size
    }
    dispatch(getSearchProjectsAction(payload))
    dispatch(ProjectActions.setCurrentPageSize(size))
  }

  const searchListHandler = (searchValue: string) => {
    const payload = {
      token,
      page: constant.page.defaultNumber,
      query: searchValue,
      status: props.status,
      userId: setUserIdDynamicallyBaseOnRole(),
      clientTypeFilter: filterAttr.clientType?.[0].id,
      billingTypeFilter: filterAttr.billingType?.[0].id,
      limit
    }

    dispatch(getSearchProjectsAction(payload))
  }

  const toggleSideBar = () => {
    dispatch(ProjectActions.toggleSideBarMenu(true))
  }
  const submitFilterHandler = () => {
    const payload = {
      token,
      page: constant.page.defaultNumber,
      query: searchValue,
      userId: setUserIdDynamicallyBaseOnRole(),
      status: props.status,
      clientTypeFilter: filterAttr.clientType?.[0]?.id,
      billingTypeFilter: filterAttr.billingType?.[0]?.id,
      limit,
    }

    dispatch(getSearchProjectsAction(payload))
  }

  const searchValueChangeHandler = (searchValue: string) => {
    setSearchValue(searchValue)
  }
  const totalPage = setTotalPageCount(total, limit)
  const handlerFilterOptions = (filterKey: string, filterValue: SelectInputValue[]) => {
    setFilterAttr((prevState) => {
      return {
        ...prevState,
        [filterKey]: filterValue,
      }
    })
  }
  const rowClasses = ['', ' text-end pe-0 ', ' text-end pe-12', ' text-end']
  return (
    <Card className='user-card-container list-contain-card'>
      <PageTitle
          buttontitle={Strings.addProject}
          path={PATHS.project.add}
          hasAddPermission={userPermissions.project.add}
      ></PageTitle>
      <SectionHeader
        path={PATHS.project.add}
        searchTitle={Strings.search}
        checkedList={[]}
        buttonText={Strings.addProject}
        onSearchValueChange={searchValueChangeHandler}
        searchValue={searchValue}
        isFilterPermissionAllow={userPermissions?.project?.filter}
        onFilterChange={handlerFilterOptions}
        onFilterSubmit={submitFilterHandler}
        filtersOptions={filtersOptions}
        onAddButtonClick={toggleSideBar}
        list={list}
        isAddPermissionAllow={false}
        className='user-section-header'
        onChange={searchListHandler}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <CustomTable data={rows || []} columns={columns} error={error} classes={rowClasses} />
      )}
      {
        <BaseUIPagination
          onPageSizeChangeHandler={pageSizeChangeHandler}
          numPages={totalPage > 0 ? totalPage : constant.page.defaultCurrentPaginationNumber}
          page={page}
          searchInput={searchValue}
          onPageChangeHandler={paginationHandler}
          pageSizeValue={[{id: limit.toString(), label: limit.toString()}]}
        />
      }
    </Card>
  )
}
