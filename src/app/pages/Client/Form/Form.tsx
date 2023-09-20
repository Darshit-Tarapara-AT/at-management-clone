/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react';
import './Form.scss';
import { ClientFormValues } from '../Components/Modal/Modal'
import PersonalDetails from '../Components/Steps/PersonalDetails/PersonalDetails';
import { Strings } from 'app/resource/Strings';
import ContactDetails from '../Components/Steps/ContactDetails/ContactDetails';
import { useNavigate, useParams } from 'react-router-dom';
import { PageLink, PageTitle } from '_metronic/layout/core';
import stateJson from 'app/assets/data/state.json'
import { editClientAction } from 'app/redux/ClientsSlice/ClientsAyscThunk';
import { capitalizeFirstLetter, setSelectInputOptions } from 'app/utils/helper';
import { ClientFormValidation } from 'app/utils/ValidationSchema';
import { IRootState, useAppDispatch } from 'app/redux/store';
import { LeadActions } from 'app/redux/LeadSlice/LeadSlice';
import { Message } from 'app/utils/AlertMessage';
import { useSelector } from 'react-redux';
import { Loader } from 'app/Components/Loader/Loader';
import leadData from 'app/assets/data/lead.json';
import Button from 'app/Components/Button/Button';
import ClientStatus from '../Components/Steps/ClientStatus/ClientStatus';
import { clientInitalValue as clientInitialValue } from 'app/FormikIntialValues/FormikIntialValues';
import { getIndividualClientAction } from 'app/redux/ClientsSlice/ClientsAyscThunk';
import { getUserToken } from 'services/AuthServices';
import moment from 'moment';
import UpdateDetailsSection from 'app/Components/UpadateDetailSection';
import { PATHS } from 'config/paths/paths';
const addClientsBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: '/dashboard',
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
const selectClientStatusOptions = [
  {
    value: Strings.cancelled.toLocaleLowerCase(),
    label: Strings.cancelled
  },
  {
    value: Strings.confirmed.toLocaleLowerCase(),
    label: Strings.confirmed
  }
]
const Form = () => {
  const token = getUserToken()
  const [initialFormState, setInitalFormState] = useState();
  const [error, setError] = useState<string>('')
  const { isLoading } = useSelector((state: IRootState) => state.ClientStateData);
  const param = useParams();
  const navigator = useNavigate();
  const LEAD_STATUS_KEY = "lead.status";
  const leadStatusOptions = leadData[LEAD_STATUS_KEY];
  const stateOptions = [...stateJson]
  const dispatch = useAppDispatch();
  const formik = useFormik<ClientFormValues>({
    initialValues: {
      ...clientInitialValue
    },
    validationSchema: ClientFormValidation,
    onSubmit: (formValue) => {
      if (param.id) {
        editPageHandlerSubmit(formValue);
      }
    },
  })

  const convertStringToArray = (value: string) => {
    return (
      [{
        id: value,
        label: capitalizeFirstLetter(value)
      }]
    )
  }
  useEffect(() => {
    setError("");
  }, [])
  const resetFormValues = (formValues: any) => {
    formik.resetForm({
      values: {
        ...formik.values,
        name: formValues?.name || "",
        email: formValues?.email || "",
        company_name: formValues?.company_name || "",
        website: formValues?.website || "",
        phone: formValues?.phone || "",
        account: convertStringToArray(formValues?.account),
        position: convertStringToArray(formValues?.position),
        mode_of_contacts: convertStringToArray(formValues.lead_regular_contact_source),
        mobile: formValues?.mobile || "",
        skype_id: formValues?.skype_id || "",
        created_at: formValues?.created_at || "",
        created_by: formValues?.added_by || "",
        updated_at: formValues?.updated_at || "",
        updated_by: formValues?.updated_by || "",
        linkedin_url: formValues?.linkedin_url || "",
        last_update_date: formValues.updated_at,
        lead_status: formValues?.lead_status || '',
        address: formValues?.address || "",
        area: formValues?.area || "",
        country: formValues?.country ? convertStringToArray(formValues.country) : [],
        state: formValues?.state || "",
        city: formValues?.city || "",
        lastUpdateDate: moment(formValues?.updated_at)?.format("DD-MM-YYYY hh:mm:ss A") || '',
        frontend_added_by: formValues?.frontend_added_by,
        added_by: formValues?.added_by_username || "",
        postal_code: formValues?.postal_code || "",
        comments: formValues?.comments || "",
        added_date: formValues.added_date ? formValues.added_date : "",
        added_by_user: formValues?.added_by_user || "",
        updated_by_user: formValues?.updated_by_user || "",
      }
    })
  }

  useEffect(() => {
    if (param.id) {
      const id = Number(param?.id);
      dispatch(getIndividualClientAction({ token, id })).then((res) => {
        const formValues = res.payload as any
        if (formValues) {
          setInitalFormState(formValues)
          resetFormValues(formValues);
        } else {
          setError(Strings.clientDetailsNotFound)
        }
      })
    }

  }, [param.id])

  const editPageHandlerSubmit = (formValue: ClientFormValues) => {
    const APIPayload = {
      id: Number(param.id),
      token,
      items: {
        name: formValue.name,
        email: formValue.email,
        company_name: formValue.company_name,
        website: formValue.website,
        account: formValue.account?.[0].id,
        position: formValue.position?.[0].id,
        phone: formValue.phone,
        mobile: formValue.mobile,
        skype_id: formValue.skype_id,
        linkedin_url: formValue.linkedin_url,
        lead_status: formValue.lead_status,
        address: formValue.address,
        area: formValue.area,
        country: formValue.country.length > 0 ? formValue.country?.[0].label : "",
        state: formValue.state,
        city: formValue.city,
        postal_code: formValue.postal_code,
        frontend_added_by: formValue.frontend_added_by,
        comments: formValue.comments,
        added_date: formValue.added_date,
        lead_regular_contact_source: formValue.mode_of_contacts?.[0].id,
      }
    }
    dispatch(editClientAction(APIPayload)).then((res) => {
      const data = res.payload as { status: boolean | undefined, message: string }
      if (data.status) {
        alertMessage("success", Strings.clientUpdateSuccessfully, '')
      }
      else {
        alertMessage("error", data.message, '')
      }
    })
  }

  const alertMessage = (icon: 'error' | 'success' | 'warning', text: string, title: string) => {
    Message(title, icon, text).then((result) => {
      if (result.isConfirmed && icon === 'success') {
        navigator(PATHS.client.list)
      }
      if (result.isConfirmed && icon === 'error') {
        dispatch(LeadActions.resetErrorState());
      }
    })
  }

  const handlerBlurEvent = (name: string) => {
    formik.setFieldTouched(name, true);
  };

  if (error) {
    navigator("*")
  }
  return (
    <>
      {isLoading ? <Loader /> : (
        <>
          <PageTitle breadcrumbs={addClientsBreadcrumbs} path="/clients" >{Strings.editClients}</PageTitle>
          <form className='form' onSubmit={formik.handleSubmit}>
            <PersonalDetails
              formik={formik}
              name="name"
              email="email"
              companyName="company_name"
              website='website'
              handlerBlurEvent={handlerBlurEvent}
              phone="phone"
              mobile="mobile"
              skypeId="skype_id"
              leadStatusOptions={setSelectInputOptions(leadStatusOptions)}
              reason="reason"
              lastContactDate="last_contact_date"
              leadStatusDate="lead_select_date"
              note="note"
              linkedinUrl="linkedin_url"
              leadStatus="lead_status"
            />
            <ClientStatus
              selectClientStatusOptions={selectClientStatusOptions}
              formik={formik}
              status={"status"}
              addedBy="added_by"
              modeOfContact="mode_of_contacts"
              addedDate="addedDate"
              lastUpdatedDate="lastUpdatedDate"
              handlerBlurEvent={handlerBlurEvent}
            />

            <ContactDetails
              formik={formik}
              address='address'
              addBy="added_by"
              area='area'
              state='state'
              handlerBlurEvent={handlerBlurEvent}
              country="country"
              city='city'
              firstContactSourceOptions={setSelectInputOptions(leadData["lead.firstContactSource"])}
              comments="comments"
              firstContactSource="first_contact_source"
              postalCode='postal_code'
              addedDate="added_date"
              leadType="lead_type"
              status="status"
              stateOptions={stateOptions}
            />
            {param?.id && (formik.values.updated_by || formik.values.created_by) && (
              <UpdateDetailsSection
                title={Strings.updateDetails}
                id={formik.values.updated_by || null}
                lastUpdateDate={formik.values.updated_at || ''}
                createdById={Number(formik.values.created_by)}
                lastCreateDate={formik.values.created_at || ''}
                createDetails={formik.values.added_by_user}
                updateDetails={formik.values.updated_by_user}
              />
            )}
            <Button  disabled = {formik.isSubmitting} isCancelButtonRequired={true} onReset={() => resetFormValues(initialFormState)} isValid={formik.isValid} dirty={formik.dirty}>{Strings.update}</Button>
          </form>
        </>
      )}
    </>
  )
}
export default Form;
