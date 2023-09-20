import React from 'react'
import {ItextAreaProps} from '.'
import {FormikKeys} from './index'
import {Textarea} from 'baseui/textarea'
import Style from 'config/colors/colors'
import { Strings } from 'app/resource/Strings'
import { useSelector } from 'react-redux'
import { IRootState } from 'app/redux/store'
import { TEXT_AREA_KEY, allInputsStyles } from 'config/InputStyles/InputStyles'
export const TextArea: React.FC<ItextAreaProps> = ({
  formik,
  label,
  name,
  isReadOnly = false,
  value,
  className = '',
  title = '',
  rows,
  placeholder = '',
  isRequired = true,
  onBlur,
}) => {
  const isTouched: FormikKeys = formik.touched
  const error: FormikKeys = formik.errors
  const textFieldValue: FormikKeys = formik.values
  const { currentTheme } = useSelector((state: IRootState) => state.UIStateData);
  return (
    <div className='row mb-6'>
      <label
        htmlFor={name}
        className={`col-lg-${4} col-form-label ${isRequired && 'required'} fw-bold fs-6`}
      >
        {label.replaceAll(Strings.enter, "")}
      </label>
      <div className={`col-lg-${8} fv-row ${className}`}>
        <Textarea
          id={name}
          autoComplete='off'
          readOnly={isReadOnly}
          placeholder={placeholder ? placeholder :  (label || title)
          }
          rows={rows || 3}
          overrides={{
            ...allInputsStyles(currentTheme, TEXT_AREA_KEY)
          }}
          {...formik.getFieldProps(name)}
          onBlur={() => {
            if (onBlur) {
              onBlur(name)
            }
          }}
          value={value ? value : textFieldValue[name]}
        />
        {isTouched[name] && error[name] && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>{error[name]}</div>
          </div>
        )}
      </div>
    </div>
  )
}
