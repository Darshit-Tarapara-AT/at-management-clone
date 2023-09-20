import React from 'react'
import { Strings } from 'app/resource/Strings'
import { GuardianInputFieldProps } from '../../index'
import { ContentTitle } from 'app/Components/ContentTitle/ContentTitle'
import './Guardian.scss'


interface guardianDetailsKeys {
  name: string[]
  address: string[]
  contactNumber: string[]
}
const Guardian: React.FC<GuardianInputFieldProps> = ({ guardianDetailsValues, ...props }) => {

  return (
    <div className='card mb-3 mb-xl-10 form-container'>
      <ContentTitle title={Strings.guardian} targetToggleId='#kt_guardian' />
      <div id='kt_guardian' className='collapse show'>
        <div className='card-body border-0 p-9'>
          <div className="row mb-6">
            <label className="col-lg-4 col-form-label fw-bold fs-6"></label>
            <label className="col-lg-4 col-form-label fw-bold fs-6">{Strings.primary}</label>
            <label className="col-lg-4 col-form-label  fw-bold fs-6">{Strings.secondary}</label>
          </div>
          {guardianDetailsValues.map(({label, value}, index) => {
            return (
              <div className="row mb-6">
                <label className="col-lg-4 col-form-label required fw-semibold fs-6">
                  {label}</label>
                <div className="col-lg-4 fv-row mt-3">
                  <span className="fw-semibold text-gray-800 fs-6">{value[0]}</span>
                </div>
                <div className="col-lg-4 fv-row">
                <span className="fw-semibold text-gray-800 fs-6">{value[1]}</span>
                </div>

              </div>
            )
          })}
        </div>
      </div>
    </div>

  )
}

export default Guardian
