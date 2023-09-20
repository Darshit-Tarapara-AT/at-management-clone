import {CustomTableProps} from 'app/Modal/Modal'
import React from 'react'
import './CustomTable.scss'
import { CustomRow } from './CustomRow/CustomRow'
import { CustomHeaderColumn } from './CustomHeaderColoum/CustomHeaderColoum'
import {useTable, Row} from 'react-table'
import {Strings} from 'app/resource/Strings'

export const CustomTable: React.FC<CustomTableProps> = ({data, columns, error, classes}) => {

  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })
  return (
    <div className='card-body pt-0 p-0 pb-9'>
 <div className='table-responsive p-8 pt-1'>
        <table
          id='kt_profile_overview_table'
          className='table  gy-4 align-middle fw-bold dataTable no-footer'
          {...getTableProps()}
        >
          <thead className='fs-7 text-gray-400 text-uppercase'>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0 border-bottom-1 border-light'>
              {headers.map((column) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold fs-6 ' id='row-container' style={{height:"50px"}} {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} classes={classes && classes}/>
              })
              
            ) : (
              <tr className="border-bottom-1 border-light">
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    {error ? error : Strings.noMoreItem}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
     
   
  )
}
