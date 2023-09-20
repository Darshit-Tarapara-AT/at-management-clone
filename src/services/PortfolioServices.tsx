import {hasError, hasSuccess} from './ApiHelpers'
import {appClient} from './NetworkService'
import apiConfig from 'config/api'
import {FormikKeys} from 'app/Components/TextArea'
import { SearchPortfolioQueryPayload } from 'app/redux/PortfolioSlice/PortfolioAyscThunk'

export async function getAllPortfolio(
  userToken: string,
  page: number,
  limit = 10,
  technologies?: string,
  industries?: string,
  project_type?: string,
  tools?: string,
  tag?: string
) {
  try {
    const payload = { page:page ,size: limit , technologies: technologies , industries:industries, projectType: project_type , tools: tools || "",  tag: tag || ""}
      const response = await appClient.post(
      apiConfig.project.portfolio, payload,
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

export async function getIndividualPortfolio(userToken: string, id: number) {
  try {
    const response = await appClient.get(apiConfig.project.portfolio + '/' + id, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export const fetchSearchPortfolio = async (payload: SearchPortfolioQueryPayload ) => {
  try {
    const response = await appClient.post(apiConfig.project.portfolio, removeTokenFieldFromPayload(payload), {
      headers: {
        'Authorization': 'Bearer ' + payload.token,
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
