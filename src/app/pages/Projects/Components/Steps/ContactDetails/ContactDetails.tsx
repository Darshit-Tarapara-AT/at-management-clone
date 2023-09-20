import React from 'react'
import { ContentTitle } from '../../../../../Components/ContentTitle/ContentTitle'
import { Strings } from 'app/resource/Strings'
import 'react-datepicker/dist/react-datepicker.css';
import { CustomInput } from '_metronic/helpers/components/Input/Input';
import { IRootState } from 'app/redux/store';
import { useSelector } from 'react-redux';
import { UserPersonalInformation } from 'app/redux/UserSlice/UserTypes';
import { setUserOptionForSelectField } from 'app/utils/helper';
import CustomDatePicker from 'app/Components/DatePicker/DatePicker';

const ContactDetails: React.FC<any> = ({ formik, ...props }) => {
  const { list: allUsers } = useSelector((state: IRootState) => state.UserStateData);
  const addByOptions = setUserOptionForSelectField(allUsers || [], ['bde', "admin"]);
  const showUserOptions = (user: UserPersonalInformation) => {
    return <option key={user.id} value={user.id}>{user.name}</option>
  }
  return (
    <div className='card mb-5 mb-xl-10 form-container'>
      <ContentTitle title={Strings.contactInformation} targetToggleId='#kt_account_address_form' />
      <div id='kt_account_address_form' className='collapse show'>
        <div className='card-body border-0 p-9'>
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label required fw-bold fs-6'>
              {Strings.address}
            </label>
            <div className='col-lg-5 fv-row'>
              <textarea
                className='form-control form-control-lg form-control-solid'
                cols={4}
                placeholder={Strings.address}
                rows={3}
                {...formik.getFieldProps(props.address)}
                onBlur={() => props.handlerBlurEvent(props.address)}
              ></textarea>
              {formik.touched.address && formik.errors.address && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.address}</div>
                </div>
              )}
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label  fw-bold fs-6'>{Strings.area}</label>
            <div className='col-lg-5 fv-row'>
              <CustomInput type='text' name={props.area} value={formik.values.area} placeHolder={Strings.area} formilk={formik} onBlur={() => props.handlerBlurEvent(props.area)} />
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label required fw-bold fs-6'>{Strings.country}</label>
            <div className='col-lg-5 fv-row'>
              <CustomInput type='text' name={props.country} value={formik.values.country} placeHolder={Strings.country} formilk={formik} onBlur={() => props.handlerBlurEvent(props.country)} />
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label required fw-bold fs-6'>{Strings.state}</label>
            <div className='col-lg-5 fv-row'>
              <CustomInput type='text' name={props.state} value={formik.values.state} placeHolder={Strings.state} formilk={formik} onBlur={() => props.handlerBlurEvent(props.state)} />
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label required fw-bold fs-6'>
              {Strings.city}
            </label>
            <div className='col-lg-5 fv-row'>
              <CustomInput type='text' name={props.city} value={formik.values.city} placeHolder={Strings.city} formilk={formik} onBlur={() => props.handlerBlurEvent(props.city)}
              />
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label required fw-bold fs-6'>
              {Strings.postalCode}
            </label>
            <div className='col-lg-5 fv-row'>
              <CustomInput type='number' name={props.postalCode} value={formik.values.postal_code} placeHolder={Strings.postalCode} formilk={formik} onBlur={() => props.handlerBlurEvent(props.postalCode)} />
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label required fw-bold fs-6'>
              {Strings.firstContactSource}
            </label>
            <div className='col-lg-5 fv-row'>
              <select
                className='form-select form-select-solid form-select-lg fw-bold'
                style={{ cursor: "pointer" }}
                {...formik.getFieldProps(props.firstContactSource)}
                onBlur={() => props.handlerBlurEvent(props.firstContactSource)}
                value={formik.values.first_contact_source}
              >
                <option value=''>{`Select first contact source`}</option>
                {props.firstContactSourceOptions?.map((item: any, index: any) => <option key={`${index}`} value={item.id}>{item.label}</option>)}
              </select>
              {formik.touched.first_contact_source && formik.errors.first_contact_source && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.first_contact_source}</div>
                </div>
              )}
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label required fw-bold fs-6'>
              {Strings.addedBy}
            </label>
            <div className='col-lg-5 fv-row'>
              <select
                className='form-select form-select-solid form-select-lg fw-bold'
                {...formik.getFieldProps(props.addBy)}
                style={{ cursor: "pointer" }}
                name={props.addBy}
                value={formik.values.added_by}
                onBlur={() => props.handlerBlurEvent(props.addBy)}
              >
                {addByOptions?.length > 0 && addByOptions?.map((user) => showUserOptions(user))}
              </select>
              {formik.touched.added_by && formik.errors.added_by && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.added_by}</div>
                </div>
              )}
            </div>
          </div>

          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label required fw-bold fs-6'>
              {Strings.comment}
            </label>
            <div className='col-lg-5 fv-row'>
              <textarea
                className='form-control form-control-lg form-control-solid'
                cols={4}
                placeholder={Strings.comment}
                rows={3}
                {...formik.getFieldProps(props.comments)}
                onBlur={() => props.handlerBlurEvent(props.comments)}
              ></textarea>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label required fw-bold fs-6'>
              {Strings.addedDate}
            </label>
            <div className='col-lg-5 fv-row'>
              <CustomDatePicker 
                name={props.addedDate}
                onBlur={() => props.handlerBlurEvent(props.addedDate)}
                title={Strings.addedDate}
                formik={formik}
              />
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label required fw-bold fs-6'>{Strings.leadType}</label>
            <div className='col-lg-5 fv-row'>
              <select
                className='form-select form-select-solid form-select-lg fw-bold'
                {...formik.getFieldProps(props.leadType)}
                style={{ cursor: "pointer" }}
                name={props.leadType}
                value={formik.values.lead_type}
                onBlur={() => props.handlerBlurEvent(props.leadType)}
              >
                <option value=''>{`Select ${Strings.leadType}`}</option>
                <option value='freelancer'>{Strings.freelancer}</option>
                <option value='company'>{Strings.company}</option>
              </select>
              {formik.touched.lead_type && formik.errors.lead_type && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{formik.errors.lead_type}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactDetails
