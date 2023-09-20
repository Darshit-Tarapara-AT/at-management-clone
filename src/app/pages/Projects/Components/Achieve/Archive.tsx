import { IRootState, useAppDispatch } from 'app/redux/store'
import { Strings } from 'app/resource/Strings'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { useSelector } from 'react-redux'
import { Loader } from 'app/Components/Loader/Loader'
import { ProjectListing } from '../ProjectListing/ProjectListing'
import { PATHS } from 'config/paths/paths'
import { useEffect } from 'react'
import { ProjectActions } from 'app/redux/ProjectSlice/ProjectSlice'

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
    const { isLoading } = useSelector((state: IRootState) => state.ProjectStateData)
    const dispatch = useAppDispatch()
    const archive ="archive"
    useEffect(()=>{
      dispatch(ProjectActions.projectStatus(archive))
      return () => {
        
        dispatch(ProjectActions.projectStatus(''))
        
        
      }
  },[])

    return (
    <>
    {isLoading ? (
        <Loader />
    ) : (
        <>
        <PageTitle breadcrumbs={leadBreadcrumbs}>{Strings.archiveListing}</PageTitle>
        <ProjectListing status={archive} />
        </>
        )}
    </>
    )
}
export default Archive