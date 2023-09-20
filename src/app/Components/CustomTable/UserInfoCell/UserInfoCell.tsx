/* eslint-disable jsx-a11y/anchor-is-valid */
import { auto } from '@popperjs/core'
import { FC } from 'react'

type Props = {
    firstName?: string
    lastName?: string
    url?: string
    email?: string
}

const UserInfoCell: FC<Props> = ({ firstName, lastName = '', url, email }) => {
    return (
        <div className='d-flex align-items-center'>
            {url && (
                   <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                   <div className='symbol-label'>
                      <img src={url} alt={firstName} className='w-100'/> 
                   </div>
               </div>
            )}
            <div className='d-flex flex-column'>
                <span className='text-gray-800 mb-1'>
                    {firstName + ' ' + lastName}
                </span>
                <span>{email}</span>
            </div>
        </div>
    )
}

export { UserInfoCell }
