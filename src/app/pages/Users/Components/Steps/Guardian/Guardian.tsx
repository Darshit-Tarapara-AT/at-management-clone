import React from 'react'
import { ContentTitle } from '../../../../../Components/ContentTitle/ContentTitle'
import { Strings } from 'app/resource/Strings'
import { GuardianInputFieldProps } from '../../Modal/Modal'
import './Guardian.scss';
import { Textarea } from 'baseui/textarea';
import { Input } from 'baseui/input';
import Style from 'config/colors/colors';
import { useSelector } from 'react-redux';
import { IRootState } from 'app/redux/store';
import { INPUT_KEY, TEXT_AREA_KEY, allInputsStyles } from 'config/InputStyles/InputStyles';

interface InputProps {
  $isFocused: boolean
}
const Guardian: React.FC<GuardianInputFieldProps> = ({ formik, ...props }) => {
  const { currentTheme } = useSelector((state: IRootState) => state.UIStateData);
  const inputTagStyle = {
    ...allInputsStyles(currentTheme, INPUT_KEY)
  }

  const textAreaStyle = {
    ...allInputsStyles(currentTheme, TEXT_AREA_KEY)
  }
  return (
    <div className='card mb-4 mb-xl-4 form-container'>
      <ContentTitle title={Strings.guardian} targetToggleId='#kt_guardian' />
      <div id='kt_guardian' className='collapse show'>
        <div className='card-body border-0 px-15'>
          <div className="row mb-6">
            <label className="col-lg-4 col-form-label fw-bold fs-6"></label>
            <label className="col-lg-4 col-form-label fw-bold fs-6">{Strings.primary}</label>
            <label className="col-lg-4 col-form-label  fw-bold fs-6">{Strings.secondary}</label>
          </div>
          <div className='row mb-6'>
            <label className="col-lg-4 col-form-label required fw-semibold fs-6">{Strings.name}</label>
            <div className="col-lg-4 fv-row">
              <Input
                type={"text"}
                placeholder={`${Strings.enter} ${Strings.parentName}`}
                {...formik.getFieldProps(props.guardianFirstPersonName)}
                onBlur={() => {
                  props.handlerBlurEvent(props.guardianFirstPersonName)
                }}
                value={formik.values.guardianFirstPersonName}
                autoComplete='off'
                id={props.guardianFirstPersonName}
                wfd-id="id21"
                overrides={{
                  ...allInputsStyles(currentTheme, INPUT_KEY)
                }}
              />
              {formik.touched.guardianFirstPersonName && formik.errors.guardianFirstPersonName && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.guardianFirstPersonName}</div>
                </div>
              )}
            </div>
            <div className="col-lg-4 fv-row">
              <Input
                type={"text"}
                placeholder={`${Strings.enter} ${Strings.parentName}`}
                {...formik.getFieldProps(props.guardianSecondPersonName)}
                onBlur={() => {
                  props.handlerBlurEvent(props.guardianSecondPersonName)
                }}
                value={formik.values.guardianSecondPersonName}
                autoComplete='off'
                id={props.guardianSecondPersonName}
                wfd-id="id21"
                overrides={{
                  ...inputTagStyle
                }}
              />
              {formik.touched.guardianSecondPersonName && formik.errors.guardianSecondPersonName && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.guardianSecondPersonName}</div>
                </div>
              )}
            </div>
          </div>

          <div className='row mb-6'>
            <label className="col-lg-4 col-form-label required fw-semibold fs-6">{Strings.contactNumber}</label>
            <div className="col-lg-4 fv-row">
              <Input
                type={"text"}
                placeholder={`${Strings.enter} ${Strings.contactNumber}`}
                {...formik.getFieldProps(props.guardianFirstPersonContactNumber)}
                onBlur={() => {
                  props.handlerBlurEvent(props.guardianFirstPersonContactNumber)
                }}
                value={formik.values.guardianFirstPersonContactNumber}
                autoComplete='off'
                id={props.guardianFirstPersonContactNumber}
                wfd-id="id21"
                overrides={{
                  ...inputTagStyle
                }}
              />
              {formik.touched.guardianFirstPersonContactNumber && formik.errors.guardianFirstPersonContactNumber && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.guardianFirstPersonContactNumber}</div>
                </div>
              )}
            </div>
            <div className="col-lg-4 fv-row">
              <Input
                type={"text"}
                placeholder={`${Strings.enter} ${Strings.contactNumber}`}
                {...formik.getFieldProps(props.guardianSecondPersonContactNumber)}
                onBlur={() => {
                  props.handlerBlurEvent(props.guardianSecondPersonContactNumber)
                }}
                value={formik.values.guardianSecondPersonContactNumber}
                autoComplete='off'
                id={props.guardianSecondPersonContactNumber}
                wfd-id="id21"
                overrides={{
                  ...inputTagStyle
                }}
              />
              {formik.touched.guardianSecondPersonContactNumber && formik.errors.guardianSecondPersonContactNumber && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.guardianSecondPersonContactNumber}</div>
                </div>
              )}
            </div>
          </div>

          <div className='row mb-6'>
            <label className="col-lg-4 col-form-label required fw-semibold fs-6">{`${Strings.enter} ${Strings.address}`}</label>
            <div className="col-lg-4 fv-row">
              <Textarea
                autoComplete='off'
                placeholder={`${Strings.enter} ${Strings.address}`}
                rows={3}
                overrides={{
                ...textAreaStyle
                }}
                {...formik.getFieldProps(props.guardianFirstPersonAddress)}
                onBlur={() => {
                  props.handlerBlurEvent(props.guardianFirstPersonAddress)
                }}
                value={formik.values.guardianFirstPersonAddress} />
              {formik.touched.guardianFirstPersonAddress && formik.errors.guardianFirstPersonAddress && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.guardianFirstPersonAddress}</div>
                </div>
              )}
            </div>
            <div className="col-lg-4 fv-row">
              <Textarea
                autoComplete='off'
                placeholder={`${Strings.enter} ${Strings.address}`}
                rows={3}
                overrides={{
                  ...textAreaStyle
                }}
                {...formik.getFieldProps(props.guardianSecondPersonAddress)}
                onBlur={() => {
                  props.handlerBlurEvent(props.guardianSecondPersonAddress)
                }}
                value={formik.values.guardianSecondPersonAddress} />
              {formik.touched.guardianSecondPersonAddress && formik.errors.guardianSecondPersonAddress && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.guardianSecondPersonAddress}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Guardian
