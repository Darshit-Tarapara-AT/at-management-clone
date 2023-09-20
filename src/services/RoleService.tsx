import { hasError, hasSuccess } from './ApiHelpers'
import { appClient } from './NetworkService'
import apiConfig from 'config/api'
import { FormRolePayload } from 'app/redux/RoleSlice/RoleAyscThunk'

export async function getAllRoles(userToken: string, page: number, limit = 20,query?: string) {
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

export async function addNewRole(userToken: string,payload: FormRolePayload) {
  try {
    const response = await appClient.post(apiConfig.roles.list, payload, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function deleteRole(userToken: string, id: number) {

  try {
    const response = await appClient.delete(apiConfig.roles.list + "/" + id, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function editRole(userToken: string, id: number, name: string, permissions: number[], default_role:string, label : string) {
  const payLoad = { name, permissions: permissions, default_role, label }
  try {

    const response = await appClient.put(apiConfig.roles.list + "/" + id,payLoad, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function getIndividualRolePermissionsList(userToken: string, id: number) {
  try {
    const response = await appClient.get(apiConfig.roles.list + "/" + id, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export const fetchSearchRoles= async (token: string,query: string,page: number,limit= 10) => {
  try {
    const response = await appClient.get(apiConfig.roles.list + "?queryFilter=" + query + '&page=' + page + '&size=' + limit,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
};