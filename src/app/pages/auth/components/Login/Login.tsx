import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Strings } from 'app/resource/Strings'
import Logo from 'app/assets/image/site-logo-new.png'
import './Login.scss'
import clsx from 'clsx'
import config from 'config/config'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { getOtp } from 'app/redux/AuthSlice/AuthAyscThunk'
import { useSelector } from 'react-redux'
import { authAction } from 'app/redux/AuthSlice/AuthSlice'
import Swal from 'sweetalert2'
import { setItem } from 'app/utils/storage'
import constant from 'config/const/const'
import { useNavigate } from 'react-router-dom'

const loginSchema = Yup.object().shape({
  email: Yup.string().email(Strings.pleaseEnterValidEmail).required(Strings.pleaseEnterEmail),
})

const initialValues = {
  email: '',
}

export function Login() {
  const isProduction = config.environment === 'production'
  const siteHomePageURL = process.env.REACT_APP_SITE_HOME_URL
  const siteContactUsPageURL = process.env.REACT_APP_SITE_CONTACT_URL
  const siteKnowUsPageURL = process.env.REACT_APP_SITE_KNOW_US_URL
  const siteOurServicePageURL = process.env.REACT_APP_SITE_OUR_SERVICE_URL
  const { isLoading, authErrorMessage } = useSelector((state: IRootState) => state.AuthStateData)
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      const payload = {
        email: values.email,
        custom_url: btoa(window.location.origin +"/")
      }
      dispatch(getOtp(payload)).then((response) => {
        if (response?.payload?.status) {
          dispatch(authAction.addLoginUserEmail(formik.values.email))
          setItem(constant.localStorageKey.email, formik.values.email)
          SuccessMessage(response)
        }
      })
    },
  })

  useEffect(() => {
   const previewEmail = localStorage.getItem(constant.localStorageKey.email);
   if(previewEmail) {
    formik.resetForm({
      values: {
        email: previewEmail
      }
    })
}
  }, [])

  useEffect(() => {
    if (formik.values.email) {
      dispatch(authAction.resetErrorState())
    }
  }, [formik.values.email, dispatch])

  const SuccessMessage = (response: any) => {
    Swal.fire({
      icon: 'success',
      title: Strings.loginLinkHasBeenSentToSlack,
      showConfirmButton: true,
      confirmButtonText: isProduction ? 'Ok' : 'Login',
    }).then(() => {
      dispatch(authAction.resetSuccessState())
      if(!process.env.APP_SERVER) {
        const loginLinkParts = response.payload.loginLink.split('/')
       navigate(`/${loginLinkParts[3]}/${loginLinkParts[4]}/${loginLinkParts[5]}`)
      }
      formik.setFieldValue('email', '')
      formik.setTouched({ email: false })
      
    })
  }

  const changeKeyStokeHandler = (e: React.BaseSyntheticEvent, key: string) => {
    if (key === ' ') {
      e.preventDefault()
      return
    }
  }
  const handlerChange = (value: string) => {
    formik.setFieldValue('email', value)
  }
  const redirectOnManageMentSite = (url: string) => {
    window.open(url + '')
  }
  const showEmailError = () => {
    return formik.touched.email && formik.errors.email ? formik.errors.email : ''
  }
  return (
    <div className='d-flex flex-column flex-root' id='kt_app_root'>
      <div className='d-flex flex-column flex-column-fluid flex-lg-row'>
        <div className='d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10'></div>
        <div className='d-flex flex-column-fluid sign-form flex-lg-row-auto justify-content-center justify-content-lg-end p-12 p-lg-20'>
          <div className='bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-20'>
            <div className='d-flex flex-center flex-column flex-column-fluid px-lg-10 pb-15 pb-lg-20'>
              <div className='d-flex flex-center flex-lg-center flex-column mb-11 site-logo'>
                <img src={Logo} alt={Strings.agreemTechnologies} />
              </div>
              <form
                className='form w-100'
                noValidate={true}
                id='kt_sign_in_form'
                onSubmit={formik.handleSubmit}
                data-kt-redirect-url='/metronic8/demo1/../demo1/index.html'
                action='#'
              >
                <div className='text-center mb-11'>
                  <h1 className='text-dark fw-bolder mb-3'>{Strings.signIn}</h1>
                  <div className='text-gray-500 fw-semibold fs-6'>
                    {Strings.projectManagementwebsite}
                  </div>
                </div>
                <div className='fv-row mb-2'>
                  <input
                    placeholder='Email'
                    type='email'
                    value={formik.values.email}
                    onKeyDown={(e) => changeKeyStokeHandler(e, e.key)}
                    onChange={(e) => handlerChange(e.target.value)}
                    onBlur={formik.handleBlur}
                    className={clsx(
                      'form-control bg-transparent',
                      { 'is-invalid': formik.touched.email && formik.errors.email },
                      {
                        'is-valid': formik.touched.email && !formik.errors.email,
                      }
                    )}
                    name='email'
                    autoComplete='on'
                  />
                </div>
                <div className="fv-plugins-message-container invalid-feedback mb-6">
                  <div data-field="email" data-validator="regexp">
                    {authErrorMessage ? authErrorMessage : showEmailError()}</div>
                </div>
                <div className='d-grid mb-10'>
                  <button
                    type='submit'
                    id='kt_sign_in_submit'
                    className='btn btn-primary'
                    disabled={isLoading}
                  >
                    {!isLoading && <span className='indicator-label'>{Strings.continue}</span>}
                    {isLoading && (
                      <span className='indicator-progress' style={{ display: 'block' }}>
                        {Strings.pleaseWait}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
                <div className='text-gray-500 text-center fw-semibold fs-6'>
                  {Strings.notMemberYet}
                  <span
                    className='px-5 navigation-btn'
                    onClick={() => redirectOnManageMentSite(siteContactUsPageURL || '')}
                  >
                    {Strings.contactUs}
                  </span>
                </div>
              </form>
            </div>
            <div className='d-flex flex-stack px-lg-10'>
              <div className='d-flex fw-semibold text-primary fs-base gap-5'>
                <span
                  className='px-2 navigation-btn'
                  onClick={() => redirectOnManageMentSite(siteHomePageURL || '')}
                >
                  {Strings.home}
                </span>
                <span
                  className='px-2 navigation-btn'
                  onClick={() => redirectOnManageMentSite(siteOurServicePageURL || '')}
                >
                  {Strings.ourService}
                </span>
                <span
                  className='px-2 navigation-btn'
                  onClick={() => redirectOnManageMentSite(siteKnowUsPageURL || '')}
                >
                  {Strings.knowUs}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}