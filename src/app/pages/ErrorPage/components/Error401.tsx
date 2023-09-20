import React, { useEffect } from 'react'
import { removeAll } from 'app/utils/storage'
import { Strings } from 'app/resource/Strings'
const Error401 = () => {
  useEffect(() => {
    removeAll()
  },[])
  return (
    <div className='error-container'>
        <h1>{Strings.httpError401UnauthorizedAccess}</h1>
    </div>
  )
}

export default Error401