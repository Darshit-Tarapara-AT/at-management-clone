import {FC, PropsWithChildren} from 'react'
import {HeaderProps} from 'react-table'
import {useListView} from '../../core/ListViewProvider'
import {User} from '../../core/_models'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {UserActions} from 'app/redux/UserSlice/UserSlice'
import {IRootState} from 'app/redux/store'
import {policyActions} from 'app/redux/PolicySlice/PolicySlice'
type Props = {
  tableProps: PropsWithChildren<HeaderProps<User>>
  Id?: string
}

const location = window.location.pathname

const UserSelectionHeader: FC<Props> = ({tableProps, Id}) => {
  const {isAllSelected: isAllSelect, onSelectAll} = useListView()
  const {isCheckAll: isAllUserSelected} = useSelector((state: IRootState) => state.UserStateData)
  const {isCheckAll: isAllPolicySelected} = useSelector(
    (state: IRootState) => state.PolicyStateData
  )
  const [isAllSelected, setIsAllSelected] = useState(false)
  const dispatch = useDispatch()
  let isAllChecked
  if (Id === 'policy') {
    isAllChecked = isAllPolicySelected
  }
  if (Id === 'users') {
    isAllChecked = isAllUserSelected
  }

  const changeHandler = () => {
    setIsAllSelected((preViewState) => !preViewState)
    if (Id === 'policy') {
      dispatch(policyActions.setSelectedRow())
    } else if (Id === 'users') {
      dispatch(UserActions.setSelectedRow())
    }
  }

  return (
    <th {...tableProps.column.getHeaderProps()} className='w-10px pe-2'>
      <div className='form-check form-check-sm form-check-custom form-check-solid me-3'>
        <input
          className='form-check-input'
          type='checkbox'
          data-kt-check={location.includes('user-management') ? isAllSelect : isAllSelected}
          data-kt-check-target='#kt_table_users .form-check-input'
          checked={location.includes('user-management') ? isAllSelect : isAllChecked}
          onChange={() => {
            if (location.includes('user-management')) {
              onSelectAll()
              return
            }
            changeHandler()
          }}
        />
      </div>
    </th>
  )
}

export {UserSelectionHeader}
