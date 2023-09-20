import {CustomHeader} from '../CustomHeader/CustomHeader'
import CustomActionCell from '../CustomActionCell/CustomActionCell'
import UserPolicyConsentCell from '../UserPolicyConsentCell/UserPolicyConsentCell'
import { Strings } from 'app/resource/Strings'
import { generateEditPagePath } from 'app/utils/helper'

const policyColumns = [

  {
    Header: (props: any) => <CustomHeader tableProps={props} title='No' className='min-w-125px' />,
    accessor: 'index',
  },
  {
    Header: (props: any) => (
      <CustomHeader tableProps={props} title='title' className='min-w-600px' />
    ),
    accessor: 'title',
  },
  {
    Header: (props:any) => (
      <CustomHeader tableProps={props} title='Consent' className='min-w-125px' />
    ),
    id: 'is_read',
    Cell: ({...props}) => <UserPolicyConsentCell is_read={props.data[props.row.index].is_read} />
  },
  {
    Header: (props: any) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => {
      const {deleteItem, editItem, viewItem} = props.data[props.row.index]
      return  ( <CustomActionCell 
        deleteItem = {deleteItem} editItem ={editItem} viewItem ={viewItem} id={props.data[props.row.index].id} path={generateEditPagePath(props.data[props.row.index].id, Strings.policyPathKey)}/>)
    }
  },
]
export {policyColumns}
