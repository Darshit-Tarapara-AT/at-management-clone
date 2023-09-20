import { useCallback } from 'react'
import {ContentTitle} from '../ContentTitle/ContentTitle'
import {Strings} from 'app/resource/Strings'
import {useSelector} from 'react-redux'
import {IRootState} from 'app/redux/store'
import moment from 'moment'

export interface updateUserDetails {
  id: number
  name: string
  image_url: string
}
export interface UpdateDetails {
  title: string
  id: number | null
  createdById?: number | null
  lastUpdateDate: string
  lastCreateDate?: string
  updatedByLabel?: string
  leaveDetails?:string
  comments?: string
  updatedDateLabel?: string
  createDetails?: updateUserDetails
  updateDetails?: updateUserDetails
  deletedDetails?: updateUserDetails
  approvedDetails?: updateUserDetails
  deleteDetails?:string
  lastDeleteDate?: string
  deletedById?: number | null
}

const UpdateDetailsSection: React.FC<UpdateDetails> = ({...props}) => {
  const { list } = useSelector((state: IRootState) => state.UserStateData)
  const findUserDetails = useCallback((userId: number) => {
    const userDetails = list?.find((item) => item.id === userId);
    return {
      image_url: userDetails?.image_url || "",
      name: userDetails?.name || "",
    }
  },[list]);
  const updateDetails = [
    {
      title: Strings.createdBy,
      imageUrl: props.createDetails?.image_url,
      name: props.createDetails?.name,
      date: props.lastCreateDate
    },
    {
      title: props.leaveDetails ? props.leaveDetails : Strings.updatedBy ,
      imageUrl: props.updateDetails?.image_url,
      name: props.updateDetails?.name,
      date: props.lastUpdateDate
    },
    {
      title: props.deleteDetails ? props.deleteDetails : Strings.deletedBy,
      imageUrl: props.deletedDetails?.image_url,
      name: props.deletedDetails?.name,
      date: props.lastDeleteDate
    },
    {
      title: props.deleteDetails ? props.deleteDetails : Strings.approvedBy,
      imageUrl: props.approvedDetails?.image_url,
      name: props.approvedDetails?.name,
      date: props.lastDeleteDate
    }
  ]

  return (
    <div className='card mb-5 mb-xl-10 mt-xl-10 mt-10'>
      <ContentTitle title={props.title} targetToggleId='#kt_account_email_and_name_form' />
      <div id='kt_account_email_and_name_form' className='collapse show'>
        <div className='card-body border-0 p-9'>
          {updateDetails?.length > 0 && (
            updateDetails?.filter((item) => item.imageUrl).map((details, index) => {
              const { name, imageUrl, date } = details
              return (
                <div className='row mb-6' key={`${index}`}>
                  <label className='col-lg-4 col-form-label fw-semibold fs-6'>
                    {details.title}
                  </label>
                  <div className="d-flex align-items-center col-lg-8">
                    <div className="symbol symbol-50px me-3">
                      <img src={imageUrl} alt={name} />
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                      <span className="">{name}</span>
                      <span>{moment(date)?.format("DD-MM-YYYY")}</span>
                      <span>{moment(date)?.format("hh:mm A")}</span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
export default UpdateDetailsSection
