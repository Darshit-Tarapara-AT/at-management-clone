  import React, { useEffect } from 'react'
import { Select } from 'baseui/select'
import { ISelectInputProps } from '.'
import { FormikKeys } from '../TextArea'
import Style from 'config/colors/colors'
import { Strings } from 'app/resource/Strings'
import { IRootState } from 'app/redux/store'
import { useSelector } from 'react-redux'
import { SELECT_INPUT_KEY, allInputsStyles } from 'config/InputStyles/InputStyles'
import './SelectInput.scss'
const NoDataFoundMessage = () => (
  <div style={{ padding: '50px', textAlign: 'center' }} className='form-control form-control-lg form-control-solid'>
    {Strings.noTasksFound}
  </div>
);

const SelectInput: React.FC<ISelectInputProps> = ({
  formik,
  label,
  className,
  optionTitle,
  name,
  onBlur,
  isRequired = true,
  options,
  onChange,
  isClearable = true,
  optionValue,
  isMulti = false,

}) => {
  const { currentTheme } = useSelector((state: IRootState) => state.UIStateData);
  const isTouched: FormikKeys = formik.touched
  const error: FormikKeys = formik.errors
  const selectFieldValue: FormikKeys = formik.values

  const showOptions = options.map((option: any, index: number) => {
    return {
      label: option[optionTitle],
      id: option[optionValue],
    }
  })

  const removeZIndexOfDatePicker = () => {
    const datePickerInput = document.querySelector(".date-picker-container");
    datePickerInput?.classList.add("hide-zindex-of-date-picker",)
  }

  const addZIndexOfDatePicker = () => {
    const datePickerInput = document.querySelector(".date-picker-container");
    datePickerInput?.classList.remove("hide-zindex-of-date-picker",)
  }

const selectInputStyle =  {
  ...allInputsStyles(currentTheme, SELECT_INPUT_KEY)
}
  const multiSelectInputChangeHandler = (selectItem: { label: string, id: string }[]) => {
    formik.setFieldValue(name, [...selectItem]);
  };
  
  const showNoFoundMessage = () => {
      return <NoDataFoundMessage />;
  };



  const renderDropdown = () => {
    if (showOptions.length === 0) {
      return (
        <Select
        options={options}
        placeholder={`${Strings.select} ${label}`}
        value={selectFieldValue[name]}
        overrides={{
          ...selectInputStyle,
          Dropdown: {
            style: () => ({
              width: Style.darkTheme.selectInput.dropdownWidth,
              zIndex: 9999
            }),
            component: showNoFoundMessage } }}
      />
      );
    }

    return (
      <Select
      multi={isMulti}
      placeholder={`${Strings.select} ${label}`}
      clearable={isClearable}
      id={name}
      closeOnSelect={!isMulti}
      onOpen={() =>removeZIndexOfDatePicker()}
      onClose={() => addZIndexOfDatePicker()}
      options={showOptions.length > 0 ? showOptions : [{ value: '', id: `select-${label}` }]}
      onChange={(param) => {
        const selectedValue = [...param.value] as { label: string, id: string }[];
        if (isMulti) {
          multiSelectInputChangeHandler(selectedValue);
          return;
        }
        formik.setFieldValue(name, param.value);
        if (onChange) {
          onChange(selectedValue);
        }
      }}
      value={selectFieldValue[name]}
      onBlur={() => onBlur(name)}
      overrides={{
        ...selectInputStyle,
        Dropdown: {
          style: () => ({
            width: Style.darkTheme.selectInput.dropdownWidth
          }),

          } }}
    />
    );
  };

  return (
    <div className={`row mb-6 ${className || ''}`}>
      <label
        htmlFor={name}
        className={`col-lg-4 col-form-label ${isRequired && 'required'}  fw-bold fs-6`}
      >
        {label}
      </label>
      <div className='col-lg-8 fv-row'>
        {renderDropdown()}
        {isTouched[name] && error[name] && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>{error[name]}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectInput
