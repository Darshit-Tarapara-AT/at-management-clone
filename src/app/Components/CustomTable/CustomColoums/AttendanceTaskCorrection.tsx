import { CustomHeader } from "../CustomHeader/CustomHeader";

const attendanceTaskCorrectionColumns = [
    {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Date' className='min-w-125px' />
        ),
        accessor: 'date',
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Starttime' className='min-w-125px' />
        ),
        accessor: 'start_time',
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Endtime' className='min-w-125px' />
        ),
        accessor: 'end_time',
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='Status' className='min-w-125px' />
        ),
        accessor: 'status',
      },
    {
        Header: (props: any) => (
        <CustomHeader tableProps={props} title='Action' className='min-w-125px' />
        ),
        accessor: 'action',
    },

]

export {attendanceTaskCorrectionColumns}