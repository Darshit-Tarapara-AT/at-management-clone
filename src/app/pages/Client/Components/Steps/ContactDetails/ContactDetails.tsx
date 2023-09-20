import React from 'react'
import { ContentTitle } from '../../../../../Components/ContentTitle/ContentTitle'
import { Strings } from 'app/resource/Strings'
import { ClientContactDetailsProps } from '../../Modal/Modal'
import 'react-datepicker/dist/react-datepicker.css';
import { CustomInput } from '_metronic/helpers/components/Input/Input';
import country from 'app/assets/data/country.json'
import { TextArea } from 'app/Components/TextArea/TextArea';
import SelectInput from 'app/Components/SelectInput/SelectInput';

const ContactDetails: React.FC<ClientContactDetailsProps> = ({ formik, ...props }) => {

  return (
    <div className='card mb-5 mb-xl-10 mt-xl-10 mt-10'>
      <ContentTitle title={Strings.addressContact} targetToggleId='#kt_account_address_form' />
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
            type='text'
            name={props.area}
            value={formik.values.area}
            isRequired={false}
            label={Strings.area}
            placeHolder={Strings.enterArea}
            formilk={formik}
            onBlur={() => props.handlerBlurEvent(props.area)}
          />
          <SelectInput
            name={props.country}
            formik={formik}
            isRequired={false}
            onBlur={() => props.handlerBlurEvent(props.country)}
            options={country}
            optionTitle="name"
            optionValue='code'
            label={Strings.country}

          />

          <CustomInput
            type='text'
            name={props.state}
            value={formik.values.state}
            isRequired={false}
            placeHolder={Strings.enterState}
            label={Strings.state}
            formilk={formik}
            onBlur={() => props.handlerBlurEvent(props.state)}
          />
          <CustomInput
            type='text'
            name={props.city}
            value={formik.values.city}
            isRequired={false}
            placeHolder={Strings.enterCity}
            formilk={formik}
            label={Strings.city}
            onBlur={() => props.handlerBlurEvent(props.city)}
          />
          <CustomInput
            type='number'
            isRequired={false}
            name={props.postalCode}
            value={formik.values.postal_code}
            placeHolder={Strings.enterPostalCode}
            label={Strings.postalCode}
            formilk={formik}
            onBlur={() => props.handlerBlurEvent(props.postalCode)}
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
