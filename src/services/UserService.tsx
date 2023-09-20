import { hasError, hasSuccess } from './ApiHelpers'
import { appClient } from './NetworkService'
import apiConfig from 'config/api'
import { AddUserPayLoad as FormUserPayLoad } from 'app/pages/Users/Components/Modal/Modal';
import constant from 'config/const/const';

export async function getAllUsers(userToken: string, page: number, limit = 10, role = '', status = '',query: string ='') {
  const payload = { page, size: limit, role, status,queryFilter: query }

  try {
    const response = await appClient.post(apiConfig.users.list, payload,{
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function addNewUser(userToken:string,payload: FormUserPayLoad) {
  try {
    const formData = new FormData();
    for (let key in payload) {
      formData.append(key, payload[key as keyof FormUserPayLoad])
    }
    const response = await appClient.post(apiConfig.users.add, formData,{
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function deleteUser(userToken:string,id: number) {
  try {
    const response = await appClient.delete(apiConfig.users.list + "/" + id,{
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function editUser(userToken:string, id: number, payload: FormUserPayLoad) {

  try {
    const formData = new FormData();
    for (let key in payload) {
      formData.append(key, payload[key as keyof FormUserPayLoad])
    }
    const response = await appClient.post(apiConfig.users.update + "/" + id, formData,{
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function getIndividualUser(userToken:string,id: number) {
  try {
    const response = await appClient.get(apiConfig.users.individual + "/" + id,{
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export const fetchSearchUsers = async (userToken: string,query: string,role: string ,status: string,page: number = 1) => {
  const payload = {
    queryFilter: query,
    size: constant.page.size,
    role,
    status,
    page
  }
  try {
    const response = await appClient.post(apiConfig.users.list, payload,{
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
};

export const getUserDetails = async (userToken:string) => {
  try {
    const response = await appClient.get(apiConfig.auth.profile, {
      headers: {
        'Authorization': `Bearer ${userToken}` 
      }
    });
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
}
}

export async function getFilterUsers(userToken: string,page: number,query: string,role: string = '',limit: number =10,status: string) {
const payload = {
    page,
    size: limit,
    queryFilter: query,
    role,
    status
}
  try {
    const response = await appClient.post(apiConfig.users.list , payload,{
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}
