import React from 'react'
import { ContentTitle } from '../../../../../Components/ContentTitle/ContentTitle'
import { SalaryInformationProps } from '../../Modal/Modal'
import { Strings } from 'app/resource/Strings'
import SelectUserRole from '../SelectUserRole/SelectUserRole'
import 'react-datepicker/dist/react-datepicker.css'
import './SalaryInformation.scss'
import {TextArea} from 'app/Components/TextArea/TextArea'
import {CustomInput} from '_metronic/helpers/components/Input/Input'
import CustomDatePicker from 'app/Components/DatePicker/DatePicker'

const SalaryInformation: React.FC<SalaryInformationProps> = ({formik, ...props}) => {
  return (
    <div className='card mb-5 mb-xl-10 form-container'>
      <ContentTitle
        title={Strings.salaryInformation}
        className='border-bottom'
        targetToggleId='#kt_account_salary_information'
      />
      <div id='kt_account_salary_information' className='collapse show'>
        <div className='card-body border-0 p-9'>
        <CustomDatePicker
            label={Strings.nextIncrementDate}
            onBlur={props.handlerBlurEvent}
            name={props.nextIncrementDate}
            formik={formik}
            isRequired={false}
          />
          <CustomInput
            label={Strings.salary}
            type='number'
            name={props.salary}
            value={formik.values.salary}
            placeHolder={Strings.salary}
            formilk={formik}
            onBlur={() => props.handlerBlurEvent(props.salary)}
          />
          <CustomInput
            label={Strings.incomeTaxNumber}
            type='text'
            name={props.panNumber}
            value={formik.values.panNumber}
            placeHolder={Strings.incomeTaxNumber}
            formilk={formik}
            onBlur={() => props.handlerBlurEvent(props.panNumber)}
          />
          <CustomInput
            label={Strings.aadhaarCardNumber}
            type='number'
            name={props.aadhaarCardNumber}
            value={formik.values.aadhaarCardNumber}
            placeHolder={Strings.aadhaarCardNumber}
            formilk={formik}
            onBlur={() => props.handlerBlurEvent(props.aadhaarCardNumber)}
          />
          <TextArea
            name={props.bankDetails}
            label={Strings.bank_details}
            formik={formik}
            isRequired={true}
            onBlur={() => props.handlerBlurEvent(props.bankDetails)}
          />
            <CustomDatePicker
            label={Strings.paidLeaveStartForm}
            onBlur={props.handlerBlurEvent}
            name={props.paidLeaveStartsFrom}
            formik={formik}
            isRequired={false}
          />
          <TextArea
            name={props.extraInformation}
            label={Strings.extraInformation}
            formik={formik}
            isRequired={false}
            onBlur={() => props.handlerBlurEvent(props.extraInformation)}
          />
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>{Strings.role.substring(0,4)}</label>
            <div className='col-lg-8 fv-row'>
              <SelectUserRole formik={formik} role='role' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalaryInformation
