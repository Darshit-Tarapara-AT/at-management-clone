import { DateRange } from "@mui/x-date-pickers-pro";
import { FormikKeys } from "app/Components/TextArea";
import { LeadFormValues } from "app/pages/Lead/Components/Modal/Modal";
import { store } from "app/redux/store"
import { Strings } from "app/resource/Strings";
import constant from "config/const/const";
import dayjs from "dayjs";

const strings: FormikKeys = { ...Strings }
export const UserFormikState = {
  profileUrl: '',
  joiningDate: '',
  lastUpdateDate: '',
  slackUserName: '',
  updatedBy: '',
  createdBy: null,
  createdAt: "",
  slackUserNumber: '',
  userEmail: '',
  firstName: '',
  status: [{id: 'active', label: 'Active'}],
  aadhaarCardNumber: '',
  slackUrl: '',
  salary: '',
  lastName: '',
  birthDate: '',
  designation: '',
  contactEmail: '',
  address: '',
  officeMaxValidTime: '',
  area: '',
  state: [{id: 'GJ', label: Strings.gujarat}],
  city: '',
  postalCode: '',
  mobile: '',
  lateEntryTime: '',
  fullDayMinutes: '',
  halfDayMinutes: '',
  earlyDayMinutes: '',
  altMobile: '',
  guardianFirstPersonName: '',
  guardianFirstPersonContactNumber: '',
  guardianFirstPersonAddress: '',
  guardianSecondPersonName: '',
  guardianSecondPersonContactNumber: '',
  guardianSecondPersonAddress: '',
  nextIncrementDate: '',
  panNumber: '',
  bankDetails: '',
  extraInformation: '',
  role: '',
  paidLeaveStartsFrom: '',
  addedByUser: { id: 0, name: '', image_url: '' },
  updatedByUser: { id: 0, name: '', image_url: '' },
}

export const leadFormikInitalValues:LeadFormValues = {
  name: "",
  email: '',
  company_name: "",
  website: "",
  phone: "",
  deadLineReminder: '',
  last_contact_date: '',
  mobile: "",
  account: [],
  createdAt: "",
  createdBy: null,
  updatedAt: '',
  updatedBy: null,
  deadLineTime: new Date(),
  deadLineDate: new Date(),
  position: [],
  skype_id: "",
  linkedin_url: "",
  lead_status: [],
  address: "",
  area: "",
  country: [],
  state: "",
  city: "",
  postal_code: "",
  first_contact_source: [],
  comments: "",
  lead_type: [],
  lead_title: "",
  lead_description: "",
  lead_regular_contact_source: [],
  given_price: "",
  contactEmailValue: "",
  reason: "",
  lead_select_date: [],
  note: "",
  contact_url: "",
  lead_contact_email: [],
  added_by_user: {id: 0, name: "", image_url: "",},
  updated_by_user: {id: 0, name: "", image_url: "",},
}

export const clientInitalValue = {
  name: "",
  email: "",
  frontend_added_by: 0,
  updatedBy: null,
  company_name: "",
  website: "",
  created_at: "",
  created_by: null,
  updated_at: '',
  updated_by: null,
  last_update_date: "",
  phone: "",
  lastUpdateDate: '',
  lead_status: 'confirmed',
  mobile: "",
  account: [{id: "", label: Strings.selectAccount}],
  position: [{id: "", label: Strings.selectPosition}],
  skype_id: "",
  linkedin_url: "",
  address: "",
  area: "",
  country: [{ id: "", label: "Select Country" }],
  state: "",
  city: "",
  postal_code: "",
  added_by: "",
  mode_of_contacts: [{ id: "", label: Strings.selectAModeOfContact}],
  last_updated_date: "",
  comments: "",
  added_date: '',
}

export const initialTaskValues = {
  name: "",
      description: "",
      checkList: [],
      project: [],
      assignTo: [],
      parentTask: [],
      qa: [],
      startDate: "" ,
      endDate: "",
      trackedTime: '',
      createdAt: '',
      createdBy: null,
      updatedBy: null,
      updatedAt: '',
      estimatedTime: "",
      percentage: constant.task.defaultPercentageValue,
      isTaskBillable: false,
      priority: [
        {
          id: "normal",
          label: Strings.normal
        }
      ],
      status: [
        {
          id: "readyToWork",
          label: strings["readyToWork"]
        }
      ],
      type: [
        {
          id: "newTask",
          label: strings["newTask"]
        }
      ],
      comment: "",
      attachment: "",
      addedByUser: {id: 0, name: "", image_url: ""},
      updatedByUser: {id: 0, name: "", image_url: ""}
}

export const initialHolidayValue = {
  holidayDate: '',
  name: '',
  description: '',
  createdAt: '',
  createdBy: null,
  updatedAt: '',
  updatedBy: null,
}

export const initialEditTaskCorrectionValue = {
startTime: new Date(),
endTime: new Date(),
description: "",
project: [],
task: []
}

export const initialAddTaskCorrectionValue = {
  addStartTime: new Date(),
  addEndTime: new Date(),
  addDescription: "",
  addProject: [],
  addTask: [],
  }