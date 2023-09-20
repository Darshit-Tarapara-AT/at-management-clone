import {useEffect} from 'react'
import {Navigate, Routes} from 'react-router-dom'
import {useAuth} from './core/Auth'
import { PATHS } from 'config/paths/paths'

export function Logout() {
  const {logout} = useAuth()
  useEffect(() => {
    logout()
    document.location.reload()
  }, [logout])

  return (
    <Routes>
      <Navigate to={PATHS.auth.login} />
    </Routes>
  )
}
