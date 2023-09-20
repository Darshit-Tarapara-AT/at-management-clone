import {Strings} from 'app/resource/Strings'
import {
  CredentialsFormValues,
  CustomPaginationListType,
  PermissionFormValues,
  PolicyFormValues,
  RolesFormValues,
} from 'app/Modal/Modal'
import DummyList from 'app/assets/data/DummyList.json'
import {RoleListProperties} from 'app/redux/RoleSlice/RolesTypes'
import {FormikProps} from 'formik'
import {LeadFormValues} from 'app/pages/Lead/Components/Modal/Modal'
import {IProfileDetails} from 'app/pages/Users/Components/Modal/Modal'
import {UserPersonalInformation} from 'app/redux/UserSlice/UserTypes'
import {SelectInputValue} from 'app/pages/Projects/Components/Modal/Modal'
import { PATHS } from 'config/paths/paths'
import { FormikKeys } from 'app/Components/TextArea'
import moment from 'moment'
interface Permissions {
  list?: boolean
  edit?: boolean
  delete?: boolean
  portfolio?: boolean
  add?: boolean
  addMaster?: boolean
  addUser?: boolean
  deleteMaster?: boolean
  view: boolean
  deleteUser?: boolean
  editMater?: boolean
  editUser?: boolean
  filter?: boolean
  List?: boolean
  masterList?: boolean
  userCalender?: boolean
  userList?: boolean
  viewMaster?: boolean
  viewUser?: boolean
}

interface SetFormilkErrorFieldParems {
  name: string
  value: string
  formilk:
    | FormikProps<IProfileDetails>
    | FormikProps<PolicyFormValues>
    | FormikProps<PermissionFormValues>
    | FormikProps<RolesFormValues>
    | FormikProps<LeadFormValues>
    | FormikProps<CredentialsFormValues>
}
export const capitalizeFirstLetter = (name: string) => {
  if(name) {
    return name
  }
  return ''
}

export const generateEditPagePath = (id: number, module: string) => {
  const path:FormikKeys = PATHS
  const dynamicPath = path[module].edit?.replaceAll(":id", id);
  return dynamicPath
   
}

export const convertToIndianDateFormat = (date: string| Date) => {
  return moment(date)?.format("DD-MM-YYYY")
}

export const setErrorMessage = (message: string) => {
  let messageText = ''
  if (message === 'user_with_email_do_not_exists') {
    messageText = Strings.userWithEmailDoNotExists
  } else if (message === 'your_account_not_verified') {
    messageText = Strings.yourAccountNotVerified
  } else if (message === 'credentials_incorrect') {
    messageText = Strings.credentialsIncorrect
  } else if (message === 'your_account_is_not_activated') {
    messageText = Strings.yourAccountNotActivated
  } else if (message === 'The name has already been taken.') {
    messageText = Strings.thisPermissionNameAlreadyUse
  } else if (message === 'user_with_email_already_exists') {
  } else if (message === 'ip_already_exists') {
    messageText = Strings.ipAlreadyExits
  }
  return messageText
}


export function getLastDayOfMonth(month: number, year: number) {
  return new Date(year, month - 1, 0)?.getDate()
}
export const getSearchList = (
  key: string,
  fieldId: string,
  fieldName: string,
  searchValue: string
) => {
  let list: {fieldId: number; fieldName: string}[] = []
  const data: CustomPaginationListType = {...DummyList}
  Object.values(data[key]).forEach((value, index: number) => {
    const fields = value as any[]
    fields.forEach((fieldValues: any) => {
      if (
        fieldValues?.[fieldName]?.toLowerCase().includes(searchValue?.toLowerCase()) ||
        fieldValues?.[fieldId]?.toString().toLowerCase().includes(searchValue)
      ) {
        list.push(fieldValues)
      }
    })
  })
  return list
}

export const formatDate = (formValueDate: Date) => {
  const date = new Date(formValueDate)
  let month = '' + (date.getMonth() + 1)
  let day = '' + date.getDate()
  let year = date.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

export const convertIntoValidDateFormat = (value: string) => {
  if (value) {
    const splitValue = value?.split('-')
    return new Date(Number(splitValue[0]), Number(splitValue[1]), Number(splitValue[2]))
  }
}

export const convertToMiliSecondsToMinute = (value: number) => {
  return value / 60000
}

export const convertToYYYYMMDDwithTimeFormat = (date: Date) => {
  return moment(date)?.format("YYYY-MM-DD HH:mm:ss")
}
export const setColumnBasedOnPermission = (
  columId: string,
  columns: any[],
  permissions: Permissions,
  isPolicyPage = false
) => {
  if (columId === 'Actions') {
    return columns
      .map((columns) => {
        if (
          columns.id === 'actions' &&
          !permissions.edit &&
          !permissions.delete &&
          !permissions.view &&
          !permissions?.editMater &&
          !permissions?.viewMaster &&
          !permissions.deleteMaster &&
          !permissions?.editUser &&
          !permissions?.viewUser &&
          !permissions?.deleteUser &&
          !permissions?.portfolio &&
          !isPolicyPage
        ) {
          return []
        } else if (columns.id === 'view' && !permissions.view) {
          return []
        }
        return columns
      })
      .filter((item) => {
        return item.length !== 0
      })
  }
}

export const selectAllCheckbox = (isChecked: boolean, data: RoleListProperties[]) => {
  if (isChecked) {
    const selectAllId = data.map((item) => item.id)
    return selectAllId
  }
  return []
}

export const setFormilkErrorField = (params: SetFormilkErrorFieldParems) => {
  if (params.value === '') {
    let error = 'Please enter ' + params.name
    params.formilk.setFieldError(params.name, error)
  }
}

export const setUserOptionForSelectField = (
  data: UserPersonalInformation[],
  allowUser: string[]
) => {
  return data?.filter((item) => {
    return allowUser.includes(item?.role_id?.name?.toLowerCase())
  })
}

export const setSelectInputOptions = (options: any[], isMultiSelectInputOption = false) => {
  const list: any[] = []
  options.forEach((option: any, index: number) => {
    Object.entries(option).forEach(([key, value]) => {
      if (isMultiSelectInputOption) {
        list.push({value: key, label: value})
      } else {
        list.push({id: key, name: value})
      }
    })
  })
  return list
}

export const getNameFromJSONkey = (data: any[], id: string) => {
  let label
  data.forEach((project: any) => {
    if (project[id]) {
      label = project[id]
    }
  })
  return label

}

export const calculateFileSize = (fileSize: number, maxValidImage = 2) => {
  return fileSize / 1024 ** 2 <= maxValidImage
}

export const convertDateObjectToString = (date: [Date] | Date | []) => {
  if (Array.isArray(date) && date?.length === 0) {
    return ''
  }
  return Array.isArray(date) ? formatDate(date[0] as Date) : formatDate(date)
}

export const formatTime = (time: string) => {
  const timeArray = time?.split(':')
  const data = new Date()
  const currentDate = data.getMonth()
  const currentYear = data.getFullYear()
  const currentDay = data.getDate()
  return new Date(currentYear, currentDate, currentDay, +timeArray[0], +timeArray[1], +timeArray[2])
}

export const setFilterListSelectInputOptions = (options: any[]) => {
  const list: any[] = []
  options.forEach((option: any, index: number) => {
    Object.entries(option).forEach(([key, value]) => {
      list.push({id: key, label: value})
    })
  })
  return list
}

export const setTotalPageCount = (totalRecords: number, limit: number) => {
  return Math.ceil(totalRecords / limit)
}

export const toggleDrawerMenu = (id: string, className: string) => {
  const drawerContainer = document.querySelector(id)
  drawerContainer?.setAttribute('class', className)
}

/**
 * @param {Array}
 * @returns {[
 * {label: string, id: string | number}
 * ]}
 */
export const formatMultiSelectInput = (values: string) => {
  return values?.split(',')?.map((value: string | number) => {
    return {label: value?.toString(), id: value}
  })
}
export const formatSelectOptionId = (values:SelectInputValue[]) => {
  const selectOption= values
    .map((item) => {
      return Number(item.id)
    })
    return (selectOption)
}
export const formatMultiSelect = (values: SelectInputValue[]) => {
  return values
    .map((item) => {
      return item.label
    })
    .join(',')
}

