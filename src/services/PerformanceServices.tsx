import { hasError, hasSuccess } from './ApiHelpers'
import { appClient } from './NetworkService'
import apiConfig from 'config/api'

export async function getAllPerformance(userToken: string, page: number, limit = 20,query?: string) {
  try {
    const response = await appClient.get(apiConfig.roles.list + '?page=' + page + '&size=' + limit + '&queryFilter='+query, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}



