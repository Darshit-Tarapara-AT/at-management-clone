
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Card} from 'app/Components/Card/Card'
import {CustomTable} from 'app/Components/CustomTable/CustomTable'
import SectionHeader from 'app/Components/SectionHeader/SectionHeader'
import {Strings} from 'app/resource/Strings'
import {useSelector} from 'react-redux'
import {IRootState, useAppDispatch} from 'app/redux/store'
import {Loader} from 'app/Components/Loader/Loader'
import {getUserToken} from 'services/AuthServices'
import {deleteMultipleTaskCorrectionAction, taskCorrectionRequestAction} from 'app/redux/TaskSlice/TaskAsyncThunk'
import {  setFilterListSelectInputOptions, setTotalPageCount} from 'app/utils/helper'
import BaseUIPagination from 'app/Components/BaseUIPagination/BaseUIPagination'
import constant from 'config/const/const'
import {TaskActions} from 'app/redux/TaskSlice/TaskSlice'
import {SelectInputValue} from 'app/pages/Projects/Components/Modal/Modal'
import debounce from 'lodash.debounce'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { PATHS } from 'config/paths/paths'
import { AlertMessage } from 'app/utils/AlertMessage'
import { getCorrectionColumns } from 'app/Components/CustomTable/CustomColoums/CorrectionColoum'
import filterLeave from 'app/assets/data/leaves.json'
import { getCurrentDateAndTimeAndRedirectToAttendance } from '../../MasterList/MasterList'
import useFetchAPIBaseOnPermission from 'config/hooks/useFetchAPIBaseOnPermission';
import { GetUserListPayload, getAllUsersAction } from 'app/redux/UserSlice/UserAyscThunk'


const initialState = {
  status: [{ id: '', label: Strings.all }],
  employee: [{ id: '', label: Strings.all }],
  startDate: '',
  endDate: '',
}
const taskCorrectionBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.attendance,
    path: getCurrentDateAndTimeAndRedirectToAttendance(),
    isSeparator: false,
    isActive: false,
  },
]
const TaskListing = () => {
  const dispatch = useAppDispatch()
  const {error, list, isLoading, total, checkedTaskId, page, limit} = useSelector(
    (state: IRootState) => state.TaskStateData
  )
  const { list: allUsers } = useSelector((state: IRootState) => state.UserStateData)
  const {taskCorrectionList} = useSelector((state: IRootState) => state.TaskStateData)
  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const token = getUserToken()
  const [search, setSearch] = useState('')
  const [filterAttr, setFilterAttr] = useState(initialState)

  const userPayload = useMemo(() => {
    return {
    token,
    page: constant.page.defaultNumber,size: constant.page.maxSize, status: Strings.activeList.toLocaleLowerCase()
    }
 },[token])

  useFetchAPIBaseOnPermission<GetUserListPayload>(userPermissions?.user?.list, getAllUsersAction, userPayload,false, list, constant.page.size);

  useEffect(() => {
    if(token){
      dispatch(TaskActions.resetState())
      dispatch(taskCorrectionRequestAction({
        token: token,
        page: page,
        toDate: '',
        fromDate: '',
        status: '',
        userId: '',
        queryFilter: '',
      }))
    }
  },[dispatch,token])
  const rows = useMemo(() => {
    const newList = taskCorrectionList.map((item,index) => {
      const currentIndex = limit * (page - 1) + (index + 1)
      return {
        ...item,
        index: currentIndex,
        deleteItem: userPermissions?.attendance?.deleteMasterList,
        editItem: userPermissions?.attendance?.editCorrection,
        viewItem: false
      }
    })
    return newList
  }, [taskCorrectionList])

  const user = allUsers?.map((item) => {
    return {
      label: item.name,
      id: item.id
    }
  })
  const filtersOptions = [
    {
      title: Strings.status,
      options: setFilterListSelectInputOptions(filterLeave['leaves.status']),
      filterKey: 'status',
      value: filterAttr,
    },
    {
      title: Strings.user,
      options: user,
      filterKey: 'employee',
      value: filterAttr,
    },
    {
      title: Strings.startDate,
      options: [],
      filterKey: 'startDate',
      value: filterAttr,
    },
    {
      title: Strings.endDate,
      options: [],
      filterKey: 'endDate',
      value: filterAttr,
    },
  ]

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

  const handlerSelectAllCheckbox = (isChecked: boolean) => {
    const taskId = taskCorrectionList.map((task) => task.id)
    if (!isChecked) {
      dispatch(TaskActions.selectAllCheckbox([]))
      return
    }
    dispatch(TaskActions.selectAllCheckbox(taskId))
  }
  const isAllChecked = taskCorrectionList?.length === checkedTaskId?.length && taskCorrectionList?.length > 0
  const columns = React.useMemo(() => {
    return getCorrectionColumns(
      handlerSelectAllCheckbox,
      isAllChecked,
      checkedTaskId,
      handlerSelectCheckbox,
      userPermissions?.attendance?.taskCorrection,
    )
  }, [getCorrectionColumns, handlerSelectCheckbox, checkedTaskId, userPermissions?.task.bulkOperation,taskCorrectionList])


  const paginationHandler = (currentPageKey: string | number) => {
    const page = Number(currentPageKey)
    dispatch(taskCorrectionRequestAction({
      token: token,
      size: limit,
      status: filterAttr.status?.[0]?.id,
      page:page,
      toDate: filterAttr.endDate,
      fromDate: filterAttr.startDate,
      userId: filterAttr.employee?.[0]?.id,
      queryFilter: filterAttr.status?.[0]?.id,
    }));
  }


  const totalPage = setTotalPageCount(total, limit)
  const searchListHandler = (searchValue: string) => {
    dispatch(taskCorrectionRequestAction({
      token: token,
      page: page,
      size: limit,
      status:filterAttr.status?.[0]?.id,
      userId: filterAttr.employee?.[0]?.id,
      toDate: filterAttr.endDate,
      fromDate: filterAttr.startDate,
      queryFilter: filterAttr.status?.[0]?.id,
    }))
    dispatch(TaskActions.resetState())
  }

  const submitFilterHandler = () => {
    const payload = {
      token: token,
      page: constant.page.defaultNumber,
      size: limit,
      status:filterAttr.status?.[0]?.id,
      queryFilter:filterAttr.status?.[0]?.id,
      userId:filterAttr.employee?.[0]?.id,
      fromDate:filterAttr.startDate,
      toDate:filterAttr.endDate,

    }
    dispatch(taskCorrectionRequestAction(payload))
    dispatch(TaskActions.resetState())
  }
  const pageSizeChangeHandler = (size: number) => {
    const payload = {
      token,
      page: constant.page.defaultNumber,
      size,
      status:filterAttr.status?.[0]?.id,
      queryFilter:filterAttr.status?.[0]?.id,
      userId:filterAttr.employee?.[0]?.id,
      fromDate:filterAttr.startDate,
      toDate:filterAttr.endDate,
    }
    dispatch(taskCorrectionRequestAction(payload))
    dispatch(TaskActions.setCurrentPageSize(size))
  }

  const searchValueChangeHandler = (searchValue: string) => {
    setSearch(searchValue)
  }
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
    [filterAttr.startDate, filterAttr.endDate, filterAttr.employee, filterAttr.status]
  )
  const deleteTaskCorrectionHandler = () => {
    AlertMessage().then((result) => {
      if(result?.isConfirmed) {
        dispatch(
          deleteMultipleTaskCorrectionAction({
            token,
            task_correction_request_id:checkedTaskId?.join(',')
          })
        )
      }
    })
}

  return (
    <>
        <PageTitle breadcrumbs={taskCorrectionBreadcrumbs}>{Strings.taskCorrectionRequestList}</PageTitle>
      <Card className='user-card-container list-contain-card mt-6'>
        <SectionHeader
          path=''
          checkedList={[]}
          onSearchValueChange={searchValueChangeHandler}
          searchValue={search}
          // searchTitle={Strings.search}
          onFilterSubmit={submitFilterHandler}
          isFilterPermissionAllow={true}
          onFilterChange={handlerFilterOptions}
          list={list}
          isAddPermissionAllow={false}
          className='user-section-header'
          onChange={optimizedSearchHandler}
          filtersOptions={filtersOptions}
        />
        {isLoading && <Loader />}
        <CustomTable data={rows || []} columns={columns} error={error} />
        <BaseUIPagination
          onPageSizeChangeHandler={pageSizeChangeHandler}
          numPages={totalPage > 0 ? totalPage : constant.page.defaultCurrentPaginationNumber}
          page={page}
          searchInput={search}
          onPageChangeHandler={paginationHandler}
          pageSizeValue={[{id: limit.toString(), label: limit.toString()}]}
        />
      </Card>
      <Card className='card-flush mt-6 p-0 pb-0'>
            <div className="card-header align-items-center p-0 justify-content-end ">
            <div className="card-toolbar my-1 justify-content-between justify-content-sm-end column-gap-5" data-select2-id="select2-data-164-wp82">
                <button type="button" disabled={checkedTaskId.length === 0} className="btn btn-sm btn-danger" name="delete" value="Delete" wfd-id="id18" onClick={() => deleteTaskCorrectionHandler()}>
                        {Strings.delete}
                    </button>
                    </div>
            </div>
        </Card>
    </>
  )
}

export default TaskListing