/* eslint-disable react-hooks/exhaustive-deps */
import React, {Fragment, useEffect, useMemo, useState} from 'react'
import {Strings} from 'app/resource/Strings'
import {PageLink, PageTitle} from '_metronic/layout/core'
import {IRootState, useAppDispatch} from 'app/redux/store'
import {Loader} from 'app/Components/Loader/Loader'
import {Link, useParams} from 'react-router-dom'
import {getUserToken} from 'services/AuthServices'
import {useSelector} from 'react-redux'
import {Card} from 'react-bootstrap'
import ShowDetails from 'app/Components/showDetails/ShowDetails'
import moment from 'moment'
import UpdateDetailsSection from 'app/Components/UpadateDetailSection'
import {PATHS} from 'config/paths/paths'
import {getIndividualCredentialAction} from 'app/redux/CredentialSlice/CredentialAyscThunk'
import {CredentialResponse} from 'app/redux/CredentialSlice/CredentialsTypes'
import { ModalBodyProps } from 'app/pages/Projects/Components/ProjectHeader/ProjectHeader'
import { capitalizeFirstLetter } from 'app/utils/helper'
import { Modal } from 'app/Components/Modal/Modal'
import { SelectInputValue } from 'app/pages/Projects/Components/Modal/Modal'

const DetailsBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.credentials,
    path: PATHS.credential.list,
    isSeparator: false,
    isActive: true,
  },
]


export const formatLastUpdateDate = (date: string) => {
  return moment(date)?.format('DD-MM-YYYY hh:mm:ss A')
}

const Details = () => {
  const [credentialUser, setCurrentUser] = useState<CredentialResponse>({} as CredentialResponse)
  const {list} = useSelector((state: IRootState) => state.UserStateData)
  const [error, setError] = useState<string>('')
  const params = useParams()
  const token = getUserToken()
  const dispatch = useAppDispatch()
  useEffect(() => {
    setError('')
  }, [])

  useEffect(() => {
    if (token) {
      const id = Number(params.id)
      dispatch(getIndividualCredentialAction({token, id})).then((res) => {
        const formValues = res.payload as any
        if (formValues) {
          setCurrentUser(formValues)
        } else {
          setError(Strings.credentialDetailsNotFound)
        }
      })
    }
  }, [dispatch, token])

  const getFieldsName = (data: any[]) => {
    return data?.map((field) => field?.name || '')?.join(', ')
  }

  const alertErrorMessage = () => {
    return (
      <div className='card mb-5 mb-xl-10 form-container p-9 text-center'>
        <h2>{error}</h2>
      </div>
    )
  }

  const getUserImage = (id: number) => {
    return list?.find((item) => item.id === id)?.image_url
  }

  const usersDetails  = useMemo(()=>{
    const userlist = credentialUser?.user?.map((item) => {
      return {
        designation:'' ,
        email: '' , label: item?.name || "", user_image: item?.image_url, id: item?.id
      }
    })
    return userlist
  },[credentialUser.user])

  const checkUsersJSX = () => {
    return (
      <>
      <div className="symbol-group symbol-hover mb-3">
      {credentialUser?.user?.length > 0 && (
        <Fragment>
          {credentialUser?.user?.map((item, index) => {
            return (
              <Fragment>
                <div
                  key={`${index}`}
                  className='symbol symbol-35px symbol-circle'
                  data-bs-toggle='tooltip'
                  title={item.name}
                  data-bs-original-title={item.name}
                  data-kt-initialized='1'
                >
                  <img alt={item.name} src={item.image_url} />
                </div>
              </Fragment>
            )
          })}
          {credentialUser?.user?.length - 5 > 0 && (
            <a
              className='symbol symbol-35px symbol-circle'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_view_users'
            >
              <span
                className='symbol-label bg-dark text-inverse-dark fs-8 fw-bold'
                data-bs-toggle='tooltip'
                data-bs-trigger='hover'
                data-bs-original-title='View more users'
                data-kt-initialized='1'
              >
                +{credentialUser?.user?.length - 5}
              </span>
            </a>
          )}
        </Fragment>
      )}
      </div>

      </>
    )
  }
  const checkDescriptionJSX = () => {
    return (
      <Card>
      <h3 className='credential-title'>{}</h3>
        <div className='description'>
          <span dangerouslySetInnerHTML={{ __html: credentialUser.description}} />
          </div>
          </Card>
    )
  }

  const personalDetailsValues = [
    {
      label: Strings.name,
      value: credentialUser?.name || '',
    },
    {
      label: Strings.role,
      value: getFieldsName(credentialUser?.role) || '',
    },
    {
      label: Strings.user,
      isComponentsType: true,
      value: checkUsersJSX || '',
    },

    {
      label: Strings.client,
      value: getFieldsName(credentialUser?.client) || '',
    },
    {
      label: Strings.project,
      value: getFieldsName(credentialUser?.project) || '',
    },
    {
      label: Strings.credentialDetail,
      isComponentsType: true,
      value: checkDescriptionJSX || '' ,

    },
    {
      label: Strings.lastupdated,
      value: moment(credentialUser?.updated_at).format('DD/MM/YYYY hh:mm A') || '',
    },
  ]

  if (error) {
    return (
      <>
        <PageTitle path={PATHS.credential.list} breadcrumbs={DetailsBreadcrumbs}>
          {Strings.credentialView}
        </PageTitle>
        {alertErrorMessage()}
      </>
    )
  }

  return (
    <>
      <PageTitle path={PATHS.credential.list} breadcrumbs={DetailsBreadcrumbs}>
        {Strings.credentialView}
      </PageTitle>
      {Object.values(credentialUser).length === 0 && !error ? (
        <Loader />
      ) : (
        <>
          <ShowDetails
            id=''
            data={personalDetailsValues}
            path={`client/${params?.id}/edit`}
            title={''}
          />
                <Modal id={"kt_modal_view_users"}>
      <ModalBody teamUserList={usersDetails} />
      
    </Modal>
          {(credentialUser?.updated_by || credentialUser?.created_by) && (
            <UpdateDetailsSection
              lastUpdateDate={credentialUser?.updated_at || ''}
              id={credentialUser?.updated_by || null}
              createdById={Number(credentialUser?.created_by)}
              title={Strings.updateDetails}
              lastCreateDate={credentialUser?.created_at || ''}
              createDetails={credentialUser?.added_by_user}
              updateDetails={credentialUser?.updated_by_user}
            />
          )}
        </>
      )}
    </>
  )
}

const ModalHeader = () => {
  return (
    <div className="text-center mb-13">
      <h1 className="mb-3">{Strings.projectsTeam}</h1>
      <div className="text-muted fw-semibold fs-5">
      </div>
    </div>
  )
}

const ModalBody: React.FC<ModalBodyProps> = ({
  teamUserList
}) => {
  return (
    <>
      <ModalHeader />
      {teamUserList?.map((user) => {
        return (
          <div className="d-flex flex-stack py-5 border-bottom border-gray-300 border-bottom-dashed" key={`${user.id}`}>
            <div className="d-flex align-items-center">
              <div className="symbol symbol-35px symbol-circle">
                <img alt={user.label} src={user.user_image} />
              </div>
              <div className="ms-6">
                {user.label}
                  <span className="badge badge-light fs-8 fw-semibold ms-2">{capitalizeFirstLetter(user.designation)}
                  </span>
                <div className="fw-semibold text-muted">{user.email}</div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Details
