/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {ContentTitle} from '../../../../../Components/ContentTitle/ContentTitle'
import './PersonalDetails.scss'
import {Strings} from 'app/resource/Strings'
import {LeadPersonalDetailsProps} from '../../Modal/Modal'
import {CustomInput} from '_metronic/helpers/components/Input/Input'
import CustomDatePicker from 'app/Components/DatePicker/DatePicker'
import SelectInput from 'app/Components/SelectInput/SelectInput'
import {TextArea} from 'app/Components/TextArea/TextArea'
import {useSelector} from 'react-redux'
import {IRootState} from 'app/redux/store'
import {Input} from 'baseui/input'
import {INPUT_KEY, TIMER_PICKER_INPUT, allInputsStyles} from 'config/InputStyles/InputStyles'
import { TimePicker } from 'baseui/timepicker'

type TimePickerFormat = '12' | '24'
const PersonalDetails: React.FC<LeadPersonalDetailsProps> = ({formik, ...props}) => {
  const {currentTheme} = useSelector((state: IRootState) => state.UIStateData)
  const deadlineFielddependentList = ['leadAssessmentTest', 'clientMeetingFixed']
  const [isLeadStatusChanged, setIsLeadStatusChanged] = useState(false)

  useEffect(() => {
    const currentLeadStatusValue = formik.values.lead_status?.[0]?.id as string
    if (deadlineFielddependentList.includes(currentLeadStatusValue)) {
      setIsLeadStatusChanged(true)
    } else {
      setIsLeadStatusChanged(false)
    }
  }, [formik.values.lead_status])
  
  return (
    <div className='card mb-5 mb-xl-10 form-container'>
      <ContentTitle
        title={Strings.personalDetails}
        targetToggleId='#kt_account_email_and_name_form'
      />
      <div id='kt_account_email_and_name_form' className='collapse show'>
        <div className='card-body border-0 p-9'>
          <CustomInput
            type='text'
            placeHolder={Strings.name}
            formilk={formik}
            label={Strings.name}
            name={props.name}
            value={formik.values.name}
            onBlur={() => props.handlerBlurEvent(props.name)}
          />
          <SelectInput
            name={'lead_type'}
            formik={formik}
            isRequired={true}
            onBlur={() => props.handlerBlurEvent('lead_type')}
            options={[
              {
                id: 'freelancer',
                name: Strings.freelancer,
              },
              {
                id: 'company',
                name: Strings.company,
              },
            ]}
            optionTitle='name'
            optionValue='id'
            label={Strings.leadType}
          />
          <CustomInput
            type='email'
            label={Strings.email}
            isRequired={false}
            placeHolder={Strings.email}
            formilk={formik}
            name={props.email}
            value={formik.values.email}
            onBlur={() => props.handlerBlurEvent(props.email)}
          />

          <CustomInput
            type='text'
            label={Strings.companyName}
            placeHolder={Strings.companyName}
            isRequired={false}
            formilk={formik}
            name={props.companyName}
            value={formik.values.company_name}
            onBlur={() => props.handlerBlurEvent(props.companyName)}
          />
          <SelectInput
            formik={formik}
            label={Strings.account}
            name={Strings.account.toLocaleLowerCase()}
            onBlur={() => props.handlerBlurEvent(Strings.account.toLocaleLowerCase())}
            options={props.accountOptions}
            optionTitle='name'
            optionValue='id'
          />
          <SelectInput
            formik={formik}
            label={Strings.position}
            name={Strings.position.toLocaleLowerCase()}
            onBlur={() => props.handlerBlurEvent(Strings.position.toLocaleLowerCase())}
            options={props.positionOptions}
            optionTitle='name'
            optionValue='id'
          />
          <CustomInput
            type='text'
            label={Strings.website}
            placeHolder={Strings.website}
            formilk={formik}
            name={props.website}
            isRequired={false}
            value={formik.values.website}
            onBlur={() => props.handlerBlurEvent(props.website)}
          />
          <CustomInput
            type='number'
            label={Strings.phone}
            placeHolder={Strings.phone}
            formilk={formik}
            isRequired={false}
            name={props.phone}
            value={formik.values.phone}
            onBlur={() => props.handlerBlurEvent(props.phone)}
          />

          <CustomInput
            type='number'
            isRequired={false}
            label={Strings.mobile}
            placeHolder={Strings.mobile}
            formilk={formik}
            name={props.mobile}
            value={formik.values.mobile}
            onBlur={() => props.handlerBlurEvent(props.mobile)}
          />
          <CustomInput
            type='text'
            label={Strings.skypeId}
            placeHolder={Strings.skypeId}
            isRequired={false}
            formilk={formik}
            name={props.skypeId}
            value={formik.values.skype_id}
            onBlur={() => props.handlerBlurEvent(props.skypeId)}
          />
          <CustomInput
            type='text'
            label={Strings.linkedinURL}
            placeHolder={Strings.linkedinURL}
            formilk={formik}
            name={props.linkedinUrl}
            isRequired={false}
            value={formik.values.linkedin_url}
            onBlur={() => props.handlerBlurEvent(props.linkedinUrl)}
          />
          <SelectInput
            formik={formik}
            label={Strings.leadStatus}
            name={props.leadStatus}
            onBlur={() => props.handlerBlurEvent(props.leadStatus)}
            options={props.leadStatusOptions}
            isMulti={false}
            optionTitle='name'
            optionValue='id'
          />
          {isLeadStatusChanged && (
            <div
              className='card lead-date-status-container'
              style={{
                boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.2)',
                marginLeft: '-10px',
              }}
            >
              <ContentTitle title={Strings.leadStatusUpdateComment} />
              <div className='card-body'>
                <div className='row mb-6'>
                  <label className={`col-lg-4  col-form-label fw-bold fs-6`}>
                    {Strings.deadlineAndReminder}
                  </label>
                  <div className='col-lg-8'>
                    <div className='row mb-6'>
                    <div className='col-lg-6'>
                      <Input
                        type={'date'}
                        name= {props.deadLineDate}
                        value={formik.values.deadLineDate as string}
                        onBlur={() => props.handlerBlurEvent(props.deadLineReminder)}
                        overrides={{
                          ...allInputsStyles(currentTheme, INPUT_KEY),
                        }}
                        onChange={(e) => {
                          const dateValue = e.target.value
                          formik.setFieldValue(props.deadLineDate, dateValue)
                        }}
                      />
                    </div>
                    <div className='col-lg-6'>
                    <TimePicker
                   step={60}
                    onChange={date => formik.setFieldValue(props.deadLineTime, date)}
                    format="12"
                    value={formik.values.deadLineTime}
                    overrides={{
                        ...allInputsStyles(currentTheme, TIMER_PICKER_INPUT)
                    }}
                />
                    </div>
                    </div>
                  </div>
                  <TextArea
                    name={props.note}
                    label={Strings.notes}
                    formik={formik}
                    isRequired={false}
                    onBlur={() => props.handlerBlurEvent(props.note)}
                  />
                </div>
              </div>
            </div>
          )}
          <CustomDatePicker
            name={props.lastContactDate}
            label={Strings.lastContactDate}
            onBlur={props.handlerBlurEvent}
            title={Strings.lastContactDate}
            formik={formik}
          />
          <TextArea
            name={props.reason}
            label={Strings.reason}
            formik={formik}
            isRequired={false}
            onBlur={() => props.handlerBlurEvent(props.reason)}
          />
        </div>
      </div>
    </div>
  )
}

export default PersonalDetails
