import React from 'react'
import { FormikKeys } from '../TextArea';
import { CustomTimePickerProps } from 'app/Modal/Modal';
import Style from 'config/colors/colors';
import { IRootState } from 'app/redux/store';
import { useSelector } from 'react-redux';
import { Strings } from 'app/resource/Strings';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { TimePicker } from "baseui/timepicker";
import { TIMER_PICKER_INPUT, allInputsStyles } from 'config/InputStyles/InputStyles';
const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
    formik,
    label,
    name,
    min,
    max,
    onBlur
}) => {
    const formikValues: FormikKeys = formik.values;
    const isTouched: FormikKeys = formik.touched;
    const error: FormikKeys = formik.errors;
    const { currentTheme } = useSelector((state: IRootState) => state.UIStateData);
    const handlerBlur = () => {
        if (onBlur) {
            onBlur(name);
        }
    }

    return (
        <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                {label}
            </label>
            <div className='col-lg-8 fv-row' onBlur={() => handlerBlur()}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimeField
                        value={dayjs(formikValues[name])}
                        onChange={(newValue) => {
                            const lateTimeEntry = newValue as unknown as { ["$d"]: Date }
                            formik.setFieldValue(name, lateTimeEntry["$d"])
                        }
                        }
                    />
                </LocalizationProvider>
                {isTouched[name] && error[name] && (
                    <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{error[name]}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CustomTimePicker