import React from 'react'
import './UserPersonalInformation.scss'
interface UserProfileProps {
  name: string
  url: string
  email: string
}
const UserPersonalInformation: React.FC<UserProfileProps> = ({url, name, email}) => {
  return (
    <div className='d-flex align-items-center' style={{width: '32px', marginLeft: '-10px'}}>
      <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
        <div className='symbol-label'>
          <img src={url} alt={name} className='w-100' />
        </div>
      </div>
      <div className='d-flex flex-column mb-1'>
        <span className='text-gray-800 text-start text-hover-primary mb-1 text-hover-primary'>
          {name}
        </span>
        <span>{email}</span>
      </div>
    </div>
  )
}

export default UserPersonalInformation
