import {CustomHeader} from '../CustomHeader/CustomHeader'
import CustomActionCell from '../CustomActionCell/CustomActionCell'
import { Strings } from 'app/resource/Strings'
import { CustomDefaultTitle, CustomRowTitle } from '../CustomRowTitle/CustomRowTitle'
import CustomAllSelectionCheckbox from '../CustomAllSelectionCheckbox/CustomAllSelectionCheckbox'
import CheckBoxCeil from '../CheckBoxCeil/CheckBoxCeil'
import { PATHS } from 'config/paths/paths'
import moment from 'moment'

export const getCorrectionColumns = (onSelectAll: (isChecked: boolean) => void, isAllChecked: boolean,checkedTaskId: number[],  onSelect: (id: number, isChecked: boolean) => void, hasBulkOperationAllow: boolean) => {
  const columns = [
    {
      Header: (props: any) => <CustomAllSelectionCheckbox width={"100px"} hasBulkOperationAllow ={hasBulkOperationAllow} isAllChecked ={isAllChecked} tableProps={props} Id={props.data[props?.row?.index]?.id} onSelectAll = {onSelectAll} />,
      accessor: 'no',
      Cell: ({...props}) => (
        <CheckBoxCeil checkedTaskId = {checkedTaskId} hasBulkOperationAllow ={hasBulkOperationAllow} id = {props.data[props?.row?.index]?.id} onSelect ={onSelect}/>
      ),
    },
    {
      Header: (props: any) => <CustomHeader tableProps={props} title={Strings.forDate} className='min-w-125px' />,
      accessor: 'start_time',
      Cell: ({...props}) => (
        <CustomDefaultTitle
        isCapitalizeFirstLetterRequired = {false}
          title={moment(props.data[props.row.index]?.start_time).format('DD-MMM-YYYY')}
        />
      ),
    },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={Strings.from} className='min-w-125px' />
      ),
      accessor: 'user_name',
      Cell: ({...props}) => (
        <CustomDefaultTitle
          title={props.data[props.row.index]?.user_name}
        />
      ),
    },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={Strings.status}className='min-w-125px' />
      ),
      accessor: 'status',
      Cell: ({ ...props }) => (
        <CustomRowTitle
        className={setStatusColumnBackground(props.data[props.row.index]?.status)}
          title={props.data[props.row.index]?.status}
        />
      ),
    },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={Strings.actions}className='text-end min-w-100px' />
      ),
      id: 'actions',
      Cell: ({...props}) => {
        const {deleteItem, editItem, viewItem} = props.data[props.row.index]
        const currentDate = new Date( props.data[props.row.index]?.start_time);
        const viewTaskEntryPath = PATHS.attendance.masterTaskEntry.replace(":date", `${currentDate?.getDate()}`).replace(":month", `${currentDate.getMonth() + 1}`).replace(":year", `${currentDate.getFullYear()}`).replace(":userId", `${props.data[props.row.index]?.user_id}`)

        return  ( <CustomActionCell
          deleteItem = {deleteItem} hasSplitRequired = {true} 
          viewAttendancePath= {PATHS.attendance.masterAttendanceCalender.replace(":date", `${currentDate?.getDate()}`).replace(":month", `${currentDate.getMonth() + 1}`).replace(":year", `${currentDate.getFullYear()}`).replace(":userId", `${props.data[props.row.index]?.user_id}`)
          } isTaskRunning = {props.data[props.row.index]?.isTaskRunning} editItem ={editItem} viewItem ={viewItem} id={props.data[props.row.index].id} path={viewTaskEntryPath}/>)
      }
    },
  ]
  if(hasBulkOperationAllow) {
    return columns
  } 
  return  columns.filter((data, index) => index !== 0)
}

 const setStatusColumnBackground = (value: string) => {
  switch (value.toLocaleLowerCase().replaceAll(' ', '')) {
    case 'confirmed':
      return 'badge py-3 px-4 fs-7 badge-light-success'
    case 'pending':
      return 'py-2 py-3 px-4 fs-7 badge-light-warning'
      case 'rejected':
        return 'py-3 px-4 fs-7 badge-light-danger'
    default:
      return 'py-2 px-4 fs-7 badge-light-primary'
  }
}