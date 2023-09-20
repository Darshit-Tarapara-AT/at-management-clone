import React from 'react'
import { ContentTitle } from '../../../../../Components/ContentTitle/ContentTitle'
import { Strings } from 'app/resource/Strings'
import { LeadContactDetailsProps } from '../../Modal/Modal'
import 'react-datepicker/dist/react-datepicker.css';
import { CustomInput } from '_metronic/helpers/components/Input/Input';
import SelectInput from 'app/Components/SelectInput/SelectInput';
import country from 'app/assets/data/country.json'
import { TextArea } from 'app/Components/TextArea/TextArea';
const ContactDetails: React.FC<LeadContactDetailsProps> = ({ formik, ...props }) => {

  return (
    <div className='card mb-5 mb-xl-10 form-container'>
      <ContentTitle title={Strings.contactInformation} targetToggleId='#kt_account_address_form' />
      <div id='kt_account_address_form' className='collapse show'>
        <div className='card-body border-0 p-9'>
          <TextArea
            name={props.address}
            label={Strings.address}
            formik={formik}
            isRequired={false}
            onBlur={() => props.handlerBlurEvent(props.address)}
          />
          <CustomInput
            label={Strings.area}
            type='text'
            isRequired={false}
            name={props.area}
            value={formik.values.area}
            placeHolder={Strings.area}
            formilk={formik}
            onBlur={() => props.handlerBlurEvent(props.area)}
          />
          <SelectInput
            name={props.country}
            isRequired={false}
            formik={formik}
            onBlur={() => props.handlerBlurEvent(props.country)}
            options={country}
            optionTitle="name"
            optionValue='code'
            label={Strings.country}
            />
          <CustomInput
            type='text'
            label={Strings.state}
            name={props.state}
            isRequired={false}
            value={formik.values.state}
            placeHolder={Strings.state}
            formilk={formik}
            onBlur={() => props.handlerBlurEvent(props.state)}
            />
          <CustomInput
            label={Strings.city}
            type='text'
            isRequired={false}
            name={props.city}
            value={formik.values.city}
            placeHolder={Strings.city}
            formilk={formik}
            onBlur={() => props.handlerBlurEvent(props.city)}
          />
          <CustomInput
            label={Strings.postalCode}
            type='number'
            name={props.postalCode}
            isRequired={false}
            value={formik.values.postal_code}
            placeHolder={Strings.postalCode}
            formilk={formik} onBlur={() => props.handlerBlurEvent(props.postalCode)}
          />
          <SelectInput
            name={props.firstContactSource}
            formik={formik}
            onBlur={() => props.handlerBlurEvent(props.firstContactSource)}
            options={props.firstContactSourceOptions}
            optionTitle="name"
            optionValue='id'
            isRequired={false}
            label={Strings.firstContactSource}
          />
          <TextArea
            name={props.comments}
            label={Strings.comment}
            formik={formik}
            isRequired={false}
            onBlur={() => props.handlerBlurEvent(props.comments)}
          />
        </div>
      </div>
    </div>
  )
}

export default ContactDetails
