import React from 'react'
import { SalaryInformationProps } from '../../index'
import "react-datepicker/dist/react-datepicker.css";
import './SalaryInformation.scss';
import { ContentTitle } from 'app/Components/ContentTitle/ContentTitle';
import DetailsFieldValues from '../../../showDetails/DetailsFieldValues/DetailsFieldValues';

const SalaryInformation: React.FC<SalaryInformationProps> = ({ salaryDetailsValues, ...props }) => {

  return (
    <div className='card mb-2 mb-xl-10 form-container'>
      <ContentTitle
        title={props.title}
        targetToggleId='#kt_account_salary_information'
      />
      <div id='kt_account_salary_information' className='collapse show'>
        <div className='card-body border-0 p-9'>
        {salaryDetailsValues?.map((item, index) => {
            return <DetailsFieldValues key={index} label={item.label} value={item.value} />
          })}
        </div>
      </div>
    </div>
  )
}

export default SalaryInformation
