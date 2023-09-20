import { CustomCheckBoxProps } from 'app/Modal/Modal'
import React from 'react'

const CustomCheckBox: React.FC<CustomCheckBoxProps> = (props) => {
const isChecked = Number(props.formilk!.values.defaultRole) === Number(props.value) ? true : false

  const changeHandler = (e: React.BaseSyntheticEvent, value: string) => {
    props.formilk!.setFieldValue(props.name, value);
  }
  return (
    <div className='form-check form-check-custom form-check-solid'>
      <input
        className='form-check-input me-3'
        name={props.name}
        checked={isChecked}
        value={props.value}
        type={props.type}
        onChange={(e) => changeHandler(e, props.value)}
        id={props.label}
      />
      <label className='form-check-label' htmlFor={props.label}>
        <div className='fw-bolder text-gray-800'>
          {props.label}
        </div>
      </label>
    </div>
  )
}

export default CustomCheckBox
