import { Strings } from 'app/resource/Strings'
import React, { useEffect } from 'react'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { LeadListing } from './Components/LeadListing/LeadListing'
import { useSelector } from 'react-redux'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { Loader } from 'app/Components/Loader/Loader'
import { getUserToken } from 'services/AuthServices'
import { getAllLeadsAction } from 'app/redux/LeadSlice/LeadAyscThunk'
import { PATHS } from 'config/paths/paths'
import constant from 'config/const/const'

const leadBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.lead,
    path: PATHS.lead.list,
    isSeparator: false,
    isActive: false,
  },
]
const Lists = () => {
  const { isLoading, list } = useSelector((state: IRootState) => state.LeadStateData);
  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const token = getUserToken();
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (token && list.length === 0) {
      dispatch(getAllLeadsAction({
        token, page: constant.page.defaultNumber,
        query: ''
      }))
    }
  }, [dispatch, token, list]);

  return (
    <>
    {isLoading ? <Loader/> : (
      <>
      <PageTitle path={PATHS.lead.add} buttontitle={Strings.addLead} hasAddPermission = {userPermissions?.lead.add} breadcrumbs={leadBreadcrumbs}>{Strings.leadListing}</PageTitle>
      <LeadListing />
      </>
    )}
    </>
  )
}

export default Lists
