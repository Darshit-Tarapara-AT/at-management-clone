/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { FC } from 'react'
import { IRootState, useAppDispatch } from 'app/redux/store'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { Logout } from '../pages/auth'
import { App } from '../App'
import { getUserToken } from 'services/AuthServices'
import { Login } from 'app/pages/auth/components/Login/Login'
import Validate from 'app/pages/Validate/Validate'
import { AuthLayout } from 'app/pages/auth/core/AuthLayout/AuthLayout'
import Error401 from 'app/pages/ErrorPage/components/Error401'
import { getCurrentUserIPAddress } from 'app/redux/ipAddressSlice/ipAddressAyscThunk'
import { PATHS } from 'config/paths/paths'

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env

const AppRoutes: FC = () => {
  const { isAuth } = useSelector((state: IRootState) => state.AuthStateData)
  const userToken = getUserToken()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getCurrentUserIPAddress(''))
}, [dispatch])

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          <Route path='/unauthorized-access' element={<Error401 />} />
          {userToken || isAuth ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to={PATHS.dashboard.list} />} />
            </>
          ) : (
            <>
              <Route path={PATHS.auth.login} element={
                  <AuthLayout component={Login} />

              } />
              <Route path='/validate/:email/:otp' element={ <AuthLayout component={Validate} />} />
              <Route path='*' element={<Navigate to={PATHS.auth.login} />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { AppRoutes }
