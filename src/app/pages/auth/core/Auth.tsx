import {
  FC,
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'
import {AuthModel, UserModel} from './_models'
import * as authHelper from './AuthHelpers'
import {WithChildren} from '../../../../_metronic/helpers'
import {logOutUser} from 'services/AuthServices'
import { removeAll, removeItem, setItem } from 'app/utils/storage'
import constant from 'config/const/const'
type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {

  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = async () => {
    localStorage.removeItem(constant.localStorageKey.loginToken)
    const email = localStorage.getItem(constant.localStorageKey.email);
    if(email) {
      setItem(constant.localStorageKey.email, email)
    }
    saveAuth(undefined)
    setCurrentUser(undefined);
    window.location.reload()
  }

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({children}) => {
  return  <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
