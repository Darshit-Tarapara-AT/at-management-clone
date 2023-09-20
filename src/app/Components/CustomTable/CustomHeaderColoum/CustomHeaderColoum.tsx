// @ts-nocheck
import { FC } from 'react'
import { ColumnInstance } from 'react-table'
import { User } from '../../core/_models'

type Props = {
  column: ColumnInstance<User>
  onChange?: () => void
}

const CustomHeaderColumn: FC<Props> = ({ column }) => (
  <>
    {column.Header && typeof column.Header === 'string' ? (
      <th aria-controls="kt_profile_overview_table"
        rowspan="1"
        colspan="1"
        {...column.getHeaderProps()}>{column.render('Header')}</th>
    ) : (
      column.render('Header')
    )}
  </>
)

export { CustomHeaderColumn }