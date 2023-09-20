import React, { Fragment, useState } from 'react'
import { Card } from 'app/Components/Card/Card'
import './View.scss'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { Strings } from 'app/resource/Strings'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IRootState } from 'app/redux/store'
import { useEffect } from 'react'
import { getIndividualPolicyAction, sentUserConsentConfirmation } from 'app/redux/PolicySlice/PolicyAyscThunk'
import { useAppDispatch } from 'app/redux/store'
import { Loader } from 'app/Components/Loader/Loader'
import { policyActions } from 'app/redux/PolicySlice/PolicySlice'
import { Message } from 'app/utils/AlertMessage'
import { getUserProfileActions } from 'app/redux/UserSlice/UserAyscThunk'
import { getUserToken } from 'services/AuthServices'
import { PATHS } from 'config/paths/paths'
const viewBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.policy,
    path: PATHS.policy.list,
    isSeparator: false,
    isActive: false,
  },
]


const View = () => {
  const { id } = useParams()
  const { list, isLoading, isPolicyRead } = useSelector((state: IRootState) => state.PolicyStateData);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const token = getUserToken();
  const navigator = useNavigate()
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(policyActions.resetPolicyListingState());
    if (id && token) {
      const policyId = Number(id)
      dispatch(getIndividualPolicyAction({token,id:policyId})).then((res) => {
        const data = {
          list: {
            title: res.payload.title || "",
            id: res?.payload?.id || '',
            description: res?.payload?.description || ""
          },
          isPolicyRead: res?.payload?.isRead || 0
        }
        dispatch(policyActions.addIndividualPolicy(data))
      })
    }
    return () => {
      dispatch(policyActions.resetPolicyListingState());
    }
  }, [id, dispatch, token])

  const consentSubmitHandler = (policyId: number) => {
    if (isChecked) {
      dispatch(sentUserConsentConfirmation({token,is_read:1, id:policyId})).then((res) =>{
        if(res.payload.status) {
          alertMessage('success',Strings.userConsentUpdatedSuccessfully,'')
        }
      })
    }
  }

  const alertMessage = (icon: 'error' | 'success' | 'warning', text: string, title: string) => {
    Message(title, icon, text).then((result) => {
      if (result.isConfirmed && icon === 'success') {
        dispatch(getUserProfileActions(token));
        navigator(PATHS.policy.list);
      }
      if (result.isConfirmed && icon === 'error') {
        dispatch(policyActions.resetErrorState())
      }
    })
  }
  const changeHandler = (e: React.BaseSyntheticEvent) => {
    setIsChecked((preViewState) => !preViewState);
  }
  return (
    <>
      <PageTitle breadcrumbs={viewBreadcrumbs} path ={PATHS.policy.list}>{Strings.viewPolicy}</PageTitle>
      {isLoading && !list ? <Loader />  :
      list?.map((policyDetails, index) => {
          return (
            <Fragment key={`${index}`}>
              <Card>
              <h3 className='policy-title'>{policyDetails.title}</h3>
                <div className='description'>
                  <span dangerouslySetInnerHTML={{ __html: policyDetails.description }} />
                  </div>
                  </Card>
                  {isPolicyRead === 0 && (
                  <Card className='pt-9 p-9 pt-0 mb-5 mb-xl-10 mt-xl-10 gap-5'>

                    <div className='form-check form-check-custom form-check-solid'>
                      <input
                        className='form-check-input me-3'
                        name="userConsent"
                        checked={isChecked}
                        value={isPolicyRead}
                        type="checkbox"
                        onChange={(e) => changeHandler(e)}
                        id="userConsent"
                      />
                      <label className='form-check-label' htmlFor="userConsent">
                        <div className='fw-bolder text-gray-800'>
                          {`${Strings.iAgreeTo}  ${policyDetails.title}`}
                        </div>
                      </label>
                    </div>

                  <div className='view-submit-button-container' style={{ display: "inline-flex", justifyContent: "space-between", width: "410px" }}>
                    {isPolicyRead === 0 && <button
                      type='button'
                      disabled = {!isChecked}
                      className='btn btn-primary'
                      onClick={() => consentSubmitHandler(policyDetails.id)}
                    >
                      {Strings.iAcceptConsent}
                    </button>}
                  </div>
              </Card>)}
            </Fragment>
          )
        })}
    </>
  )
}

export default View
