import React from 'react'
import { ContentTitle } from '../../../../../Components/ContentTitle/ContentTitle'
import { Strings } from 'app/resource/Strings'
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker.css';
import clientData from 'app/assets/data/clients.json';
import { CustomInput } from '_metronic/helpers/components/Input/Input';
import SelectInput from 'app/Components/SelectInput/SelectInput';
import { setSelectInputOptions } from 'app/utils/helper';
import { ClientStatusProps } from '../../Modal/Modal';
import { RadioInput } from 'app/Components/RatioInput/RatioInput';
import moment from 'moment';

const ClientStatus: React.FC<ClientStatusProps> = ({ formik,selectClientStatusOptions, ...props }) => {

  return (
    <div className='card mb-5 mb-xl-10 mt-xl-10 mt-10'>
      <ContentTitle title={Strings.clientStatus} targetToggleId='#kt_account_email_and_name_form' />
      <div id='kt_account_email_and_name_form' className='collapse show'>
        <div className='card-body border-0 p-9'>
          <RadioInput
            formik={formik}
            name="lead_status"
            label={Strings.status}
            options={selectClientStatusOptions}
            value={formik.values.lead_status}
          />
           <SelectInput
            formik={formik}
            label={Strings.account}
            name={Strings.account.toLocaleLowerCase()}
            onBlur={() => props.handlerBlurEvent(Strings.account.toLocaleLowerCase())}
            options={setSelectInputOptions(clientData["client.account"])}
            optionTitle='name'
            optionValue='id'
          />
          <SelectInput
            formik={formik}
            label={Strings.position}
            name={Strings.position.toLocaleLowerCase()}
            onBlur={() => props.handlerBlurEvent(Strings.position.toLocaleLowerCase())}
            options={setSelectInputOptions(clientData["client.position"])}
            optionTitle='name'
            optionValue='id'
          />
          <CustomInput
            type='text'
            placeHolder={Strings.enterName}
            isRequired={false}
            isReadOnly={true}
            label={Strings.addedBy}
            formilk={formik}
            value={formik.values.added_by}
            name={props.addedBy}
            onBlur={() => props.handlerBlurEvent(props.addedBy)} />

          <SelectInput
            name={props.modeOfContact}
            formik={formik}
            isRequired={true}
            onBlur={() => props.handlerBlurEvent(props.modeOfContact)}
            options={setSelectInputOptions(clientData["client.modeOfContact"])}
            optionTitle="name"
            optionValue='id'
            label={Strings.modeOfContact}
          />
          <CustomInput
            type='text'
            placeHolder={Strings.enterAddedDate}
            formilk={formik}
            label={Strings.addedDate}
            isReadOnly={true}
            isRequired={false}
            name={props.addedDate}
            value={moment(formik.values.added_date).format("DD-MM-YYYY")}
            onBlur={() => props.handlerBlurEvent(props.addedDate)}
          />
          <CustomInput
            type='text'
            placeHolder={Strings.enterLastUpdatedDate}
            label={Strings.lastUpdateDate}
            formilk={formik}
            isReadOnly={true}
            name={props.lastUpdatedDate}
            isRequired={false}
            value={formik.values.last_update_date}
            onBlur={() => props.handlerBlurEvent(props.lastUpdatedDate)}
          />
        </div>
      </div>
    </div>

  )
}

export default ClientStatus
