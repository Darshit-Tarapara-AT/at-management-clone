import {Route, Routes} from 'react-router-dom'
import {Login} from './components/Login/Login'
import { PATHS } from 'config/paths/paths'

const AuthPage = () => (
  
  <Routes>
   
      <Route path={PATHS.auth.login} element={<Login />} />
      
      <Route index element={<Login />} />
  
  </Routes>
)

export {AuthPage}
