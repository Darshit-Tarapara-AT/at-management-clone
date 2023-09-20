import React from 'react'
import {Strings} from 'app/resource/Strings'
import 'react-datepicker/dist/react-datepicker.css'
import {PersonalDetailsProps} from '../../index'
import './PersonalDetails.scss'
import 'react-datepicker/dist/react-datepicker.css'
import {ContentTitle} from 'app/Components/ContentTitle/ContentTitle'
import DetailsFieldValues from '../../../showDetails/DetailsFieldValues/DetailsFieldValues'

const PersonalDetails: React.FC<PersonalDetailsProps> = ({personalDetailsValues,buttonText, ...props}) => {
  return (
    <div className='card mb-5 mb-xl-10 form-container'>
      <ContentTitle title={Strings.emailName} isEditAllow ={props.isPermission} targetToggleId='#kt_account_email_and_name_form' path={props.path} buttonText={buttonText}/>
      <div id='kt_account_email_and_name_form' className='collapse show'>
        <div className='card-body border-0 p-9'>
          {personalDetailsValues?.map((item, index) => {
            return <DetailsFieldValues key={index} label={item.label} value={item.value} />
          })}
        </div>
      </div>
    </div>
  )
}

export default PersonalDetails
