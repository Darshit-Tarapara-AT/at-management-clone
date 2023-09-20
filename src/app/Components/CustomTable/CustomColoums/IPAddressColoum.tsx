
import {CustomHeader} from '../CustomHeader/CustomHeader'
import CustomActionCell from '../CustomActionCell/CustomActionCell'
import { PATHS } from 'config/paths/paths'

const IPaddressColumns = [
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='No' className='min-w-125px text-left' />,
    accessor: 'index',
  },
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='Name' className='min-w-125px text-left' />,
    accessor: 'name',
  },
  {
    Header: (props: any) => (
      <CustomHeader tableProps={props} title='Ip address' className='min-w-125px' />
    ),
    accessor: 'ip_address',
  },
  {
    Header: (props: any) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => {
      const {deleteItem, editItem, viewItem} = props.data[props.row.index]
      const currentIPId = props.data[props.row.index].id
      const path = PATHS.ip.edit.replaceAll(":id", `${currentIPId}`)
      return  ( <CustomActionCell 
        deleteItem = {deleteItem} editItem ={editItem} viewItem ={viewItem} id={currentIPId} path={path}/>)
    }
  },
]
export {IPaddressColumns}