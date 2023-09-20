/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Strings } from 'app/resource/Strings'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { Loader } from 'app/Components/Loader/Loader'
import { useParams } from 'react-router-dom'
import { getUserToken } from 'services/AuthServices'
import { useSelector } from 'react-redux'
import { getIndividualClientAction } from 'app/redux/ClientsSlice/ClientsAyscThunk'
import { ClientFormValues } from '../Components/Modal/Modal'
import ShowDetails from 'app/Components/showDetails/ShowDetails'
import moment from 'moment'
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
    title: Strings.clients,
    path: PATHS.client.list,
    isSeparator: false,
    isActive: true,
  }
]
export const formatLastUpdateDate = (date: string) => {
  return  moment(date)?.format("DD-MM-YYYY hh:mm:ss A")
}
const Details = () => {
  const [currentUser, setCurrentUser] = useState<ClientFormValues>({} as ClientFormValues)
  const [error, setError] = useState<string>('')
  const { userPermissions } = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const params = useParams()
  const token = getUserToken()
  const dispatch = useAppDispatch()
  useEffect(() => {
    setError("");
  }, [])
  useEffect(() => {
    if (token) {
      const id = Number(params.id)
      dispatch(getIndividualClientAction({ token, id })).then((res) => {
        const formValues = res.payload as any
        if (formValues) {
          setCurrentUser(formValues)
        } else {
          setError(Strings.clientDetailsNotFound)
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

  const personalDetailsValues = [
    {
      label: Strings.name,
      value: currentUser?.name || '',
    },
    {
      label: Strings.email,
      value: currentUser?.email || '',
    },
    {
      label: Strings.companyName,
      value: currentUser?.company_name || '',
    },
    {
      label: Strings.website,
      value: currentUser?.website || '',
    },
    {
      label: Strings.phone,
      value: currentUser?.phone || '',
    },
    {
      label: Strings.mobile,
      value: currentUser?.mobile || '',
    },
    {
      label: Strings.skypeId,
      value: currentUser?.skype_id || '',
    },
    {
      label: Strings.linkedinURL,
      value: currentUser?.linkedin_url || '',
    },
  ]

  const clientStatusValue = [
    {
      label: Strings.status,
      value: currentUser?.lead_status || '',
    },
    {
      label: Strings.addedBy,
      value: currentUser?.added_by_username || '',
    },
    {
      label: Strings.account,
      value: currentUser?.account || '',
    },
    {
      label: Strings.position,
      value: currentUser?.position || '',
    },
    {
      label: Strings.modeOfContact,
      value: currentUser?.lead_regular_contact_source || '',
    },
    {
      label: Strings.addedDate,
      value:moment(currentUser?.added_date).format("DD-MM-YYYY") || '',
    },
    {
      label: Strings.lastUpdateDate,
      value: moment(currentUser?.updated_at).format("DD-MM-YYYY HH-mm-ss A") || '',
    },
  ]
  const addressDetails = [
    {
      label: Strings.address,
      value: currentUser?.address || '',
    },
    {
      label: Strings.area,
      value: currentUser?.area || '',
    },
    {
      label: Strings.country,
      value: currentUser?.country || '',
    },
    {
      label: Strings.state,
      value: currentUser?.state || '',
    },
    {
      label: Strings.city,
      value: currentUser?.city || '',
    },
    {
      label: Strings.postalCode,
      value: currentUser?.postal_code || '',
    },
    {
      label: Strings.comment,
      value: currentUser?.comments || '',
    },
  ]
  if (error) {
    return (
      <>
        <PageTitle path={PATHS.client.list} breadcrumbs={DetailsBreadcrumbs}>
          {Strings.clientView}
        </PageTitle>
        {alertErrorMessage()}
      </>
    )
  }
  return (
    <>
     <PageTitle path={PATHS.client.list} breadcrumbs={DetailsBreadcrumbs}>
          {Strings.clientView}
        </PageTitle>
      {Object.values(currentUser).length === 0 && !error ? (
        <Loader />
      ) : (
        <>
          <ShowDetails
            title={Strings.personDetails}
            id=''
            data={personalDetailsValues}
            isEditAllow={userPermissions?.client?.edit}
            path={`client/${params?.id}/edit`}
            buttonText={Strings.editDetails}
          />
          <ShowDetails
            title={Strings.clientStatus}
            id=''
            data={clientStatusValue}
          />
          <ShowDetails
            title={Strings.addressContactInformation}
            id=''
            data={addressDetails} />
          {(currentUser?.updated_by || currentUser?.added_by) && (
            <UpdateDetailsSection
              lastUpdateDate={currentUser?.updated_at || ''}
              id={currentUser?.updated_by || null}
              createdById={Number(currentUser?.added_by)}
              title={Strings.updateDetails}
              lastCreateDate={currentUser.created_at || ''}
              createDetails={currentUser.added_by_user}
              updateDetails={currentUser.updated_by_user}
            />
          )}
        </>
      )}
    </>
  )
}
export default Details
