import React from 'react'
import {ContentTitle} from '../../../../../Components/ContentTitle/ContentTitle'
import {Strings} from 'app/resource/Strings'
import 'react-datepicker/dist/react-datepicker.css'
import {PersonalDetailsProps} from '../../Modal/Modal'
import dummyImage from '_metronic/assets/image/dummy-image.jpg'
import './PersonalDetails.scss'
import {Message} from 'app/utils/AlertMessage'
import 'react-datepicker/dist/react-datepicker.css'
import {calculateFileSize} from 'app/utils/helper'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencil} from '@fortawesome/free-solid-svg-icons'
import {CustomInput} from '_metronic/helpers/components/Input/Input'
import CustomDatePicker from 'app/Components/DatePicker/DatePicker'

const PersonalDetails: React.FC<PersonalDetailsProps> = ({formik, ...props}) => {

  const fileUploaderChangeHandler = (event: React.BaseSyntheticEvent) => {
    if (!event.target?.files[0]?.size) return
    const isValidFileSize = calculateFileSize(event.target?.files[0]?.size)
    if (isValidFileSize) {
      formik.setFieldValue(props.profileUrl, event.target.files[0])
      return
    }
    formik.setFieldError(props.profileUrl, Strings.imageSizeError)
    Message('Oops!', 'error', Strings.imageSizeError)
  }

  return (
    <div className='card mb-5 mb-xl-10 form-container'>
      <ContentTitle
        title={Strings.generalInformation}
        className='border-bottom'
        targetToggleId='#kt_account_email_and_name_form'
      />
      <div id='kt_account_email_and_name_form' className='collapse show'>
        <div className='card-body border-0 p-9'>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>
              {Strings.avatar} (300px X 300px)
            </label>
            <div className='col-lg-8 fv-row profile-picture-controller'>
              <div
                onClick={() => props.removeProfilePictureHandler()}
                className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow remove-user-select-image-icon-container'
              >
                <i className='bi bi-x fs-2'></i>
              </div>
              <input
                id='file-input'
                accept='.png, .jpg, .jpeg'
                name={props.profileUrl}
                type='file'
                style={{opacity: 0, display: 'none'}}
                className='form-control form-control-lg form-control-solid file-uploader'
                onChange={(event: React.BaseSyntheticEvent) => fileUploaderChangeHandler(event)}
                onBlur={() => props.handlerBlurEvent(props.profileUrl)}
              />
              <label htmlFor='file-input' className='file-input-wrapper'>
                <div className='me-7 mb-4'>
                  <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative image-input image-input-outline'>
                    <img
                      src={props.profilePictureUrl || dummyImage}
                      alt='user profile'
                      className='image-input-wrapper w-125px h-125px'
                    />
                    <div className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow pencil-icon-container'>
                      <FontAwesomeIcon icon={faPencil} style={{color: '#a1a5b7'}} />
                    </div>
                  </div>
                </div>
              </label>
              {formik.errors.profileUrl && (formik.touched.profileUrl || formik.touched.userEmail) && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.profileUrl}</div>
                </div>
              )}
            </div>
          </div>
          <CustomDatePicker
            label={Strings.dateOfJoining}
            onBlur={props.handlerBlurEvent}
            name={props.joiningDate}
            formik={formik}
            isRequired = {false}
            />
          <CustomInput
            type='text'
            label={Strings.email}
            placeHolder={Strings.email}
            formilk={formik}
            name={props.userEmail}
            value={formik.values.userEmail}
            onBlur={() => props.handlerBlurEvent(props.userEmail)}
          />
          <CustomInput
            type='text'
            label={Strings.firstName}
            placeHolder={Strings.firstName}
            formilk={formik}
            hasEmojiValidationRequired = {true}
            name={props.firstName}
            value={formik.values.firstName}
            onBlur={() => props.handlerBlurEvent(props.firstName)}
          />
          <CustomInput
            type='text'
            label={Strings.lastName}
            placeHolder={Strings.lastName}
            formilk={formik}
            name={props.lastName}
            hasEmojiValidationRequired = {true}
            value={formik.values.lastName}
            onBlur={() => props.handlerBlurEvent(props.lastName)}
          />
          <CustomDatePicker
            label={Strings.birthDate}
            onBlur={props.handlerBlurEvent}
            name={props.birthDate}
            formik={formik}
            isRequired={true}
          />
          <CustomInput
            type='text'
            label={Strings.designation}
            placeHolder={Strings.designation}
            formilk={formik}
            name={props.designation}
            value={formik.values.designation}
            onBlur={() => props.handlerBlurEvent(props.designation)}
          />
          <CustomInput
            type='text'
            label={Strings.slackUrl}
            placeHolder={Strings.slackUrl}
            formilk={formik}
            name={props.slackUrl}
            value={formik.values.slackUrl}
            onBlur={() => props.handlerBlurEvent(props.slackUrl)}
          />
          <CustomInput
            type='text'
            label={Strings.slackUserName}
            placeHolder={Strings.slackUserName}
            formilk={formik}
            name={props.slackUserName}
            value={formik.values.slackUserName}
            onBlur={() => props.handlerBlurEvent(props.slackUserName)}
          />
          <CustomInput
            type='number'
            label={Strings.slackUserNumber}
            placeHolder={Strings.slackUserNumber}
            formilk={formik}
            name={props.slackUserNumber}
            value={formik.values.slackUserNumber}
            onBlur={() => props.handlerBlurEvent(props.slackUserNumber)}
          />
          <CustomInput
            type='text'
            label={Strings.contactEmail}
            placeHolder={Strings.contactEmail}
            formilk={formik}
            name={props.contactEmail}
            value={formik.values.contactEmail}
            onBlur={() => props.handlerBlurEvent(props.contactEmail)}
          />
        </div>
      </div>
    </div>
  )
}

export default PersonalDetails
