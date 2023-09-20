import React from 'react'
import {Strings} from 'app/resource/Strings'
interface SelectedListProps {
  checkList: number[]
  list: any[]
}
const SelectedList: React.FC<SelectedListProps> = (props) => {
  const selectedItems = props.list.filter((data) => props.checkList.includes(data.id))
  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selectedItems.length}</span>
        {Strings.selected}
      </div>

      <button type='button' className='btn btn-danger'>
        {Strings.deleteSelected}
      </button>
    </div>
  )
}

export default SelectedList
