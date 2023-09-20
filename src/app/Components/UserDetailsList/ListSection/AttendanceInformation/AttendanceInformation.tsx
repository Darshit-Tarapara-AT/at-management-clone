import React from 'react'
import { AttendanceInformationProps } from '../../index'
import { Strings } from 'app/resource/Strings'
import "react-datepicker/dist/react-datepicker.css";
import './AttendanceInformation.scss';
import { ContentTitle } from 'app/Components/ContentTitle/ContentTitle';
import DetailsFieldValues from 'app/Components/showDetails/DetailsFieldValues/DetailsFieldValues';

const AttendanceInformation: React.FC<AttendanceInformationProps> = ({ attendanceDetailsValues, ...props }) => {
  return (
    <div className='card mb-5 mb-xl-10 form-container'>
      <ContentTitle
        title={Strings.attendenceInformation}
        targetToggleId='#kt_account_salary_information'
      />
      <div id='kt_account_salary_information' className='collapse show'>
        <div className='card-body border-0 p-9'>
        {attendanceDetailsValues?.map((item, index) => {
            return <DetailsFieldValues key={index} label={item.label} value={item.value} />
          })}
        </div>
      </div>
    </div>
  )
}

export default AttendanceInformation
