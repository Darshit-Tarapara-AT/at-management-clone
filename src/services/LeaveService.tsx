import { addLeavePayload } from 'app/redux/LeaveSlice/LeaveAyscThunk'
import { hasError, hasSuccess } from './ApiHelpers';
import { appClient } from './NetworkService';
import apiConfig from 'config/api';
import { GetLeaveListPayload } from 'app/redux/LeaveSlice/LeaveAyscThunk';

export interface UserLeaveCalendarPayload {
  month: string;
  token: string;
  view: string
  year: string;
}
export async function getAllLeave(userToken: string, page: number, limit = 10) {
  const payload = {
    page,
    size: limit,
  }
  try {
    const response = await appClient.post(apiConfig.leave.list, payload, {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })

    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function getUserLeaveCalendarData(payload: UserLeaveCalendarPayload) {
  const APIpayload = { month: payload.month, year: payload.year, view: payload.view}

  try {
    const response = await appClient.post(apiConfig.leave.calendar, APIpayload,{
      headers: {
        'Authorization': `Bearer ${payload.token}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function addNewLeave(userToken: string, payload: addLeavePayload) {
  const APIPayload = {
    start_date: payload.start_date,
    end_date: payload.end_date,
    reason: payload.reason,
    information_type: payload.information_type,
    status: payload.status,
    joining_date: payload.joining_date,
    type: "full"
  }
  try {
    const response = await appClient.post(apiConfig.leave.add, APIPayload, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function deleteLeave(userToken: string, id: number) {
  try {
    const response = await appClient.delete(apiConfig.leave.list + '/' + id, {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function editLeave(userToken: string, payload: addLeavePayload) {
  const APIPayload = {
    start_date: payload.start_date,
    end_date: payload.end_date,
    reason: payload.reason,
    information_type: payload.information_type,
    status: payload.status,
    joining_date: payload.joining_date,
    type: "full",
    comment: payload.comment
  }
  try {
    const response = await appClient.post(apiConfig.leave.update + "/" + payload.id, APIPayload, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function getIndividualLeave(userToken: string, id: number) {
  try {
    const response = await appClient.get(apiConfig.leave.individual + '/' + id, {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export const fetchSearchLeave = async (
  token: string,
  query: string,
  page: number,
  addedBy: string,
  position: string,
  account: string,
  limit = 10
) => {
  const payload = {
    page,
    queryFilter: query,
    userFilter: addedBy,
    positionFilter: position,
    accountFilter: account,
    size: limit,
  }

  try {
    const response = await appClient.post(apiConfig.leave.list, payload, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
};

export async function getFilterListLeave(payload: GetLeaveListPayload) {
  const APIpayload = {
    start_date: payload.start_date,
    end_date: payload.end_date,
    status: payload.statusFilter,
    userFilter: payload.userFilter,
    page: payload.page,
    queryFilter: "",
    size: payload.size || 10,
    information_type: payload.information_type
  }
  try {
    const response = await appClient.post(apiConfig.leave.list, APIpayload, {
      headers: {
        "Authorization": "Bearer " + payload.token,
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}
export async function getUserLeave(userToken: string, page: number, limit = 10) {
  try {
    const response = await appClient.get(apiConfig.leave.userLeave + "?page=" + page + "&size=" + limit, {
      headers: {
        "Authorization": "Bearer " + userToken,
      }
    })

    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}