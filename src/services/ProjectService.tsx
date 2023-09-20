import { hasError, hasSuccess } from './ApiHelpers';
import { appClient } from './NetworkService';
import apiConfig from 'config/api';
import { addProjectActionPayload, editProjectActionPayload } from 'app/redux/ProjectSlice/ProjectTypes';
import { FormikKeys } from 'app/Components/TextArea';
import { SearchProjectQueryPayload } from 'app/redux/ProjectSlice/ProjectAyscThunk';
import { store } from 'app/redux/store';
import constant from 'config/const/const';

export async function getAllProjects(userToken: string, page: number,status: string, userId: number| string,  limit = 20) {
  try {
    const currentUser = store.getState().UserStateData?.currentUserProfileDetails
    const payload = {
      size: limit,
      page,
      status,
      user_id: currentUser?.role_id?.name?.includes(constant.roles.admin) ? "" : userId
    }
    const response = await appClient.post(apiConfig.project.list, payload, {
      headers: {
        "Authorization": "Bearer " + userToken,
      }
    })
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
}

export async function getProjectParentTask(userToken: string, id: number) {
  try {
    const response = await appClient.get(apiConfig.project.parentTask + "/" + id, {
      headers: {
        "Authorization": "Bearer " + userToken,
      }
    })
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
}

export async function addNewProject(userToken:string,payload: addProjectActionPayload) {
  try {
    let APIPayload:FormikKeys = {}
    for (let key in payload) {
      let payLoadKey = payload[key as keyof addProjectActionPayload] as string;
      if(payLoadKey === "null" || payLoadKey === "Null" || payLoadKey === null) {
        payLoadKey = ""
      }
      APIPayload[key] = payLoadKey
    }
    const response = await appClient.post(apiConfig.project.add, payload,{
      headers: {
        "Authorization": "Bearer " + userToken,
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function deleteProject(userToken:string,id: number) {
  try {
    const response = await appClient.delete(apiConfig.project.list + "/" + id, {
      headers: {
        "Authorization": "Bearer " + userToken,
      }
    })
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
}

export async function editProject(userToken : string, id: number,payload: editProjectActionPayload) {
  try {
    const formData = new FormData();
    for (let key in payload) {
      let payLoadKey = payload[key as keyof editProjectActionPayload] as string;
      if(payLoadKey === "null" || payLoadKey === "Null" || payLoadKey === null) {
        payLoadKey = ""
      }
      formData.append(key, payLoadKey);
    }
    const response = await appClient.post(apiConfig.project.update + "/" + id,formData,{
      headers: {
        "Authorization": "Bearer " + userToken,
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export const fetchSearchProject = async (payload: SearchProjectQueryPayload) => {
  const { clientTypeFilter, billingTypeFilter, limit,  page,  query, status} = payload
  const APIpayload = {
    client_type: clientTypeFilter,
    billing_type: billingTypeFilter,
    page,
    status,
    size: limit ,
    queryFilter: query.toLocaleLowerCase(),
    user_id: payload.userId
  }
  try {
    const response = await appClient.post(apiConfig.project.list, APIpayload, {
      headers: {
        'Authorization': 'Bearer ' + payload.token,
      }
    });
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
};

export async function getIndividualProject(userToken:string,id: number) {
  try {
    const response = await appClient.get(apiConfig.project.individual + "/" + id,{
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}