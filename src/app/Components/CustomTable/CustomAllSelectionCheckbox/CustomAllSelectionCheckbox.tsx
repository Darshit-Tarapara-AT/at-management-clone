import React, {  PropsWithChildren } from 'react'
import { TaskResponsePayload } from 'app/redux/TaskSlice/TaskType'
import { HeaderProps } from 'react-table'

type Props = {
  tableProps: PropsWithChildren<HeaderProps<TaskResponsePayload>>
  Id?: string
  hasBulkOperationAllow: boolean
  onSelectAll: (isChecked: boolean) => void
  width?: string
  isAllChecked: boolean
}
const CustomAllSelectionCheckbox:React.FC<Props> = ({
    tableProps,
    onSelectAll,
    isAllChecked,
    width= "10px"
}) => {

  const handlerChecked = (isChecked: boolean) => {
    onSelectAll(isChecked)
  }

  return (
    <th {...tableProps.column.getHeaderProps()} className={`w-${width} pe-2`}>
    <div className='form-check form-check-sm form-check-custom form-check-solid me-3'>
      <input
        className='form-check-input'
        type='checkbox'
        onChange={(e) => handlerChecked(e.target.checked)}
     checked ={isAllChecked}
      />
    </div>
  </th>
  )
}
  
export default CustomAllSelectionCheckbox