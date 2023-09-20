import { getAllClientAction } from "app/redux/ClientsSlice/ClientsAyscThunk";
import { getAllProjectsAction } from "app/redux/ProjectSlice/ProjectAyscThunk";
import { getRoles } from "app/redux/RoleSlice/RoleAyscThunk";
import { GetUserListPayload, getAllUsersAction } from "app/redux/UserSlice/UserAyscThunk";
import { IRootState } from "app/redux/store";
import { Strings } from "app/resource/Strings";
import constant from "config/const/const";
import useFetchAPIBaseOnPermission from "config/hooks/useFetchAPIBaseOnPermission";
import { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUserToken } from "services/AuthServices";

const CredentialLayout = ()=> {
    const token = getUserToken();
    const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData);
    const {list: projectList} = useSelector((state: IRootState) => state.ProjectStateData);
    const {list: userList} = useSelector((state: IRootState) => state.UserStateData);
    const {list: roleList} = useSelector((state: IRootState) => state.roleStateData);

    const userPayload = useMemo(() => {
        return {
        token,
        page: constant.page.defaultNumber,size: constant.page.maxSize, status: Strings.activeList.toLocaleLowerCase()
        }
    },[token])

    useFetchAPIBaseOnPermission<GetUserListPayload>(userPermissions?.user?.list, getAllUsersAction, userPayload,false, userList);
    useFetchAPIBaseOnPermission<GetUserListPayload>(userPermissions?.credential?.add, getAllProjectsAction, userPayload,false, projectList);
    useFetchAPIBaseOnPermission<GetUserListPayload>(userPermissions?.client?.list, getAllClientAction, { token, page: constant.page.defaultNumber, size: constant.page.maxSize},false, projectList);
    useFetchAPIBaseOnPermission<GetUserListPayload>(userPermissions?.role?.list, getRoles, { token, page: constant.page.defaultNumber, size: constant.page.maxSize},false, roleList);
    return (
        <>
        <Fragment>
            <Outlet />
        </Fragment>
    </>
    )
}

export default CredentialLayout
