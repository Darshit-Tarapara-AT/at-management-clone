import React from 'react'
import { ContentTitle } from '../../../../../Components/ContentTitle/ContentTitle'
import { Strings } from 'app/resource/Strings'
import "react-datepicker/dist/react-datepicker.css";
import './AttendanceInformation.scss';
import { CustomInput } from '_metronic/helpers/components/Input/Input';
import CustomTimePicker from 'app/Components/CustomTimePicker/CustomTimePicker';
import { AddAttendanceInformationProps } from '../../Modal/Modal';

const AttendanceInformation: React.FC<AddAttendanceInformationProps> = ({ formik, ...props }) => {

  return (
    <div className='card mb-5 mb-xl-10 form-container'>
      <ContentTitle
        title={Strings.attendenceInformation}
        targetToggleId='#kt_account_attendance_information'
      />
      <div id='kt_account_attendance_information' className='collapse show'>
        <div className='card-body border-0 p-9'>
          <CustomInput
            label={Strings.fullDayMinutes}
            name={props.fullDayMinutes}
            formilk={formik}
            onBlur={props.handlerBlurEvent}
            placeHolder={Strings.fullDayMinutes}
            value={formik.values.fullDayMinutes}
            type={'number'}
          />
          <CustomInput
            label={Strings.halfDayMinutes}
            name={props.halfDayMinutes}
            formilk={formik}
            onBlur={props.handlerBlurEvent}
            value={formik.values.halfDayMinutes}
            placeHolder={Strings.halfDayMinutes}
            type={'number'}
          />
          <CustomInput
            label={Strings.earlyDayMinutes}
            name={props.earlyDayMinutes}
            onBlur={props.handlerBlurEvent}
            formilk={formik}
            value={formik.values.earlyDayMinutes}
            placeHolder={Strings.earlyDayMinutes}
            type={'number'}
          />
          <CustomTimePicker
            name={props.lateEntryTime}
            formik={formik}
            label={Strings.lateEntryTime}
            onBlur={props.handlerBlurEvent}
          />
        </div>
      </div>
    </div>
  )
}

export default AttendanceInformation
