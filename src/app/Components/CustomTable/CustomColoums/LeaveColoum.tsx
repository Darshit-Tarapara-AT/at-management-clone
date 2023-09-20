import {Column} from 'react-table'
import {CustomHeader} from '../CustomHeader/CustomHeader'
import CustomActionCell from '../CustomActionCell/CustomActionCell'
import {Strings} from 'app/resource/Strings'
import {LeaveInformation} from 'app/redux/LeaveSlice/LeaveTypes'
import {CustomDefaultTitle, CustomRowTitle} from '../CustomRowTitle/CustomRowTitle'
import { convertToReadleFormat, setBackgroundColor } from './MyLeavecoloum'
import { PATHS } from 'config/paths/paths'

const LeaveColumns: ReadonlyArray<Column<LeaveInformation>> = [
  {
    Header: (props: any) => (
      <CustomHeader tableProps={props} title='Name' className='min-w-100px' />
    ),
    id: 'name',
    Cell: ({...props}) => {
      return (
        <div className="d-flex align-items-center">
        <div className="symbol symbol-50px me-3">
            <img src={props.data[props.row.index]?.user?.image_url || ''} className="" alt="" />
        </div>
        <div className="d-flex justify-content-start flex-column">
            <a href="/" className="text-gray-800 fw-bold text-hover-primary mb-1 fs-6">{props.data[props.row.index]?.user?.name}</a>
        </div>
    </div>
      )
    },
  },
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
    Cell: ({...props}) =>   <CustomDefaultTitle
    title={convertToReadleFormat(props.data[props.row.index]?.created_at)}
    isCapitalizeFirstLetterRequired = {false}
  />,
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
      <CustomHeader tableProps={props} title={Strings.actions} className='min-w-150px text-end ' />
    ),
    id: 'actions',
    Cell: ({...props}) => {
      const {deleteItem, editItem, viewItem} = props.data[props.row.index]
      const currentLeaveId = props.data[props.row.index].id
      const path = PATHS.leave.edit.replaceAll(":id", `${currentLeaveId}`)
      return (
        <CustomActionCell deleteItem = {deleteItem} editItem ={editItem} viewItem ={viewItem} id={currentLeaveId} path={path} />
      )
    },
  },
]

export {LeaveColumns}
