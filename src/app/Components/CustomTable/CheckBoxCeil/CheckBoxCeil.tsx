import React from 'react'

interface CheckBoxCeilProps {
    checkedTaskId: number[]
    id: number,
    hasBulkOperationAllow: boolean
    onSelect: (id: number, isChecked: boolean) => void
}
const CheckBoxCeil: React.FC<CheckBoxCeilProps> = ({
    checkedTaskId,
    id,
    onSelect,
    hasBulkOperationAllow
}) => {

    const handlerChecked = (isChecked: boolean) => {
      onSelect(id, isChecked)
    }
  return (
    <div className='form-check form-check-sm form-check-custom form-check-solid me-3'>
      <input
        className='form-check-input'
        type='checkbox'
        onChange={(e) => handlerChecked(e.target.checked)}
        checked={checkedTaskId?.includes(id)}
      />
    </div>
  )
}

export default CheckBoxCeil