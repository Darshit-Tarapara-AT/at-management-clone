import { IRootState, useAppDispatch } from 'app/redux/store'
import { Strings } from 'app/resource/Strings'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { ProjectListing } from './Components/ProjectListing/ProjectListing'
import { useSelector } from 'react-redux'
import { Loader } from 'app/Components/Loader/Loader'
import { getAllProjectsAction } from 'app/redux/ProjectSlice/ProjectAyscThunk'
import { useEffect, useMemo } from 'react'
import { getUserToken } from 'services/AuthServices'
import { PATHS } from 'config/paths/paths'
import constant from 'config/const/const'
import { ProjectActions } from 'app/redux/ProjectSlice/ProjectSlice'
import useFetchAPIBaseOnPermission from 'config/hooks/useFetchAPIBaseOnPermission'
import { GetUserListPayload } from 'app/redux/UserSlice/UserAyscThunk'

const leadBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.project,
    path: PATHS.project.list,
    isSeparator: false,
    isActive: false,
  },
]

const Lists = () => {
  const { isLoading } = useSelector((state: IRootState) => state.ProjectStateData);
  const {currentUserProfileDetails} =  useSelector((state: IRootState) => state.UserStateData);
  const {userPermissions} =  useSelector((state: IRootState) => state.UserPermissionsStateData);
  const dispatch = useAppDispatch();
  const token = getUserToken();

const projectPayload = useMemo(() => {
  return {
   token,
   status: "active",
   page: constant.page.defaultNumber,
   userId:  currentUserProfileDetails?.id, limit:  constant.page.size
  }
},[token, currentUserProfileDetails?.id])

useFetchAPIBaseOnPermission<GetUserListPayload>(userPermissions?.project?.list, getAllProjectsAction, projectPayload);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PageTitle breadcrumbs={leadBreadcrumbs}>{Strings.projectListing}</PageTitle>
          <ProjectListing status={"active"} />
        </>
      )}
    </>
  )
}
export default Lists
