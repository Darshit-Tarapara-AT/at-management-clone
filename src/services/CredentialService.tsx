import {AddCredentialPayload, EditCredentialPayload} from 'app/redux/CredentialSlice/CredentialAyscThunk'
import {hasError, hasSuccess} from './ApiHelpers'
import {appClient} from './NetworkService'
import apiConfig from 'config/api'
import {FormikKeys} from 'app/Components/TextArea'

export async function getAllCredentials(
  userToken: string,
  page: number,
  limit = 20,
  query?: string,
  role?:string,
  client?:string,
  user?:string,
) {
  try {
    const payload = {page: page, size: limit, query: query, roleFilter: role, clientFilter: client, userFilter: user}
    const response = await appClient.post(
      apiConfig.credentials.list, payload,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function addNewCredential(userToken: string, payload: AddCredentialPayload) {
  try {
    const response = await appClient.post(
      apiConfig.credentials.add,
      removeTokenFieldFromPayload(payload),
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function deleteCredential(userToken: string, id: number) {
  try {
    const response = await appClient.delete(apiConfig.credentials.list + '/' + id, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function editCredential(userToken: string, id: number,payload:EditCredentialPayload) {
  try {
    const response = await appClient.post(
      apiConfig.credentials.edit + '/' + id,removeTokenFieldFromPayload(payload), {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function getIndividualCredential(userToken: string, id: number) {
  try {
    const response = await appClient.get(apiConfig.credentials.individual + '/' + id, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export const fetchSearchCredentials = async (token:string,query: string,page: number, role:'', user:'', client:'', limit= 20, ) => {
  const payload = {
      page,
      queryFilter: query,
      size: limit,
      role: role,
      user: user,
      client: client,
    }

  try {
    const response = await appClient.post(apiConfig.credentials.list, payload, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
}

export const removeTokenFieldFromPayload = (data: any) => {
  const payload: FormikKeys = {}
  Object.entries(data).forEach(([key, value]: any) => {
    if (!key?.includes('token') && key !== 'id') {
      payload[key] = value
    }
  })
  return payload
}
