import { hasError, hasSuccess } from './ApiHelpers'
import { appClient } from './NetworkService'
import apiConfig from 'config/api'
import { LeadFormValues } from 'app/pages/Lead/Components/Modal/Modal';
import { LeadInformation } from 'app/redux/LeadSlice/LeadTypes';
import constant  from 'config/const/const';

export async function getAllLeads(userToken: string, page: number, query ='' , size:number,addedBy:string ='', status:string ='') {
  try {
    const payload = { page, size, queryFilter: query,userFilter: addedBy, status }
    const response = await appClient.post(apiConfig.lead.list,payload,{
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
}

export async function addNewLead(userToken:string,payload: LeadInformation) {
  try {
    const response = await appClient.post(apiConfig.lead.add, payload,{
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function deleteLead(userToken:string,id: number) {
  try {
    const response = await appClient.delete(apiConfig.lead.list + "/" + id,{
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function editLead(userToken:string, id: number, payload: LeadFormValues) {
const APIPayload = {...payload};
  try {
    const response = await appClient.post(apiConfig.lead.update + "/" + id, APIPayload,{
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export const fetchSearchLeads = async (userToken: string, query: string , size: number, addedBy: string ='', status: string ='') => {
  const payload = { page: constant.page.defaultNumber, size, queryFilter: query, userFilter: addedBy , status }
  try {
    const response = await appClient.post(apiConfig.lead.list, payload, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    return hasSuccess(response.data);
  } catch (error) {
    return hasError(error);
  }
};

export async function getIndividualLead(userToken: string, id: number) {
  try {
    const response = await appClient.get(apiConfig.lead.individual + "/" + id, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}
