import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField';
import moment from 'moment';
import dayjs, { Dayjs } from 'dayjs';
import { DateRange } from '@mui/x-date-pickers-pro';
import { useState } from 'react';

export const TimePickerEdit = (props: any) => {
    const { year, month, date, showDefaultTime, startTime, endTime } = props;
    let correctionDate = new Date(Number(year), Number(month)-1, Number(date))
    const newCorrectionDate = moment(correctionDate).format('YYYY-MM-DDTHH:mm:ss')
    const defaultStartTime = showDefaultTime ? newCorrectionDate : moment(startTime).format('YYYY-MM-DDTHH:mm:ss');
    const defaultEndTime = showDefaultTime ? newCorrectionDate : moment(endTime).format('YYYY-MM-DDTHH:mm:ss');
    const [value, setValue] = useState<DateRange<Dayjs>>(() => [
        dayjs(defaultStartTime),
        dayjs(defaultEndTime),
    ]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MultiInputTimeRangeField
                slotProps={{
                    textField: ({ position }) => ({
                        label: position === 'start' ? 'Start Time' : 'End Time',
                    }),
                }}
                formatDensity="spacious"
                shouldRespectLeadingZeros={true}
                defaultValue={[dayjs(defaultStartTime), dayjs(defaultEndTime)]}
                value={value}
                onChange={(newValue) => {
                    const startTime = newValue[0] as unknown as  {["$d"]: Date};
                    const endTime = newValue[1] as unknown as  {["$d"]: Date};
                    props.onChange(startTime["$d"], endTime["$d"]);
                    setValue(newValue);
                }}
            />
        </LocalizationProvider>
    );
}