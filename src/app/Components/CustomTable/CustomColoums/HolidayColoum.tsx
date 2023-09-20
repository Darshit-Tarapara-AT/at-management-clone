import {CustomHeader} from '../CustomHeader/CustomHeader'
import CustomActionCell from '../CustomActionCell/CustomActionCell'
import { Strings } from 'app/resource/Strings'
import { CustomDefaultTitle } from '../CustomRowTitle/CustomRowTitle'
import CustomAllSelectionCheckbox from '../CustomAllSelectionCheckbox/CustomAllSelectionCheckbox'
import CheckBoxCeil from '../CheckBoxCeil/CheckBoxCeil'
import { PATHS } from 'config/paths/paths'

export const getHolidayColumns = (onSelectAll: (isChecked: boolean) => void, isAllChecked: boolean,checkedTaskId: number[],  onSelect: (id: number, isChecked: boolean) => void, hasBulkOperationAllow: boolean) => {
  const columns = [
    {
      Header: (props: any) => <CustomAllSelectionCheckbox width={"100px"} hasBulkOperationAllow ={hasBulkOperationAllow} isAllChecked ={isAllChecked} tableProps={props} Id={props.data[props?.row?.index]?.id} onSelectAll = {onSelectAll} />,
      accessor: 'no',
      Cell: ({...props}) => (
        <CheckBoxCeil checkedTaskId = {checkedTaskId} hasBulkOperationAllow ={hasBulkOperationAllow} id = {props.data[props?.row?.index]?.id} onSelect ={onSelect}/>
      ),
    },
    {
      Header: (props: any) => <CustomHeader tableProps={props} title={Strings.no} className='min-w-125px' />,
      accessor: 'id',
      Cell: ({...props}) => (
        <CustomDefaultTitle
         isCapitalizeFirstLetterRequired = {false}
          title={props.data[props.row.index]?.index}
        />
      ),
    },
    {
      Header: (props: any) => <CustomHeader tableProps={props} title={Strings.name} className='min-w-125px' />,
      accessor: 'name',
      Cell: ({...props}) => (
        <CustomDefaultTitle
          title={props.data[props.row.index]?.name}
        />
      ),
    },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={Strings.day} className='min-w-125px' />
      ),
      accessor: 'formatted_day',
      Cell: ({...props}) => (
        <CustomDefaultTitle
        isCapitalizeFirstLetterRequired = {false}
          title={props.data[props.row.index]?.formatted_day}
        />
      ),
    },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={Strings.date}className='min-w-125px' />
      ),
      accessor: 'formatted_date',
      Cell: ({ ...props }) => (
        <CustomDefaultTitle
        isCapitalizeFirstLetterRequired = {false}
          title={props.data[props.row.index]?.formatted_date}
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
        return  ( <CustomActionCell
          deleteItem = {deleteItem} isTaskRunning = {props.data[props.row.index]?.isTaskRunning} editItem ={editItem} viewItem ={viewItem} id={props.data[props.row.index].id} path={PATHS.attendance.holiday.edit?.replace(":id",props.data[props.row.index].id )}/>)
      }
    },
  ]
  if(hasBulkOperationAllow) {
    return columns
  }
  return  columns.filter((data, index) => index !== 0)
}