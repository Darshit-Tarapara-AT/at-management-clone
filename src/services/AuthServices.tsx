import constant from 'config/const/const'
import {hasError, hasSuccess} from './ApiHelpers'
import {appClient} from './NetworkService'
import {setItem, getItem, removeAll} from 'app/utils/storage'
import apiConfig from 'config/api'

/**
 * loginUserInApp
 * @param user
 * @returns
 */
export function loginUserInApp(loginUserInfo: string) {
  let {error} = setItem(constant.localStorageKey.loginToken, JSON.stringify(loginUserInfo))
  return {error}
}

/**
 * isUserLoggedIn
 * @returns check user is loggedIn
 */
export function isUserLoggedIn() {
  let {data, error} = getItem(constant.localStorageKey.loginToken)
  if (error) {
    return {status: false, token: ''}
  }
  return parseUserData(data)
}

function parseUserData(data: string | null) {
  try {
    const {token} = JSON.parse(data!)
    return {status: true, token: token}
  } catch (error) {
    return {status: false, token: ''}
  }
}
/**
 * userLogin
 * @param email
 * @param password
 * @returns Return token if user login successfully
 */
export async function getLogInLink(email: string, customURL: string) {
  const payload = {email: email, custom_url: customURL}
  try {
    const response = await appClient.post(apiConfig.auth.otp, payload)
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function userLogin(email: string, otp: string) {
  const payload = {email, otp}

  try {
    const response = await appClient.post(apiConfig.auth.login, payload)
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function logOutUser() {
    const { token } = isUserLoggedIn();
    removeAll();
    await logoutExistingUser(token);
    return true;
}

export async function logoutExistingUser(userToken:string) {
    try {
      const response = await appClient.post(apiConfig.auth.logout, { }, {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      return hasSuccess(response.data);
    } catch (error) {
      return hasError(error);
    }
  }

/**
 * resetPasswordTokenVerify
 * @param token
 * @returns Check and verify reset password token
 */
export async function resetPasswordTokenVerify(token:string) {
  try {
    const response = await appClient.get(apiConfig.auth.verifyToken + '/' + token)
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export const getUserToken = () => {
  const {status, token} = isUserLoggedIn()
  if (status) return token
}

