import { hasError, hasSuccess } from './ApiHelpers';
import { appClient } from './NetworkService';
import apiConfig from 'config/api';

export async function getAllPermission(userToken: string, page: number, query: string, limit = 20) {
  try {
    const response = await appClient.get(apiConfig.permissions.list + '?page=' + page + '&size=' + limit + "&queryFilter=" + query, {
      headers: {
        "Authorization": "Bearer " + userToken,
      }
    })

    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function addNewPermission(userToken: string, name: string, label: string, module: string) {
  const payLoad = { name, label, module }
  try {
    const response = await appClient.post(apiConfig.permissions.list, payLoad, {
      headers: {
        "Authorization": "Bearer " + userToken,
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function deletePermission(userToken: string, id: number) {

  try {
    const response = await appClient.delete(apiConfig.permissions.list + "/" + id, {
      headers: {
        "Authorization": "Bearer " + userToken,
      }
    })
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
}


export async function editPermission(userToken: string, id: number, name: string, label: string, module: string) {
  const payLoad = { name, id, label, module }
  try {
    const response = await appClient.put(apiConfig.permissions.list + "/" + id, payLoad, {
      headers: {
        "Authorization": "Bearer " + userToken,
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function getIndividualPermission(userToken: string, id: number) {
  try {
    const response = await appClient.get(apiConfig.permissions.list + "/" + id, {
      headers: {
        "Authorization": "Bearer " + userToken,
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}


export const fetchSearchPermissions = async (token: string, query: string, page: number, size: number) => {
  try {
    const response = await appClient.get(apiConfig.permissions.list + "?queryFilter=" + query + '&page=' + page + '&size=' + size, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
};

export async function getAllModule(userToken: string, page: number, limit = 200) {
  try {
    const response = await appClient.get(apiConfig.module.list + '?page=' + page + '&size=' + limit, {
      headers: {
        "Authorization": "Bearer " + userToken,
      }
    })

    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}