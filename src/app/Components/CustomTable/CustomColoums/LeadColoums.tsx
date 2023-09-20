import { Column } from 'react-table'
import { UserInfoCell } from '../UserInfoCell/UserInfoCell'
import { CustomHeader } from '../CustomHeader/CustomHeader'
import { CustomRowTitle } from '../CustomRowTitle/CustomRowTitle'
import CustomActionCell from '../CustomActionCell/CustomActionCell'
import { LeadInformation } from 'app/redux/LeadSlice/LeadTypes'
import { capitalizeFirstLetter } from 'app/utils/helper'
import { PATHS } from 'config/paths/paths'

const LeadColumns: ReadonlyArray<Column<LeadInformation>> = [
  {
    Header: (props: any) => <CustomHeader tableProps={props} title='No' className='min-w-130px' />,
    accessor: 'index',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-130px' />,
    id: 'name',
    Cell: ({ ...props }) => <UserInfoCell firstName={capitalizeFirstLetter(props.data[props.row.index].name)} lastName={props.data[props.row.index].last_name || ''} email={props.data[props.row.index].email} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Company Name' className='min-w-125px' />,
    accessor: 'company_name',
    Cell: ({ ...props }) => <CustomRowTitle title={props.data[props.row.index]?.company_name} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'lead_status',
    Cell: ({ ...props }) => <CustomRowTitle title={props.data[props.row.index]?.lead_status?.replace(/([A-Z])/g, ' $1').replace(/^./, function (str: any) { return str.toUpperCase(); })} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Added By' className='min-w-125px' />
    ),
    id: "added_by_username",
    Cell: ({ ...props }) => <CustomRowTitle title={props.data[props.row.index]?.added_by_username?.toString()} />,
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({ ...props }) => {
      const { deleteItem, editItem, viewItem } = props.data[props.row.index]
      const currentLeadId = props.data[props.row.index].id
      const path = PATHS.lead.edit.replaceAll(":id", `${currentLeadId}`)
      return (<CustomActionCell
        deleteItem={deleteItem}
        editItem={editItem}
        viewItem={viewItem}
        id={currentLeadId}
        path={path} />)
    }
  },
]

export { LeadColumns }
