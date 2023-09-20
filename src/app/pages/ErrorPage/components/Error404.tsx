import { Strings } from 'app/resource/Strings'
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import { PATHS } from 'config/paths/paths'

const Error404: FC = () => {
  return (
    <>
      <h1 className='fw-bolder fs-2hx text-gray-900 mb-4'>
        {Strings.oops}
      </h1>
      <div className='fw-semibold fs-6 text-gray-500 mb-7'>
        {Strings.weCantFindThatPage}
      </div>
      <div className='mb-3'>
        <img
          src={toAbsoluteUrl('/media/auth/404-error.png')}
          className='mw-100 mh-300px theme-light-show'
          alt=''
        />
        <img
          src={toAbsoluteUrl('/media/auth/404-error-dark.png')}
          className='mw-100 mh-300px theme-dark-show'
          alt=''
        />
      </div>

      <div className='mb-0'>
        <Link to={PATHS.dashboard.list} className='btn btn-sm btn-primary'>
         {Strings.returnHome}
        </Link>
      </div>
    </>
  )
}

export {Error404}
