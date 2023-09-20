import { hasError, hasSuccess } from './ApiHelpers'
import { appClient } from './NetworkService'
import apiConfig from 'config/api'

export async function getAllUserProjects(userToken: string, page: number, limit = 10) {
  try {
    const response = await appClient.get(apiConfig.task.list + '?page=' + page + '&size=' + limit,{
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
}