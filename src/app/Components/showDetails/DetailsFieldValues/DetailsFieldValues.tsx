import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toAbsoluteUrl } from '_metronic/helpers'
import { Strings } from 'app/resource/Strings'
import { UrlValidationRegex } from 'app/utils/ValidationSchema'
import { capitalizeFirstLetter } from 'app/utils/helper'
import React from 'react'

interface DetailsFieldValuesProps {
  label: string
  value: string
}
const DetailsFieldValues: React.FC<DetailsFieldValuesProps> = ({ label, value}) => {
  const isAvatar = label.includes(Strings.avatar)
  const allNumberField = ["Phone", "Mobile", "Email"];

  const showFieldValue = (currentValue: string) => {

    if ((/^[A-Za-z]+$/).test(currentValue)) {
      return <span className='fw-semibold text-gray-800 fs-6'>{capitalizeFirstLetter(value)}</span>
    } else if (UrlValidationRegex?.test(currentValue)) {
      return <a className='fw-semibold fs-6 text-gray-800 text-hover-primary' href={value} >{currentValue}</a>
    } else if(allNumberField?.includes(label)) {
      return <a className='fw-semibold fs-6 text-gray-800 text-hover-primary' href={`tel:+${value}`} >{currentValue}</a>
    }
    return <span className='fw-semibold text-gray-800 fs-6'>{value}</span>
  }

  return (
    <div className='row mb-7'>
      <label className={`col-lg-4 fw-bold text-muted  ${isAvatar && 'col-form-label'}`}>
        {label}
      </label>
      <div className='col-lg-8 fv-row'>
        {label.includes(Strings.avatar) || label.includes(Strings.logo)  ? (
          <div
            className='image-input image-input-outline'
            data-kt-image-input='true'
            style={{ backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})` }}
          >
            <div
              className='image-input-wrapper w-125px h-125px'
            >
             <img
                      src={toAbsoluteUrl(value) || toAbsoluteUrl('/media/avatars/blank.png')}
                      alt='user profile'
                      className='image-input-wrapper w-125px h-125px'
                    />
            </div>
          </div>
        ) : (
          showFieldValue(value)
        )}
      </div>
    </div>
  )
}

export default DetailsFieldValues
