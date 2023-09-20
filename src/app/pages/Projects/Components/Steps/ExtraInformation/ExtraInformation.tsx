import React from 'react';
import { ContentTitle } from '../../../../../Components/ContentTitle/ContentTitle';
import { Strings } from 'app/resource/Strings';
import 'react-datepicker/dist/react-datepicker.css';
import { CustomInput } from '_metronic/helpers/components/Input/Input';
import { TextArea } from 'app/Components/TextArea/TextArea';
import SelectInput from 'app/Components/SelectInput/SelectInput';
import { ExtraProjectDetailsFormProps } from '../../Modal/Modal';
import dummyImage from '_metronic/assets/image/dummy-image.jpg';
import './ExtraInformation.scss';
import Tags from 'app/Components/Tags/Tags';
import BaseUICheckbox from 'app/Components/BaseUICheckbox/BaseUICheckbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { calculateFileSize } from 'app/utils/helper';
import { Message } from 'app/utils/AlertMessage';

const ExtraInformation: React.FC<ExtraProjectDetailsFormProps> = ({ formik, ...props }) => {
  const removeProfilePictureHandler = () => {
    props.setLogoURL("")
    formik.setFieldValue('logo', '')
  }

  const fileUploaderChangeHandler = (event: React.BaseSyntheticEvent) => {
    if (!event.target?.files[0]?.size) return
    const isValidFileSize = calculateFileSize(event.target?.files[0]?.size, 0.5)
    if (isValidFileSize) {
      formik.setFieldValue(props.logo, event.target.files[0])
      props.setLogoURL(() => {
        return URL.createObjectURL(event.target.files[0])
      })
      return
    }
    formik.setFieldError(props.logo, Strings.imageSizeLessThanFiveHundreadKb)
    Message('Oops!', 'error', Strings.imageSizeLessThanFiveHundreadKb)
  }

  return (
    <div className='card mb-5 mb-xl-10 form-container'>
      <ContentTitle title={Strings.generalDetails} targetToggleId='#kt_account_address_form' />
      <div id='kt_account_address_form' className='collapse show'>
        <div className='card-body border-0 p-9'>
          <BaseUICheckbox
            name={props.showInPortfolio}
            checked={formik.values.showInPortfolio}
            formik={formik}
            checkBoxTitle={Strings.showInPortfolio}/>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>
              {Strings.logo}
            </label>
            <div className='col-lg-8 fv-row project-logo-controller' >
              <div
                onClick={() => removeProfilePictureHandler()}
                className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow remove-image-icon-container'>
                <i className='bi bi-x fs-2'></i>
              </div>
              <input
                id='file-input'
                accept='.png, .jpg, .jpeg'
                name={props.logo}
                type='file'
                style={{ opacity: 0, display: 'none' }}
                className='form-control form-control-lg form-control-solid file-uploader'
                onChange={(event: React.BaseSyntheticEvent) => fileUploaderChangeHandler(event)}
                onBlur={() => props.handlerBlurEvent(props.logo)}/>
              <label htmlFor='file-input' className='file-input-wrapper'>
                <div className='me-7 mb-4'>
                  <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative image-input image-input-outline'>
                    <img
                      src={props.logoUrl ||  dummyImage}
                      alt='user profile'
                      className='image-input-wrapper w-125px h-125px'/>
                    <div className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow pencil-icon-container'>
                      <FontAwesomeIcon icon={faPencil} style={{ color: '#a1a5b7' }} />
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <SelectInput
            formik={formik}
            label={Strings.industries}
            name={props.industries}
            onBlur={props.handlerBlurEvent}
            options={props.industriesOptions}
            optionTitle='label'
            isRequired= {false}
            optionValue='value'
          />
          <SelectInput
            formik={formik}
            label={Strings.technologies}
            name={props.technologies}
            isMulti={true}
            onBlur={props.handlerBlurEvent}
            isRequired= {false}
            options={props.technologiesOptions}
            optionTitle='label'
            optionValue='value'
          />
          <Tags formik={formik} label={Strings.tags} name={props.tagInput} inputValue={formik.values.tagInput} tagValues={formik.values.tags} />
          <SelectInput
            formik={formik}
            label={Strings.tools}
            isRequired= {false}
            name={props.tools}
            onBlur={props.handlerBlurEvent}
            options={props.toolsOptions}
            isMulti={true}
            optionTitle='label'
            optionValue='value'
          />
          <TextArea
            name={props.description}
            label={Strings.description}
            isRequired= {false}
            title={Strings.enter +  Strings.description}
            formik={formik}
            onBlur={() => props.handlerBlurEvent(props.description)}
          />
          <CustomInput
            type='text'
            name={props.demoSite}
            isRequired= {false}
            value={formik.values.demoSite}
            placeHolder={Strings.enter +  Strings.demoSiteURL}
            formilk={formik}
            label={Strings.demoSiteURL}
            onBlur={() => props.handlerBlurEvent(props.demoSite)}
          />
          <TextArea
            name={props.demoSiteCredentials}
            label={Strings.demoSiteCredentials}
            title = {Strings.enter +  Strings.demoSiteCredentials}
            isRequired= {false}
            formik={formik}
            onBlur={() => props.handlerBlurEvent(props.demoSiteCredentials)}
          />
          <CustomInput
            type='text'
            label={Strings.liveSiteURL}
            isRequired= {false}
            name={props.liveSiteUrl}
            value={formik.values.liveSiteUrl}
            placeHolder={Strings.enter +   Strings.liveSiteURL}
            formilk={formik}
            onBlur={() => props.handlerBlurEvent(props.liveSiteUrl)}
          />
          <TextArea
            name={props.liveSiteCredentials}
            label={Strings.liveSiteCredential}
            formik={formik}
            title={Strings.enter +  Strings.liveSiteCredential}
            isRequired={false}
            onBlur={() => props.handlerBlurEvent(props.liveSiteCredentials)}/>
        </div>
      </div>
    </div>
  )
}

export default ExtraInformation
