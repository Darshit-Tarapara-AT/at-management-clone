/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Strings } from 'app/resource/Strings'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { Loader } from 'app/Components/Loader/Loader'
import { useParams } from 'react-router-dom'
import { getUserToken } from 'services/AuthServices'
import { useSelector } from 'react-redux'
import ShowDetails from 'app/Components/showDetails/ShowDetails'
import moment from 'moment'
import UpdateDetailsSection from 'app/Components/UpadateDetailSection'
import { getIndividualLeadAction } from 'app/redux/LeadSlice/LeadAyscThunk'
import { LeadInformation } from 'app/redux/LeadSlice/LeadTypes'
import { FormikKeys } from 'app/Components/TextArea'
import countryList from 'app/assets/data/country.json'
import { convertToIndianDateFormat } from 'app/utils/helper'
const DetailsBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: '/',
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.lead,
    path: '/leads',
    isSeparator: false,
    isActive: true,
  }
]
export const formatLastUpdateDate = (date: string) => {
  return moment(date)?.format("DD-MM-YYYY hh:mm:ss A")
}
const Details = () => {
  const [currentLead, setCurrentLead] = useState<LeadInformation>({} as LeadInformation)
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
      dispatch(getIndividualLeadAction({ token, id })).then((res) => {
        const formValues = res.payload as any
        if (formValues) {
          setCurrentLead(formValues)
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
  const getLeadStatusLabel = (status: string) => {
    const strings: FormikKeys = { ...Strings }
    return strings[status]
  }
  const getCountryLabel = (code: string) => {
    const findSelectedCountry = countryList?.find((country) => country.code === code);
    return findSelectedCountry?.name
  }
  const personalDetailsValues = [
    {
      label: Strings.name,
      value: currentLead?.name || '',
    },
    {
      label: Strings.leadType,
      value: currentLead?.lead_type || '',
    },
    {
      label: Strings.email,
      value: currentLead?.email || '',
    },
    {
      label: Strings.companyName,
      value: currentLead?.company_name || '',
    },
    {
      label: Strings.account,
      value: currentLead?.account || '',
    },
    {
      label: Strings.position,
      value: currentLead?.position || '',
    },
    {
      label: Strings.website,
      value: currentLead?.website || '',
    },
    {
      label: Strings.phone,
      value: currentLead?.phone || '',
    },
    {
      label: Strings.mobile,
      value: currentLead?.mobile || '',
    },
    {
      label: Strings.skypeId,
      value: currentLead?.skype_id || '',
    },
    {
      label: Strings.linkedinURL,
      value: currentLead?.linkedin_url || '',
    },
    {
      label: Strings.leadStatus,
      value: getLeadStatusLabel(currentLead?.lead_status) || '',
    },
    {
      label: Strings.deadlineAndReminder,
      value: currentLead?.deadline_reminder ? moment(currentLead?.deadline_reminder).format("DD-MM-YYYY hh:mm A") : '',
    },
    {
      label: Strings.notes,
      value: currentLead?.note || '',
    },
    {
      label: Strings.lastContactDate,
      value: convertToIndianDateFormat(currentLead?.last_contact_date) || '',
    }
  ]

  const leadStatusValue = [
    {
      label: Strings.title,
      value: currentLead?.lead_title || '',
    },
    {
      label: Strings.description,
      value: currentLead?.lead_description || '',
    },
    {
      label: Strings.leadRegularContactSource,
      value: currentLead?.lead_regular_contact_source || '',
    },
    {
      label: Strings.givenPrice,
      value: currentLead?.given_price || '',
    },
    {
      label: Strings.reason,
      value: currentLead?.reason || '',
    },
    {
      label: Strings.contactEmail,
      value: currentLead?.lead_contact_email || '',
    },
    {
      label: Strings.contactUrl,
      value: currentLead?.contact_url || '',
    }
  ]
  const addressDetails = [
    {
      label: Strings.address,
      value: currentLead?.address || '',
    },
    {
      label: Strings.area,
      value: currentLead?.area || '',
    },
    {
      label: Strings.country,
      value: getCountryLabel(currentLead?.country) || '',
    },
    {
      label: Strings.state,
      value: currentLead?.state || '',
    },
    {
      label: Strings.city,
      value: currentLead?.city || '',
    },
    {
      label: Strings.postalCode,
      value: currentLead?.postal_code || '',
    },
    {
      label: Strings.firstContactSource,
      value: currentLead?.first_contact_source || '',
    },
    {
      label: Strings.comment,
      value: currentLead?.comments || '',
    },
  ]
  if (error) {
    return (
      <>
        <PageTitle path='/clients' breadcrumbs={DetailsBreadcrumbs}>
          {Strings.clientView}
        </PageTitle>
        {alertErrorMessage()}
      </>
    )
  }
  return (
    <>
      <PageTitle path='/clients' breadcrumbs={DetailsBreadcrumbs}>
        {Strings.leadView}
      </PageTitle>
      {Object.values(currentLead).length === 0 && !error ? (
        <Loader />
      ) : (
        <>
          <ShowDetails
            title={Strings.personDetails}
            id=''
            data={personalDetailsValues}
            isEditAllow={userPermissions?.lead?.edit}
            path={`lead/${params?.id}/edit`}
            buttonText={Strings.editDetails}
          />
          <ShowDetails
            title={Strings.contactInformation}
            id=''
            data={addressDetails} />
          <ShowDetails
            title={Strings.leadInformation}
            id=''
            data={leadStatusValue}
          />
          {(currentLead?.updated_by || currentLead?.added_by) && (
            <UpdateDetailsSection
              lastUpdateDate={currentLead?.updated_at || ''}
              id={Number(currentLead?.updated_by!)}
              createdById={currentLead?.added_by}
              lastCreateDate={currentLead?.created_at || ''}
              title={Strings.updateDetails}
              createDetails={currentLead?.added_by_user}
              updateDetails={currentLead?.updated_by_user}
            />
          )}
        </>
      )}
    </>
  )
}
export default Details
