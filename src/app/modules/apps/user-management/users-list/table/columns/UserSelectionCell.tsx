import {BaseSyntheticEvent, FC, useMemo} from 'react'
import {ID} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useDispatch, useSelector} from 'react-redux'
import {IRootState} from 'app/redux/store'
import {policyActions} from 'app/redux/PolicySlice/PolicySlice'
import {UserActions} from 'app/redux/UserSlice/UserSlice'
interface Props {
  id: ID
  page: string
}
const location = window.location.pathname
const UserSelectionCell: FC<Props> = ({id, page}) => {
  const {selected, onSelect} = useListView()
  const {isCheck} = useSelector((state: IRootState) => state.UserStateData)
  const {isCheck: isUserChecked} = useSelector((state: IRootState) => state.UserStateData)
  const {isCheck: isPolicyChecked} = useSelector((state: IRootState) => state.PolicyStateData)
  const isAnySelected = useMemo(() => selected.includes(id), [id, selected])
  const dispatch = useDispatch()
  let isChecked: any[] = []

  if (page === 'policy') {
    isChecked = isPolicyChecked
  }
  if (page === 'users') {
    isChecked = isUserChecked
  }

  const changeHandler = (e: BaseSyntheticEvent, id: number) => {
    const payload = {
      isChecked: e.target.checked,
      id,
    }
    if (page === 'policy') {
      dispatch(policyActions.selectedSingleRow(payload))
    } else if (page === 'users') {
      dispatch(UserActions.selectedSingleRow(payload))
    }
  }
  return (
    <div className='form-check form-check-custom form-check-solid'>
      <input
        className='form-check-input'
        type='checkbox'
        data-kt-check={location.includes('user-management') ? isAnySelected : isCheck}
        data-kt-check-target='#kt_table_users .form-check-input'
        checked={location.includes('user-management') ? isAnySelected : isChecked.includes(id)}
        onChange={(e: BaseSyntheticEvent) => {
          if (location.includes('user-management')) {
            onSelect(id)
            return
          }
          changeHandler(e, id!)
        }}
      />
    </div>
  )
}

export {UserSelectionCell}
