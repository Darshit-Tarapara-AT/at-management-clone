import {Strings} from 'app/resource/Strings'
import {Message} from 'app/utils/AlertMessage'
import {calculateFileSize} from 'app/utils/helper'
import * as React from 'react'
import {Input} from 'baseui/input'
import {InputProps} from '.'
import './Input.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencil, faPlus} from '@fortawesome/free-solid-svg-icons'
import dummyImage from '_metronic/assets/image/dummy-image.jpg'
import { useLocation } from 'react-router-dom'
import Style from 'config/colors/colors'
import { useSelector } from 'react-redux'
import { IRootState } from 'app/redux/store'
import { INPUT_KEY, allInputsStyles } from 'config/InputStyles/InputStyles'
interface FormilkKeys {
  [index: string]: any
}
export const CustomInput: React.FC<InputProps> = (props) => {
  const {
    type,
    name,
    label,
    placeHolder,
    isReadOnly = false,
    formilk,
    hasEmojiValidationRequired= false,
    value,
    onPlusButtonClick,
    onBlur,
    isPlusIconRequired = false,
    disabled,
    setLogoURL,
    logoUrl = '',
    isProfileInput = false,
    isRequired = true,
  } = props
  const {pathname} = useLocation()
  const isTouched: FormilkKeys = formilk.touched
  const error: FormilkKeys = formilk.errors
  const emojiRegex = /\p{Emoji}/u
const {currentTheme} = useSelector((state: IRootState) => state.UIStateData)
  const updateLogoState = (file: File) => {
    const isValidFileSize = calculateFileSize(file.size)
    if (!isValidFileSize) {
      formilk.setFieldError('logo', 'File size should be less than 2MB')
      Message('Oops!', 'error', Strings.pleaseSelectLogoSizeLessThanTwoMB)
      return
    }
    setLogoURL!(URL.createObjectURL(file))
    formilk.setFieldValue(name, file)
  }
  const handlerChange = (e: React.BaseSyntheticEvent) => {
    if (type === 'file') {
      if (!e.target.files[0]) return
      if (name === 'logo') {
        updateLogoState(e.target.files[0])
        return
      }
      formilk.setFieldValue(name, e.target.files[0])
    } else {
      if (
        emojiRegex.test(e.target.value) &&
        hasEmojiValidationRequired &&
         type !== 'number'
      ) {
        Message('Oops!', 'error', Strings.emojiNotAllowed)
        return
      }
      formilk.setFieldValue(name, e.target.value)
    }
  }

  return (
    <div className='row mb-6'>
      <label
        htmlFor={name}
        className={`col-lg-4 col-form-label ${isRequired && 'required'} fw-bold fs-6`}
      >
        {label}
      </label>
      <div className={`${isProfileInput && 'project-logo-controller'} col-lg-8 fv-row `}>
        {isProfileInput && (
          <div
            onClick={() => props.setLogoURL!('')}
            className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow remove-image-icon-container'
          >
            <i className='bi bi-x fs-2'></i>
          </div>
        )}
        <Input
          type={type}
          placeholder={placeHolder || ''}
          onKeyDown={(e) => {
            if (type === 'number' && e.key === 'e') {
              e.preventDefault()
            }
          }}
          onBlur={() => {
            if (onBlur) {
              onBlur(name)
            }
          }}
          value={value && (value as string)}
          disabled={disabled}
          autoComplete='off'
          id={name || ''}
          readOnly={isReadOnly}
          wfd-id="id21"
          endEnhancer={
            isPlusIconRequired && (
              <FontAwesomeIcon
                icon={faPlus}
                className='plus-icon-container'
                onClick={() => onPlusButtonClick!()}
              />
            )
          }
          onChange={handlerChange}
          overrides={{
            ...allInputsStyles(currentTheme, INPUT_KEY)
          }}
          onKeyUp={(e) => {
            if (props.onKeyPress) {
              props.onKeyPress(e.key)
            }
          }}
        />
        {isProfileInput && (
          <label htmlFor='file-input' className='file-label'>
            <div className='me-7 mb-4'>
              <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative image-input image-input-outline'>
                <img
                  src={logoUrl || dummyImage}
                  alt='user profile'
                  className='image-input-wrapper w-125px h-125px'
                />
                <div className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow pencil-icon-logo-container'>
                  <FontAwesomeIcon icon={faPencil} style={{color: '#a1a5b7'}} />
                </div>
              </div>
            </div>
          </label>
        )}
        {isTouched[name] && error[name] && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>{error[name]}</div>
          </div>
        )}
      </div>
    </div>
  )
}
