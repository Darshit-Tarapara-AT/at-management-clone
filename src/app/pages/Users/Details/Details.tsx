/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Strings } from 'app/resource/Strings'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { Loader } from 'app/Components/Loader/Loader'
import { useParams } from 'react-router-dom'
import { getIndividualUserAction } from 'app/redux/UserSlice/UserAyscThunk'
import { getUserToken } from 'services/AuthServices'
import { UserResponseField } from '../Components/Modal/Modal'
import UserDetailsList from 'app/Components/UserDetailsList/UserDetailsList'
import { useSelector } from 'react-redux'
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
    title: Strings.users,
    path: PATHS.user.list,
    isSeparator: false,
    isActive: false,
  },
]

const Details = ({...props}) => {
  const [currentUser, setCurrentUser] = useState<UserResponseField>({} as UserResponseField)
  const [error, setError] = useState<string>('')
  const { userPermissions } = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const params = useParams()
  const token = getUserToken()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (token) {
      const id = Number(params.id)
      dispatch(getIndividualUserAction({ token, id })).then((res) => {
        const formValues = res.payload as UserResponseField
        if (formValues) {
          setCurrentUser(formValues)
        } else {
          setError(Strings.userDetailsDoesNotFound)
        }
      })
    }
  }, [dispatch, token])

  const alertErrorMessage = () => {
    return (
      <div className="card mb-5 mb-xl-10 form-container p-9 text-center">
        <h2>{error}</h2>
      </div>
    )
  }

  return (
    <>
      <PageTitle path={PATHS.user.list} breadcrumbs={DetailsBreadcrumbs}>
        {Strings.userDetails}
      </PageTitle>
      {Object.values(currentUser).length === 0 ? (
        <Loader />
      ) : (
        <>
          <UserDetailsList currentUser={currentUser} isEditAllow={userPermissions?.user?.edit} buttonText={Strings.editUser} editButtonPath={`user/${params?.id}/edit`} />
          {(currentUser?.updated_by || currentUser?.added_by || currentUser?.deleted_by) && (
            <UpdateDetailsSection
            lastUpdateDate={currentUser?.updated_at || ''}
            id={Number(currentUser?.updated_by || null)}
            title={Strings.updateDetails}
            createdById={currentUser?.added_by}
            lastCreateDate={currentUser?.created_at}
            createDetails={currentUser?.added_by_user}
            updateDetails={currentUser?.updated_by_user}
            />
          )}
        </>
      )}
      {error && Object.values(currentUser).length === 0 && alertErrorMessage()}

    </>
  )
}
export default Details