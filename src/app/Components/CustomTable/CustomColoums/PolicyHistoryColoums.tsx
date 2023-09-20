import { capitalizeFirstLetter } from 'app/utils/helper'
import {CustomHeader} from '../CustomHeader/CustomHeader'
import { CustomRowTitle } from '../CustomRowTitle/CustomRowTitle'
import { options } from './UsersColoums'

const policyHistoryColumns = [
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Create' className='min-w-125px' />,
    accessor: 'created_at',
    Cell: ({...props}) => {
     return <div>{new Date(props.data[props.row.index]?.created_at).toLocaleString([],options).replaceAll(',',' ')}</div>
    }
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='description' />,
    accessor: 'description',
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='User' />,
    accessor: 'name',
    Cell: ({...props}) => <CustomRowTitle title={capitalizeFirstLetter(props.data[props.row.index]?.user?.name?.split(" ")[0]) + " " +capitalizeFirstLetter(props.data[props.row.index]?.user?.name?.split(" ")[1])} />,
  },
]
export {policyHistoryColumns}
