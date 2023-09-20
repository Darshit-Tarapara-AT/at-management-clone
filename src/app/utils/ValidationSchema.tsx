import {Strings} from 'app/resource/Strings'
import * as Yup from 'yup'

export const UrlValidationRegex = new RegExp(
  '^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?'
)
const notAllowSpaceRegex = new RegExp(/^([A-z0-9!@#$%^&*().,<>{}[\]<>?_=+\-|;:'"/])*[^\s]\1*$/)
const ipAddressValidationRegex =
  /(?:^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$)|(?:^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$)/g
export const RolesValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required(Strings.pleaseEnterName)
    .min(2, Strings.firstNameShouldBeMinThreeChar)
    .max(10, Strings.roleShouldBeMaxTwentyChar)
    .matches(notAllowSpaceRegex, Strings.roleNameShouldNotContainSpace),
  defaultRole: Yup.string().required(Strings.pleaseSelectDefaultRole),
  label: Yup.string().required(Strings.pleaseEnterLabel),
  assignPermissions: Yup.array()
    .min(1, Strings.pleaseSelectAtLeaseOnePermissionRole)
    .required(Strings.pleaseSelectAssignPermissions),
})

export const CredentialsValidationSchema = Yup.object().shape({
  name: Yup.string().required(Strings.pleaseEnterName),
  role: Yup.array().optional(),
  user: Yup.array().optional(),
  client: Yup.array().optional(),
  credentialDetail: Yup.string().required(Strings.pleaseEnterDetils),
})

export const PermissionValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required(Strings.pleaseEnterName)
    .min(2, Strings.firstNameShouldBeMinThreeChar)
    .matches(/\./g, Strings.permissionNameShouldContainDot),
  label: Yup.string().required(Strings.pleaseEnterLabel),
  module: Yup.array().min(1, Strings.pleaseSelectModule).required(Strings.moduleIsRequired),
})

export const LeaveFormValidationSchema = Yup.object().shape({
  start_date: Yup.string()
  .required(Strings.pleaseEnterStartDate)
 ,
  end_date: Yup.string().required(Strings.pleaseEnterEndDate),
  reason: Yup.string().required(Strings.pleaseEnterReason),
  joining_date: Yup.string().required(Strings.pleaseEnterJoiningDate),
  status:  Yup.array()
  .min(1, Strings.pleaseSelectStatus)
  .required(Strings.pleaseSelectStatus),
  type:  Yup.array()
  .min(1, Strings.pleaseSelectType)
  .required(Strings.pleaseSelectType),
})

export const HolidayFormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required(Strings.pleaseEnterName),
  holiday: Yup.string().optional(),
  description: Yup.string().optional()
})

export const TaskCorrectionFormValidationSchema = Yup.object().shape({
  startTime: Yup.date()
  .required(Strings.pleaseSelectStartTime),
  endTime: Yup.date().when("startTime", (startTime, schema) => startTime && schema.min(startTime)).required(Strings.pleaseSelectEndTime),
  description: Yup.string()
  .required(Strings.pleaseEnterDescription),
  project: Yup.array()
  .required(Strings.pleaseSelectProject)
  .min(1, Strings.pleaseSelectProject),
  task: Yup.array()
  .required(Strings.pleaseSelectTask)
  .min(1, Strings.pleaseSelectTask)
})


export const AddTaskCorrectionFormValidationSchema = Yup.object().shape({
  addStartTime: Yup.date()
  .required(Strings.pleaseSelectStartTime),
  addEndTime: Yup.date().when("addStartTime", (addStartTime, schema) => addStartTime && schema.min(addStartTime)).required(Strings.pleaseSelectEndTime),
  addDescription: Yup.string()
  .required(Strings.pleaseEnterDescription),
  addProject: Yup.array()
  .required(Strings.pleaseSelectProject)
  .min(1, Strings.pleaseSelectProject),
  addTask: Yup.array()
  .required(Strings.pleaseSelectTask)
  .min(1, Strings.pleaseSelectTask)
})

export const IpAddressValidationSchema =Yup.object().shape({
  name: Yup.string()
    .required(Strings.pleaseEnterName),
  ipAddress: Yup.string().required(Strings.pleaseEnterIpAddress)
  .matches(ipAddressValidationRegex, Strings.pleaseEntervalidateIpAddress),
});
export const PolicyValidationSchema =Yup.object().shape({
    title: Yup.string().required(Strings.pleaseEnterTitle),
    description :Yup.string().required(Strings.pleaseEnterDescription),
    status :Yup.array().required(Strings.pleaseSelectStatus)
    .min(1,Strings.pleaseEnterStatus),
    policyRole : Yup.array().min(1, Strings.pleaseSelectAtLeaseOnePolicyRole).required(Strings.pleaseSelectPolicyRole)
});
export const profileDetailsSchema = Yup.object().shape({
  profileUrl: Yup.string().optional(),
  joiningDate: Yup.date().optional(),
  userEmail: Yup.string().required(Strings.pleaseEnterEmail).email('Please enter valid email'),
  firstName: Yup.string()
    .required(Strings.pleaseEnterFirstName)
    .min(3, Strings.firstNameShouldBeMinThreeChar)
    .max(20, Strings.firstNameShouldBeMaxTwentyChar),
    status:  Yup.array()
    .min(1, Strings.pleaseSelectStatus)
    .required(Strings.pleaseSelectStatus),
  lastName: Yup.string()
    .required(Strings.pleaseEnterLastName)
    .min(3, Strings.lastNameShouldBeMinThreeChar)
    .max(20, Strings.lastNameShouldBeMaxTwentyChar),
  birthDate: Yup.date().required(Strings.pleaseSelectBirthDate),
  designation: Yup.string().required(Strings.pleaseEnterDesignation),
  contactEmail: Yup.string()
    .required(Strings.pleaseEnterContactEmail)
    .email(Strings.pleaseEnterValidEmail),
  slackUserName: Yup.string()
    .required(Strings.pleaseEnterSlackUserName),
  slackUserNumber: Yup.string().required(Strings.pleaseEnterSlackUserNumber),
  address: Yup.string().required(Strings.pleaseEnterAddress),
  area: Yup.string().required(Strings.pleaseEnterArea),
  state: Yup.array().required(Strings.pleaseSelectState)
  .min(1, Strings.pleaseSelectState),
  city: Yup.string().required(Strings.pleaseEnterCity),
  salary: Yup.string()
    .required(Strings.pleaseEnterSalary)
    .matches(/[0-9]/, Strings.salaryShouldBeNumber),
  lead_status: Yup.array().min(1, Strings.pleaseSelectStatus),
  aadhaarCardNumber: Yup.string()
    .required(Strings.pleaseEnterAdharCardNumber)
    .matches(/[0-9]/, Strings.aadharCardShouldBeNumber)
    .max(12, Strings.aadharCardMustBeTwelveDigit)
    .min(12, Strings.aadharCardMustBeTwelveDigit),
  slackUrl: Yup.string()
    .required(Strings.pleaseEnterSlackUrl)
    .matches(UrlValidationRegex, Strings.slackUrlShouldBeValid),
  paidLeaveStartsFrom: Yup.date().optional(),
  officeMaxValidTime: Yup.string().optional(),
  postalCode: Yup.string()
    .required(Strings.pleaseEnterPostalCode)
    .matches(/[0-9]/, Strings.postalNumberShouldBeNumber)
    .max(6, Strings.postalCodeMustBeSixDigit),
  mobile: Yup.string()
    .required(Strings.pleaseEnterMobileNumber)
    .matches(/[0-9]/, Strings.mobileNumberShouldBeNumber)
    .max(12, Strings.mobileNumberMustBeTwelveDigit)
    .min(10, Strings.mobileShouldBeTenDigit),
  altMobile: Yup.string()
    .required(Strings.pleaseEnterAltMobile)
    .matches(/[0-9]/, Strings.alternateMobileNumberShouldBeNumber)
    .max(12, Strings.alternateMobileMustBeTwelveDigit)
    .min(10, Strings.alternateMobileAtLeastTenDigit),
  guardianFirstPersonName: Yup.string()
    .required(Strings.pleaseEnterName)
    .min(3, Strings.lastNameShouldBeMinThreeChar)
    .max(20, Strings.guardianNameShouldBeMaxTwentyChar),
  guardianFirstPersonContactNumber: Yup.string()
    .required(Strings.pleaseEnterGuardianPersonContactNumber)
    .matches(/[0-9]/, Strings.guardianContactNumberShouldBeNumber)
    .max(12, Strings.guardianContactNumberMustBeTwelveDigit)
    .min(10, Strings.guardianContactNumberAtLeastBeTenDigit),
  guardianFirstPersonAddress: Yup.string().required(Strings.pleaseEnterGuardianPersonAddress),
  guardianSecondPersonName: Yup.string()
    .required(Strings.pleaseEnterName)
    .min(3, Strings.lastNameShouldBeMinThreeChar)
    .max(20, Strings.guardianNameShouldBeMaxTwentyChar),
  guardianSecondPersonAddress: Yup.string().required(Strings.pleaseEnterGuardianPersonAddress),
  guardianSecondPersonContactNumber: Yup.string()
    .required(Strings.pleaseEnterGuardianPersonContactNumber)
    .matches(/[0-9]/, Strings.guardianContactNumberShouldBeNumber)
    .max(12, Strings.guardianContactNumberMustBeTwelveDigit)
    .min(10, Strings.guardianContactNumberAtLeastBeTenDigit),
  nextIncrementDate: Yup.date().optional(),
  panNumber: Yup.string().required(Strings.pleaseEnterPanNumber),
  bankDetails: Yup.string().required(Strings.pleaseEnterBankDetails),
  role: Yup.string().required(Strings.pleaseSelectRole),
  lateEntryTime: Yup.string().required(Strings.pleaseSelectLateEntryTime),
  fullDayMinutes: Yup.string()
    .required(Strings.pleaseEnterFullDayMinutes)
    .matches(/[0-9]/, Strings.fullDayMinutesShouldBeNumber)
    .max(3, Strings.fullDayMinutesMaxThreeDigit),
  halfDayMinutes: Yup.string()
    .required(Strings.pleaseEnterHalfDayMinutes)
    .matches(/[0-9]/, Strings.halfDayMinutesShouldBeNumber)
    .max(3, Strings.halfDayMinutesMaxThreeDigit),
  earlyDayMinutes: Yup.string()
    .required(Strings.pleaseEnterEarlyDayMinutes)
    .matches(/[0-9]/, Strings.earlyDayMinutesShouldBeNumber)
    .max(3, Strings.earlyDayMinutesMaxThreeDigit),
})

export const LeadFormValidationSchema = Yup.object().shape({
  email: Yup.string().optional().email('Please enter valid email'),
  name: Yup.string().required(Strings.pleaseEnterName),
  company_name: Yup.string().optional(),
  skype_id: Yup.string().optional(),
  address: Yup.string().optional(),
  account: Yup.array().min(1, Strings.pleaseSelectAccount),
  position: Yup.array().min(1, Strings.pleaseSelectPosition),
  area: Yup.string().optional(),
  country: Yup.array().optional(),
  state: Yup.string().optional(),
  city: Yup.string().optional(),
  linkedin_url: Yup.string()
    .optional()
    .matches(UrlValidationRegex, Strings.linkedinUrlShouldBeValid),
    deadLineReminder: Yup.date().optional(),
  website: Yup.string()
    .optional()
    .matches(UrlValidationRegex, Strings.websiteUrlShouldBeValid),
  last_contact_date: Yup.string().required(Strings.pleaseSelectLastContactDate),
  postal_code: Yup.string()
    .optional()
    .matches(/[0-9]/, Strings.postalNumberShouldBeNumber),
  mobile: Yup.string()
    .optional()
    .matches(/[0-9]/, Strings.mobileShouldBeNumber),
  phone: Yup.string()
    .optional()
    .matches(/[0-9]/, Strings.phoneShouldBeNumber),
  first_contact_source: Yup.array().optional(),
  lead_select_date: Yup.array().optional(),
  lead_type: Yup.array().min(1, Strings.pleaseSelectLeadType),
  lead_title: Yup.string().optional(),
  lead_description: Yup.string().optional(),
  lead_regular_contact_source: Yup.array()
    .required(Strings.pleaseEnterLeadRegularContactSource)
    .min(1, Strings.pleaseEnterLeadRegularContactSource),
  given_price: Yup.string().optional().matches(/[0-9]/, Strings.givenPriceShouldBeNumber),
  contact_url: Yup.string()
    .optional()
    .matches(UrlValidationRegex, Strings.pleaseEnterValidContactURL),
  lead_contact_email: Yup.array().optional(),
  lead_status: Yup.array()
    .required(Strings.pleaseSelectLeadStatus)
    .min(1, Strings.pleaseSelectLeadStatus),
  contactEmailValue: Yup.string().email(Strings.pleaseEnterValidContactEmail),
})

export const ClientFormValidation = Yup.object().shape({
  email: Yup.string().optional().email(Strings.pleaseEnterValidEmail),
  name: Yup.string().required(Strings.pleaseEnterName),
  company_name: Yup.string().optional(),
  last_contact_date: Yup.array().optional(),
  lead_status: Yup.string().required(Strings.pleaseSelectLeadStatus),
  account: Yup.array().min(1, Strings.pleaseSelectAccount),
  position: Yup.array().min(1, Strings.pleaseSelectPosition),
  mode_of_contacts: Yup.array()
    .required(Strings.pleaseSelectModeOfContact)
    .min(1, Strings.pleaseSelectModeOfContact),
  skype_id: Yup.string().optional(),
  address: Yup.string().optional(),
  area: Yup.string().optional(),
  country: Yup.array().optional(),
  state: Yup.string().optional(),
  city: Yup.string().optional(),
  linkedin_url: Yup.string()
    .optional()
    .matches(UrlValidationRegex, Strings.linkedinUrlShouldBeValid),
  website: Yup.string().optional().matches(UrlValidationRegex, Strings.websiteUrlShouldBeValid),
  postal_code: Yup.string()
    .optional()
    .matches(/[0-9]/, Strings.postalNumberShouldBeNumber)
    .max(6, Strings.postalCodeMustBeSixDigit),
  mobile: Yup.string()
    .optional()
    .matches(/[0-9]/, Strings.mobileNumberShouldBeNumber)
    .max(12, Strings.mobileShouldBeTenDigit)
    .min(10, Strings.mobileShouldBeTenDigit),
  phone: Yup.string()
    .optional()
    .matches(/[0-9]/, Strings.phoneShouldBeNumber)
    .max(12, Strings.phoneShouldBeTenDigit)
    .min(10, Strings.phoneShouldBeTenDigit),
  added_by: Yup.string().optional(),
  added_date: Yup.string().optional(),
})

export const ProjectFormValidation = Yup.object().shape({
  name: Yup.string()
    .required(Strings.pleaseEnterName)
    .min(3, Strings.firstNameShouldBeMinThreeChar),
  shortName: Yup.string()
    .required(Strings.pleaseEnterShortName),
  client: Yup.array().required(Strings.pleaseSelectClient).min(1, Strings.pleaseSelectClient),
  esimationHours: Yup.number().required(Strings.pleaseEnterTotalHours).min(1, Strings.warningMessage),
  projectManager: Yup.array()
    .required(Strings.pleaseSelectProjectManager)
    .min(1, Strings.pleaseSelectProjectManager),
  team: Yup.array().required(Strings.pleaseSelectTeam).min(1, Strings.pleaseSelectTeam),
  progressStatus: Yup.array()
    .required(Strings.pleaseSelectProjectStatus)
    .min(1, Strings.pleaseSelectProjectStatus),
  type: Yup.array().required(Strings.pleaseSelectClientType).min(1, Strings.pleaseSelectClientType),
  status: Yup.array().required(Strings.pleaseSelectStatus).min(1, Strings.pleaseSelectStatus),
  billingType: Yup.array()
    .required(Strings.pleaseSelectBillingType)
    .min(1, Strings.pleaseSelectBillingType),
  slackUrl: Yup.string().optional().matches(UrlValidationRegex, Strings.slackUrlShouldBeValid),
  startDate: Yup.string().optional(),
  endDate: Yup.string().optional(),
  industries: Yup.array().optional(),
  technologies: Yup.array().optional(),
  projectType: Yup.array()
    .required(Strings.pleaseSelectProjectType)
    .min(1, Strings.pleaseSelectProjectType),
  logo: Yup.string().optional(),
  tags: Yup.array().optional(),
  showInPortfolio: Yup.string().optional(),
  color: Yup.string().optional(),
  description: Yup.string().optional(),
  ftpDetails: Yup.string().optional(),
  demoSite: Yup.string().optional().matches(UrlValidationRegex, Strings.demoSiteShouldBeValid),
  demoSiteCredentials: Yup.string().optional(),
  liveSiteUrl: Yup.string()
    .optional()
    .matches(UrlValidationRegex, Strings.liveSiteUrlShouldBeValid),
  liveSiteCredentials: Yup.string().optional(),
  attachment: Yup.string().optional(),
  tools: Yup.array().optional(),
})

export const TaskFormValidation = Yup.object().shape({
  name: Yup.string().required(Strings.pleaseEnterName),
  description: Yup.string().optional(),
  project: Yup.array().required(Strings.pleaseSelectProject)
  .min(1, Strings.pleaseSelectProject),
  assignTo: Yup.array().required(Strings.pleaseSelectAssignTo)
  .min(1, Strings.pleaseSelectAssignTo)
  .when("project", {
    is: (value: any) => value.length ===0,
    then: Yup.array().required("Must enter email address")
    .min(1, Strings.pleaseSelectProject)
  }),
  qa: Yup.array().required(Strings.pleaseSelectQA)
  .min(1, Strings.pleaseSelectQA),
  startDate: Yup.string().optional(),
  endDate: Yup.string().optional(),
  estimatedTime: Yup.number().required(Strings.pleaseEnterEstimatedTime)
  .min(1, Strings.pleaseEnterValidEstimatedTime),
  percentage: Yup.number().required(Strings.pleaseEnterPercentage)
  .min(0, Strings.pleaseEnterValidPercentage)
  .max(100, Strings.pleaseEnterValidPercentage),
  isTaskBillable: Yup.boolean().optional(),
  priority: Yup.array().optional()
  .min(1, Strings.pleaseSelectPriority),
  status: Yup.array().optional()
  .min(1, Strings.pleaseSelectTaskStage),
  type: Yup.array().optional()
  .min(1, Strings.pleaseSelectTaskType),
  comment: Yup.string().optional(),
  parentTask:  Yup.array().optional()
})
