import React from 'react'
import {ContentTitle} from '../../../../../Components/ContentTitle/ContentTitle'
import {Strings} from 'app/resource/Strings'
import {ContactDetailsProps} from '../../Modal/Modal'
import 'react-datepicker/dist/react-datepicker.css'
import {CustomInput} from '_metronic/helpers/components/Input/Input'
import SelectInput from 'app/Components/SelectInput/SelectInput'
import {TextArea} from 'app/Components/TextArea/TextArea'
import usersOptions from 'app/assets/data/user.json'
import {setSelectInputOptions} from 'app/utils/helper'

const ContactDetails: React.FC<ContactDetailsProps> = ({formik, ...props}) => {
  const statusOptions = usersOptions.user.status

  return (
    <div className='card mb-5 mb-xl-10 form-container'>
      <ContentTitle title={Strings.addressContact} targetToggleId='#kt_account_address_form' />
      <div id='kt_account_address_form' className='collapse show'>
        <div className='card-body border-0 p-9'>
          <TextArea
            name={props.address}
            label={Strings.address}
            formik={formik}
            isRequired={true}
            onBlur={() => props.handlerBlurEvent(props.address)}
          />
          <TextArea
            name={props.area}
            label={Strings.area}
            formik={formik}
            isRequired={true}
            onBlur={() => props.handlerBlurEvent(props.area)}
          />
          <SelectInput
            name={props.state}
            formik={formik}
            onBlur={() => props.handlerBlurEvent(props.state)}
            options={props.stateOptions}
            optionTitle='name'
            optionValue='code'
            label={Strings.state}
          />

          <CustomInput
            label={Strings.city}
            type='text'
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
            value={formik.values.postalCode}
            placeHolder={Strings.postalCode}
            formilk={formik}
            onBlur={() => props.handlerBlurEvent(props.postalCode)}
          />
          <CustomInput
            label={Strings.mobileNumber}
            type='number'
            name={props.mobile}
            value={formik.values.mobile}
            placeHolder={Strings.mobileNumber}
            formilk={formik}
            onBlur={() => props.handlerBlurEvent(props.mobile)}
          />
          <SelectInput
            name={props.status}
            formik={formik}
            onBlur={() => props.handlerBlurEvent(props.status)}
            options={setSelectInputOptions(statusOptions)}
            optionTitle='name'
            optionValue='id'
            label={Strings.status}
          />
          <CustomInput
            label={Strings.alternativeMobileNumber}
            type='number'
            name={props.altMobile}
            value={formik.values.altMobile}
            placeHolder={Strings.alternativeMobileNumber}
            formilk={formik}
            onBlur={() => props.handlerBlurEvent(props.altMobile)}
          />
        </div>
      </div>
    </div>
  )
}

export default ContactDetails
