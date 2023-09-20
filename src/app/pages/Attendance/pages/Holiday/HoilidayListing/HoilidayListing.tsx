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
import {setColumnBasedOnPermission, setTotalPageCount} from 'app/utils/helper'
import BaseUIPagination from 'app/Components/BaseUIPagination/BaseUIPagination'
import constant from 'config/const/const'
import {TaskActions} from 'app/redux/TaskSlice/TaskSlice'
import {getHolidayColumns} from 'app/Components/CustomTable/CustomColoums/HolidayColoum'
import debounce from 'lodash.debounce'
import {PageLink, PageTitle} from '_metronic/layout/core'
import {PATHS} from 'config/paths/paths'
import {AlertMessage} from 'app/utils/AlertMessage'
import {
  deleteMultipleHolidayAction,
  getAllHolidayListAction,
} from 'app/redux/AttendanceSlice/AttendanceAyscThunk'

const holidayBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.holidayList,
    path: PATHS.attendance.holiday.list,
    isSeparator: false,
    isActive: false,
  },
]
const TaskListing = () => {
  const dispatch = useAppDispatch()
  const {checkedTaskId} = useSelector((state: IRootState) => state.TaskStateData)
  const {holidayList, page, limit, isAttendanceDataFetched, total, error} = useSelector(
    (state: IRootState) => state.AttendanceStateData
  )
  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const {currentProjectId} = useSelector((state: IRootState) => state.ProjectStateData)
  const token = getUserToken()
  const [search, setSearch] = useState('')

  const rows = useMemo(() => {
    const newList = holidayList.map((item: any, index: number) => {
      return {
        ...item,
        index: index + 1,
        deleteItem: false,
        editItem: userPermissions?.holiday?.editHoliday,
      }
    })
    return newList
  }, [holidayList])
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
    const taskId = holidayList.map((task) => task.id)
    if (!isChecked) {
      dispatch(TaskActions.selectAllCheckbox([]))
      return
    }
    dispatch(TaskActions.selectAllCheckbox(taskId))
  }
  const isAllChecked = holidayList?.length === checkedTaskId?.length && holidayList?.length > 0
  const columns = React.useMemo(() => {
    return getHolidayColumns(
      handlerSelectAllCheckbox,
      isAllChecked,
      checkedTaskId,
      handlerSelectCheckbox,
      userPermissions?.holiday.deleteHoliday
    )
  }, [getHolidayColumns, handlerSelectCheckbox, checkedTaskId, userPermissions?.task.bulkOperation])
  const paginationHandler = (currentPageKey: string | number) => {
    const page = Number(currentPageKey)
    dispatch(getAllHolidayListAction({token, page, size: constant.page.size}))
  }
  const getPayload = () => {
    return {
      page,
      size: limit,
      token,
      query: '',
    }
  }
  const searchListHandler = (searchValue: string) => {
    let payload = {
      ...getPayload(),
      queryFilter: searchValue,
    }
    dispatch(getAllHolidayListAction(payload))
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
    dispatch(getAllHolidayListAction(payload))
  }

  const searchValueChangeHandler = (searchValue: string) => {
    setSearch(searchValue)
  }
  const totalPage = setTotalPageCount(total, limit)

  const optimizedSearchHandler = useCallback(
    debounce(searchListHandler, constant.timer.defaultSearchTimer),
    []
  )
  const deleteHolidayHandler = () => {
    AlertMessage().then((result) => {
      if (result?.isConfirmed) {
        dispatch(
          deleteMultipleHolidayAction({
            token,
            holidayId: checkedTaskId?.join(','),
          })
        )
      }
    })
  }

  return (
    <>
      <PageTitle
        breadcrumbs={holidayBreadcrumbs}
        buttontitle={Strings.addHoliday}
        path={PATHS.attendance.holiday.add}
        hasAddPermission={userPermissions?.holiday?.addHoliday}
      >
        {Strings.holidayList}
      </PageTitle>
      {isAttendanceDataFetched || holidayList?.length === 0 ? <Loader />:<Card className='user-card-container list-contain-card mt-6'>
        <SectionHeader
          path={PATHS.attendance.holiday.list}
          checkedList={[]}
          onSearchValueChange={searchValueChangeHandler}
          searchValue={search}
          searchTitle={Strings.search}
          isFilterPermissionAllow={false}
          list={holidayList}
          isAddPermissionAllow={false}
          className='user-section-header'
          onChange={optimizedSearchHandler}
        />
        <CustomTable data={rows || []} columns={columns} error={error} />
        <BaseUIPagination
          onPageSizeChangeHandler={pageSizeChangeHandler}
          numPages={totalPage > 0 ? totalPage : constant.page.defaultCurrentPaginationNumber}
          page={page}
          searchInput={search}
          onPageChangeHandler={paginationHandler}
          pageSizeValue={[{id: limit.toString(), label: limit.toString()}]}
        />
      </Card>}
      {userPermissions?.holiday?.deleteHoliday && (
      <Card className='card-flush mt-6 p-0 pb-0'>
        <div className='card-header align-items-center p-0 justify-content-end '>
          <div
            className='card-toolbar my-1 justify-content-between justify-content-sm-end column-gap-5'
            data-select2-id='select2-data-164-wp82'
          >
            <button
              type='button'
              disabled={checkedTaskId.length === 0}
              className='btn btn-sm btn-danger'
              name='delete'
              value='Delete'
              wfd-id='id18'
              onClick={() => deleteHolidayHandler()}
            >
              {Strings.delete}
            </button>
          </div>
        </div>
      </Card>
      )}
    </>
  )
}

export default TaskListing
