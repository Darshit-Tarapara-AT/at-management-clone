import React from 'react'
import {ContentTitle} from '../../../../../Components/ContentTitle/ContentTitle'
import {Strings} from 'app/resource/Strings'
import 'react-datepicker/dist/react-datepicker.css'
import {LeadInformationProps} from '../../Modal/Modal'
import 'react-datepicker/dist/react-datepicker.css'
import {CustomInput} from '_metronic/helpers/components/Input/Input'
import {TextArea} from 'app/Components/TextArea/TextArea'
import SelectInput from 'app/Components/SelectInput/SelectInput'
import { Tag,  VARIANT as TAG_VARIANT } from 'baseui/tag'

const LeadInformation: React.FC<LeadInformationProps> = ({formik, ...props}) => {
 
  const leadContactEmailChangeHandler = () => {
    const emailTag = formik.values.lead_contact_email;
    const emailInput =formik.values.contactEmailValue;
    if(!emailTag.includes(emailInput) && !formik.errors["contactEmailValue"] && emailInput) {
      formik.setFieldValue(props.leadContactEmail, [...emailTag, emailInput])
      formik.setFieldValue("contactEmailValue", "")
    }
  }
  const removeEmailTag = (tag: string) => {
    const tags = formik.values.lead_contact_email.filter((t:string) => t !== tag)
    formik.setFieldValue(props.leadContactEmail, tags);
};
  return (
    <div className='card mb-5 mb-xl-10 form-container'>
      <ContentTitle
        title={Strings.leadInformation}
        targetToggleId='#kt_account_email_and_name_form'
      />
      <div id='kt_account_email_and_name_form' className='collapse show'>
        <div className='card-body border-0 p-9'>
          <CustomInput
            type='text'
            label={Strings.leadTitle}
            placeHolder={Strings.leadTitle}
            formilk={formik}
            isRequired ={false}
            name={props.leadTitle}
            value={formik.values.lead_title}
            onBlur={() => props.handlerBlurEvent(props.leadTitle)}
          />
          <TextArea
            name={props.leadDescription}
            label={Strings.leadDescription}
            formik={formik}
            isRequired={false}
            onBlur={() => props.handlerBlurEvent(props.leadDescription)}
          />
          <SelectInput
            formik={formik}
            label={Strings.leadRegularContactSource}
            name={props.leadRegularContactSource}
            onBlur={() => props.handlerBlurEvent(props.leadRegularContactSource)}
            options={props.regularContactSource}
            isMulti={false}
            optionTitle='name'
            optionValue='id'
          />
          <CustomInput
            label={Strings.givenPrice}
            type='text'
            isRequired ={false}
            placeHolder={Strings.givenPrice}
            formilk={formik}
            name={props.givenPrice}
            value={formik.values.given_price}
            onBlur={() => props.handlerBlurEvent(props.givenPrice)}
          />
           <TextArea
            name={"reason"}
            label={Strings.reason}
            formik={formik}
            isRequired={false}
            onBlur={() => props.handlerBlurEvent("reason")}
          />
          <CustomInput
            type='text'
            placeHolder={Strings.contactUrl}
            formilk={formik}
            name={props.contactUrl}
            isRequired ={false}
            label={Strings.contactUrl}
            value={formik.values.contact_url}
            onBlur={() => props.handlerBlurEvent(props.contactUrl)}
          />
          <CustomInput
            type='email'
            label={Strings.leadContactEmail}
            isRequired={false}
            isPlusIconRequired = {true}
            onPlusButtonClick={leadContactEmailChangeHandler}
            placeHolder={Strings.leadContactEmail}
            formilk={formik}
            name={props.contactEmailValue}
            value={formik.values.contactEmailValue}
            onBlur={() => props.handlerBlurEvent(props.contactEmailValue)}
          />
            <div className='row mb-5'>
            <div className='col-4'></div>
            <div className='col-8'>
            {formik.values?.lead_contact_email?.map((tag: string, index: number) => (
                    <Tag
                        variant={TAG_VARIANT.solid}
                        key={index}
                        onActionClick={() => removeEmailTag(tag)}
                        overrides={{
                          Root: {
                            style: ({ $theme }) => ({
                              backgroundColor: "#a7a7a7"
                            })
                          },
                          Text: {
                            style: ({ $theme }) => ({ width: "max-content" , maxWidth: "400px"})
                          }
                        }}
                    >
                        {tag}
                    </Tag>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadInformation