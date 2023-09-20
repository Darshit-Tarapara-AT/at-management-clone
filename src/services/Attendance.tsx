import { hasError, hasSuccess } from './ApiHelpers'
import { appClient } from './NetworkService'
import apiConfig from 'config/api'
import { AddUserPayLoad as FormUserPayLoad } from 'app/pages/Users/Components/Modal/Modal';
import constant from 'config/const/const';
import { EditHolidayPayload } from 'app/redux/AttendanceSlice/AttendanceAyscThunk';
import { removeTokenFieldFromPayload } from './CredentialService';
import { AddHolidayPayload } from 'app/redux/AttendanceSlice/AttendanceAyscThunk';

export interface UserCalendarPayload {
  token: string
  userId: number
  month: string
  year: string
  view: string
}

export interface UserCalendarListPayload {
  token: string
  queryFilter?: string,
  page: number,
  size: number ,
  month: string | number,
  year: string | number
}

export interface HolidayListPayload {
page: number
size: number
token: string
queryFilter?: string
}

export interface attendanceCorrectionRequestPayload {
  taskId: number;
  userId: string;
  projectId: string;
}
export async function getUserCalendarData(payload: UserCalendarPayload) {
  const APIpayload = { month: payload.month, year: payload.year, view: payload.view, user_id: payload.userId}
  try {
    const response = await appClient.post(apiConfig.attendance.calendarList, APIpayload,{
      headers: {
        'Authorization': `Bearer ${payload.token}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}


export async function getUserCalendarList(payload: UserCalendarListPayload) {
  const APIpayload = { queryFilter:payload.queryFilter, page: payload.page, size:payload.size, month: payload.month, year: payload.year}
  try {
    const response = await appClient.post(apiConfig.attendance.masterAttendanceList, APIpayload,{
      headers: {
        'Authorization': `Bearer ${payload.token}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function getAllHolidayList(payload: HolidayListPayload) {
  try {
    const response = await appClient.post(apiConfig.attendance.holiday.list, removeTokenFieldFromPayload(payload),{
      headers: {
        'Authorization': `Bearer ${payload.token}`
      }
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
  }
}

export async function deleteMultiPleHoliday(userToken: string, id: string) {
  try {
    const payload = {
      holiday_id: id
    }

    const response = await appClient.post(apiConfig.attendance.holiday.deleteMultiple, payload, {
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

export async function getIndividualHoliday(userToken: string, id: number) {
  try {
    const response = await appClient.get(apiConfig.attendance.holiday.view + id, {
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

export async function editHoliday(userToken: string, id: number,payload:EditHolidayPayload) {
  try {
    const response = await appClient.post(
      apiConfig.attendance.holiday.edit + '/' + id,removeTokenFieldFromPayload(payload), {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
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



export async function addHoliday(userToken: string,payload:AddHolidayPayload) {
  try {
    const response = await appClient.post(
      apiConfig.attendance.holiday.add ,removeTokenFieldFromPayload(payload), {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    return hasSuccess(response.data)
  } catch (error) {
    return hasError(error)
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
