import {CustomHeader} from '../CustomHeader/CustomHeader'
import CustomActionCell from '../CustomActionCell/CustomActionCell'
import { Strings } from 'app/resource/Strings'
import { generateEditPagePath } from 'app/utils/helper'
import { CustomDefaultTitle, CustomRowTitle } from '../CustomRowTitle/CustomRowTitle'
import { convertKeyToLabel, setEstimationHoursBackground } from './ProjectColoums'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import CustomAllSelectionCheckbox from '../CustomAllSelectionCheckbox/CustomAllSelectionCheckbox'
import CheckBoxCeil from '../CheckBoxCeil/CheckBoxCeil'

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
      Header: (props: any) => <CustomHeader tableProps={props} title={Strings.user} className='min-w-125px' />,
      accessor: 'user',
      Cell: ({...props}) => (
        <CustomDefaultTitle
        isCapitalizeFirstLetterRequired = {false}
          title={props.data[props.row.index]?.name}
        />
      ),
    },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={Strings.day} className='min-w-125px' />
      ),
      accessor: 'day',
      Cell: ({...props}) => (
        <CustomDefaultTitle
        isCapitalizeFirstLetterRequired = {false}
          title={props.data[props.row.index]?.day}
        />
      ),
    },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={Strings.date}className='min-w-125px' />
      ),
      accessor: 'date',
      Cell: ({ ...props }) => (
        <CustomDefaultTitle
        isCapitalizeFirstLetterRequired = {false}
          title={props.data[props.row.index]?.date}
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
          deleteItem = {deleteItem} isTaskRunning = {props.data[props.row.index]?.isTaskRunning} editItem ={editItem} viewItem ={viewItem} id={props.data[props.row.index].id} path={generateEditPagePath(props.data[props.row.index].id, Strings.taskPathKey)}/>)
      }
    },
  ]
  if(hasBulkOperationAllow) {
    return columns
  } 
  return  columns.filter((data, index) => index !== 0)
}