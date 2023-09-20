import {UserResponseField} from 'app/pages/Users/Components/Modal/Modal'
import {Strings} from 'app/resource/Strings'
import React from 'react'
import PersonalDetails from './ListSection/PersonalDetails/PersonalDetails'
import SalaryInformation from './ListSection/SalaryInformation/SalaryInformation'
import Guardian from './ListSection/Guardian/Guardian'
import AttendanceInformation from './ListSection/AttendanceInformation/AttendanceInformation'
import {currentUserProfileDetailsTypes} from 'app/redux/UserSlice/UserTypes'
import { convertToIndianDateFormat } from 'app/utils/helper'
interface UserDetailsListProps {
  currentUser: UserResponseField | currentUserProfileDetailsTypes
  isEditAllow: boolean
  buttonText: string
  editButtonPath: string
}
const UserDetailsList: React.FC<UserDetailsListProps> = ({
  currentUser,
  isEditAllow,
  buttonText,
  editButtonPath,
}) => {
  const personalDetailsValues = [
    {
      label: Strings.avatar,
      value: currentUser?.image_url || '',
    },
    {
      label: Strings.dateOfJoining,
      value: currentUser?.joining_date ? convertToIndianDateFormat(currentUser?.joining_date) : '',
    },
    {
      label: Strings.email,
      value: currentUser?.email || '',
    },
    {
      label: Strings.firstName,
      value: currentUser?.first_name || '',
    },
    {
      label: Strings.lastName,
      value: currentUser?.last_name || '',
    },
    {
      label: Strings.birthDate,
      value: convertToIndianDateFormat(currentUser?.birth_date) || '',
    },
    {
      label: Strings.designation,
      value: currentUser?.designation || '',
    },
    {
      label: Strings.slackUrl,
      value: currentUser?.slack_url || '',
    },
    {
      label: Strings.slackUserName,
      value: currentUser?.slack_username || '',
    },
    {
      label: Strings.contactEmail,
      value: currentUser?.contact_email || '',
    },
  ]

  const contactDetailsValues = [
    {
      label: Strings.address,
      value: currentUser?.address || '',
    },
    {
      label: Strings.area,
      value: currentUser?.area || '',
    },
    {
      label: Strings.state,
      value: currentUser?.state || '',
    },
    {
      label: Strings.city,
      value: currentUser?.city || '',
    },
    {
      label: Strings.postalCode,
      value: currentUser?.postal_code || '',
    },
    {
      label: Strings.status,
      value: currentUser?.status || '',
    },
    {
      label: Strings.alternativeMobileNumber,
      value: currentUser?.alternate_contact || '',
    },
  ]
  const guardianDetailsValues = [
    {
      label: Strings.name,
      value: [currentUser?.guadian_1_name, currentUser?.guadian_2_name] || '',
    },
    {
      label: Strings.contactNumber,
      value: [currentUser?.guadian_1_contact, currentUser?.guadian_1_contact] || '',
    },
    {
      label: Strings.address,
      value: [currentUser?.guadian_1_address,  currentUser?.guadian_2_address] || '',
    },
  ]

  const salaryDetailsValues = [
    {
      label: Strings.nextIncrementDate,
      value: currentUser?.next_increment_date ? convertToIndianDateFormat(currentUser?.next_increment_date) :  '',
    },
    {
      label: Strings.bank_details,
      value: currentUser?.bank_details || '',
    },
    {
      label: Strings.extraInformation,
      value: currentUser?.extra_information || '',
    },
    {
      label: Strings.incomeTaxNumber,
      value: currentUser?.pan_number || '',
    },
    {
      label: Strings.aadhaarCardNumber,
      value: currentUser?.aadhar_number?.toString() || '',
    },
    {
      label: Strings.salary,
      value: currentUser?.basic_salary?.toString() || '',
    },
    {
      label: Strings.paidLeaveStartForm,
      value: currentUser?.paid_leave_starts_from ? convertToIndianDateFormat(currentUser?.paid_leave_starts_from) : '',
    },
    {
      label: Strings.role,
      value: currentUser?.role_id?.name?.toString() || '',
    },
  ]

  const attendanceDetailsValues = [
    {
      label: Strings.lateEntryTime,
      value: currentUser?.late_entry_time
        ? new Date(currentUser?.late_entry_time)
            .toLocaleTimeString()
        : '',
    },
    {
      label: Strings.fullDayMinutes,
      value: currentUser?.fullday_minutes || '',
    },
    {
      label: Strings.earlyDayMinutes,
      value: currentUser?.earlyday_minutes || '',
    },
    {
      label: Strings.halfDayMinutes,
      value: currentUser?.halfday_minutes || '',
    },
  ]
  return (
    <form className='form'>
      <div className='mb-5 mb-xl-10 form-container'>
        <PersonalDetails
          isPermission={isEditAllow}
          personalDetailsValues={personalDetailsValues}
          path={editButtonPath}
          buttonText={buttonText}
        />
        <SalaryInformation
          salaryDetailsValues={contactDetailsValues}
          title={Strings.addressContact}
        />
        <Guardian guardianDetailsValues={guardianDetailsValues} />
        <SalaryInformation
          salaryDetailsValues={salaryDetailsValues}
          title={Strings.salaryInformation}
        />
        <AttendanceInformation attendanceDetailsValues={attendanceDetailsValues} />
      </div>
    </form>
  )
}

export default UserDetailsList
