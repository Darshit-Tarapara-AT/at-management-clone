import { CustomHeader } from "../CustomHeader/CustomHeader";

const performanceUserColumns = [
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='PROJECT' className='min-w-125px' />
        ),
        accessor: 'project',
      },
    {
        Header: (props: any) => (
        <CustomHeader tableProps={props} title='CLIENT' className='min-w-125px' />
        ),
        accessor: 'client',
    },
    {
        Header: (props: any) => (
        <CustomHeader tableProps={props} title='ESTIMATED TIME' className='min-w-125px' />
        ),
        accessor: 'estimatedTime',
    },
    {
        Header: (props: any) => (
        <CustomHeader tableProps={props} title='TIME TAKEN' className='min-w-125px' />
        ),
        accessor: 'timeTaken',
    },

]

export {performanceUserColumns}