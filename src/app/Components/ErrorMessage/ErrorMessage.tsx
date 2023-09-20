import * as React from 'react'
import {ModalProps} from './index'

export const ErrorMessage: React.FC<ModalProps> = ({message, className}) => {
  return (
    <div className='mb-lg-15 alert alert-danger mt-5'>
      <div className='alert-text font-weight-bold'>{message}</div>
    </div>
  )
}
