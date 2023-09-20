import { hasError, hasSuccess } from './ApiHelpers'
import { appClient } from './NetworkService'
import apiConfig from 'config/api'
import { AddPolicyPayload, UpdatePolicyPayload } from 'app/redux/PolicySlice/PolicyTypes';

export async function getAllPolicy(token:string,page: number,role:string, limit = 20,status:string,query: string) {
  try {
    const response = await appClient.get(apiConfig.policy.list + '?page=' + page + '&size=' + limit +'&role=' + role +'&status='+ status + "&queryFilter=" + query ,{
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function getUnreadPolicy(token:string,page: number,role:string, limit = 20,status:string,query: string) {
  try {
    const response = await appClient.get(apiConfig.policy.unread + '?page=' + page + '&size=' + limit +'&role=' + role +'&status='+ status + "&queryFilter=" + query ,{
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function addPolicy(token:string,payload:AddPolicyPayload) {

  try {
    const response = await appClient.post(apiConfig.policy.list,payload.item, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
   
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function deletePolicy(token:string,id: number) {

  try {
    const response = await appClient.delete(apiConfig.policy.list + "/" + id, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function editPolicy(payload:UpdatePolicyPayload) {

  try {
    const response = await appClient.put(apiConfig.policy.list + "/" + payload.id,payload.item, {
      headers: {
        'Authorization': `Bearer ${payload.token}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function getIndividualPolicy(userToken: string,id: number) {
  try {
    const response = await appClient.get(apiConfig.policy.list + "/" + id, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export const fetchSearchPolicy = async (token:string,query:string,role:string,size:number,status:string) => {
  try {
    const endUrl = apiConfig.policy.list + "?queryFilter=" + query + "&size=" + size +'&role=' + role +'&status='+ status;
    const response = await appClient.get(endUrl,
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

export const userPolicyConsent = async (token:string,id:number, is_read:number) => {
  const payload ={
    is_read
   
   }

  try {
    const response = await appClient.post(apiConfig.policy.read +"/" + id,payload,
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

