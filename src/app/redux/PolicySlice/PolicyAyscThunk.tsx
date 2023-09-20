import {createAsyncThunk} from '@reduxjs/toolkit'
import {SearchQueryPayload} from 'app/Modal/Modal'
import {
  addPolicy,
  deletePolicy,
  editPolicy,
  fetchSearchPolicy,
  getAllPolicy,
  getIndividualPolicy,
  userPolicyConsent,
  getUnreadPolicy,
} from 'services/PolicyService'
import {IRootState} from '../store'
import {AddPolicyPayload, UpdatePolicyPayload} from './PolicyTypes'
import {getUserProfileActions} from '../UserSlice/UserAyscThunk'
import constant from 'config/const/const'


export const getPolicy = createAsyncThunk(
  'policy/getPolicy',
  async (
    payload: {
      token: string
      page: number
      role?: string
      size?: number
      status?: string
      query?: string
    },
    {getState}
  ) => {
    try {
      const {PolicyStateData} = getState() as IRootState
      const {limit} = PolicyStateData
      const response = await getAllPolicy(
        payload.token,
        payload.page,
        payload.role || '',
        payload.size || limit,
        payload.status || '',
        payload.query || ''
      )
      if (response?.status === constant.APIResponse.defaultStratusCode) {
        return response?.data?.data
      } else if (response?.status === constant.APIResponse.errorStatusCode) {
        return response?.data?.message
      }
    } catch (error) {
      return error
    }
  }
)

export const getUnreadPolicyAction = createAsyncThunk(
  'policy/getUnreadPolicy',
  async (
    payload: {
      token: string
      page: number
      role?: string
      size?: number
      status?: string
      query?: string
    },
    {getState}
  ) => {
    try {
      const {PolicyStateData} = getState() as IRootState
      const {limit} = PolicyStateData
      const response = await getUnreadPolicy(
        payload.token,
        payload.page,
        payload.role || '',
        payload.size || limit,
        payload.status || '',
        payload.query || ''
      )
      if (response?.status === constant.APIResponse.defaultStratusCode) {
        return response?.data?.data
      } else if (response?.status === constant.APIResponse.errorStatusCode) {
        return response?.data?.message
      }
    } catch (error) {
      return error
    }
  }
)

export const deletePolicyAction = createAsyncThunk('policy/deletePolicy', async (payload:{token:string, id: number}, { dispatch }) => {
  try {
    const response = await deletePolicy(payload.token,payload.id);
    if (response?.data?.status) {
      dispatch(getPolicy({token:payload.token, page: constant.page.defaultNumber,role:"", size: constant.page.size, status:"",query: "" }));
      dispatch(getUserProfileActions(payload.token))
    }
    return response?.data?.status;
  } catch (error) {
    return error
  }
})

export const addPolicyAction = createAsyncThunk(
  'policy/addPolicy',
  async (payload: AddPolicyPayload) => {
    try {
      const response = await addPolicy(payload.token, payload)
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)

export const editPolicyAction = createAsyncThunk(
  'policy/editPolicy',
  async (payload: UpdatePolicyPayload, {dispatch}) => {
    try {
      const response = await editPolicy(payload)
      return {status: response?.data?.status, message: response?.data?.message}
    } catch (error) {
      return error
    }
  }
)

export const getIndividualPolicyAction = createAsyncThunk(
  'policy/getIndividualPolicy',
  async (payload: {token: string; id: number}, {dispatch}) => {
    try {
      const response = await getIndividualPolicy(payload.token, payload.id)
      if (response?.data?.status) {
        const policyRolesId = response?.data?.data?.policyData?.policy_roles?.map(
          (policyRole: any) => policyRole?.id
        )
        return {
          id: response?.data?.data?.policyData?.id,
          title: response?.data?.data?.policyData?.title,
          description: response?.data?.data?.policyData?.description,
          label: response?.data?.data?.data?.policyData?.label,
          lastUpdatedUserId: response?.data?.data?.policyData?.user_id,
          created_by:response?.data?.data?.policyData?.created_by,
          updated_by:response?.data?.data?.policyData?.updated_by,
          created_at:response?.data?.data?.policyData?.created_at,
          updated_at:response?.data?.data?.policyData?.updated_at,
          added_by_user:response?.data?.data?.policyData?.added_by_user,
          updated_by_user:response?.data?.data?.policyData?.updated_by_user,
          policyRolesId,
          status: response?.data?.data?.policyData?.status,
          isRead: response?.data?.data?.is_read,
        }
      }
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)

export const getSearchPolicyList = createAsyncThunk(
  'policy/getSearchPolicy',
  async (payload: SearchQueryPayload, {dispatch}) => {
    try {
      const response = await fetchSearchPolicy(
        payload.token,
        payload.query,
        payload.role || '',
        payload.size || constant.page.size,
        payload.status || ''
      )
      if (response?.data?.status) {
        return response?.data?.data
      }
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)

export const sentUserConsentConfirmation = createAsyncThunk(
  'policy/readPolicy',
  async (payload: {token: string; is_read: number; id: number}, {dispatch}) => {
    try {
      const response = await userPolicyConsent(payload.token, payload.id, payload.is_read)
      if (response?.data?.status) {
        return {message: response?.data?.data, status: response?.data?.status}
      }
      return response?.data?.data
    } catch (error) {
      return error
    }
  }
)
