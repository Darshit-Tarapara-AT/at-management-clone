import React from 'react'
import { InputFormikProps } from 'app/Modal/Modal';

interface BaseUICheckboxProps {
    checked: boolean;
    checkBoxTitle: string;
    formik: InputFormikProps;
    name: string;
    label?: string;
}

const BaseUICheckbox: React.FC<BaseUICheckboxProps> = ({
    checked,
    checkBoxTitle,
    formik,
    name,
    label =''
}) => {
    return (<div className='row mb-6'>
        <label className='col-lg-4 col-form-label  fw-bold fs-6'>{checkBoxTitle}</label>
        <div className='col-lg-8 fv-row'>
            <div className='form-check form-check-custom form-check-solid'>
            <div className='form-check form-check-custom form-check-solid'>
                <div className="form-check form-switch form-check-custom form-check-success form-check-solid">
                    <input className="form-check-input " type="checkbox" value="" checked={checked} id="kt_flexSwitchCustomDefault_1_1"
                        wfd-id="id46" 
                        onChange={e => formik.setFieldValue(name, e.target.checked)}/>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}

export default BaseUICheckbox