import { getAllClientAction } from 'app/redux/ClientsSlice/ClientsAyscThunk'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { Strings } from 'app/resource/Strings'
import React, { useEffect }  from 'react'
import { getUserToken } from 'services/AuthServices'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { ClientListing } from './Components/ClientListing/ClientListing'
import { useSelector } from 'react-redux'
import { Loader } from 'app/Components/Loader/Loader'
import { PATHS } from 'config/paths/paths'
import constant from 'config/const/const'

const clientsBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.client,
    path: PATHS.client.list,
    isSeparator: false,
    isActive: true,
  }
]
const Lists = () => {
  const { isLoading } = useSelector((state: IRootState) => state.ClientStateData);
  const token = getUserToken();
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (token) {
      dispatch(getAllClientAction({ token, page: constant.page.defaultNumber }))
    
    }
  }, [dispatch, token]);
  return (
    <>
    {isLoading ? <Loader/> :<>
      <PageTitle breadcrumbs={clientsBreadcrumbs}>{Strings.clientListing}</PageTitle>
      <ClientListing />
    </> }
    </>
  )
}

export default Lists
