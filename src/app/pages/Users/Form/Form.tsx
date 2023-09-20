/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import './Form.scss'
import { AddUserPayLoad, IProfileDetails, UserResponseField } from '../Components/Modal/Modal'
import { profileDetailsSchema } from 'app/utils/ValidationSchema'
import PersonalDetails from '../Components/Steps/PersonalDetails/PersonalDetails'
import ContactDetails from '../Components/Steps/ContactDetails/ContactDetails'
import Guardian from '../Components/Steps/Guardian/Guardian'
import SalaryInformation from '../Components/Steps/SalaryInformation/SalaryInformation'
import { Strings } from 'app/resource/Strings'
import { UserActions } from 'app/redux/UserSlice/UserSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { PageLink, PageTitle } from '_metronic/layout/core'
import { getUserToken } from 'services/AuthServices'
import { IRootState, useAppDispatch } from 'app/redux/store'
import {
  addUserAction,
  editUserAction,
  getAllUsersAction,
  getIndividualUserAction,
  getUserProfileActions,
} from 'app/redux/UserSlice/UserAyscThunk'
import { Message } from 'app/utils/AlertMessage'
import { capitalizeFirstLetter, formatDate, setErrorMessage } from 'app/utils/helper'
import stateJson from 'app/assets/data/state.json'
import Button from 'app/Components/Button/Button'
import AttendanceInformation from '../Components/Steps/AttendanceInformation/AttendanceInformation'
import { useSelector } from 'react-redux'
import { Loader } from 'app/Components/Loader/Loader'
import { UserFormikState } from 'app/FormikIntialValues/FormikIntialValues'
import { getRoles } from 'app/redux/RoleSlice/RoleAyscThunk'
import { PATHS } from 'config/paths/paths'
import constant from 'config/const/const'
import UpdateDetailsSection from 'app/Components/UpadateDetailSection'
import moment from 'moment'
import useListingAPIPayload, { payloadKeyList } from 'config/hooks/useListingAPIPayload'
import useFetchAPIBaseOnPermission from 'config/hooks/useFetchAPIBaseOnPermission'

interface AddPayloadProps {
  token: string
  items: AddUserPayLoad
}
interface EditPayloadProps extends AddPayloadProps {
  id: number
}

const addUserBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.users,
    path: PATHS.user.list,
    isSeparator: false,
    isActive: false,
  },
]

const Form = () => {
  const param = useParams()
  const token = getUserToken()
  const { isLoading } = useSelector((state: IRootState) => state.UserStateData);
  const { userPermissions } = useSelector((state: IRootState) => state.UserPermissionsStateData)
  const { list: roleList, total } = useSelector((state: IRootState) => state.roleStateData)
  const stateOptions = [...stateJson]
  const [profilePicture, setProfilePicture] = useState<string | null>('')
  const dispatch = useAppDispatch()
  const navigator = useNavigate()
  const rolePayload =  useListingAPIPayload(payloadKeyList.roles, constant.page.maxSize);
  const usersPayload =  useListingAPIPayload(payloadKeyList.users, constant.page.size);
  useFetchAPIBaseOnPermission(userPermissions?.role.list, getRoles, rolePayload, false, roleList, 1)

  const formik = useFormik<IProfileDetails>({
    initialValues: UserFormikState,
    validationSchema: profileDetailsSchema,
    onSubmit: (formValue) => {
      if (param.id) {
        editPageHandlerSubmit(formValue)
      } else {
        addPageHandlerSubmit(formValue)
      }
    },
  })
  useEffect(() => {
    dispatch(UserActions.resetErrorState())
    dispatch(UserActions.resetState())
    return () => {
      dispatch(UserActions.resetErrorState())
      dispatch(UserActions.resetState())
    }
  }, [token])

  const staticTime = () => {
    const defaultDate = moment( new Date()).format('YYYY-MM-DDT09:30:00')
    return defaultDate;
      };

  useEffect(() => {
    if (param.id && token) {
      const id = Number(param?.id)
      dispatch(getIndividualUserAction({token, id})).then((res) => {
        const formValues = res.payload as UserResponseField
        if (res.payload) {
          setProfilePicture(formValues.image_url)
          formik.resetForm({
            values: {
              ...formik.values,
              profileUrl: formValues.image_url,
              createdBy: formValues?.added_by || null,
              createdAt: formValues.created_at || '',
              joiningDate: formValues.joining_date ? formValues.joining_date : '',
              userEmail: formValues.email || '',
              firstName: formValues.first_name || '',
              updatedBy: formValues.updated_by || '',
              status:
                [{id: formValues.status, label: capitalizeFirstLetter(formValues?.status)}] || '',
              aadhaarCardNumber: formValues.aadhar_number || '',
              slackUrl: formValues.slack_url || '',
              salary: `${formValues.basic_salary}` || '',
              lastName: formValues.last_name || '',
              birthDate: formValues.birth_date || '',
              slackUserName: formValues.slack_username || '',
              slackUserNumber: formValues.slack_user_number || '',
              designation: formValues.designation || '',
              contactEmail: formValues.contact_email || '',
              address: formValues.address || '',
              area: formValues.area || '',
              state: [{id: formValues.state, label: ''}] || '',
              lateEntryTime: formValues.late_entry_time ? new Date(formValues.late_entry_time) : staticTime(),
              fullDayMinutes: formValues.fullday_minutes || '',
              halfDayMinutes: formValues.halfday_minutes || '',
              earlyDayMinutes: formValues.earlyday_minutes || '',
              city: formValues.city || '',
              postalCode: formValues.postal_code || '',
              mobile: formValues.contact || '',
              altMobile: formValues.alternate_contact || '',
              guardianFirstPersonName: formValues.guadian_1_name || '',
              guardianFirstPersonContactNumber: formValues.guadian_1_contact || '',
              guardianFirstPersonAddress: formValues.address || '',
              guardianSecondPersonName: formValues.guadian_2_name || '',
              guardianSecondPersonContactNumber: formValues.guadian_2_contact || '',
              guardianSecondPersonAddress: formValues.guadian_2_address || '',
              nextIncrementDate: formValues.next_increment_date
                ? formValues.next_increment_date
                : '',
              panNumber: formValues.pan_number || '',
              bankDetails: formValues.bank_details || '',
              extraInformation: formValues.extra_information || '',
              lastUpdateDate: formValues?.updated_at || '',
              role: `${formValues.role_id?.id}` || '',
              paidLeaveStartsFrom: formValues.paid_leave_starts_from
                ? formValues.paid_leave_starts_from
                : '',
                addedByUser: formValues.added_by_user,
                updatedByUser: formValues.updated_by_user
            },
          })
        }
      })
    } else {
      setProfilePicture('')
      formik.resetForm({
        values: {...UserFormikState,
          lateEntryTime: staticTime(),},

      })
    }
  }, [param.id, token])

  useEffect(() => {
    if (formik.values.profileUrl && typeof formik.values.profileUrl === 'object') {
      let reader = new FileReader()
      let file = formik.values.profileUrl as File
      reader.onload = (e: any) => {
        setProfilePicture(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }, [formik.values.profileUrl])

  /**
   * formateDate function
   * @param date
   * @return string
   * it's convert data object to YYYY-MM-DD string formate
   */
  const formatLateEntryTime = (time: Date) => {
    const currentDate = new Date()
    const times = time.toLocaleString([], {hour: '2-digit', minute: '2-digit', hour12: false})
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    const currentDay = currentDate.getDay()
    return `${currentYear}-${currentMonth}-${currentDay} ${times}`
  }

  const getPayload = (
    formValue: IProfileDetails,
    isEdit: boolean
  ): EditPayloadProps | AddPayloadProps => {
    const lateEntryTime = formValue.lateEntryTime as Date
    const payload = {
      token,
      items: {
        name: formValue.firstName + ' ' + formValue.lastName,
        email: formValue.userEmail,
        first_name: formValue.firstName,
        last_name: formValue.lastName,
        slack_username: formValue.slackUserName,
        slack_user_number: formValue.slackUserNumber,
        contact: formValue.mobile,
        role_id: formValue.role,
        status: formValue.status?.[0]?.id?.toString(),
        alternate_contact: formValue.altMobile,
        birth_date: formatDate(formValue.birthDate as Date),
        joining_date: formValue.joiningDate
          ? formatDate(formValue.joiningDate as Date)
          : formValue.joiningDate,
        designation: formValue.designation,
        contact_email: formValue.contactEmail,
        slack_url: formValue.slackUrl,
        address: formValue.address,
        area: formValue.area,
        state: formValue.state[0]?.id?.toString(),
        city: formValue.city,
        next_increment_date: formValue.nextIncrementDate
          ? formatDate(formValue.nextIncrementDate as Date)
          : formValue.nextIncrementDate,
        postal_code: formValue.postalCode,
        guadian_1_name: formValue.guardianFirstPersonName,
        guadian_1_address: formValue.guardianFirstPersonAddress,
        guadian_1_contact: formValue.guardianFirstPersonContactNumber,
        guadian_2_name: formValue.guardianSecondPersonName,
        guadian_2_contact: formValue.guardianSecondPersonContactNumber,
        guadian_2_address: formValue.guardianSecondPersonAddress,
        basic_salary: formValue.salary,
        pan_number: formValue.panNumber.toUpperCase(),
        aadhar_number: formValue.aadhaarCardNumber,
        bank_details: formValue.bankDetails,
        extra_information: formValue.extraInformation,
        paid_leave_starts_from: formValue.paidLeaveStartsFrom
          ? formatDate(formValue.paidLeaveStartsFrom as Date)
          : formValue.paidLeaveStartsFrom,
        user_image: formValue.profileUrl as File,
        late_entry_time: formatLateEntryTime(lateEntryTime),
        fullday_minutes: formValue.fullDayMinutes,
        halfday_minutes: formValue.halfDayMinutes,
        earlyday_minutes: formValue.earlyDayMinutes,
        added_by_user: formValue.addedByUser,
        updated_by_user: formValue.updatedByUser
      },
    }
    return payload
  }
  const addPageHandlerSubmit = (formValue: IProfileDetails) => {
    const payload = getPayload(formValue, false)
    dispatch(addUserAction(payload)).then((res) => {
      const data = res.payload as {status: boolean | undefined; message: string}
      if (data.status) {
        alertMessage('success', Strings.userAddedSuccessfully, '')
      } else {
        const error = setErrorMessage(data.message)
        alertMessage('error', error, `User with email "${formValue.userEmail}" already exists`)
      }
    })
  }
  const editPageHandlerSubmit = (formValue: IProfileDetails) => {
    const payload = {
      id: Number(param.id),
      ...getPayload(formValue, true),
    }
    dispatch(editUserAction(payload)).then((res) => {
      const data = res.payload as {status: boolean | undefined; message: string}
      if (data.status) {
        alertMessage('success', Strings.userUpdatedSuccessfully, '')
      } else {
        alertMessage('error', data.message, Strings.userWithEmailAlreadyExists)
      }
    })
  }

  const alertMessage = (icon: 'error' | 'success' | 'warning', text: string, title: string) => {
    Message(title, icon, text).then((result) => {
      if (result.isConfirmed && icon === 'success') {
        navigator(PATHS.user.list)
        dispatch(getUserProfileActions(token))
        dispatch(getAllUsersAction(usersPayload))
      }
      if (result.isConfirmed && icon === 'error') {
        dispatch(UserActions.resetErrorState())
      }
    })
  }

  const handlerBlurEvent = (name: string) => {
    formik.setFieldTouched(name, true)
  }

  const removeProfilePictureHandler = () => {
    setProfilePicture('')
    formik.setFieldValue('profileUrl', '')
  }

  return (
    <>
      <PageTitle path={PATHS.user.list} breadcrumbs={addUserBreadcrumbs}>
        {param.id ? Strings.editUser : Strings.addUser}
      </PageTitle>
        {isLoading ? (
          <Loader />
        ) : (
          <form className='form' onSubmit={formik.handleSubmit}>
            <PersonalDetails
              formik={formik}
              handlerBlurEvent={handlerBlurEvent}
              profilePictureUrl={profilePicture || ''}
              profileUrl='profileUrl'
              joiningDate='joiningDate'
              removeProfilePictureHandler={removeProfilePictureHandler}
              userEmail='userEmail'
              slackUrl='slackUrl'
              firstName='firstName'
              slackUserName='slackUserName'
              slackUserNumber='slackUserNumber'
              lastName='lastName'
              birthDate='birthDate'
              designation='designation'
              contactEmail='contactEmail'
            />
            <ContactDetails
              formik={formik}
              address='address'
              handlerBlurEvent={handlerBlurEvent}
              area='area'
              status='status'
              state='state'
              city='city'
              postalCode='postalCode'
              mobile='mobile'
              altMobile='altMobile'
              cityOptions={['Ahmadabad', 'Rajkot', 'Amreli', 'Anand']}
              stateOptions={stateOptions}
            />
            <Guardian
              formik={formik}
              handlerBlurEvent={handlerBlurEvent}
              guardianFirstPersonName='guardianFirstPersonName'
              guardianFirstPersonContactNumber='guardianFirstPersonContactNumber'
              guardianFirstPersonAddress='guardianFirstPersonAddress'
              guardianSecondPersonName='guardianSecondPersonName'
              guardianSecondPersonContactNumber='guardianSecondPersonContactNumber'
              guardianSecondPersonAddress='guardianSecondPersonAddress'
            />
            <SalaryInformation
              formik={formik}
              nextIncrementDate='nextIncrementDate'
              bankDetails='bankDetails'
              extraInformation='extraInformation'
              panNumber='panNumber'
              aadhaarCardNumber='aadhaarCardNumber'
              salary='salary'
              handlerBlurEvent={handlerBlurEvent}
              paidLeaveStartsFrom='paidLeaveStartsFrom'
              role='role'
            />
            <AttendanceInformation
              formik={formik}
              lateEntryTime='lateEntryTime'
              officeMaxValidTime='officeMaxValidTime'
              earlyDayMinutes='earlyDayMinutes'
              handlerBlurEvent={handlerBlurEvent}
              halfDayMinutes='halfDayMinutes'
              fullDayMinutes='fullDayMinutes'
            />
         {param?.id && (formik.values.updatedBy || formik.values.createdBy) && (
            <UpdateDetailsSection
              lastUpdateDate={formik.values.lastUpdateDate}
              id={Number(formik.values.updatedBy!)}
              title={Strings.updateDetails}
              createdById={formik.values.createdBy}
              lastCreateDate={formik.values.createdAt}
              createDetails={formik.values.addedByUser}
              updateDetails={formik.values.updatedByUser}
              />
          )}
            <Button isValid={formik.isValid} dirty={formik.dirty} type='submit' disabled={false}>
              {param.id ? Strings.updateUser : Strings.addUser}
            </Button>
          </form>
        )}
    </>
  )
}
export default Form
