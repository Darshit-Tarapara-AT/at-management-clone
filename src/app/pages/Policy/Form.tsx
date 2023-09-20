/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import './Form.scss'
import { PolicyFormValues } from 'app/Modal/Modal'
import { Strings } from 'app/resource/Strings'
import { policyActions } from 'app/redux/PolicySlice/PolicySlice'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { PolicyValidationSchema } from 'app/utils/ValidationSchema'
import PolicyTextEditor from 'app/Components/PolicyTextEditor/PolicyTextEditor'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { Message } from 'app/utils/AlertMessage'
import {
  addPolicyAction,
  editPolicyAction,
  getIndividualPolicyAction,
  getUnreadPolicyAction,
} from 'app/redux/PolicySlice/PolicyAyscThunk'
import { getUserToken } from 'services/AuthServices'
import { capitalizeFirstLetter, selectAllCheckbox, setSelectInputOptions } from 'app/utils/helper'
import { CustomInput } from '_metronic/helpers/components/Input/Input'
import SelectInput from 'app/Components/SelectInput/SelectInput'
import MultiSelectCheckBox from 'app/Components/MultiSelectCheckBox/MultiSelectCheckBox'
import Button from 'app/Components/Button/Button'
import filterPolicy from 'app/assets/data/policy.json'
import { getUserProfileActions } from 'app/redux/UserSlice/UserAyscThunk'
import { getRoles } from 'app/redux/RoleSlice/RoleAyscThunk'
import UpdateDetailsSection from 'app/Components/UpadateDetailSection'
import moment from 'moment'
import { PATHS } from 'config/paths/paths';
import constant from 'config/const/const';
import { FormikKeys } from 'app/Components/TextArea'
const policyBreadcrumbs: Array<PageLink> = [
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

const Form = () => {
  const param = useParams()
  const dispatch = useAppDispatch()
  const token = getUserToken()
  const navigator = useNavigate()
  const [lastUpdatedId, setLastUpdatedId] = useState()
  const { error, isSuccess } = useSelector((state: IRootState) => state.PolicyStateData)
  const { list: roleList } = useSelector((state: IRootState) => state.roleStateData)
  const { list: permissionList, module } = useSelector((state: IRootState) => state.permissionStateData)
  const { currentUserProfileDetails} = useSelector((state: IRootState) => state.UserStateData)
  const formik = useFormik<PolicyFormValues>({
    initialValues: {
      title: '',
      description: '',
      status: [],
      policyRole: [],
      lastUpdated: '',
      created_by: '',
      updated_by_user: {id: 0, name: '', image_url: ''},
      added_by_user: {id: 0, name: '', image_url: ''}
    },
    validationSchema: PolicyValidationSchema,
    onSubmit: (formValue) => {
      if (param.id) {
        editPageHandlerSubmit(formValue)
      } else {
        addPageHandlerSubmit(formValue)
      }
    },
  })
  useEffect(() => {
    dispatch(policyActions.resetState())
    dispatch(policyActions.resetErrorState())

    if (token) {
      dispatch(getRoles({ token, page: constant.page.defaultNumber, size: constant.page.role.allRolePageSize }))
    }
    return () => {
      dispatch(policyActions.resetState())
      dispatch(policyActions.resetErrorState())
    }
  }, [token])
  const roles = React.useMemo(() => {
    const rolesJson: FormikKeys = {
      allRoles: {}
    }
    Object.values(roleList).forEach((value: any) => {
      const id = value?.id;
      rolesJson["allRoles"] = {
        ...rolesJson["allRoles"],
        [value?.label]: id
      }
    })
    return rolesJson
  }, [roleList, module])


  useEffect(() => {
    if (param.id && token) {
      const id = Number(param?.id)
      dispatch(getIndividualPolicyAction({ token, id })).then((res) => {
        setLastUpdatedId(res?.payload?.lastUpdatedUserId)
        formik.resetForm({
          values: {
            title: res.payload.title || '',
            description: res.payload.description || '',
            status:
              [{ id: res.payload.status, label: capitalizeFirstLetter(res.payload.status) }] || '',
            policyRole: res.payload.policyRolesId || [],
            lastUpdated: moment(res.payload?.updated_at).format('DD-MM-YYYY hh-mm-ss A'),
            created_by: res.payload?.created_by || "",
            created_at: res.payload?.created_at || "",
            updated_at: res.payload?.updated_at || "",
            updated_by: res.payload?.updated_by || "",
            added_by_user: res.payload?.added_by_user,
            updated_by_user: res.payload?.updated_by_user,
          },
        })
      })
    } else {
      formik.resetForm({
        values: {
          title: '',
          description: '',
          status: [{ id: 'active', label: Strings.active }],
          policyRole: [],
          lastUpdated: '',
          created_by: '',
        },
      })
    }
  }, [param.id, token])

  const editPageHandlerSubmit = (formValue: PolicyFormValues) => {
    const payload = {
      id: Number(param?.id),
      token,
      item: {
        title: formValue.title,
        description: formValue.description,
        status: formValue.status?.[0].id?.toString(),
        policy_roles: formValue.policyRole,
      },
    }
    dispatch(editPolicyAction(payload)).then((res) => {
      const data = res.payload as { status: boolean | undefined; message: string }
      if (data.status) {
        alertMessage('success', Strings.policyISuccessfullyUpdate, '')
      } else {
        alertMessage('error', data.message, '')
      }
    })
  }

  const addPageHandlerSubmit = (formValue: PolicyFormValues) => {
    const payload = {
      token,
      item: {
        title: formValue.title,
        description: formValue.description,
        status: formValue.status?.[0].id?.toString(),
        policy_roles: formValue.policyRole,
        added_by_user: formValue.added_by_user,
          updated_by_user: formValue.updated_by_user,
      },
    }
    dispatch(addPolicyAction(payload))
  }

  const alertMessage = (icon: 'error' | 'success' | 'warning', text: string, title: string) => {
    Message(title, icon, text).then((result) => {
      if (result.isConfirmed && icon === 'success') {
        dispatch(
          getUnreadPolicyAction({
            token,
            page: constant.page.defaultNumber,
            size: constant.page.size,
            role: currentUserProfileDetails?.role_id?.name,
            status: "active",
          })
        )
        navigator(PATHS.policy.list)
        dispatch(getUserProfileActions(token))
      }
      if (result.isConfirmed && icon === 'error') {
        dispatch(policyActions.resetErrorState())
      }
    })
  }
  const successMessage = param?.id
    ? Strings.policyISuccessfullyUpdate
    : Strings.policyAddedSuccessfully
  const selectAllCheckboxHandler = (checked: boolean): void => {
    const selectAll = selectAllCheckbox(checked, roleList)
    formik.setFieldValue('policyRole', selectAll)
  }
  const handlerBlurEvent = (name: string) => {
    formik.setFieldTouched(name, true)
  }

  return (
    <>
      {error && alertMessage('error', error, successMessage)}
      {isSuccess && alertMessage('success', Strings.policyAddedSuccessfully, '')}

      <PageTitle breadcrumbs={policyBreadcrumbs}>
        {param.id ? Strings.editPolicy : Strings.addPolicy}
      </PageTitle>
      <div id='kt_account_address_form' className='collapse show'>
        <form className='form' onSubmit={formik.handleSubmit}>
          <div className='card mb-5 mb-xl-10'>
            <div className='card-body border-0 p-9'>
              <CustomInput
                label={Strings.title}
                name='title'
                formilk={formik}
                value={formik.values.title}
                placeHolder={Strings.title}
                type={'text'}
                onBlur={handlerBlurEvent}
              />
              <PolicyTextEditor formik={formik} label={Strings.description} name='description' />
              <SelectInput
                name='status'
                label={Strings.status}
                isClearable={false}
                formik={formik}
                options={setSelectInputOptions(filterPolicy.policy['status'])}
                onBlur={handlerBlurEvent}
                optionTitle='name'
                optionValue='id'
              />
              <MultiSelectCheckBox
                label={Strings.policyRole}
                name='policyRole'
                formik={formik}
                onSelectAllCheckbox={selectAllCheckboxHandler}
                isAllChecked={formik.values.policyRole.length === roleList?.length}
                allSelectedLabel={Strings.selectAll}
                list={roles}
              />
            </div>
          </div>
          {param?.id && (formik.values.updated_by || formik.values.created_by) && (
            <UpdateDetailsSection
              lastUpdateDate={formik.values?.updated_at || ''}
              lastCreateDate={formik.values?.created_at || ''}
              id={formik.values?.updated_by || null}
              createdById={Number(formik.values?.created_by)}
              title={Strings.updateDetails}
              createDetails={formik.values.added_by_user}
              updateDetails={formik.values.updated_by_user}
            />
          )}
          <Button
            type='submit'
            isValid={formik.isValid}
            disabled={formik.isSubmitting}
            dirty={formik.dirty}
            children={param?.id ? Strings.updatePolicy : Strings.addPolicy}
          />
        </form>
      </div>
    </>
  )
}
export default Form
