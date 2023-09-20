import { hasError, hasSuccess } from './ApiHelpers';
import { appClient } from './NetworkService';
import apiConfig from 'config/api';
import { ClientFormValues } from 'app/pages/Client/Components/Modal/Modal';

export async function getAllClients(userToken: string, page: number, limit = 10) {
  const payload = {
    page,
    size: limit
  }
  try {
    const response = await appClient.post(apiConfig.client.list, payload,  {
      headers: {
        "Authorization": "Bearer " + userToken,
      }
    })

    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function addNewPermission(userToken:string, name: string, label:string) {
  const payLoad = { name , label}
  try {
    const response = await appClient.post(apiConfig.permissions.list, payLoad,{
      headers: {
        "Authorization": "Bearer " + userToken,
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function deleteClient(userToken:string,id: number) {

  try {
    const response = await appClient.delete(apiConfig.client.list + "/" + id, {
      headers: {
        "Authorization": "Bearer " + userToken,
      }
    })
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
}

export async function editClient(userToken : string, id: number,payload: ClientFormValues) {
  try {
    const response = await appClient.post(apiConfig.client.update + "/" + id,payload,{
      headers: {
        "Authorization": "Bearer " + userToken,
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function getIndividualClient(userToken : string,id: number) {
  try {
    const response = await appClient.get(apiConfig.client.individual + "/" + id,{
      headers: {
        "Authorization": "Bearer " + userToken,
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}


export const fetchSearchClients = async (token:string,query: string,page: number,addedBy: string, position: string, account: string, limit= 10, status: string) => {
  const payload = {
      page,
      queryFilter: query,
      userFilter: addedBy,
      positionFilter: position,
      accountFilter: account,
      size: limit,
      status
    }

  try {
    const response = await appClient.post(apiConfig.client.list, payload, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
};