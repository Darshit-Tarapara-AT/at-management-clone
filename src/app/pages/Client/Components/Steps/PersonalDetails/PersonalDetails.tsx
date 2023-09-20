import React from 'react'
import { ContentTitle } from '../../../../../Components/ContentTitle/ContentTitle'
import './PersonalDetails.scss';
import { Strings } from 'app/resource/Strings'
import "react-datepicker/dist/react-datepicker.css";
import { ClientPersonalDetailsProps } from '../../Modal/Modal'
import 'react-datepicker/dist/react-datepicker.css';
import { CustomInput } from '_metronic/helpers/components/Input/Input';


const PersonalDetails: React.FC<ClientPersonalDetailsProps> = ({ formik, ...props }) => {

  return (
    <div className='card mb-5 mb-xl-10 mt-xl-1 mt-10'>
      <ContentTitle title={Strings.personDetails} targetToggleId='#kt_account_email_and_name_form' />
      <div id='kt_account_email_and_name_form' className='collapse show'>
        <div className='card-body border-0 p-9'>
          <CustomInput
            type='text'
            placeHolder={Strings.enterName}
            formilk={formik}
            name={props.name}
            label={Strings.name}
            value={formik.values.name}
            onBlur={() => props.handlerBlurEvent(props.name)} 
            />
          <CustomInput
            type='email'
            placeHolder={Strings.enterEmail}
            isRequired= {false}
            label={Strings.email}
            formilk={formik}
            name={props.email}
            value={formik.values.email}
            onBlur={() => props.handlerBlurEvent(props.email)} />
          <CustomInput
            type='text'
            label={Strings.companyName}
            isRequired= {false}
            placeHolder={Strings.enterCompanyName}
            formilk={formik}
            name={props.companyName}
            value={formik.values.company_name}
            onBlur={() => props.handlerBlurEvent(props.companyName)} />
          <CustomInput
            type='text'
            placeHolder={Strings.addWebsite}
            formilk={formik}
            label={Strings.website}
            isRequired= {false}
            name={props.website}
            value={formik.values.website}
            onBlur={() => props.handlerBlurEvent(props.website)}
          />
          <CustomInput
            type='number'
            placeHolder={Strings.enterPhoneNumber}
            label={Strings.phone}
            formilk={formik}
            name={props.phone}
            isRequired= {false}
            value={formik.values.phone}
            onBlur={() => props.handlerBlurEvent(props.phone)}
          />

          <CustomInput
            type='number'
            placeHolder={Strings.enterMobileNumber}
            formilk={formik}
            name={props.mobile}
            label={Strings.mobile}
            isRequired= {false}
            value={formik.values.mobile}
            onBlur={() => props.handlerBlurEvent(props.mobile)}
          />
          <CustomInput
            type='text'
            placeHolder={Strings.addSkyId}
            formilk={formik}
            label={Strings.skypeId}
            isRequired= {false}
            name={props.skypeId}
            value={formik.values.skype_id}
            onBlur={() => props.handlerBlurEvent(props.skypeId)}
          />
          <CustomInput
            type='text'
            placeHolder={Strings.addLinkedInUrl}
            formilk={formik}
            label={Strings.linkedinURL}
            name={props.linkedinUrl}
            isRequired= {false}
            value={formik.values.linkedin_url}
            onBlur={() => props.handlerBlurEvent(props.linkedinUrl)} />
        </div>
      </div>
    </div>

  )
}

export default PersonalDetails
