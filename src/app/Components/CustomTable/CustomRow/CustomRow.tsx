// @ts-nocheck
import clsx from 'clsx'
import {FC} from 'react'
import {Row} from 'react-table'
import {User} from '../../core/_models'
import { Strings } from 'app/resource/Strings'

type Props = {
  row: Row<User>
  classes?: string[]
}

const CustomRow: FC<Props> = ({row, classes}) => {

  return (
    <tr {...row.getRowProps()}>
    {row.cells.map((cell, index) => {
      const rowClassName =classes ? classes[index] : "";
      return (
        <td
          {...cell.getCellProps()}
          className={clsx({'text-end min-w-100px': cell.column.id === 'actions'}, rowClassName)}
        >
          {cell.render('Cell')}
        </td>
      )
    })}
  </tr>
  )

}

export {CustomRow}
