
import { Column } from 'react-table'
import { UserInfoCell } from '../UserInfoCell/UserInfoCell'
import { CustomHeader } from '../CustomHeader/CustomHeader'
import CustomActionCell from '../CustomActionCell/CustomActionCell'
import { ClientInformation } from 'app/redux/ClientsSlice/ClientsTypes'
import { Strings } from 'app/resource/Strings'
import { capitalizeFirstLetter } from 'app/utils/helper'
import { PATHS } from 'config/paths/paths'

const ClientColumns: ReadonlyArray<Column<ClientInformation>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-150px' />,
    id: 'name',
    Cell: ({ ...props }) => <UserInfoCell firstName={props.data[props.row.index].name} lastName={props.data[props.row.index].last_name || ''} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title={Strings.addedBy} className='min-w-150px' />,
    accessor: 'added_by_username',
    Cell: ({ ...props }) => {
      return (
        <span className='text-gray-800 mb-1'>
          {capitalizeFirstLetter(props.data[props.row.index]?.added_by_username || '')}
        </span>
      )
    }
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title={Strings.account} className='min-w-150px' />
    ),
    id: 'account',
    Cell: ({ ...props }) => {
      return (
        <span className='text-gray-800 mb-1'>
          {capitalizeFirstLetter(props.data[props.row.index]?.account)}
        </span>
      )
    },
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title={Strings.company} className='min-w-150px' />
    ),
    id: 'company_name',
    Cell: ({ ...props }) => {
      return (
        <span className='text-gray-800 mb-1'>
          {capitalizeFirstLetter(props.data[props.row.index]?.company_name)}
        </span>
      )
    },
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title={Strings.actions} className='min-w-150px text-end ' />
    ),
    id: 'actions',
    Cell: ({...props}) => {
      const {deleteItem, editItem, viewItem} = props.data[props.row.index]
      const currentClientId = props.data[props.row.index].id
      const path = PATHS.client.edit.replaceAll(":id", `${currentClientId}`)
      return  ( <CustomActionCell
        deleteItem = {deleteItem} editItem ={editItem} viewItem ={viewItem} id={currentClientId} path={path}/>)
    }
  },
]

export { ClientColumns }
