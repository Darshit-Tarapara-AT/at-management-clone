import { createAsyncThunk } from '@reduxjs/toolkit'
import constant from 'config/const/const';
import { fetchSearchPortfolio, getAllPortfolio, getIndividualPortfolio } from 'services/PortfolioServices';
import { IRootState } from '../store';


export interface SearchPortfolioQueryPayload{
    query: string
    technology: string
    projectType: string
    tools: string,
    tag: string,
    page:number,
    token:string,
    industries?:string,
  }

export const getPortfolioAction = createAsyncThunk('project/portfolio', async (payload: {token:string , page:number,limit:number, technologies:string, industries:string,projectType:string,tools:string,tag:string }) => {
  try {
    const response = await getAllPortfolio(payload.token,payload.page, payload.limit,payload.technologies,payload.industries,payload.projectType,payload.tools,payload.tag);

    if (response?.status === constant.APIResponse.defaultStratusCode) {
        return response?.data?.data
    }
    else if (response?.status === constant.APIResponse.errorStatusCode) {
      return response?.data?.message
    }
    else {
      return response?.data?.message
    }
  } catch (error) {
    return error
  }
})

export const getIndividualPortfolioAction = createAsyncThunk(
    'project/getIndividualPortfolioAction',
    async (payload: {token: string; id: number}, {dispatch}) => {
      try {
        const response = await getIndividualPortfolio(payload.token, payload.id)
        if (response?.data?.status) {
          return response?.data?.data
        }
        return response?.data?.data
      } catch (error) {
        return error
      }
    }
  )

  export const getPortfolio = createAsyncThunk(
    'portfolio/getPortfolio',
    async (
      payload: {token: string; page: number; size?: number;  technologies:string, industries:string,projectType:string, tools:string, tags:string },
      {getState}
    ) => {
      try {
        const {portfolioStateData} = getState() as IRootState
        const {limit} = portfolioStateData
        const response = await getAllPortfolio(
          payload.token,
          payload.page,
          payload.size || limit,
          payload.technologies || '',
          payload.industries || '',
          payload.projectType || '',
          payload.tools || '',
          payload.tags || '',
        )
        if (response?.status === 200) {
          return response?.data?.data
        } else if (response?.status === 401) {
          return response?.data?.message
        }
      } catch (error) {
        return error
      }
    }
  )

export const getSearchPortfolioAction = createAsyncThunk(
    'projects/searchPortfolio',
    async (payload: SearchPortfolioQueryPayload, { dispatch }) => {
      try {
        const response = await fetchSearchPortfolio(
          payload
            )
        if (response?.data?.status) {
        return response?.data?.data
        }
        return response?.data?.data
      } catch (error) {
        return error
      }
    }
  );


