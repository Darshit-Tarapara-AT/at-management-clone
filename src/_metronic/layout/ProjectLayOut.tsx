import ProjectHeader from 'app/pages/Projects/Components/ProjectHeader/ProjectHeader';
import { getAllProjectsAction, getAllProjectsParentTaskAction, getIndividualUProjectAction } from 'app/redux/ProjectSlice/ProjectAyscThunk';
import { IRootState, useAppDispatch } from 'app/redux/store';
import constant from 'config/const/const';
import { Fragment, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useParams } from 'react-router-dom'
import { getUserToken } from 'services/AuthServices';
import project from 'app/assets/data/project.json'
import { FormikKeys } from 'app/Components/TextArea';
import { Strings } from 'app/resource/Strings';
import { PATHS } from 'config/paths/paths';
import { ProjectActions } from 'app/redux/ProjectSlice/ProjectSlice';
import { TaskActions } from 'app/redux/TaskSlice/TaskSlice';
import { convertMinutesToHours } from 'app/Components/CustomTable/CustomColoums/TaskColoum';
import { GetUserListPayload, getAllUsersAction } from 'app/redux/UserSlice/UserAyscThunk';
import useFetchAPIBaseOnPermission from 'config/hooks/useFetchAPIBaseOnPermission';

const ProjectLayOut = () => {
    const { id } = useParams();
    const token = getUserToken();
    const dispatch = useAppDispatch()
    const { userPermissions } = useSelector((state: IRootState) => state.UserPermissionsStateData);
    const { currentTaskPath } = useSelector((state: IRootState) => state.TaskStateData);
    const { pathname } = useLocation()
    const { specificProject, list: projectList} = useSelector((state: IRootState) => state.ProjectStateData);
    const { list } = useSelector((state: IRootState) => state.UserStateData);
    const allTeamMembers = specificProject?.team?.split(",");
    const estimateHour = `${convertMinutesToHours(Number(specificProject?.trackedTime || 0)) || 0} / ${specificProject?.estimation_hours}`;
    const arrowColor = (convertMinutesToHours(Number(specificProject?.trackedTime || 0)) > specificProject?.estimation_hours) ? "svg-icon-danger m-2" : 'svg-icon-success  m-2';
    const userPayload = useMemo(() => {
       return {
        token,
        page: constant.page.defaultNumber,size: constant.page.maxSize, status: Strings.activeList.toLocaleLowerCase()
       }
    },[token])
    useFetchAPIBaseOnPermission<GetUserListPayload>(userPermissions?.user?.list, getAllUsersAction, userPayload,false, list, constant.page.size);

    useEffect(() => {
      if(id) {
        dispatch(ProjectActions.getCurrentProjectId(id));
         dispatch(ProjectActions.projectStatus("active"));
      }
      if(id && !specificProject?.name) {
        dispatch(getIndividualUProjectAction({ token, id: Number(id) })).then(() =>{
            dispatch(getAllProjectsParentTaskAction({ token, id: Number(id) }));
        })
      }
      return () => {
        dispatch(ProjectActions.getCurrentProjectId(''));
      }
    },[id, dispatch, specificProject?.name])

    useEffect(() => {
        const currentPath = localStorage.getItem("currentPath");
        if (currentPath) {
            dispatch(TaskActions.setDynamicallyCurrentPath(currentPath))
        }
    }, [])
    const projectNavLinks = [
        {
            title: Strings.details,
            path: PATHS.project.view.replace(":id", id?.toString() || ''),
            isAllow: userPermissions.project.view
        },
        {
            title: Strings.privateDetails,
            path: PATHS.project.editPrivateDetails.replace(":id", id?.toString() || ''),
            isAllow: userPermissions.project.editPrivate
        },
        {
            title: Strings.generalDetails,
            path: PATHS.project.edit.replace(":id", id?.toString() || ''),
            isAllow: userPermissions.project.edit
        },
            {
            title: Strings.tasks,
            path: pathname.includes(constant.taskPathEndPoints.view) || pathname.includes(constant.taskPathEndPoints.taskEdit)  ?  pathname :  currentTaskPath.replace(":id", id?.toString() || ''),
            isAllow: currentTaskPath?.includes(constant.taskPathEndPoints.taskAdd) ? userPermissions?.task.add : userPermissions?.task.list
        },
        {
            title: Strings.users,
            path: PATHS.project.users.replace(":id", id?.toString() || ''),
            isAllow: true
        },
        {
            title: Strings.activity,
            path: PATHS.project.activity.replace(":id", id?.toString() || ''),
            isAllow: true
        },
    
        {
            title: Strings.files,
            path: PATHS.project.files.replace(":id", id?.toString() || ''),
            isAllow: true
        },
    ]
    return (
        <>
            <Fragment>
                {id && (
                    <ProjectHeader
                        estimateHour={estimateHour}
                        team={allTeamMembers}
                        dueDate={specificProject?.end_date}
                        editId={Number(id)}
                        arrowColor = {arrowColor}
                        navLinks={projectNavLinks}
                        openTask={specificProject?.open_tasks ? specificProject?.open_tasks : '0'}
                        estimateHourArrowIcon={'/media/icons/duotune/arrows/arr066.svg'}
                        projectName={specificProject?.name} logo={specificProject?.image_url as string}
                        tags={specificProject?.tag?.split(",")} />
                )}
                <Outlet />
                
            </Fragment>
        </>
    )
}

export { ProjectLayOut }