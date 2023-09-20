import * as React from "react";
import { InputFormikProps } from "app/Modal/Modal";

type RadioOption = { value: string, label: string }
interface RadioInputProps {
    options: RadioOption[]
    name: string,
    formik: InputFormikProps
    value: string
    label: string
}
export const RadioInput: React.FC<RadioInputProps> = ({
    options,
    name,
    formik,
    value,
    label
}) => {

    return (
        <div className='row mb-6 '>
            <label className='col-lg-4 col-form-label required fw-bold fs-6' style={{ cursor: 'default' }}>
                {label}
            </label>
            <div className='col-lg-8 fv-row mt-1'>
                {options.map((option: RadioOption, index: number) => {
                    return (
                        <div className="form-check-inline col-4" key={`${index}`}>
                            <label className="form-check-image form-check-primary active">
                                <div className="form-check form-check-custom form-check-solid form-check-sm form-check-primary ">
                                    <input
                                        className="form-check-input"
                                        type="radio" 
                                        value={option.value}
                                        name={name}
                                        onChange={(e) => formik.setFieldValue(name, e.target.value)}
                                        id="kt_layout_builder_theme_mode_light"
                                        wfd-id="id42"
                                        checked={option.value === value} 
                                        />
                                    <div className="form-check-label text-gray-700 cursor-pointer">{option.label}</div>
                                </div>
                            </label>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}