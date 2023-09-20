/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo, useState} from 'react'
import {Card} from 'app/Components/Card/Card'
import {CustomTable} from 'app/Components/CustomTable/CustomTable'
import SectionHeader from 'app/Components/SectionHeader/SectionHeader'
import {Strings} from 'app/resource/Strings'
import {useSelector} from 'react-redux'
import {IRootState} from 'app/redux/store'
import {Loader} from 'app/Components/Loader/Loader'
import {setFilterListSelectInputOptions} from 'app/utils/helper'
import filterPerformance from 'app/assets/data/Performance.json'
import {SelectInputValue} from 'app/pages/Projects/Components/Modal/Modal'
import { performanceColumns } from 'app/Components/CustomTable/CustomColoums/PerformanceColoumus'
import { PATHS } from 'config/paths/paths'
import { PageLink, PageTitle } from '_metronic/layout/core'

const DetailsBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.billableWork,
    path: PATHS.performance.list,
    isSeparator: false,
    isActive: true,
  },
]

const initialState = {
  endDate: '',
  selectProject: [{id: '', label: Strings.selectProject}],
  selectClient: [{id: '', label: Strings.selectClient}],
  selectUser: [{id: '', label: Strings.selectUser}],
  projectType: [{id: '', label: Strings.projectType}],
  projectStatus: [{id: '', label: Strings.projectStatus}],
  billable: [{id: '', label: Strings.isBillable}],
  type: [{id: '', label: Strings.selectType}],
}

const BillingWorkHours = () => {
  const workBilling = useSelector((State:IRootState)=>State.PerformanceStateData.list)
  const { error,list,isLoading } = useSelector(
    (state: IRootState) => state.PerformanceStateData
  )
  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const [search, setSearch] = useState('')
  const [filterAttr, setFilterAttr] = useState(initialState)

    const rows = useMemo(() => {
        const newList = workBilling?.map((item: any) => {
            return {
            ...item,
        }
        })
    return newList
  }, [list])

  const columns = React.useMemo(() => performanceColumns, [])

  const filtersOptions = [
    {
    title: 'Project',
    options: setFilterListSelectInputOptions(filterPerformance["performance.selectProject"]),
    filterKey: 'Project',
    value: filterAttr,
    },
    {
      title: 'Client',
      options: setFilterListSelectInputOptions(filterPerformance["performance.selectClient"]),
      filterKey: 'Client',
      value: filterAttr,
  },
  {
    title: 'User',
    options: setFilterListSelectInputOptions(filterPerformance["performance.selectUser"]),
    filterKey: 'User',
    value: filterAttr,
  },
  {
    title: 'Project Type',
    options: setFilterListSelectInputOptions(filterPerformance["performance.projectType"]),
    filterKey: 'Type',
    value: filterAttr,
  },
  {
    title: 'status',
    options: setFilterListSelectInputOptions(filterPerformance['performance.projectStatus']),
    filterKey: 'status',
    value: filterAttr,
  },
  {
    title: 'Is billable',
    options: setFilterListSelectInputOptions(filterPerformance["performance.isBillable" ]),
    filterKey: 'Is billable',
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

    const handlerFilterOptions = (filterKey: string, filterValue: SelectInputValue[]) => {
    setFilterAttr((prevState) => {
        return {
        ...prevState,
        [filterKey]: filterValue,
        }
    })
  }

return (
    <>
      <Card className='user-card-container list-contain-card mt-6'>
        <PageTitle
        breadcrumbs={DetailsBreadcrumbs}>{Strings.billableWork}</PageTitle>
        <SectionHeader
          path={PATHS.performance.billingWorkHours}
          checkedList={[]}
          filtersOptions={filtersOptions}
          isFilterPermissionAllow={true}
          onFilterChange={handlerFilterOptions}
          list={list}
          isAddPermissionAllow={false}
          className='user-section-header'
          hasResetButtonRequired={true}
        />
        {isLoading ? <Loader /> : <CustomTable data={rows || []} columns={columns} error={error} />}
      </Card>
    </>
  )
}

export default BillingWorkHours