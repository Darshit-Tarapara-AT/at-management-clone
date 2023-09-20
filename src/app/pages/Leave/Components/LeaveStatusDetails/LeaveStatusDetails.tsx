import { ContentTitle } from "app/Components/ContentTitle/ContentTitle"
import { IRootState } from "app/redux/store"
import { Strings } from "app/resource/Strings"
import {  useMemo } from "react"
import { useSelector } from "react-redux"

export interface UpadateDetails {
    title: string
    id: number
    lastUpdateDate: string
    updatedByLabel: string
    comments?: string
    updatedDateLabel: string
  }
const LeaveStatusDetails: React.FC<UpadateDetails> = ({ ...props }) => {
    const { list } = useSelector((state: IRootState) => state.UserStateData);

    const lastestUpdatedByUser = useMemo(() => {
      const lastUpdatedByUser = list.find((item) => item.id === props.id);
      return {
        image_url: lastUpdatedByUser?.image_url || "",
        name: lastUpdatedByUser?.name || "",
      }
    }, [list, props.id])

    return (
      <div className='card mb-5 mb-xl-10 mt-xl-10 mt-10'>
        <ContentTitle title={props.title} targetToggleId='#kt_account_email_and_name_form' />
        <div id='kt_account_email_and_name_form' className='collapse show'>
          <div className='card-body border-0 p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-semibold fs-6'>
                {props.updatedDateLabel}
              </label>
              <label className='col-lg-4 col-form-label fw-semibold fs-6'>
                <span>{props.lastUpdateDate}</span>
              </label>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-semibold fs-6'>
                {props.updatedByLabel}
              </label>
              <div className='col-lg-2'>
                <div className='d-flex align-items-center'>
                  <div className='symbol symbol-50px me-3'>
                    <img
                      src={lastestUpdatedByUser?.image_url}
                      className=''
                      alt={lastestUpdatedByUser.name}
                    />
                  </div>
                  <div className='d-flex justify-content-start flex-column'>
                    <span className=''>{lastestUpdatedByUser?.name}</span>
                  </div>
                </div>
              </div>
            </div>
            {props.comments && (
                  <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-semibold fs-6'>
                    {Strings.reason}
                  </label>
                  <div className='col-lg-2'>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-50px me-3'>
                      <span className='fw-semibold text-gray-800 fs-6'>{props.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
    )
  }
export default LeaveStatusDetails