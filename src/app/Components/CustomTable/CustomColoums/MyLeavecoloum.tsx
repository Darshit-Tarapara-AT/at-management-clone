import {Column} from 'react-table'
import {CustomHeader} from '../CustomHeader/CustomHeader'
import CustomActionCell from '../CustomActionCell/CustomActionCell'
import {Strings} from 'app/resource/Strings'
import {LeaveInformation} from 'app/redux/LeaveSlice/LeaveTypes'
import {CustomDefaultTitle, CustomRowTitle} from '../CustomRowTitle/CustomRowTitle'
import moment from 'moment'
import { PATHS } from 'config/paths/paths'
export const convertToReadleFormat  = (date: string): string => {
  return (moment((date)).format("Do MMM YYYY"))
}
const MyLeaveColumns: ReadonlyArray<Column<LeaveInformation>> = [
  {
    Header: (props: any) => (
      <CustomHeader
        tableProps={props}
        title={Strings.actualLeaveDateRange}
        className='min-w-150px'
      />
    ),
    id: 'startDate_EndDate',
    Cell: ({...props}) => (
      <CustomDefaultTitle
        title={`${convertToReadleFormat(props.data[props.row.index]?.start_date)} - ${
          convertToReadleFormat(props.data[props.row.index]?.end_date)
        }`}
        isCapitalizeFirstLetterRequired = {false}
      />
    ),
  },
  {
    Header: (props: any) => (
      <CustomHeader tableProps={props} title={Strings.leaveAddedDate} className='min-w-150px' />
    ),
    id: 'created_at',
    Cell: ({...props}) => <CustomDefaultTitle title={convertToReadleFormat(props.data[props.row.index]?.created_at)}  isCapitalizeFirstLetterRequired = {false} />,
  },
  {
    Header: (props: any) => (
      <CustomHeader tableProps={props} title={Strings.status} className='min-w-100px' />
    ),
    id: 'status',
    Cell: ({...props}) => (
      <CustomRowTitle
        title={props.data[props.row.index]?.status}
        className={setBackgroundColor(props.data[props.row.index]?.status)}
      />
    ),
  },
  {
    Header: (props: any) => (
      <CustomHeader tableProps={props} title={Strings.actions} className='min-w-150px text-end' />
    ),
    id: 'actions',
    Cell: ({...props}) => {
      const {deleteItem, editItem, viewItem} = props.data[props.row.index]
      const currentLeaveId = props.data[props.row.index].id
      const path = PATHS.leave.edit.replaceAll(":id", `${currentLeaveId}`)
      return (<CustomActionCell deleteItem = {deleteItem} editItem ={editItem} viewItem ={viewItem} id={currentLeaveId} path={path} />)
    },
  },
]
export const setBackgroundColor = (status: string) => {
  if (status?.toLocaleLowerCase() === 'pending') {
    return 'badge-light-warning py-3 px-4 fs-7 '
  } else if (status?.toLocaleLowerCase() === 'confirmed') {
    return 'badge-light-success py-3 px-4 fs-7'
  } else if (status?.toLocaleLowerCase() === 'rejected') {
    return 'badge-light-danger py-3 px-4 fs-7 '
  }
}
export {MyLeaveColumns}
