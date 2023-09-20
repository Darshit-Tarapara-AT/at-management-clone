/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigate, useParams} from 'react-router-dom'
import {useFormik} from 'formik'
import './Form.scss'
import {CredentialsValidationSchema} from 'app/utils/ValidationSchema'
import {useSelector} from 'react-redux'
import {CredentialsFormValues} from 'app/Modal/Modal'
import {Loader} from 'app/Components/Loader/Loader'
import {Strings} from 'app/resource/Strings'
import {PageLink, PageTitle} from '_metronic/layout/core'
import {IRootState, useAppDispatch} from 'app/redux/store'
import {getUserToken} from 'services/AuthServices'
import {capitalizeFirstLetter, formatSelectOptionId} from 'app/utils/helper'
import {CustomInput} from '_metronic/helpers/components/Input/Input'
import Button from 'app/Components/Button/Button'
import SelectInput from 'app/Components/SelectInput/SelectInput'
import {addCredentialAction, editCredentialAction, getIndividualCredentialAction} from 'app/redux/CredentialSlice/CredentialAyscThunk'
import {TextArea} from 'app/Components/TextArea/TextArea'
import { Message } from 'app/utils/AlertMessage'
import { PATHS } from 'config/paths/paths'
import UpdateDetailsSection from 'app/Components/UpadateDetailSection'
import { useEffect, useState } from 'react'
import moment from 'moment'
import CredentialTextEditor from 'app/Components/CredentialTextEditor/CredentialTextEditor'

const addCredentialBreadcrumbs: Array<PageLink> = [
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
    isActive: false,
  },
]
const Form = () => {
  const param = useParams()
  const [lastUpdatedId, setLastUpdatedId] = useState<CredentialsFormValues>({} as CredentialsFormValues)

  const dispatch = useAppDispatch()
  const {list: permissionList, isLoading} = useSelector((state: any) => state.permissionStateData)
  const userToken = getUserToken()
  const navigator = useNavigate()
  const {list: roleList} = useSelector((state: IRootState) => state.roleStateData)
  const {list: userList} = useSelector((state: IRootState) => state.UserStateData)
  const {list: clientList} = useSelector((state: IRootState) => state.ClientStateData)
  const {list: projectList} = useSelector((state: IRootState) => state.ProjectStateData)

  const formik = useFormik<CredentialsFormValues>({
    initialValues: {
      name: '',
      user: [],
      role: [],
      client: [],
      credentialDetail: '',
      project: [],
      created_at: '',
      updated_at: '',
      added_by: '',
      updated_by: null,
      lastUpdated: '',
      updated_by_user: {id: 0, name: '', image_url: ''},
      added_by_user: {id: 0, name: '', image_url: ''},
    },
    validationSchema: CredentialsValidationSchema,
    onSubmit: (formValue) => {
      if (param?.id){
        editPageHandlerSubmit(formValue)
      }else(
        addPageHandlerSubmit(formValue)
      )
    },
  })
  const userRoles = roleList?.map((item) => {
    return {
      id: item.id?.toString(),
      label: item.label,
    }
  })
  const users = userList?.map((item) => {
    return {
      id: item.id?.toString(),
      label: item?.name,
    }
  })
  const client = clientList?.map((item) => {
    return {
      id: item.id?.toString(),
      label: item?.name,
    }
  })
  const project = projectList?.map((item) => {
    return {
      id: item.id?.toString(),
      label: item?.name,
    }
  })

  const getData= (data: any[], idKey:string ) => {
    return data?.map((item) => {
      return {
        id: item[idKey]?.toString(),
        label: item.name,
      }
    })
    }

  useEffect(() => {
  if (param.id && userToken) {
      const id = Number(param?.id);
      dispatch(getIndividualCredentialAction({ token: userToken, id })).then((res) => {
        setLastUpdatedId(res?.payload?.lastUpdatedUserId)
        formik.resetForm({
          values: {
            name: res.payload.name || '',
            user: getData(res.payload.user, 'user_id') ,
            client: getData(res.payload.client, 'client_id') ,
            role: getData(res.payload.role, 'role_id') ,
            project: getData(res.payload.project, 'project_id'),
            credentialDetail: res.payload.description || '' ,
            lastUpdated:(res.payload?.updated_at),
            added_by: res.payload?.created_by,
            created_at: res.payload?.created_at || "",
            updated_at: res.payload?.updated_at || "",
            updated_by: res.payload?.updated_by || "",
            added_by_user: res.payload?.added_by_user || "",
            updated_by_user: res.payload?.updated_by_user || "",
          },
        })
      })
    }
    else {
      formik.resetForm({
        values: {
          name: '',
          user: [],
          role: [],
          client: [],
          project: [],
          credentialDetail: '',
          lastUpdated: '',
          added_by: '',
          added_by_user: { id: 0, name: '', image_url: ''},
          updated_by_user: { id: 0, name: '', image_url: ''}
        },
      })
    }
  }, [param.id, userToken]);

  const editPageHandlerSubmit = (formValues: CredentialsFormValues) => {
    const payload = {
      id: Number(param?.id),
      token: userToken,
      name: formValues.name,
      client_ids: formatSelectOptionId(formValues.client),
      role_ids: formatSelectOptionId(formValues.role),
      user_ids: formatSelectOptionId(formValues.user),
      project_ids:formatSelectOptionId(formValues.project),
      description: formValues.credentialDetail,
    }
    dispatch(editCredentialAction(payload)).then((response)=>{
      if(response.payload){
        alertMessage("success",Strings.credentialEditedSuccessfully,"");
      }
    })
  }
  const addPageHandlerSubmit = (formValues: CredentialsFormValues) => {
    const payload = {
      token: userToken,
      name: formValues.name,
      client_ids: formatSelectOptionId(formValues.client),
      role_ids: formatSelectOptionId(formValues.role),
      user_ids: formatSelectOptionId(formValues.user),
      project_ids:formatSelectOptionId(formValues.project),
      description: formValues.credentialDetail,
    }
    dispatch(addCredentialAction(payload)).then((response)=>{
      if(response.payload){
        alertMessage("success", Strings.credentialAddedSuccessfully, "");
      }
    })
  }
  const handlerBlurEvent = (name: string) => {
    formik.setFieldTouched(name, true)
  }

  const handlerBlurDetailEvent = (credentialDetail: string) => {
    formik.setFieldTouched(credentialDetail, true)
  }
  const alertMessage = (icon: 'error' | 'success' | 'warning', text: string, title: string) => {
    Message(title, icon, text).then((result) => {
      if (result.isConfirmed && icon === 'success') {
        navigator(PATHS.credential.list);

      }
      if (result.isConfirmed && icon === 'error') {
      }
    })
  }
  return (
    <>
      <PageTitle path ={PATHS.credential.list} breadcrumbs={addCredentialBreadcrumbs}>
        {param.id ? Strings.editCredentials : Strings.addCredentials}
      </PageTitle>

      {isLoading && permissionList.length === 0 ? (
        <Loader />
      ) : (
        <form className='form' onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <div className='card mb-5 mb-xl-10'>
            <div className='card-body border-0 p-9'>
              <CustomInput
                label={Strings.name}
                name='name'
                formilk={formik}
                value={formik.values.name}
                placeHolder={Strings.enterName}
                type={'text'}
                onBlur={handlerBlurEvent}
              />
              <SelectInput
                label={Strings.user}
                name='user'
                isRequired={false}
                formik={formik}
                isMulti={true}
                onBlur={handlerBlurEvent}
                optionTitle={'label'}
                optionValue={'id'}
                options={users}
              />
              <SelectInput
                label={Strings.role}
                name='role'
                isRequired={false}
                formik={formik}
                isMulti={true}
                onBlur={handlerBlurEvent}
                optionTitle={'label'}
                optionValue={'id'}
                options={userRoles}
              />
              <SelectInput
                label={Strings.client}
                name='client'
                isRequired={false}
                formik={formik}
                isMulti={true}
                onBlur={handlerBlurEvent}
                optionTitle={'label'}
                optionValue={'id'}
                options={client}
              />
              <SelectInput
                label={Strings.project}
                name='project'
                isRequired={false}
                formik={formik}
                isMulti={true}
                onBlur={handlerBlurEvent}
                optionTitle={'label'}
                optionValue={'id'}
                options={project}
              />
              <CredentialTextEditor formik={formik} label={Strings.credentialDetail} name='credentialDetail' />
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
            isValid={formik.isValid}
            dirty={formik.dirty}
            disabled = {formik.isSubmitting}
            isCancelButtonRequired={true}
            children={param?.id ? Strings.updateCredential: Strings.addCredentials}
          />
        </form>
      )}
    </>
  )
}
export default Form
