import React, { Fragment, useEffect, useMemo } from 'react'
import { Card } from 'app/Components/Card/Card'
import { CustomTable } from 'app/Components/CustomTable/CustomTable'
import SectionHeader from 'app/Components/SectionHeader/SectionHeader'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { Strings } from 'app/resource/Strings'
import { policyHistoryColumns } from 'app/Components/CustomTable/CustomColoums/PolicyHistoryColoums'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { useSelector } from 'react-redux'
import { Loader } from 'app/Components/Loader/Loader'
import { getUserToken } from 'services/AuthServices'
import { getIndividualPolicyLogsAction as getIndividualPolicyLogAction, getPolicyLogs } from 'app/redux/PolicyHistorySlice/PolicyHistoryAyscThunk'
import { useParams } from 'react-router-dom'
import { policyHistoryActions } from 'app/redux/PolicyHistorySlice/PolicyHistorySlice'
import BaseUIPagination from 'app/Components/BaseUIPagination/BaseUIPagination'
import { setTotalPageCount } from 'app/utils/helper'
import { PATHS } from 'config/paths/paths'
import constant from 'config/const/const'

const policyHistoryBreadcrumbs: Array<PageLink> = [
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

const History = () => {
  const dispatch = useAppDispatch();
  const { list, page,isLoading, total, limit, individualHistoryTotal } = useSelector((state: IRootState) => state.PolicyHistoryStateData);
  const token = getUserToken();
  const { id } = useParams()

  const getAscendingPolicyList = (list: any[]) => {
    const ascendingFormatList = list.reduce((accum, currentElement) => {
      const index = Number(currentElement.id) - 1;
      accum[index] = { ...currentElement }
      return accum
    }, [])
    return ascendingFormatList
  }

  const rows = useMemo(() => {
    const sortingList = getAscendingPolicyList(list)
    return sortingList
  }, [list])
  const columns = useMemo(() => policyHistoryColumns, [])

  useEffect(() => {
    dispatch(policyHistoryActions.resetState())
    const policyLogId = Number(id)
    if (!id && token) {
      dispatch(getPolicyLogs({ token, page: constant.page.defaultNumber }))
      return;
    }
    dispatch(getIndividualPolicyLogAction({ token,page:constant.page.defaultNumber ,id: policyLogId }));
    return () => {
      dispatch(policyHistoryActions.resetState())
    }
  }, [dispatch, token, id]);


  const paginationHandler = (currentPageNumber: number | string) => {
    const page = Number(currentPageNumber)
    if (!id) {
    dispatch(getPolicyLogs({ token: token, page: page }))
    }
    dispatch(getIndividualPolicyLogAction({token, page ,id:Number(id),size:limit}))
  }
 const pageSizeChangeHandler = (size: number) => {
    dispatch(policyHistoryActions.setCurrentPageSize(size))
    if(!id) {
      dispatch(getPolicyLogs({token,page,role:"", size}))
      return;
    }
    dispatch(getIndividualPolicyLogAction({token,page:constant.page.defaultNumber,id:Number(id),size}))
  }
  const totalPage = id ? individualHistoryTotal : total
  return (
    <Fragment>
      {isLoading && list.length === 0 ? <Loader /> :
      <>
      <PageTitle path={PATHS.policy.list} breadcrumbs={policyHistoryBreadcrumbs}>{Strings.policyHistory}</PageTitle>
      <Card>
        <SectionHeader
          list={list}
          path={PATHS.policy.list}
          buttonText={Strings.back}
          title={Strings.policyHistory}
          checkedList={[]}
          isAddPermissionAllow = {true}
        />
         <CustomTable data={rows || []} columns={columns} />
         <BaseUIPagination 
         numPages={setTotalPageCount(totalPage, limit)} 
         onPageChangeHandler={paginationHandler} 
         onPageSizeChangeHandler={pageSizeChangeHandler}
         pageSizeValue ={[{label:limit.toString(), id:limit}]}
         page={page}
        />
      </Card>
    </>}
    </Fragment>
    
  )
}

export default History
