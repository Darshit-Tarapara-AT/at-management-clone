/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import './Form.scss'
import { LeadFormValues } from '../Components/Modal/Modal'
import PersonalDetails from '../Components/Steps/PersonalDetails/PersonalDetails'
import { Strings } from 'app/resource/Strings'
import ContactDetails from '../Components/Steps/ContactDetails/ContactDetails'
import { useNavigate, useParams } from 'react-router-dom'
import { PageLink, PageTitle } from '_metronic/layout/core'
import stateJson from 'app/assets/data/state.json'
import {
  capitalizeFirstLetter,
  convertDateObjectToString,
  setSelectInputOptions,
} from 'app/utils/helper'
import LeadInformationForm from '../Components/Steps/LeadInformation/LeadInformation'
import { LeadFormValidationSchema } from 'app/utils/ValidationSchema'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { LeadActions } from 'app/redux/LeadSlice/LeadSlice'
import { Message } from 'app/utils/AlertMessage'
import leadData from 'app/assets/data/lead.json'
import Button from 'app/Components/Button/Button'
import { leadFormikInitalValues as leadFormikInitialValues } from 'app/FormikIntialValues/FormikIntialValues'
import {
  addLeadAction,
  editLeadAction,
  getAllLeadsAction,
  getIndividualLeadAction,
} from 'app/redux/LeadSlice/LeadAyscThunk'
import { getUserToken } from 'services/AuthServices'
import { LeadInformation } from 'app/redux/LeadSlice/LeadTypes'
import { useSelector } from 'react-redux'
import { Loader } from 'app/Components/Loader/Loader'
import moment from 'moment'
import { PATHS } from 'config/paths/paths'
import UpdateDetailsSection from 'app/Components/UpadateDetailSection'
import constant from 'config/const/const'

const addLeadBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.lead,
    path: PATHS.lead.list,
    isSeparator: false,
    isActive: false,
  },
]
const Form = () => {
  const token = getUserToken()
  const param = useParams()
  const navigator = useNavigate()
  const { isLoading } = useSelector((state: IRootState) => state.LeadStateData)
  const LEAD_STATUS_KEY = 'lead.status'
  const leadStatusOptions = leadData[LEAD_STATUS_KEY]
  const stateOptions = [...stateJson]
  const dispatch = useAppDispatch()

  const formik = useFormik<LeadFormValues>({
    initialValues: {
      ...leadFormikInitialValues,
      created_at: "",
    },
    validationSchema: LeadFormValidationSchema,
    onSubmit: (formValue: LeadFormValues) => {
      if (param.id) {
        editPageHandlerSubmit(formValue)
      } else {
        addPageHandlerSubmit(formValue)
      }
    },
  })


  useEffect(() => {
    if (param.id) {
      const id = Number(param?.id)
      dispatch(getIndividualLeadAction({ token, id })).then((res) => {
        const formValue = res.payload as LeadInformation;
        if (res.payload) {
          formik.resetForm({
            values: {
              ...formik.values,
              updatedBy: formValue.updated_by || null,
              createdAt: formValue.created_at || '',
              createdBy: formValue.added_by || null,
              updatedAt: formValue.updated_at || "",
              deadLineReminder: formValue.deadline_reminder ? new Date(formValue.deadline_reminder) : '',
              contactEmailValue: '',
              updated_at: moment(formValue?.updated_at)?.format("DD-MM-YYYY hh:mm:ss A") || '',
              account: [{ id: formValue.account, label: formValue.account }],
              position: [{ id: formValue.position, label: formValue.position }],
              email: formValue.email || "",
              name: formValue.name || '',
              company_name: formValue.company_name || '',
              website: formValue.website || '',
              deadLineDate: formValue.deadline_reminder ? moment(new Date(formValue.deadline_reminder)).format("YYYY-MM-DD") :"",
              deadLineTime: formValue.deadline_reminder? new Date(formValue.deadline_reminder) : new Date(),
              phone: formValue.phone || '',
              mobile: formValue.mobile || '',
              skype_id: formValue.skype_id || '',
              linkedin_url: formValue.linkedin_url || '',
              address: formValue.address || '',
              area: formValue.area || '',
              state: formValue.state || '',
              city: formValue.city || '',
              created_at: formValue.created_at,
              postal_code: formValue.postal_code || '',
              comments: formValue.comments || '',
              lead_title: formValue.lead_title || '',
              lead_description: formValue.lead_description || '',
              given_price: formValue.given_price || '',
              reason: formValue.reason || '',
              note: formValue.note || '',
              contact_url: formValue.contact_url || '',
              lead_contact_email: formValue.lead_contact_email?.split(',') || [],
              added_by_user: formValue?.added_by_user || "",
              updated_by_user: formValue?.updated_by_user || "",
              lead_select_date: formValue.lead_select_date
                ? [new Date(formValue.lead_select_date)]
                : [],
              last_contact_date: formValue.last_contact_date
                ? (formValue.last_contact_date)
                : '',
              lead_status: formValue.lead_status
                ? [{ id: formValue.lead_status, label: formValue.lead_status }]
                : [],
              first_contact_source: formValue.first_contact_source
                ? [
                  {
                    id: formValue.first_contact_source,
                    label: capitalizeFirstLetter(formValue.first_contact_source),
                  },
                ]
                : [],
              country: formValue.country
                ? [{ id: formValue.country, label: capitalizeFirstLetter(formValue.country) }]
                : [],
              lead_regular_contact_source: formValue.lead_regular_contact_source
                ? [
                  {
                    id: formValue.lead_regular_contact_source.toString(),
                    label: capitalizeFirstLetter(
                      formValue.lead_regular_contact_source.toString()
                    ),
                  },
                ]
                : [],
              lead_type: formValue.lead_type
                ? [
                  {
                    id: formValue.lead_type.toString(),
                    label: capitalizeFirstLetter(formValue.lead_type.toString()),
                  },
                ]
                : [],
            },
          })
          return
        }
        Message(Strings.leadDetailsNotFound, 'error', '').then((res) => {
          if (res.isConfirmed) {
            navigator(PATHS.lead.list)
          }
        })
      })
    } else {
      formik.resetForm({
        values: {
          ...leadFormikInitialValues,
          created_at: "",
        },
      })
    }
  }, [param.id])


  const getPayload = (formValue: LeadFormValues) => {
    const deadLineReminderDate = formik.values.deadLineDate as Date ;
    const deadLineReminderTime = formik.values.deadLineTime as Date ;
    const deadLineReminder = deadLineReminderDate ? moment(deadLineReminderDate).format("YYYY-MM-DD") + " " + moment(deadLineReminderTime).format("HH:mm") : ""
    const payload = {
      token,
      items: {
        ...formValue,
        name: formValue.name,
        email: formValue.email,
        account: formValue.account[0]?.id?.toString(),
        position: formValue.position[0]?.id?.toString(),
        deadline_reminder: deadLineReminder,
        lead_contact_email:
          formValue.lead_contact_email.length > 0 ? formValue.lead_contact_email.join(',') : '',
        last_contact_date: formValue.last_contact_date as string,
        lead_select_date: convertDateObjectToString(formValue.lead_select_date) as string,
        lead_status: formValue.lead_status[0]?.id?.toString(),
        first_contact_source: formValue.first_contact_source[0]?.id?.toString(),
        country: formValue.country?.[0]?.id?.toString(),
        lead_regular_contact_source: formValue.lead_regular_contact_source[0]?.id?.toString(),
        lead_type: formValue.lead_type?.[0]?.id?.toString(),
        added_by_user: formValue.added_by_user,
        updated_by_user: formValue.updated_by_user,
      },
    }
    return payload
  }
  const addPageHandlerSubmit = (formValue: LeadFormValues) => {
    const APIPayload= getPayload(formValue)

    dispatch(addLeadAction(APIPayload)).then((res) => {
      const data = res.payload as { status: boolean | undefined; message: string }
      if (data.status) {
        alertMessage('success', Strings.leadAddedSuccessfully, '')
      } else {
        alertMessage('error', data.message, '')
      }
    })
  }

  const editPageHandlerSubmit = (formValue: LeadFormValues) => {
    const APIPayload: any = {
      id: Number(param.id),
      ...getPayload(formValue),
    }
    dispatch(editLeadAction(APIPayload)).then((res) => {
      const data = res.payload as { status: boolean | undefined; message: string }
      if (data.status) {
        alertMessage('success', Strings.leadUpdatedSuccessfully, '')
      } else {
        alertMessage('error', data.message, '')
      }
    })
  }

  const alertMessage = (icon: 'error' | 'success' | 'warning', text: string, title: string) => {
    Message(title, icon, text).then((result) => {
      if (result.isConfirmed && icon === 'success') {
        /**
         * I have added listing API here because when user updates the lead and redirect to lead page it's show updated listing
         */
        dispatch(getAllLeadsAction({
          token, page: constant.page.defaultNumber,
          query: ''
        }))
        navigator(PATHS.lead.list)
      }
      if (result.isConfirmed && icon === 'error') {
        dispatch(LeadActions.resetErrorState())
      }
    })
  }

  const handlerBlurEvent = (name: string) => {
    formik.setFieldTouched(name, true)
  }

  return (
    <>
      <PageTitle path={PATHS.lead.list} breadcrumbs={addLeadBreadcrumbs}>
        {param.id ? Strings.editLead : Strings.addLead}
      </PageTitle>
      {isLoading ? <Loader /> : (
        <form className='form' onSubmit={formik.handleSubmit}>
          <PersonalDetails
            formik={formik}
            deadLineReminder="deadLineReminder"
            name='name'
            deadLineDate="deadLineDate"
            deadLineTime="deadLineTime"
            email='email'
            companyName='company_name'
            emailInputValue='emailInputValue'
            website='website'
            handlerBlurEvent={handlerBlurEvent}
            phone='phone'
            accountOptions={setSelectInputOptions(leadData['lead.account'])}
            positionOptions={setSelectInputOptions(leadData["lead.position"])}
            mobile='mobile'
            leadStatusOptions={setSelectInputOptions(leadStatusOptions)}
            skypeId='skype_id'
            reason='reason'
            leadStatusDate='lead_select_date'
            lastContactDate='last_contact_date'
            note='note'
            linkedinUrl='linkedin_url'
            leadStatus='lead_status'
          />
          <ContactDetails
            formik={formik}
            address='address'
            addBy='added_by'
            area='area'
            state='state'
            handlerBlurEvent={handlerBlurEvent}
            country='country'
            city='city'
            firstContactSourceOptions={setSelectInputOptions(leadData['lead.firstContactSource'])}
            comments='comments'
            firstContactSource='first_contact_source'
            postalCode='postal_code'
            leadType='lead_type'
            stateOptions={stateOptions}
          />
          <LeadInformationForm
            formik={formik}
            leadTitle='lead_title'
            regularContactSource={setSelectInputOptions(leadData['lead.regularContactSource'])}
            leadDescription='lead_description'
            leadRegularContactSource='lead_regular_contact_source'
            givenPrice='given_price'
            actualPrice='actual_price'
            handlerBlurEvent={handlerBlurEvent}
            contactEmailValue='contactEmailValue'
            contactUrl='contact_url'
            leadContactEmail='lead_contact_email'
          />
          {param?.id && (formik.values.updated_by || formik.values.createdBy) && (
            <UpdateDetailsSection
              lastUpdateDate={formik.values.updatedAt || ''}
              id={Number(formik.values.updatedBy || null)}
              title={Strings.updateDetails}
              createdById={formik.values.createdBy}
              lastCreateDate={formik.values.createdAt}
              createDetails={formik.values.added_by_user}
              updateDetails={formik.values.updated_by_user}
            />
          )}
          <Button   disabled = {formik.isSubmitting} isValid={formik.isValid} dirty={formik.dirty}>
            {param?.id ? Strings.updateLead : Strings.addLead}
          </Button>
        </form>
      )}
    </>
  )
}
export default Form
