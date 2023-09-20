import {CustomHeader} from '../CustomHeader/CustomHeader'
import CustomActionCell from '../CustomActionCell/CustomActionCell'
import { Strings } from 'app/resource/Strings'
import { generateEditPagePath } from 'app/utils/helper'
import { CustomDefaultTitle, CustomRowTitle } from '../CustomRowTitle/CustomRowTitle'
import { convertKeyToLabel, setEstimationHoursBackground } from './ProjectColoums'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import CustomAllSelectionCheckbox from '../CustomAllSelectionCheckbox/CustomAllSelectionCheckbox'
import CheckBoxCeil from '../CheckBoxCeil/CheckBoxCeil'

export const getTaskColumns = (onSelectAll: (isChecked: boolean) => void, isAllChecked: boolean,checkedTaskId: number[],  onSelect: (id: number, isChecked: boolean) => void, hasBulkOperationAllow: boolean, updateActiveTaskIdHandler: (id: number) => void) => {
  const columns = [
    {
      Header: (props: any) => <CustomAllSelectionCheckbox hasBulkOperationAllow ={hasBulkOperationAllow} isAllChecked ={isAllChecked} tableProps={props} Id={props.data[props?.row?.index]?.id} onSelectAll = {onSelectAll} />,
      accessor: 'id',
      Cell: ({...props}) => (
        <CheckBoxCeil checkedTaskId = {checkedTaskId} hasBulkOperationAllow ={hasBulkOperationAllow} id = {props.data[props?.row?.index]?.id} onSelect ={onSelect}/>
      ),
    },
    {
      Header: (props: any) => <CustomHeader tableProps={props} title={Strings.name} className='min-w-125px' />,
      accessor: 'name',
      Cell: ({...props}) => (
        <CustomDefaultTitle
        isCapitalizeFirstLetterRequired = {false}
          title={props.data[props.row.index]?.name}
        />
      ),
    },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={Strings.assignedTo} className='min-w-125px' />
      ),
      accessor: 'assigned_user',
      Cell: ({...props}) => (
        <CustomDefaultTitle
        isCapitalizeFirstLetterRequired = {false}
          title={props.data[props.row.index]?.assigned_user}
        />
      ),
    },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={Strings.hours}className='min-w-125px' />
      ),
      accessor: 'estimated_time',
      Cell: ({ ...props }) => (
        <CustomRowTitle
          title={`${convertMinutesToHours(props.data[props.row.index]?.trackedTime)|| '0'} / ${convertMinutesToHours(props.data[
            props.row.index
          ]?.estimated_time?.toString())}`}
          isCapitalizeFirstLetterRequired = {false}
          className={setEstimationHoursColorBackground(
            props.data[props.row.index]?.trackedTime?.toString(),
            props.data[props.row.index]?.estimated_time?.toString()
          )}
        />
      ),
    },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={Strings.endDate} className='min-w-125px' />
      ),
      accessor: 'end_date',
      Cell: ({...props}) => (
        <CustomDefaultTitle
          isCapitalizeFirstLetterRequired = {false}
          title={props.data[props.row.index]?.end_date}
        />
      ),
    },
    // {
    //   Header: (props: any) => (
    //     <CustomHeader tableProps={props} title={Strings.checkList} className='min-w-125px' />
    //   ),
    //   accessor: 'check_list',
    //   Cell: ({...props}) => (
    //     <CustomDefaultTitle
    //       title={formatCheckList(props.data[props.row.index]?.taskchecklist)}
    //       isCapitalizeFirstLetterRequired = {false}
    //     />
    //   ),
    // },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={Strings.taskStage} className='min-w-150px' />
      ),
      accessor: 'task_status',
      Cell: ({...props}) => (
        <CustomDefaultTitle
          title={convertKeyToLabel(props.data[props.row.index]?.task_status)}
          isCapitalizeFirstLetterRequired = {false}
          className={setTaskStatusColumnBackground(props.data[props.row.index]?.task_status)}
        />
      ),
    },
    // {
    //   Header: (props: any) => (
    //     <CustomHeader tableProps={props} title={Strings.progress} className='min-w-125px' />
    //   ),
    //   accessor: "percentage",
    //   Cell: ({...props}) => {
    //     return (
    //       <CustomRowTitle
    //       title={props.data[props.row.index]?.percentage}
    //       isCapitalizeFirstLetterRequired = {false}
    //       icon= {props.data[props.row.index]?.id % 2 ===  0 ? faChevronDown : faChevronUp}
    //       className= {props.data[props.row.index]?.id % 2 ===  0  ? "badge-light-danger" : "badge-light-success"}
    //     />
    //     )
    //     },
    // },
    {
      Header: (props: any) => (
        <CustomHeader tableProps={props} title={Strings.actions}className='text-end min-w-100px' />
      ),
      id: 'actions',
      Cell: ({...props}) => {
        const {deleteItem, editItem, viewItem} = props.data[props.row.index]
        return  ( <CustomActionCell
        assignUserId = {props.data[props.row.index]?.assignUserId}
        onUpdateTask={updateActiveTaskIdHandler}
        deleteItem = {deleteItem} isTaskRunning = {props.data[props.row.index]?.isTaskRunning} editItem ={editItem} viewItem ={viewItem} id={props.data[props.row.index].id} path={generateEditPagePath(props.data[props.row.index].id, Strings.taskPathKey)}/>)
      }
    },
  ]
  if(hasBulkOperationAllow) {
    return columns
  }
  return  columns.filter((data, index) => index !== 0)
}

export const convertMinutesToHours = (minutes: number ) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  let remainingMinutesString = String(minutes % 60);
  if (remainingMinutes < 10) {
    remainingMinutesString = String(remainingMinutes).padStart(2, '0')
  }
  return `${hours}:${remainingMinutesString}`
}

const formatCheckList = (checkList: any[]) => {
    const totalCheckList = checkList?.length;
    const checkedItems = checkList.filter((item) => item.is_checked === 1);
    return `${checkedItems?.length} / ${totalCheckList}`
}

export const setEstimationHoursColorBackground = (billableHour: number = 0, totalHours: number = 0) => {
  if (Number(billableHour) < Number(totalHours)) {
    return ('badge-light-success')
  }
  return 'badge-light-danger '
 
}

export const setTaskStatusColumnBackground = (value: string) => {
  switch (value.toLocaleLowerCase().replaceAll(' ', '')) {
    case 'inworking':
      return 'py-3 px-4 fs-7 badge-light-success'
    case 'onhold':
      return 'py-3 px-4 fs-7 badge-light-danger'
      case 'completed':
        return 'py-3 px-4 fs-7 badge-light-dark'
    case 'readyforwork':
      return 'py-3 px-4 fs-7 badge-light-primary'
      case 'pending':
      return 'py-3 px-4 fs-7 badge-light-warning'
      case 'cancelled':
        return 'py-3 px-4 fs-7 badge-light-info'
        case 'readytoqa':
          return 'py-3 px-4 fs-7 badge-light-secondary'
    default:
      return 'py-3 px-4 fs-7 badge-light-primary'
  }
}