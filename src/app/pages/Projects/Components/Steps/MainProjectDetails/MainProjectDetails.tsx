import React from 'react'
import { ContentTitle } from '../../../../../Components/ContentTitle/ContentTitle'
import './MainProjectDetails.scss';
import { Strings } from 'app/resource/Strings'
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker.css';
import { CustomInput } from '_metronic/helpers/components/Input/Input';
import { convertDateObjectToString, setSelectInputOptions, setUserOptionForSelectField } from 'app/utils/helper';
import { MainProjectDetailsFormProps } from '../../Modal/Modal';
import { useSelector } from 'react-redux';
import { IRootState } from 'app/redux/store';
import SelectInput from 'app/Components/SelectInput/SelectInput';
import CustomDatePicker from 'app/Components/DatePicker/DatePicker';
import projectData from 'app/assets/data/project.json'

const MainProjectDetails: React.FC<MainProjectDetailsFormProps> = ({ formik, isTitleRequired = true, ...props }) => {
  const { list } = useSelector((state: IRootState) => state.UserStateData);
  const { list: clientList } = useSelector((state: IRootState) => state.ClientStateData);
  const projectManagers = setUserOptionForSelectField(list || [], ["manager", "admin"]);
  const teamOptions = list.map((data) => {
    return { value: data?.id?.toString(), label: data?.name }
  })
  const formatClientList = clientList?.map((client) => {
    return { id: client?.id?.toString(), name: client?.name }
  })
  return (
    <div className='card mb-5 mb-xl-10 form-container'>
      {isTitleRequired && <ContentTitle title={Strings.privateDetails} targetToggleId='#kt_account_email_and_name_form' />}

      <div id='kt_account_email_and_name_form' className='collapse show'>
        <div className='card-body border-0 p-9'>
          <CustomInput
            type='text'
            placeHolder={Strings.name}
            formilk={formik}
            label={Strings.name}
            name={props.name}
            value={formik.values.name}
            onBlur={() => props.handlerBlurEvent(props.name)}
          />
          <CustomInput
            type='text'
            label={Strings.shortName}
            placeHolder={Strings.shortName}
            formilk={formik}
            name={props.shortName}
            value={formik.values.shortName}
            onBlur={() => props.handlerBlurEvent(props.shortName)}
          />
          <SelectInput formik={formik}
            label={Strings.client}
            optionTitle="name"
            optionValue='id'
            name={props.client}
            isRequired={true}
            onBlur={() => props.handlerBlurEvent(props.client)}
            options={formatClientList}
          />
          <CustomInput
            type='number'
            label={Strings.esimationHours}
            placeHolder={Strings.esimationHours}
            formilk={formik}
            name={props.esimationHours}
            value={formik.values.esimationHours}
            onBlur={() => props.handlerBlurEvent(props.esimationHours)}
          />
          <SelectInput formik={formik}
            label={Strings.projectManager}
            optionTitle="name"
            optionValue='id'
            name={props.projectManager}
            isRequired={true}
            onBlur={() => props.handlerBlurEvent(props.projectManager)}
            options={projectManagers}
          />
          <SelectInput
            onBlur={() => props.handlerBlurEvent(props.team)}
            options={teamOptions.length > 0 ? teamOptions : []}
            name={props.team}
            formik={formik}
            isMulti={true}
            label={Strings.team}
            optionTitle={'label'}
            optionValue={'value'}
          />
          <SelectInput
            onBlur={() => props.handlerBlurEvent(props.progressStatus)}
            options={props.progressStatusOptions.length > 0 ? props.progressStatusOptions : []}
            name={props.progressStatus}
            formik={formik}
            isMulti={false}
            label={Strings.progressStatus}
            optionTitle={'label'}
            optionValue={'value'}
          />

          <SelectInput
            onBlur={() => props.handlerBlurEvent(props.type)}
            options={props.projectTypeOptions.length > 0 ? props.clientTypeOption : []}
            name={props.type}
            formik={formik}
            label={Strings.clientType}
            optionTitle={'label'}
            optionValue={'value'}
          />
          <SelectInput
            onBlur={() => props.handlerBlurEvent("billingType")}
            options={setSelectInputOptions(projectData["project.billingType"])}
            name={"billingType"}
            formik={formik}
            label={Strings.billingType}
            optionTitle="name"
            optionValue='id'
          />
          <SelectInput
            formik={formik}
            label={Strings.projectType}
            name={props.projectType}
            isMulti={true}
            onBlur={props.handlerBlurEvent}
            options={props.projectTypeOptions}
            optionTitle='label'
            optionValue='value'
          />
          <SelectInput
            onBlur={() => props.handlerBlurEvent(props.status)}
            options={props.statusOption.length > 0 ? props.statusOption : []}
            name={props.status}
            formik={formik}
            isMulti={false}
            label={Strings.status}
            optionTitle={'label'}
            optionValue={'value'}
          />
          <CustomInput
            type='text'
            label={Strings.slackUrl}
            placeHolder={Strings.slackUrl}
            isRequired={false}
            formilk={formik}
            name={props.slackUrl}
            value={formik.values.slackUrl}
            onBlur={() => props.handlerBlurEvent(props.slackUrl)}
          />
          <CustomDatePicker
            label={Strings.startDate}
            onBlur={props.handlerBlurEvent}
            title={Strings.startDate}
            formik={formik}
            name={props.startDate}
            isRequired ={false}
          />
          <CustomDatePicker
            title={Strings.endDate}
            formik={formik}
            isRequired ={false}
            label={Strings.endDate}
            onBlur={props.handlerBlurEvent}
            name={props.endDate}
            min={convertDateObjectToString(formik.values.startDate)}
          />
        </div>
      </div>
    </div>
  )
}

export default MainProjectDetails;
