/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useFormik} from 'formik'
import {HolidayFormValidationSchema} from 'app/utils/ValidationSchema'
import {useSelector} from 'react-redux'
import {HolidayFormValues} from 'app/Modal/Modal'
import {Strings} from 'app/resource/Strings'
import {PageLink, PageTitle} from '_metronic/layout/core'
import {IRootState, useAppDispatch} from 'app/redux/store'
import {Loader} from 'app/Components/Loader/Loader'
import {getUserToken} from 'services/AuthServices'
import Button from 'app/Components/Button/Button'
import 'react-datepicker/dist/react-datepicker.css'
import CustomDatePicker from 'app/Components/DatePicker/DatePicker'
import {TextArea} from 'app/Components/TextArea/TextArea'
import {LeaveInformation} from 'app/redux/LeaveSlice/LeaveTypes'
import UpdateDetailsSection from 'app/Components/UpadateDetailSection'
import {useEffect} from 'react'
import { Message } from 'app/utils/AlertMessage'
import {PATHS} from 'config/paths/paths'
import {CustomInput} from '_metronic/helpers/components/Input/Input'
import {initialHolidayValue} from 'app/FormikIntialValues/FormikIntialValues'
import { addHolidayAction, editHolidayAction, getIndividualHolidayAction } from 'app/redux/AttendanceSlice/AttendanceAyscThunk'
import { HolidayInformation } from 'app/redux/AttendanceSlice/AttendanceTypes'


const editHolidayBreadcrumbs: Array<PageLink> = [
  {
    title: Strings.home,
    path: PATHS.home,
    isSeparator: false,
    isActive: false,
  },
  {
    title: Strings.holiday,
    path: PATHS.attendance.holiday.list,
    isSeparator: false,
    isActive: false,
  },
]

const Form = ({...props}) => {
  const param = useParams()
  const dispatch = useAppDispatch()
  const userToken = getUserToken()
  const navigator = useNavigate()
  const [error, setError] = React.useState<string>('')
  const {isLoading} = useSelector((state: IRootState) => state.leaveStateData)
  const token = getUserToken()
  useEffect(() => {
    setError('')
  }, [])

  const formik = useFormik<HolidayFormValues>({
    initialValues: {
      ...initialHolidayValue,
    },
    validationSchema: HolidayFormValidationSchema,
    onSubmit: (formValue) => {
      if (param?.id){
        editPageHandler(formValue)
      }
      else(
        addPageHandler(formValue)
      )
    },
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
    if (token && param?.id) {
      const id = Number(param.id)
      dispatch(getIndividualHolidayAction({token, id,})).then((res: any) => {
        const formValues = res.payload?.data as HolidayInformation
        if (formValues) {
          formik.resetForm({
            values: {
              ...formik.values,
              holidayDate: formValues?.holiday_date || "",
              name: formValues?.name || "",
              description: formValues?.description || "",
              createdBy: formValues.added_by || null,
              updatedBy: formValues.updated_by || null,
              updatedAt: formValues.updated_at || '',
              createdAt: formValues.created_at || '',
            },
          })
        }
      })
    } else {
      formik.resetForm({
        values: {
          ...initialHolidayValue,
          holidayDate:"",
          name:"",
          description:"",
        },
      })
    }
  }, [dispatch, token, param?.id])
//TODO : feat(ATM, Holiday) :: API integration on edit holiday
  const editPageHandler = (formValues: HolidayFormValues) => {
    const payload = {
      id: Number(param?.id),
      token: userToken,
      name: formValues.name,
      holiday_date:formValues.holidayDate,
      description: formValues.description,
    }
    dispatch(editHolidayAction(payload)).then((response)=>{
      if(response.payload){
        alertMessage("success",Strings.holidayEditedSuccessfully,"");
      }
    })
  }
//TODO : feat(ATM, Holiday) :: API integration on add holiday
  const addPageHandler = (formValues: HolidayFormValues) => {
    const payload = {
      token: userToken,
      name: formValues.name,
      holiday_date:formValues.holidayDate,
      description: formValues.description,
    }
    dispatch(addHolidayAction(payload)).then((response)=>{
      if(response.payload){
        alertMessage("success",Strings.holidayAddedSuccessfully,"");
      }
    })
  }


  const handlerBlurEvent = (name: string) => {
    formik.setFieldTouched(name, true)
  }

  const alertErrorMessage = () => {
    return (
      <div className='card mb-5 mb-xl-10 form-container p-9 text-center'>
        <h2>{error}</h2>
      </div>
    )
  }
  if (error) {
    return (
      <>
        <PageTitle path={PATHS.attendance.holiday.list} breadcrumbs={editHolidayBreadcrumbs}>
          {Strings.editHoliday}
        </PageTitle>
        {alertErrorMessage()}
      </>
    )
  }

  const alertMessage = (icon: 'error' | 'success' | 'warning', text: string, title: string) => {
    Message(title, icon, text).then((result) => {
      if (result.isConfirmed && icon === 'success') {
        navigator(PATHS.attendance.holiday.list);
      }
      if (result.isConfirmed && icon === 'error') {
      }
    })
  }

  return (
    <>
      <PageTitle breadcrumbs={editHolidayBreadcrumbs}>{param.id ? Strings.editHoliday : Strings.addHoliday}
            </PageTitle>
      {isLoading ? (
        <Loader />
      ) : (
        <div id='kt_account_permission_form' className='collapse show'>
          <form className='form' onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <div className='card mb-5 mb-xl-10'>
              <div className='card-body border-0 p-9'>
                <CustomDatePicker
                  name='holidayDate'
                  title='DD-MM-YYYY'
                  label={Strings.holidayDate}
                  isRequired={false}
                  formik={formik}
                  onBlur={handlerBlurEvent}
                />
                <CustomInput
                  label={Strings.name}
                  name='name'
                  formilk={formik}
                  placeHolder={`${Strings.enter}${Strings.name}`}
                  value={formik.values.name}
                  type={'text'}
                  onBlur={handlerBlurEvent}
                />
                <TextArea
                  name='description'
                  label={Strings.description}
                  formik={formik}
                  placeholder={`${Strings.about} ${Strings.holiday}`}
                  isRequired={false}
                  onBlur={handlerBlurEvent}
                />
              </div>
            </div>
            {param?.id && (formik.values.createdBy || formik.values.updatedBy) && (
              <UpdateDetailsSection
                id={formik.values.updatedBy}
                createdById={formik.values.createdBy}
                lastCreateDate={formik.values.createdAt}
                title={Strings.updateDetails}
                lastUpdateDate={formik.values.updatedAt}
                updatedByLabel={Strings.lastUpdatedBy}
                updatedDateLabel={Strings.lastUpdateDate}
              />
            )}
            <Button
              type='submit'
              buttonText={Strings.reset}
              isCancelButtonRequired={true}
              disabled = {formik.isSubmitting}
              isValid={formik.isValid}
              dirty={formik.dirty}
              children={param?.id ? Strings.updateHoliday : Strings.addHoliday}
            />
          </form>
        </div>
      )}
    </>
  )
}
export default Form


