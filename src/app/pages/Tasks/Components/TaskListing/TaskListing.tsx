/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useMemo, useState} from 'react'
import {Card} from 'app/Components/Card/Card'
import {CustomTable} from 'app/Components/CustomTable/CustomTable'
import SectionHeader from 'app/Components/SectionHeader/SectionHeader'
import {Strings} from 'app/resource/Strings'
import {useSelector} from 'react-redux'
import {IRootState, useAppDispatch} from 'app/redux/store'
import {Loader} from 'app/Components/Loader/Loader'
import {getUserToken} from 'services/AuthServices'
import {ProjectActions} from 'app/redux/ProjectSlice/ProjectSlice'
import {getAllTasksActions, getSearchTaskAction} from 'app/redux/TaskSlice/TaskAsyncThunk'
import {setFilterListSelectInputOptions, setTotalPageCount} from 'app/utils/helper'
import BaseUIPagination from 'app/Components/BaseUIPagination/BaseUIPagination'
import MasterSection from './MasterSection/MasterSection'
import constant from 'config/const/const'
import {TaskActions} from 'app/redux/TaskSlice/TaskSlice'
import filterTask from 'app/assets/data/task.json'
import {SelectInputValue} from 'app/pages/Projects/Components/Modal/Modal'
import {getTaskColumns} from 'app/Components/CustomTable/CustomColoums/TaskColoum'
import debounce from 'lodash.debounce'
import NoTaskPage from '../NoTaskPage/NoTaskPage'
const initialState = {
  assignTo: [{id: '', label: Strings.selectAssignTo}],
  endDate: '',
  billable: [{id: '', label: Strings.selectBillable}],
  status: [{id: '', label: Strings.selectTaskStage}],
  type: [{id: '', label: Strings.selectType}],
  parentTask: [{id: '', label: Strings.selectIsParent}],
}
export const TaskListing = () => {
  const dispatch = useAppDispatch()
  const {error, list, isLoading, total, checkedTaskId, page, limit, duplicateList} = useSelector(
    (state: IRootState) => state.TaskStateData
  )
  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const {currentProjectId, specificProject} = useSelector(
    (state: IRootState) => state.ProjectStateData
  )
  const token = getUserToken()
  const [search, setSearch] = useState('')
  const [filterAttr, setFilterAttr] = useState(initialState)
  const {list: allUsers, currentUserProfileDetails} = useSelector((state: IRootState) => state.UserStateData)
  const getUserName = (id: number) => {
    return allUsers?.find((item) => item.id === id)?.name
  }
  const rows = useMemo(() => {
    const newList = list?.filter((item, index) => {
      return userPermissions?.task?.backlogStage ? item : item?.task_status !== Strings.backlog.toLocaleLowerCase()
      }).map((item: any) => {
      return {
        ...item,
        assigned_user: getUserName(item.assigned_user),
        assignUserId: item.assigned_user,
        deleteItem: userPermissions?.task?.delete,
        editItem: userPermissions?.task?.edit,
        viewItem: userPermissions?.task?.view,
        isTaskRunning: item.isTaskRunning
      }
    })
    return newList
  }, [list])

  const user = allUsers
    ?.filter((item) => {
      const projectTeam = specificProject?.team?.split(',')
      return projectTeam?.includes(item?.name as string)
    })
    .map((item) => {
      return {
        id: item.id,
        label: item.name,
      }
    })
    const taskStageOptions = filterTask['task.stage']?.filter((item, index) => {
      return userPermissions?.task?.backlogStage ? item : index !== 0
    });
  const filtersOptions = [
    {
      title: Strings.assignedTo,
      options: user,
      filterKey: 'assignTo',
      value: filterAttr,
    },
    {
      title: Strings.endDate,
      options: [],
      filterKey: 'endDate',
      value: filterAttr,
    },
    {
      title: Strings.billable,
      options: setFilterListSelectInputOptions(filterTask['task.billable']),
      filterKey: 'billable',
      value: filterAttr,
    },
    {
      title: Strings.taskStage,
      options: setFilterListSelectInputOptions(taskStageOptions),
      filterKey: 'status',
      value: filterAttr,
    },
    {
      title: Strings.type,
      options: setFilterListSelectInputOptions(filterTask['task.type']),
      filterKey: 'type',
      value: filterAttr,
    },
    {
      title: Strings.parentTask,
      options: setFilterListSelectInputOptions(filterTask['task.parentTask']),
      filterKey: 'parentTask',
      value: filterAttr,
    },
  ]
  const {assignTo, endDate, billable, status, type, parentTask} = filterAttr
  const handlerSelectCheckbox = (id: number, isChecked: boolean) => {
    const newTaskList = [...checkedTaskId]
    if (isChecked) {
      newTaskList.push(id)
      dispatch(TaskActions.selectAllCheckbox(newTaskList))
    } else {
      const addTaskId = checkedTaskId.filter((checkedId: number) => checkedId !== id)
      dispatch(TaskActions.selectAllCheckbox(addTaskId))
    }
  }
  const updateActiveTaskIdHandler = useCallback((id: number) => {
    dispatch(TaskActions.setActiveTaskId(id))
  }, [])
  const handlerSelectAllCheckbox = (isChecked: boolean) => {
    const taskId = list.map((task) => task.id)
    if (!isChecked) {
      dispatch(TaskActions.selectAllCheckbox([]))
      return
    }
    dispatch(TaskActions.selectAllCheckbox(taskId))
  }
  const isAllChecked = list?.length === checkedTaskId?.length && list?.length > 0
  const columns = React.useMemo(() => {
    return getTaskColumns(
      handlerSelectAllCheckbox,
      isAllChecked,
      checkedTaskId,
      handlerSelectCheckbox,
      userPermissions?.task?.bulkOperation,
      updateActiveTaskIdHandler
    )
  }, [getTaskColumns, handlerSelectCheckbox, checkedTaskId, userPermissions?.task.bulkOperation])
  const paginationHandler = (currentPageKey: string | number) => {
    const page = Number(currentPageKey)
    dispatch(getAllTasksActions({token, page, projectId: currentProjectId?.toString()}))
  }
 
const getPayload = () => {
  return {
    page,
    size: limit,
    projectId: Number(currentProjectId),
    endDate: filterAttr.endDate,
    token,
    query: search,
    parentTask: parentTask?.[0]?.id ? filterAttr.parentTask?.[0]?.id === "yes" ? "1" : "0": "",
    assignUser: filterAttr.assignTo?.[0]?.id,
    isTaskBillable:
    filterAttr.billable?.[0]?.id
      ? filterAttr.billable?.[0]?.id === 'yes'
        ? '1'
        : '0'
      : '',
    status: filterAttr.status?.[0]?.id,
    taskType: filterAttr.type?.[0]?.id,
  }
}

  const searchListHandler = (searchValue: string) => {
    let payload = {
      ...getPayload(),
      query: searchValue,
    }
    dispatch(getSearchTaskAction(payload))
  }

  const submitFilterHandler = () => {
    let payload = {
      ...getPayload(),
    }
    dispatch(getSearchTaskAction(payload))
  }
  const pageSizeChangeHandler = (size: number) => {
    const payload = {
      token,
      page: constant.page.defaultNumber,
      query: '',
      size,
      projectId: currentProjectId?.toString(),
    }
    dispatch(TaskActions.setCurrentPageSize(size))
    dispatch(getAllTasksActions(payload))
  }
  const toggleSideBar = () => {
    dispatch(ProjectActions.toggleSideBarMenu(true))
  }
  const searchValueChangeHandler = (searchValue: string) => {
    setSearch(searchValue)
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
  const optimizedSearchHandler = useCallback(
    debounce(searchListHandler, constant.timer.defaultSearchTimer),
    [assignTo, status, endDate, billable, parentTask, type]
  )
  if (!isLoading && duplicateList?.length === 0) {
    return <NoTaskPage />
  }

  return (
    <>
      {userPermissions?.task?.bulkOperation && <MasterSection />}
      <Card className='user-card-container list-contain-card mt-6'>
        <SectionHeader
          path=''
          checkedList={[]}
          onSearchValueChange={searchValueChangeHandler}
          searchValue={search}
          searchTitle={Strings.search}
          onFilterSubmit={submitFilterHandler}
          filtersOptions={filtersOptions}
          isFilterPermissionAllow={userPermissions?.task?.filter}
          onFilterChange={handlerFilterOptions}
          onAddButtonClick={toggleSideBar}
          list={list}
          isAddPermissionAllow={false}
          className='user-section-header'
          onChange={optimizedSearchHandler}
        />
        {isLoading && <Loader />}
        {!isLoading  && list?.length ===0 ? <NoTaskPage/>  : <CustomTable data={rows || []} columns={columns} error={error} />}
        <BaseUIPagination
          onPageSizeChangeHandler={pageSizeChangeHandler}
          numPages={totalPage > 0 ? totalPage : constant.page.defaultCurrentPaginationNumber}
          page={page}
          searchInput={search}
          onPageChangeHandler={paginationHandler}
          pageSizeValue={[{id: limit.toString(), label: limit.toString()}]}
        />
      </Card>
    </>
  )
}
