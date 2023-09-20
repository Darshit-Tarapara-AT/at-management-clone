/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useFormik} from 'formik'
import './Form.scss'
import {RolesValidationSchema} from 'app/utils/ValidationSchema'
import {useSelector} from 'react-redux'
import {RolesFormValues} from 'app/Modal/Modal'
import {useNavigate} from 'react-router-dom'
import {roleActions} from 'app/redux/RoleSlice/RoleSlice'
import {Loader} from 'app/Components/Loader/Loader'
import {Strings} from 'app/resource/Strings'
import {PageLink, PageTitle} from '_metronic/layout/core'
import {IRootState, useAppDispatch} from 'app/redux/store'
import {getAllModuleAction, getPermissions} from 'app/redux/PermissionSlice/PermissionAyscThunk'
import {getUserToken} from 'services/AuthServices'
import {addRoleAction,editRoleAction,getIndividualUserAssignPermissions} from 'app/redux/RoleSlice/RoleAyscThunk'
import {Message} from 'app/utils/AlertMessage'
import {selectAllCheckbox} from 'app/utils/helper'
import {CustomInput} from '_metronic/helpers/components/Input/Input'
import {RadioInput} from 'app/Components/RatioInput/RatioInput'
import Button from 'app/Components/Button/Button'
import MultiSelectCheckBox from 'app/Components/MultiSelectCheckBox/MultiSelectCheckBox'
import {FormikKeys} from 'app/Components/TextArea'
import UpdateDetailsSection from 'app/Components/UpadateDetailSection'
import { PATHS } from 'config/paths/paths';
import constant from 'config/const/const';
import useFetchAPIBaseOnPermission from 'config/hooks/useFetchAPIBaseOnPermission'
import useListingAPIPayload, { payloadKeyList } from 'config/hooks/useListingAPIPayload'

const addRoleBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.roles,
    path: PATHS.role.list,
    isSeparator: false,
    isActive: false,
  },
]

const Form = () => {
  const param = useParams()
  const dispatch = useAppDispatch()
  const navigator = useNavigate()
  const {
    list: permissionList,
    isLoading,
    module,
    total
  } = useSelector((state: any) => state.permissionStateData)
  const {
  userPermissions
  } = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const userToken = getUserToken()

  const {error, isSuccess} = useSelector((state: IRootState) => state.roleStateData)
  const permissionPayload = useListingAPIPayload(payloadKeyList.permissions, constant.page.maxSize)
  useFetchAPIBaseOnPermission<{page: number; token: string }>(userPermissions?.role?.add, getAllModuleAction, {token: userToken, page: constant.page.defaultNumber},false, module, 10);
  useFetchAPIBaseOnPermission<{page: number; token: string }>(userPermissions?.permission?.list, getPermissions, permissionPayload,false, permissionList, 10);
  const defaultRoleOptions = [
    {
      value:  constant.page.role.defaultRole + "",  
      label: Strings.no
    },
    {
      value:constant.page.role.selectRoleOption + "",
      label: Strings.yes
    }
  ]
  const permissions = React.useMemo(() => {
    const permissionJson: FormikKeys = {}
    if(module) {
      Object.values(permissionList).forEach((value: any) => {
        const findModuleTitle = module?.find((item: any) => item?.name === value?.module)
        let moduleName = findModuleTitle?.title as string
        let permission = value?.label
        permission = permission
        const id = value?.id
        permissionJson[moduleName] = {
          ...permissionJson[moduleName],
          [permission]: id,
        }
      })
    }
    return permissionJson
  }, [permissionList, module])
 console.log("permission", permissions);
 
  const formik = useFormik<RolesFormValues>({
    initialValues: {
      name: '',
      defaultRole: constant.page.role.defaultRole.toString(),
      label: "",
      assignPermissions: [],
      added_by: '',
      lastUpdated: '',
      updated_by_user: {id: 0, name: '', image_url: ''},
      added_by_user: {id: 0, name: '', image_url: ''},
    },
    validationSchema: RolesValidationSchema,
    onSubmit: (formValue) => {
      if (param.id) {
        editPageHandlerSubmit(formValue)
      } else {
        addPageHandlerSubmit(formValue)
      }
    },
  })

  useEffect(() => {
    dispatch(roleActions.resetState())
    return () => {
      dispatch(roleActions.resetState())
    }
  }, [userToken, dispatch])

  useEffect(() => {
    if (param.id && userToken) {
      const id = Number(param?.id)
      dispatch(getIndividualUserAssignPermissions({token: userToken, id})).then((res) => {
        formik.resetForm({
          values: {
            defaultRole: res.payload.default_role,
            name: res.payload.name || '',
            assignPermissions: res.payload.permissionId || [],
            label: res.payload.label || '',
            lastUpdated:res.payload?.updated_at,
            added_by:  res.payload?.added_by ||"",
            created_at: res.payload?.created_at || "",
            updated_at: res.payload?.updated_at || "",
            updated_by: res.payload?.updated_by || "",
            added_by_user: res.payload?.added_by_user || "",
            updated_by_user: res.payload?.updated_by_user || "",
          },
        })
      })
    } else {
      formik.resetForm({
        values: {
          name: '',
          defaultRole: constant.page.role.defaultRole.toString(),
          label: "",
          assignPermissions: [],
          lastUpdated:'',
          added_by: '',
          updated_by_user: {id: 0, name: '', image_url: ''},
          added_by_user: {id: 0, name: '', image_url: ''},
        },
      })
    }
  }, [param.id, userToken])
  useEffect(() => {
    const spaceRegex = /\s/g
    if (spaceRegex.test(formik.values.name)) {
      formik.setFieldValue('name', formik.values.name.replace(spaceRegex, ''))
    }
  }, [formik.values.name])

  const editPageHandlerSubmit = (formValues: RolesFormValues) => {
    const payload = {
      id: Number(param?.id),
      token: userToken,
      name: formValues.name,
      permissions: formValues.assignPermissions,
      default_role: formValues.defaultRole,
      label: formValues.label,
    }
    dispatch(editRoleAction(payload))
  }

  const addPageHandlerSubmit = (formValues: RolesFormValues) => {
    const payload = {
      token: userToken,
      name: formValues.name,
      permissions: formValues.assignPermissions,
      default_role: formValues.defaultRole,
      label: formValues.label,
    }
    dispatch(addRoleAction(payload))
  }

  const alertMessage = (icon: 'error' | 'success' | 'warning', text: string, title: string) => {
    Message(title, icon, text).then((result) => {
      if (result.isConfirmed && icon === 'success') {
        navigator(PATHS.role.list)
        window.location.reload();
      }
      if (result.isConfirmed && icon === 'error') {
        dispatch(roleActions.resetErrorState())
      }
    })
  }
  const selectAllCheckboxHandler = (isChecked: boolean) => {
    const selectAll = selectAllCheckbox(isChecked, permissionList)
    formik.setFieldValue('assignPermissions', selectAll)
  }

  const successMessage = param?.id ? Strings.roleUpdateSuccessfully : Strings.roleIsAddSuccessfully
  const handlerBlurEvent = (name: string) => {
    formik.setFieldTouched(name, true)
  }
  return (
    <>
      {error && alertMessage('error', error, Strings.roleExists)}
      {isSuccess && alertMessage('success', successMessage, '')}
      <PageTitle path= {PATHS.role.list} breadcrumbs={addRoleBreadcrumbs}>
        {param.id ? Strings.editRole : Strings.addRole}
      </PageTitle>
      {isLoading && permissionList.length === 0 ? <Loader /> : (<div id='kt_account_roles_form' className='collapse show'>
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
                label={Strings.label}
                name="label"
                value={formik.values.label}
                formilk={formik}
                placeHolder={Strings.label} type={'text'}
                onBlur={handlerBlurEvent}
              />

              <MultiSelectCheckBox
                label={Strings.assignPermissions}
                name="assignPermissions"
                labelTitle ={Strings.assignPermissions}
                formik={formik}
                onSelectAllCheckbox={selectAllCheckboxHandler}
                isAllChecked={formik.values.assignPermissions.length === permissionList?.length}
                allSelectedLabel={Strings.selectAll}
                list={permissions}
                />

              <div style={{ marginTop: "-50px" }}>
                <RadioInput
                  formik={formik}
                  name="defaultRole"
                  label={Strings.isThisDefaultRole}
                  options={defaultRoleOptions}
                  value={formik.values.defaultRole.toString()}
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
              type='submit'
              disabled = {formik.isSubmitting}
              isValid={formik.isValid}
              dirty={formik.dirty}
              children={param?.id ? Strings.updateRole : Strings.addRole}
            />
          </form>
        </div>
      )}
    </>
  )
}
export default Form
