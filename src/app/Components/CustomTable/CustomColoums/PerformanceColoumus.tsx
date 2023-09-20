import { CustomHeader } from "../CustomHeader/CustomHeader";

const performanceColumns = [
    {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='user' className='min-w-125px' />
        ),
        accessor: 'user',
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='TOTAL ESTIMATED TIME' className='min-w-125px' />
        ),
        accessor: 'totalEstimatedTime',
      },
      {
        Header: (props: any) => (
          <CustomHeader tableProps={props} title='TOTAL TIME TAKEN' className='min-w-125px' />
        ),
        accessor: 'totalTimeTaken',
      },
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

export {performanceColumns}