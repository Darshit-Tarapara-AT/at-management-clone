/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { LeaveFormValidationSchema } from 'app/utils/ValidationSchema'
import { useSelector } from 'react-redux'
import { LeaveFormValues } from 'app/Modal/Modal'
import { useNavigate } from 'react-router-dom'
import { Message } from 'app/utils/AlertMessage'
import { Strings } from 'app/resource/Strings'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { Loader } from 'app/Components/Loader/Loader'
import { getUserToken } from 'services/AuthServices'
import Button from 'app/Components/Button/Button'
import { leaveActions } from 'app/redux/LeaveSlice/LeaveSlice'
import { addLeaveAction, editLeaveAction, getIndividualLeaveAction } from 'app/redux/LeaveSlice/LeaveAyscThunk'
import 'react-datepicker/dist/react-datepicker.css';
import CustomDatePicker from 'app/Components/DatePicker/DatePicker'
import { TextArea } from 'app/Components/TextArea/TextArea'
import { convertDateObjectToString, formatDate, setSelectInputOptions } from 'app/utils/helper'
import SelectInput from 'app/Components/SelectInput/SelectInput'
import leave from "app/assets/data/leaves.json"
import { LeaveInformation } from 'app/redux/LeaveSlice/LeaveTypes'
import UpdateDetailsSection from 'app/Components/UpadateDetailSection'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { PATHS } from 'config/paths/paths'
import LeaveStatusDetails from './Components/LeaveStatusDetails/LeaveStatusDetails'

const addLeaveBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.masterLeaves,
    path: PATHS.leave.masterList,
    isSeparator: false,
    isActive: false,
  }
]
export interface initalApproveDetailsProps {
  approveDate: string | null,
  approveBy: number | null | undefined
}
export interface initalUsrDetailsProps {
  imageURL: string | null,
  name: string | null
}
export const initalApproveDetails = {
  approveDate: "",
  approveBy: null
}
const initalUserDetails = {
  imageURL: "",
  name: null
}
const Form = ({ ...props }) => {

  const param = useParams()
  const dispatch = useAppDispatch()
  const [error, setError] = React.useState<string>('')
  const navigator = useNavigate()
  const[leaveStatus, setLeaveStatus] = useState("");
  const { isLoading } = useSelector((state: IRootState) => state.leaveStateData);
  const [approveDetails, setApproveDetails] = useState<initalApproveDetailsProps>(initalApproveDetails)
  const [lastUpdateUser, setLastUpdateUser] = useState<initalUsrDetailsProps>(initalUserDetails)
  const token = getUserToken();
  const initalTypeValue = [{
    id: Strings.informed.toLowerCase(),
    label: Strings.informed
  }];
  const initalStatusValue = [{
    id: Strings.pending.toLowerCase(),
    label: Strings.pending.toLowerCase()
  }]
  useEffect(() => {
    setError("");
  }, [])
  const currentPageBreadCrumb = React.useMemo(() => {
    const newLeaveBreadCrumbs = addLeaveBreadcrumbs.map((item) => {
      if (item.title !== Strings.home && !param?.id) {
        item.title ='';
        item.path = '';
      }
      return item;
    }).filter((item) => item.title !== '')
    return newLeaveBreadCrumbs
  }, [param?.id])
  const formik = useFormik<LeaveFormValues>({
    initialValues: {
      start_date: '',
      end_date: '',
      createdDate: '',
      updatedBy: null,
      reason: '',
      type: initalTypeValue,
      status: initalStatusValue,
      comment: "",
      user: '',
      lastUpdateDate: '',
      addedBy: 0,
      joining_date: '',
      approved_by_user: {id: 0, name: '', image_url: ''}
    },
    validationSchema: LeaveFormValidationSchema,
    onSubmit: (formValue) => {
      if (param?.id) {
        editPageHandler(formValue);
      }
      else {
        addPageHandlerSubmit(formValue)
      }

    },
  })

  React.useEffect(() => {
    if (token && param?.id) {
      const id = Number(param.id)
      dispatch(getIndividualLeaveAction({ token, id })).then((res: any) => {
        const formValues = res.payload as LeaveInformation;
        if (formValues) {
          setLeaveStatus(formValues?.status)
          setApproveDetails((preViewState) => {
            return {
              ...preViewState,
              approveDate: formValues?.approved_dated || '',
              approveBy: formValues?.approved_by
            }
          })
          setLastUpdateUser((preViewState) => {
            return {
              ...preViewState,
              imageURL: formValues?.user?.image_url || '',
              name: formValues?.user?.name || ''
            }
          })
          formik.resetForm({
            values: {
              addedBy: formValues.added_by || null,
              updatedBy: formValues.updated_by || null,
              lastUpdateDate: formValues.updated_at || '',
              createdDate: formValues.created_at || "",
              start_date: formValues?.start_date || '',
              end_date: formValues?.end_date || '',
              reason: formValues?.reason,
              type: formValues?.information_type ? [{
                id: formValues?.information_type || '',
                label: formValues?.information_type || '',
              }] : initalTypeValue,

              status: [{
                id: formValues?.status || '',
                label: formValues?.status || '',
              }],
              comment: formValues.comment || '',
              user: formValues.added_by_username || '',
              joining_date: formValues.joining_date || '',
              added_by_user: formValues?.added_by_user || "",
              updated_by_user: formValues?.updated_by_user || "",
              approved_by_user: formValues?.approved_by_user || "",
            }
          })
        } else {
          setError(Strings.leaveDetailsNotFound)
        }
      })
    } else {
      formik.resetForm({
        values: {
          updatedBy: null,
          createdDate: "",
          start_date: '',
          end_date: '',
          reason: '',
          type: initalTypeValue,
          status: initalStatusValue,
          comment: "",
          user: '',
          lastUpdateDate: '',
          addedBy: null,
          joining_date: ''
        }
      })
    }
  }, [dispatch, token, param?.id])

  const addPageHandlerSubmit = (formValue: LeaveFormValues) => {
    const payload = {
      start_date: convertDateObjectToString(formValue.start_date),
      end_date: convertDateObjectToString(formValue.end_date),
      reason: formValue.reason,
      joining_date: convertDateObjectToString(formValue.joining_date),
      information_type: "informed",
      status: 'pending',
    }
    dispatch(addLeaveAction({
      token, ...payload
    })).then((response: any) => {
      if (response.payload.status) {
        alertMessage("success", Strings.leaveAddedSuccessfully, "")
      }
  else {
    alertMessage("error", response?.payload?.message, "")
  }
    })
  };

  const editPageHandler = (formValue: LeaveFormValues) => {
    const payload = {
      token,
      start_date: convertDateObjectToString(formValue.start_date),
      end_date: convertDateObjectToString(formValue.end_date),
      reason: formValue.reason,
      joining_date: convertDateObjectToString(formValue.joining_date),
      information_type: formValue.type?.[0]?.id?.toString(),
      status: formValue.status?.[0]?.id?.toString(),
      id: Number(param?.id),
      comment: formValue.comment
    }
    dispatch(editLeaveAction(payload)).then((response: any) => {
      if (response.payload.status) {
        alertMessage("success", Strings.leaveIsSuccessfullyUpdate, "")
      }
      else {
        alertMessage("error", response?.payload?.message, "")
      }
    })
  };
  const alertMessage = (icon: 'error' | 'success' | 'warning', text: string, title: string) => {
    Message(title, icon, text).then((result) => {
      if (result.isConfirmed && icon === 'success' && !param?.id) {
        formik.setSubmitting(false)
        navigator(PATHS.leave.myList)
      }
      if (result.isConfirmed && icon === 'success' && param?.id) {
        formik.setSubmitting(false)
        window.location.reload();
      }
      if (result.isConfirmed && icon === 'error') {
        formik.setSubmitting(false)
        dispatch(leaveActions.resetErrorState())
      }
    })
  }
  const handlerBlurEvent = (name: string) => {
    formik.setFieldTouched(name, true);
  };
  const minSelectedDate = !param?.id ? formatDate(new Date()) : '';
  const alertErrorMessage = () => {
    return (
      <div className="card mb-5 mb-xl-10 form-container p-9 text-center">
        <h2>{error}</h2>
      </div>
    )
  }
  if (error) {
    return (
      <>
        <PageTitle path={PATHS.leave.myList} breadcrumbs={addLeaveBreadcrumbs}>
          {param.id ? Strings.editLeave : Strings.addLeave}
        </PageTitle>
        {alertErrorMessage()}
      </>
    )
  }
  const approvedDate = approveDetails?.approveDate ? moment(approveDetails?.approveDate)?.format("DD-MM-YYYY hh:mm:ss A") : ""
  return (
    <>

      <PageTitle breadcrumbs={currentPageBreadCrumb}>
        {param.id ? Strings.editLeave : Strings.addLeave}
      </PageTitle>

      {isLoading ? <Loader /> : (<div id='kt_account_permission_form' className='collapse show'>
        <form className='form' onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <div className='card mb-5 mb-xl-10'>
            <div className='card-body border-0 p-9'>
              {param?.id && (
                <div className="row mb-6">
                  <label className="col-lg-4 col-form-label fw-semibold fs-6">
                    <span>{Strings.user}</span>
                  </label>
                  <div className='d-flex align-items-center col-lg-8'>
                    <div className='symbol symbol-50px me-3'>
                      <img
                        src={lastUpdateUser?.imageURL || ''}
                        className=''
                        alt={lastUpdateUser.name || ''}
                      />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <span className=''>{lastUpdateUser?.name}</span>
                    </div>
                  </div>
                </div>
              )}
              <CustomDatePicker
                name='start_date'
                title='DD-MM-YYYY'
                min={minSelectedDate}
                label={Strings.startDate}
                isRequired={true}
                formik={formik}
                onBlur={handlerBlurEvent}
              />
              <CustomDatePicker
                name='end_date'
                title='DD-MM-YYYY'
                label={Strings.endDate}
                min={minSelectedDate}
                isRequired={true}
                formik={formik}
                onBlur={handlerBlurEvent}
              />
              <TextArea
                name='reason'
                label={Strings.reason}
                formik={formik}
                placeholder={`${Strings.enter} ${Strings.your} ${Strings.reason?.toLocaleLowerCase()}`}
                isRequired={true}
                onBlur={handlerBlurEvent}
              />
              <CustomDatePicker
                name='joining_date'
                title='DD-MM-YYYY'
                min={minSelectedDate}
                label={Strings.joiningDate}
                isRequired={true}
                formik={formik}
                onBlur={handlerBlurEvent}
              />
              {param?.id && (
                <>
                  <SelectInput
                    formik={formik}
                    label={Strings.status}
                    name={"status"}
                    options={setSelectInputOptions(leave["leaves.status"])}
                    optionTitle='name'
                    optionValue='id'
                    onBlur={handlerBlurEvent}
                  />
                  <SelectInput
                    formik={formik}
                    label={Strings.type}
                    name={"type"}
                    options={setSelectInputOptions(leave["leaves.type"])}
                    optionTitle='name'
                    optionValue='id'
                    onBlur={handlerBlurEvent}
                  />
                  <TextArea
                    name='comment'
                    label={Strings.comment}
                    formik={formik}
                    placeholder={`${Strings.enter} ${Strings.your}  ${Strings.comment}`}
                    isRequired={false}
                    onBlur={handlerBlurEvent}
                  />
                </>
              )}
            </div>
          </div>
          {leaveStatus === Strings.rejected.toLocaleLowerCase()  && approveDetails.approveDate && (
            <UpdateDetailsSection
            id={approveDetails?.approveBy!}
            title={Strings.leaveDetails}
            lastUpdateDate={formik.values.lastUpdateDate}
            leaveDetails={Strings.rejectedDate}
            />
          )}
          {leaveStatus === Strings.pending.toLocaleLowerCase() && approveDetails.approveDate && (
            <UpdateDetailsSection
            id={approveDetails?.approveBy!}
            title={Strings.leaveDetails}
            lastUpdateDate={formik.values.lastUpdateDate}
            leaveDetails={Strings.pendingBy}
            />
          )}
          {leaveStatus === Strings.confirmed.toLocaleLowerCase()  && approveDetails.approveDate && (
            <UpdateDetailsSection
            id={approveDetails?.approveBy!}
            title={Strings.leaveDetails}
            lastUpdateDate={formik.values.lastUpdateDate}
            leaveDetails={Strings.approvedBy}
            approvedDetails={formik.values.approved_by_user}
            />
          )}
          {param?.id && (
            <UpdateDetailsSection
              id={formik.values.updatedBy}
              createdById={formik.values.addedBy}
              lastCreateDate={formik.values.createdDate}
              title={Strings.updateDetails}
              lastUpdateDate={formik.values.lastUpdateDate}
              updatedByLabel={Strings.lastUpdatedBy}
              updatedDateLabel={Strings.lastUpdateDate}
              createDetails={formik.values.added_by_user}
              updateDetails={formik.values.updated_by_user}
            />
          )}
          <Button
            type="submit"
            buttonText={Strings.reset}
            isCancelButtonRequired={true}
            isValid={formik.isValid}
            disabled = {formik.isSubmitting}
            dirty={formik.dirty}
            children={param?.id ? Strings.updateLeave : Strings.addNewLeave}
          />
        </form>
      </div>)}
    </>
  )
}
export default Form


