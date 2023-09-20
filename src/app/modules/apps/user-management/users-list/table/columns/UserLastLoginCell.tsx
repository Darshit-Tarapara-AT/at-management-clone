import { UserPersonalInformation } from 'app/redux/UserSlice/UserTypes'
import {FC} from 'react'

type Props = {
  user?: UserPersonalInformation
}

const UserLastLoginCell: FC<Props> = (user) => {

 return (
  <div className='badge badge-light fw-bolder'>{
    user.user?.role_id.name}</div>
 )
}

export {UserLastLoginCell}
