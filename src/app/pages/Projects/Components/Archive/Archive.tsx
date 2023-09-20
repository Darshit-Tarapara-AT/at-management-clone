import { IRootState, useAppDispatch } from 'app/redux/store'
import { Strings } from 'app/resource/Strings'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { useSelector } from 'react-redux'
import { Loader } from 'app/Components/Loader/Loader'
import { ProjectListing } from '../ProjectListing/ProjectListing'
import { PATHS } from 'config/paths/paths'
import { useEffect, useMemo } from 'react'
import { ProjectActions } from 'app/redux/ProjectSlice/ProjectSlice'
import { getUserToken } from 'services/AuthServices'
import constant from 'config/const/const'
import { GetUserListPayload } from 'app/redux/UserSlice/UserAyscThunk'
import useFetchAPIBaseOnPermission from 'config/hooks/useFetchAPIBaseOnPermission'
import { getAllProjectsAction } from 'app/redux/ProjectSlice/ProjectAyscThunk'

const leadBreadcrumbs: Array<PageLink> = [
    {
      title: Strings.home,
      path: PATHS.home,
      isSeparator: false,
      isActive: false,
    },
    {
      title: Strings.archive,
      path: PATHS.project.archive,
      isSeparator: false,
      isActive: false,
    },
  ]

const Archive = () => {
  const { isLoading } = useSelector((state: IRootState) => state.ProjectStateData);
  const {currentUserProfileDetails} =  useSelector((state: IRootState) => state.UserStateData);
  const {userPermissions} =  useSelector((state: IRootState) => state.UserPermissionsStateData);
  const token = getUserToken();

const projectPayload = useMemo(() => {
  return {
   token,
   status: "archive",
   page: constant.page.defaultNumber,
   userId:  currentUserProfileDetails?.id, limit:  constant.page.size
  }
},[token, currentUserProfileDetails?.id])

useFetchAPIBaseOnPermission<GetUserListPayload>(userPermissions?.project?.archive, getAllProjectsAction, projectPayload);

    return (
    <>
    {isLoading ? (
        <Loader />
    ) : (
        <>
        <PageTitle breadcrumbs={leadBreadcrumbs}>{Strings.archiveListing}</PageTitle>
        <ProjectListing status={"archive"} />
        </>
        )}
    </>
    )
}
export default Archive