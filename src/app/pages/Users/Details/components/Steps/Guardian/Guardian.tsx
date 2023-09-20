import React from 'react'
import { Strings } from 'app/resource/Strings'
import { GuardianInputFieldProps } from '../../Modal/Modal'
import { CustomInput } from '_metronic/helpers/components/Input/Input';
import { TextArea } from 'app/Components/TextArea/TextArea';
import { ContentTitle } from 'app/Components/ContentTitle/ContentTitle';
import './Guardian.scss';
const Guardian: React.FC<GuardianInputFieldProps> = ({ formik, ...props }) => {
  return (
    <div className='card mb-3 mb-xl-3 form-container'>
      <ContentTitle title={Strings.parentsHusbandGuardian} targetToggleId='#kt_guardian' />
      <div id='kt_guardian' className='collapse show'>
        <div className='card-body border-0 p-9'>
          <div className='row mb-6'>
            <div className='col-12 col-lg-6 col-md-6'>
              <ContentTitle className='guardian-title' title={Strings.parentsHusbandGuardianOne} targetToggleId='#kt_guardian_first_person' />
              <CustomInput
                isReadOnly={true}
                label={Strings.name}
                col={9}
                labelCol = {3}
                name={props.guardianFirstPersonName}
                formilk={formik}
                value={props.guardianFirstPersonName}
                placeHolder={''}
                type={'text'}
              />
              <CustomInput
                isReadOnly={true}
                col={9}
                labelCol = {3}
                label={Strings.contactNumber}
                name={props.guardianFirstPersonContactNumber}
                formilk={formik}
                placeHolder={''}
                value={props.guardianFirstPersonContactNumber}
                type={'text'}
              />
              <TextArea
                isReadOnly={true}
                value={props.guardianFirstPersonAddress}
                label={Strings.address}
                name={props.guardianFirstPersonAddress}
                formik={formik}
                col={9}
                labelCol = {3}
              />
            </div>
            <div className='col-12 col-lg-6 col-md-6'>
              <ContentTitle className='second-guardian-details-title' title={Strings.parentsHusbandGuardianTwo} targetToggleId='#kt_guardian_first_person' />
              <CustomInput
                isReadOnly={true}
                name={props.guardianSecondPersonName}
                formilk={formik}
                col={9}
                labelCol = {3}
                isRequired={false}
                placeHolder={''}
                value={props.guardianSecondPersonName}
                type={'text'}
              />

              <CustomInput
                isReadOnly={true}
                name={props.guardianSecondPersonContactNumber}
                formilk={formik}
                isRequired={false}
                col={9}
                labelCol = {3}
                value={props.guardianSecondPersonContactNumber}
                placeHolder={''}
                type={'text'}
              />
              <TextArea
                isReadOnly={true}
                isRequired={false}
                label={Strings.noString}
                value={props.guardianSecondPersonAddress}
                name={props.guardianSecondPersonAddress}
                formik={formik}
                col={9}
                labelCol = {3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Guardian
