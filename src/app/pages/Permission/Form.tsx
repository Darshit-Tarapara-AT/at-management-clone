/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { PermissionValidationSchema } from 'app/utils/ValidationSchema'
import { useSelector } from 'react-redux'
import { PermissionFormValues } from 'app/Modal/Modal'
import { useNavigate } from 'react-router-dom'
import { Message } from 'app/utils/AlertMessage'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { addPermissionAction, editPermissionAction, getAllModuleAction, getEditPermissionList, getPermissions } from 'app/redux/PermissionSlice/PermissionAyscThunk'
import { permissionActions } from 'app/redux/PermissionSlice/PermissionSlice'
import { Loader } from 'app/Components/Loader/Loader'
import { getUserToken } from 'services/AuthServices'
import { CustomInput } from '_metronic/helpers/components/Input/Input'
import Button from 'app/Components/Button/Button'
import SelectInput from 'app/Components/SelectInput/SelectInput'
import { capitalizeFirstLetter } from 'app/utils/helper'
import { PATHS } from 'config/paths/paths'
import constant from 'config/const/const'
import { Strings } from 'app/resource/Strings'
import UpdateDetailsSection from 'app/Components/UpadateDetailSection'
import useFetchAPIBaseOnPermission from 'config/hooks/useFetchAPIBaseOnPermission'
import useListingAPIPayload, { payloadKeyList } from 'config/hooks/useListingAPIPayload'

const addPermissionBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.permission,
    path: PATHS.permission.list,
    isSeparator: false,
    isActive: false,
  },
]
const Form = () => {
  const param = useParams()
  const dispatch = useAppDispatch()
  const navigator = useNavigate()
  const { userPermissions } = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const { isLoading, error, isSuccess, module } = useSelector((state: IRootState) => state.permissionStateData)
  const token = getUserToken();
  const payload = React.useMemo(() => {
    return {
      token,
      page: constant.page.defaultNumber
    }
  },[token])
  const permissionPayload = useListingAPIPayload(payloadKeyList.permissions, constant.page.size)
  useFetchAPIBaseOnPermission(userPermissions?.permission.list, getAllModuleAction, payload, false, module)
  const moduleOptions = module?.map((item: { title: any; name: any }) => {
    return {
      label: item.title,
      id: item.name
    }
  })

  const formik = useFormik<PermissionFormValues>({
    initialValues: {
      name: '',
      label: "",
      module: [],
      added_by: '',
      lastUpdated: '',
      updated_by_user: {id: 0, name: '', image_url: ''},
      added_by_user: {id: 0, name: '', image_url: ''},
    },
    validationSchema: PermissionValidationSchema,
    onSubmit: (formValue) => {
      if (param.id) {
        editPageHandlerSubmit(formValue.name, formValue.label, formValue?.module?.[0]?.id)
      } else {
        addPageHandlerSubmit(formValue.name, formValue.label, formValue?.module?.[0]?.id)
      }
    },
  })
  useEffect(() => {
    dispatch(permissionActions.resetState())
    return () => {
      dispatch(permissionActions.resetState())
    }
  }, [dispatch]);

  useEffect(() => {
    if (param.id && token) {
      const id = Number(param?.id);
      dispatch(getEditPermissionList({ token, id })).then(({ payload }) => {

        formik.resetForm({
          values: {
            module: payload.module ? [{ label: capitalizeFirstLetter(payload.module), id: payload?.module }] : [],
            name: payload.name || "",
            label: payload.label || "",
            lastUpdated:payload?.updated_at,
            added_by: payload?.created_by,
            created_at: payload?.created_at || "",
            updated_at: payload?.updated_at || "",
            updated_by: payload?.updated_by || "",
            added_by_user: payload?.added_by_user || "",
            updated_by_user: payload?.updated_by_user || "",
          },
        })
      })
    }
    else {
      formik.resetForm({
        values: {
          ...formik.values,
          name: "",
          label: "",
          lastUpdated: '',
          added_by: '',
        },
      })
    }

  }, [param.id, token])

  useEffect(() => {
    const spaceRegex = /\s/g;
    if (spaceRegex.test(formik.values.name)) {
      formik.setFieldValue('name', formik.values.name.replace(spaceRegex, ''))
    }
  }, [formik.values.name]);

  const editPageHandlerSubmit = (permissionName: string, label: string, module: string) => {
    const payload = {
      id: Number(param?.id),
      name: permissionName,
      label: label,
      module: formik.values.module?.[0]?.id
    }
    dispatch(editPermissionAction({ token, ...payload }))
  }

  const addPageHandlerSubmit = (permissionName: string, label: string, module: string) => {
    const payload = {
      name: permissionName,
      label: label,
      module: formik.values.module?.[0]?.id
    }
    dispatch(addPermissionAction({ token, ...payload }))
  };

  const alertMessage = (icon: 'error' | 'success' | 'warning', text: string, title: string) => {
    Message(title, icon, text).then((result) => {
      if (result.isConfirmed && icon === 'success') {
        dispatch(getPermissions(permissionPayload))
        navigator(PATHS.permission.list)
      }
      if (result.isConfirmed && icon === 'error') {
        dispatch(permissionActions.resetErrorState())
      }
    })
  }
  const successMessage = param?.id ? Strings.permissionIsSuccessfullyUpdate : Strings.permissionAddedSuccessfully;
  const handlerBlurEvent = (name: string) => {
    formik.setFieldTouched(name, true);
  };

  return (
    <>
      {error && alertMessage('error', error, Strings.permissionExists)}
      {isSuccess && alertMessage('success', successMessage, '')}
      <PageTitle path={PATHS.permission.list} breadcrumbs={addPermissionBreadcrumbs}>
        {param.id ? Strings.editPermission : Strings.addPermission}
      </PageTitle>
          <form className='form' onSubmit={formik.handleSubmit}>
        <div className='card mb-5 mb-xl-10'>
                <div id='kt_account_permission_form' className='collapse show'>
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
                    label={Strings.label}
                    name="label"
                    value={formik.values.label}
                    formilk={formik}
                    placeHolder={Strings.label} type={'text'}
                    onBlur={handlerBlurEvent}
                  />
                  <SelectInput
                    label={Strings.module}
                    name="module"
                    formik={formik}
                    options={moduleOptions}
                    onBlur={handlerBlurEvent}
                    optionTitle="label"
                    optionValue="id"
                  />
              </div>
            </div>
            </div>
            {param?.id && (
              <UpdateDetailsSection
                lastUpdateDate={formik.values?.lastUpdated || ''}
                id={formik.values?.updated_by || null}
                createdById={Number(formik.values?.added_by)}
                title={Strings.updateDetails}
                lastCreateDate={formik.values?.created_at || ''}
                createDetails={formik.values?.added_by_user}
                updateDetails={formik.values?.updated_by_user}
            />
          )}
              <Button
                type="submit"
                disabled = {formik.isSubmitting}
                isValid={formik.isValid}
                dirty={formik.dirty}
                children={param?.id ? Strings.updatePermission : Strings.addPermission}
              />
        </form>
    </>
  )
}
export default Form
