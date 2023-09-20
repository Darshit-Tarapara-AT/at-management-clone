import axios from 'axios'
import {hasError, hasSuccess} from './ApiHelpers'
import {appClient} from './NetworkService'
import apiConfig from 'config/api'
import config from 'config/config'

export async function getAllIPAddress(userToken: string, page: number, limit = 20, query: string) {
  try {
    const response = await appClient.get(
      apiConfig.ip.list + '?page=' + page + '&size=' + limit + '&queryFilter=' + query,
      {
        headers: {
          Authorization: 'Bearer ' + userToken,
        },
      }
    )

    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function addNewIpAddress(userToken: string, ipAddress: string, name: string) {
  const payload = {ip_address: ipAddress, name}
  try {
    const response = await appClient.post(apiConfig.ip.add, payload, {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function editIpAddress(userToken: string, id: number, ipAddress: string, name: string) {
  const payLoad = {ip_address: ipAddress, name}
  try {
    const response = await appClient.post(apiConfig.ip.update + '/' + id, payLoad, {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function getIndividualIpAddress(userToken: string, id: number) {
  try {
    const response = await appClient.get(apiConfig.ip.individual + '/' + id, {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function deleteIPAddress(userToken: string, id: number) {
  try {
    const response = await appClient.delete(apiConfig.ip.list + '/' + id, {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export const fetchSearchIPAddress = async (
  token: string,
  query: string,
  page: number,
  limit = 10
) => {
  try {
    const response = await appClient.get(
      apiConfig.ip.list + '?queryFilter=' + query + '&page=' + page + '&size=' + limit,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export const getCurrentIPAddress = async () => {
  try {
    const response = await axios.get(config.getIpAddressUrl)
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}