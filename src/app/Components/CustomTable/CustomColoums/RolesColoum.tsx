import {CustomHeader} from '../CustomHeader/CustomHeader'
import CustomActionCell from '../CustomActionCell/CustomActionCell'
import { generateEditPagePath } from 'app/utils/helper'
import { Strings } from 'app/resource/Strings'

const rolesColumns = [
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='No' className='min-w-125px' />,
    accessor: 'index',
  },
  {
    Header: (props: any) => (
      <CustomHeader tableProps={props} title='Name' className='min-w-125px' />
    ),
    accessor: 'name',
  },
  {
    Header: (props: any) => (
      <CustomHeader tableProps={props} title='Label' className='min-w-125px' />
    ),
    accessor: 'label',
  },
  {
    Header: (props: any) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => {
      const {deleteItem, editItem, viewItem} = props.data[props.row.index]
      return  ( <CustomActionCell 
        deleteItem = {deleteItem} editItem ={editItem} viewItem ={viewItem} id={props.data[props.row.index].id} path={generateEditPagePath(props.data[props.row.index].id, Strings.rolePathKey)} />)
    } 
  },
]
export {rolesColumns}
