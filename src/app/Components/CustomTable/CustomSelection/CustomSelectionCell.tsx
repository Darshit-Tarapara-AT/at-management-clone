import {BaseSyntheticEvent, FC} from 'react'
import { ID } from '_metronic/helpers'
import {useDispatch, useSelector} from 'react-redux'
import {IRootState} from 'app/redux/store'
import {policyActions} from 'app/redux/PolicySlice/PolicySlice'
import {UserActions} from 'app/redux/UserSlice/UserSlice'
interface Props {
  id: ID
  page: string
}

const CustomSelectionCell: FC<Props> = ({id, page}) => {

  const {isCheck} = useSelector((state: IRootState) => state.UserStateData)
  const {isCheck: isUserChecked} = useSelector((state: IRootState) => state.UserStateData)
  const {isCheck: isPolicyChecked} = useSelector((state: IRootState) => state.PolicyStateData)
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
        data-kt-check={ isCheck}
        data-kt-check-target='#kt_table_users .form-check-input'
        checked={isChecked.includes(id)}
        onChange={(e: BaseSyntheticEvent) => {
          changeHandler(e, id!)
        }}
      />
    </div>
  )
}

export {CustomSelectionCell }
