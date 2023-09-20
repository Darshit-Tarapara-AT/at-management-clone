/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Strings } from 'app/resource/Strings'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { IRootState, useAppDispatch } from 'app/redux/store'
import {  useParams } from 'react-router-dom'
import { getUserToken } from 'services/AuthServices'
import { useSelector } from 'react-redux'
import ShowDetails from 'app/Components/showDetails/ShowDetails'
import { getIndividualLeaveAction } from 'app/redux/LeaveSlice/LeaveAyscThunk'
import { LeaveInformation } from 'app/redux/LeaveSlice/LeaveTypes'
import UpdateDetailsSection from 'app/Components/UpadateDetailSection'
import { PATHS } from 'config/paths/paths'

const DetailsBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.masterLeaves,
    path: PATHS.leave.masterList,
    isSeparator: false,
    isActive: false,
  }
]
interface ViewLeaveProps {
  hasMasterViewPage: boolean;
}
const Details:React.FC<ViewLeaveProps> = () => {
  const [currentUser, setCurrentUser] = useState<LeaveInformation>({} as LeaveInformation)
  const [error, setError] = useState<string>('')
  const { userPermissions } = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const { previousPagePath } = useSelector((state: IRootState) => state.leaveStateData)
  const params = useParams()
  const token = getUserToken()
  const dispatch = useAppDispatch()

  const currentPageBreadCrumb = React.useMemo(() => {
    const newLeaveBreadCrumbs = DetailsBreadcrumbs.map((item) => {
      if (item.title !== Strings.home && previousPagePath === Strings.myLeaves) {
        item.title = Strings.myLeaves;
        item.path = PATHS.leave.myList;
      }
      return item;
    }).filter((item) => item.title !== '')
    return newLeaveBreadCrumbs
  }, [previousPagePath])
  useEffect(() => {
    setError("");
  }, [])
  useEffect(() => {
    if (token) {
      const id = Number(params.id)
      dispatch(getIndividualLeaveAction({ token, id })).then((res) => {
        const formValues = res.payload as any
        if (formValues) {
          setCurrentUser(formValues)
        } else {
          setError(Strings.leaveDetailsNotFound)
        }
      })
    }
  }, [dispatch, token])

  const leaveDetails = [
    {
      label: Strings.user,
      value: {
       image_url: currentUser?.user?.image_url || '',
       name: currentUser?.user?.name || ''
      },
    },
    {
      label: Strings.startDate,
      value: currentUser?.start_date || '',
    },
    {
      label: Strings.endDate,
      value: currentUser?.end_date || '',
    },
    {
      label: Strings.reason,
      value: currentUser?.reason || '',
    },
    {
      label: Strings.joiningDate,
      value: currentUser?.joining_date || '',
    },
    {
      label: Strings.status,
      value: currentUser?.status || '',
    },
    {
      label: Strings.type,
      value: currentUser?.information_type || '',
    },
    {
      label: Strings.comment,
      value: currentUser?.comment || '',
    },
  ]

  const alertErrorMessage = () => {
    return (
      <div className="card mb-5 mb-xl-10 form-container p-9 text-center">
        <h2>{error}</h2>
      </div>
    )
  }
  if (error) {
    return (
      <>
        <PageTitle path={PATHS.leave.myList} breadcrumbs={DetailsBreadcrumbs}>
          {Strings.viewLeave}
        </PageTitle>
        {alertErrorMessage()}
      </>
    )
  }
  return (
    <>
      <PageTitle path={`leave/${params?.id}/edit`} breadcrumbs={currentPageBreadCrumb} buttontitle={Strings.editLeave} hasAddPermission={userPermissions?.leave?.editMater} hideSVG={true} >
        {Strings.viewLeave}
      </PageTitle>
      <>
        <ShowDetails
          title={''}
          id=''
          className='fw-bold text-muted'
          data={leaveDetails}
          isEditAllow={userPermissions?.leave?.editMater}
          path={`leave/${params?.id}/edit`}
          buttonText={Strings.editLeave}
        />
        
        {currentUser?.status ===  Strings.rejected.toLocaleLowerCase() && currentUser?.approved_dated && (
            <UpdateDetailsSection
            id={currentUser?.approved_by!}
            title={Strings.leaveStatus}
            lastUpdateDate={currentUser?.approved_dated || ""}
            leaveDetails={Strings.rejectedBy}
            />

        )}
        {currentUser?.status === Strings.pending.toLocaleLowerCase() && currentUser?.approved_dated && (
          <UpdateDetailsSection
            id={currentUser?.approved_by!}
            title={Strings.leaveDetails}
            lastUpdateDate={currentUser?.approved_dated || ""}
            leaveDetails={Strings.pendingBy}
            />
        )}
        {currentUser?.status === Strings.confirmed.toLocaleLowerCase()   && currentUser?.approved_dated && (
          <UpdateDetailsSection
            id={currentUser?.approved_by!}
            title={Strings.leaveStatus}
            lastUpdateDate={currentUser?.approved_dated || ""}
            leaveDetails={Strings.approvedBy}
            approvedDetails={currentUser?.approved_by_user}
            />
        )}
        <UpdateDetailsSection
          id={currentUser?.updated_by!}
          title={Strings.updateDetails}
          createdById={currentUser?.added_by}
          lastUpdateDate={currentUser.updated_at ||''}
          lastCreateDate={currentUser?.created_at || ''}
          createDetails={currentUser?.added_by_user}
          updateDetails={currentUser?.updated_by_user}
        />
      </>
    </>
  )
}
export default Details
