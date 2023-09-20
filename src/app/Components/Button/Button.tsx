import {Strings} from 'app/resource/Strings'
import React from 'react'
interface ButtonProps {
  isValid: boolean
  dirty: boolean
  type?: 'button' | 'submit' | 'reset'
  children?: React.ReactNode
  className?: string
  disabled: boolean
  isCancelButtonRequired?: boolean
  buttonText?: string
  isLoading?: boolean
  cancelButttonType?: string
  onReset?: () => void
}
const Button: React.FC<ButtonProps> = ({
  onReset,
  type = 'submit',
  cancelButttonType = "reset",
  buttonText = Strings.cancel,
  children,
  disabled,
  isCancelButtonRequired,
  className = 'btn btn-primary',
}) => {
  return (
    <div className='card mb-5 mb-xl-10 mt-xl-10'>
      <div id='kt_account_settings_profile_details' className='collapse show'>
        <div
          className='card-footer d-flex justify-content-flex-end py-5 px-9 border-0'
          style={{justifyContent: 'flex-end'}}
        >
          {isCancelButtonRequired && (
            <button
              type='reset'
              className='btn btn-light btn-active-light-primary me-2'
              onClick={() => {
                onReset && onReset()
              }}
            >
              {buttonText}
            </button>
          )}
            <button id='submit-btn' type={type} disabled={disabled} className={className}>
              {children}
            </button>
          </div>
        </div>
        </div>
  )
}

export default Button
