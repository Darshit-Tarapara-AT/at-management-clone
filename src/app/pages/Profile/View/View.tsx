/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Strings } from 'app/resource/Strings'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { IRootState } from 'app/redux/store';
import { useSelector } from 'react-redux'
import { Loader } from 'app/Components/Loader/Loader'
import UserDetailsList from 'app/Components/UserDetailsList/UserDetailsList'
import { PATHS } from 'config/paths/paths';

const ViewProfileBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.viewProfile,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.noString,
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const View = () => {
  const { currentUserProfileDetails } = useSelector((state: IRootState) => state.UserStateData);
  const [isDataFetch, setDataFetch] = useState(false);
  const {userPermissions} = useSelector((state: IRootState) => state.UserPermissionsStateData);

  useEffect(() => {
    let isDataLoad = false;
    Object.values(currentUserProfileDetails).forEach((value) => {
      if (value === "" || value === null || value === undefined) {
        isDataLoad = false
        return
      }
      else {
        isDataLoad = true
      }
      setDataFetch(isDataLoad)
    })
  }, [])

  return (
    <>
      <PageTitle path="/" breadcrumbs={ViewProfileBreadcrumbs}>{Strings.viewProfile}</PageTitle>
        {!isDataFetch ? <Loader /> : (
           <UserDetailsList currentUser={currentUserProfileDetails} isEditAllow ={userPermissions?.profile?.edit} buttonText={Strings.editProfile} editButtonPath={`user/${currentUserProfileDetails?.id}/edit`}/>
        )}
    </>
  )
}
export default View;
