import { getAllUsersAction } from 'app/redux/UserSlice/UserAyscThunk';
import { IRootState, useAppDispatch } from 'app/redux/store';
import { Strings } from 'app/resource/Strings';
import constant from 'config/const/const';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getUserToken } from 'services/AuthServices';



const FetchAllUserLayout = () => {
    const token = getUserToken();
    const dispatch = useAppDispatch()
    const {list: userList} = useSelector((state: IRootState) => state.UserStateData);
    useEffect(() => {
        if (userList?.length <= constant.page.size && token) {
          dispatch(
            getAllUsersAction({
              token,
              page: constant.page.defaultNumber,
              size: constant.page.maxSize,
              status: Strings.activeList.toLocaleLowerCase(),
            })
          )
        }
      }, [userList, token])
  return (
    <div>FetchAllUserLayout</div>
  )
}

export default FetchAllUserLayout