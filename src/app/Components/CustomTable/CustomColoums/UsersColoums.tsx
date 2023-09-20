// @ts-nocheck
import {Column} from 'react-table'
import {UserInfoCell} from '../UserInfoCell/UserInfoCell'
import { CustomHeader } from '../CustomHeader/CustomHeader'
import {User} from '../../core/_models'
import { CustomRowTitle } from '../CustomRowTitle/CustomRowTitle'
import CustomActionCell from '../CustomActionCell/CustomActionCell'
import {generateEditPagePath} from 'app/utils/helper'
import { Strings } from 'app/resource/Strings'
export const options:Intl.DateTimeFormatOptions = {
    day:'numeric',
    month:'short',
    year:'numeric', 
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit',
    hour12:true
}

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <UserInfoCell firstName={props.data[props.row.index].first_name} lastName ={props.data[props.row.index].last_name} url = {props.data[props.row.index].image_url} email = {props.data[props.row.index].email} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Role' className='min-w-125px' />,
    accessor: 'role',
    Cell: ({...props}) => <CustomRowTitle title={props.data[props.row.index]?.role_id?.label} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Last login' className='min-w-125px' />
    ),
    id: 'last_login',
    Cell: ({...props}) => <CustomRowTitle title={new Date(props.data[props.row.index]?.last_login).toLocaleString([],options).replaceAll(',',' ')} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => {
      const {deleteItem, editItem, viewItem} = props.data[props.row.index]
      return  ( <CustomActionCell 
        deleteItem = {deleteItem} editItem ={editItem} viewItem ={viewItem} id={props.data[props.row.index].id} path ={generateEditPagePath(props.data[props.row.index].id, Strings.user.toLowerCase())} />)
    }
  },
]

export {usersColumns}
