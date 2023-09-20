/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { IpAddressValidationSchema } from 'app/utils/ValidationSchema'
import { useSelector } from 'react-redux'
import { IpAddressFormValues } from 'app/Modal/Modal'
import { useNavigate } from 'react-router-dom'
import { Message } from 'app/utils/AlertMessage'
import { Strings } from 'app/resource/Strings'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { permissionActions } from 'app/redux/PermissionSlice/PermissionSlice'
import { Loader } from 'app/Components/Loader/Loader'
import { getUserToken } from 'services/AuthServices'
import { CustomInput } from '_metronic/helpers/components/Input/Input'
import Button from 'app/Components/Button/Button'
import { addIpAddressAction, editIpAddressAction, getIPAddress, getIndividualIpAction } from 'app/redux/ipAddressSlice/ipAddressAyscThunk'
import { setErrorMessage } from 'app/utils/helper'
import { ipActions } from 'app/redux/ipAddressSlice/ipAddressSlice'
import UpdateDetailsSection from 'app/Components/UpadateDetailSection'
import { PATHS } from 'config/paths/paths'
import constant from 'config/const/const'

const addIpAddressBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.ipAddress,
    path: PATHS.ip.list,
    isSeparator: false,
    isActive: false,
  },
]
const Form = () => {
  const param = useParams()
  const dispatch = useAppDispatch()
  const navigator = useNavigate()
  const userToken = getUserToken()
  const { isLoading, list } = useSelector(
    (state: IRootState) => state.IpAddressStateData
  )
  const token = getUserToken()
  useEffect(() => {
    if (userToken) {
      dispatch(getIPAddress({token: userToken, page: constant.page.defaultNumber, size: constant.page.maxSize}))
    }
  }, [dispatch, userToken])
  const formik = useFormik<IpAddressFormValues>({
    initialValues: {
      ipAddress: '',
      name: '',
      updatedBy: null,
      addedBy: null,
      createAt: "",
      updatedAt: "",
      added_by_user: {
        id: 0,
        name: '',
        image_url: ''
      },
      updated_by_user: {
        id: 0,
        name: '',
        image_url: ''
      }
    },
    validationSchema: IpAddressValidationSchema,
    onSubmit: (formValue) => {
      if (param.id) {
        editPageHandlerSubmit(formValue.ipAddress, formValue.name)
      } else {
        addPageHandlerSubmit(formValue.ipAddress, formValue.name)
      }
    },
  })
const isIPAlreadyExists = list?.some((item) => item?.name?.toLocaleLowerCase()?.replace(" ", "") === formik?.values?.name?.toLocaleLowerCase()?.replace(" ", ""));

  useEffect(() => {
    dispatch(ipActions.resetErrorState());
    dispatch(ipActions.resetState());
    return () => {
      dispatch(ipActions.resetErrorState());
      dispatch(ipActions.resetState());
    }
  }, []);

  useEffect(() => {
    if (param.id && token) {
      /**
       * @param token
       * @param id
       * @return edited ip address
       */
      const id = Number(param?.id);
      dispatch(getIndividualIpAction({ token, id })).then(({ payload }) => {
        if (payload?.ip_address) {
          formik.resetForm({
            values: {
              ...formik.values,
              ipAddress: payload?.ip_address,
              updatedBy: payload?.updated_by,
              updatedAt: payload?.updated_at,
              addedBy: payload?.added_by,
              createAt: payload?.created_at,
              name: payload?.name || "",
              added_by_user: payload?.added_by_user || "",
              updated_by_user: payload?.updated_by_user || ""
            },
          })
          return
        }
        Message(Strings.ipAddressNotFound, 'error', '').then((result) => {
          if (result.isConfirmed) {
            navigator(PATHS.ip.list)
          }
        })
      })
    } else {
      formik.resetForm({
        values: {
          addedBy: null,
          createAt: "",
          updatedBy: null,
          updatedAt: '',
          ipAddress: '',
          name: '',
          added_by_user: {id: 0, name: '', image_url: ''},
          updated_by_user: {id: 0, name: '', image_url: ''},
        },
      })
    }
  }, [param.id, token])
  /**
   * This function is used to edit the ip address and use in next PR
   * @param ipAddress
   *
   */
  const editPageHandlerSubmit = (ipAddress: string, name: string) => {
    const payload = {
      token,
      id: Number(param?.id),
      name: name,
      ip_address: ipAddress,
    }
    const isIPAlreadyExists = list?.some((item) => item?.name?.toLocaleLowerCase().replace(" ", "") === name.toLocaleLowerCase().replace(" ", "") && item.id !== Number(param?.id));
    if(isIPAlreadyExists) {
      Message(Strings.ipNameAlreadyExists, "error", "");
      return
    }
    dispatch(editIpAddressAction(payload)).then((res: any) => {
      if (res.payload?.status) {
        alertMessage('success', successMessage, '')
      } else {
        const error = setErrorMessage(res.payload?.message)
        alertMessage('error', error, '')
      }
    })
  }

  const addPageHandlerSubmit = (ipAddress: string, name: string) => {
    const payload = {
      token,
      ip_address: ipAddress,
      name: name
    }
    if(isIPAlreadyExists) {
      Message(Strings.ipNameAlreadyExists, "error", "");
      return
    }
    dispatch(addIpAddressAction(payload)).then((res: any) => {
      if (res.payload?.status) {
        alertMessage('success', successMessage, '')
      } else {
        const error = setErrorMessage(res.payload?.message)
        alertMessage('error', error, '')
      }
    })
  }

  const alertMessage = (icon: 'error' | 'success' | 'warning', text: string, title: string) => {
    Message(title, icon, text).then((result) => {
      if (result.isConfirmed && icon === 'success') {
        navigator(PATHS.ip.list)
      }
      if (result.isConfirmed && icon === 'error') {
        dispatch(permissionActions.resetErrorState())
      }
    })
  }
  const successMessage = param?.id
    ? Strings.ipAddressUpdateSuccessfully
    : Strings.ipAddressAddSuccessfully
  const handlerBlurEvent = (name: string) => {
    formik.setFieldTouched(name, true)
  }
  const { updatedBy, updatedAt, addedBy, createAt, added_by_user, updated_by_user} = formik.values
  return (
    <>
      <PageTitle path={PATHS.ip.list} breadcrumbs={addIpAddressBreadcrumbs}>
        {param.id ? Strings.editIpAddress : Strings.addIpAddress}
      </PageTitle>
        {isLoading && param?.id ? (
          <Loader />
        ) : (
          <div id='kt_account_permission_form' className='collapse show'>
             <form className='form' onSubmit={formik.handleSubmit}>
             <div className='card mb-5 mb-xl-10'>
            <div className='card-body border-0 p-9'>
            <CustomInput
                label={Strings.name}
                name="name"
                formilk={formik}
                value={formik.values.name}
                placeHolder={Strings.name}
                type={'text'}
                onBlur={handlerBlurEvent}
              />
                <CustomInput
                  label={Strings.ipAddress}
                  name='ipAddress'
                  formilk={formik}
                  value={formik.values.ipAddress}
                  placeHolder={Strings.ipAddress}
                  type={'text'}
                  onBlur={handlerBlurEvent}
                />
                </div>
                </div>
                {(updatedBy || addedBy) && (
                  <UpdateDetailsSection
                  title={Strings.updateDetails}
                  id={updatedBy}
                  lastUpdateDate={updatedAt}
                  createdById={addedBy}
                  lastCreateDate={createAt}
                  createDetails={added_by_user}
                  updateDetails={updated_by_user}
                   />
                )}
                <Button
                  type='submit'
                  isValid={formik.isValid}
                  dirty={formik.dirty}
                  disabled = {formik.isSubmitting}
                  isLoading={isLoading}
                  children={param?.id ? Strings.updateIpAddress : Strings.addIpAddress}
                />
              </form>
            </div>
        )}
    </>
  )
}
export default Form
