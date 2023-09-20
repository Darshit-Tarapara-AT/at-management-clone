/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { DatePickerProps } from 'app/pages/Users/Components/Modal/Modal'
import './DatePicker.scss'
import { FormikKeys } from '../TextArea'
import { Input } from 'baseui/input'
import { useSelector } from 'react-redux'
import { IRootState } from 'app/redux/store'
import { INPUT_KEY, allInputsStyles } from 'config/InputStyles/InputStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'

const CustomDatePicker: React.FC<DatePickerProps> = ({ formik, disabled, isTimeAlsoRequired = false, isRequired = true, name, maxDate, title, min, label, onBlur }) => {
  const formikValues: FormikKeys = formik.values
  const isTouched: FormikKeys = formik.touched
  const error: FormikKeys = formik.errors
  const {currentTheme} = useSelector((state: IRootState) => state.UIStateData )
  useEffect(() => {
    const currentInput = document.getElementById(name);
    if (min && currentInput) {
      currentInput?.setAttribute("min", min);
    }
  }, [min]);
  return (
    <div className='row mb-8'>
      <label htmlFor={name} className={`col-lg-${4} col-form-label ${isRequired && "required"} fw-bold fs-6 `}>
        {label}
      </label>
      <div className={`col-lg-${8} fv-row date-picker-container`} onBlur={() => onBlur!(name)}>
        <Input
          type={"date"}
          id={name}
          onBlur={() => onBlur && onBlur!(name)}
          overrides={{
            ...allInputsStyles(currentTheme, INPUT_KEY)
          }}
          value={Array.isArray(formikValues[name]) ? formikValues[name][0] : formikValues[name]}
          onChange={(e) => {
            const dateValue = e.target.value
               if (e) {
              if (isTimeAlsoRequired) {
                formik.setFieldValue(name, dateValue)
                return
              }
              if(!Array.isArray(dateValue)) {
                formik.setFieldValue(name, dateValue)
                return
              }
              formik.setFieldValue(name, dateValue)
            }
        }}
      />
      <FontAwesomeIcon icon={faCalendar} className='calender-icon'/>
      {isTouched[name] && error[name] && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>{error[name]}</div>
        </div>
      )}
       </div>
    </div>
  )
}

export default CustomDatePicker
