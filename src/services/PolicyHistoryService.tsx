import { hasError, hasSuccess } from './ApiHelpers'
import { appClient } from './NetworkService'
import apiConfig from 'config/api'


export async function getAllPolicyLogs(userToken: string, page: number,role:string, size:number ) {
  try {
    const response = await appClient.get(apiConfig.history.log + '?page=' + page +'&role=' + role + '&size=' + size   ,{
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
  })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function getIndividualPolicyLog(userToken: string,page:number,id:number, size:number) {
  try {
    const response = await appClient.get(apiConfig.history.log + "/" + id + "?page=" + page +"&size=" + size ,{
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
  })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}
