import React from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { ContentTitle } from 'app/Components/ContentTitle/ContentTitle';
import DetailsFieldValues from './DetailsFieldValues/DetailsFieldValues';
import { Strings } from 'app/resource/Strings';

interface ShowDetailsProps {
  title: string
  path?: string
  className?: string
  isEditAllow?: boolean
  data: {label: string, value: any, isComponentsType?: boolean}[]
  id: string
  buttonText? : string
}

const ShowDetails: React.FC<ShowDetailsProps> = ({buttonText= '', className = "col-form-label fw-semibold fs-6", data,path, isEditAllow= false,  title, id }) => {
  return (
    <div className='card mb-5 mb-xl-10  form-container'>
      {title && (
 <ContentTitle
        title={title}
        targetToggleId={id}
        buttonText={buttonText}
        path={path}
        isEditAllow={isEditAllow}
      />
      )}
      <div id={id} className='collapse show'>
        <div className='card-body border-bottom p-9'>
        {data?.map((item, index) => {
          if(item?.isComponentsType) {
         return (
          <div className='row mb-7'>
          <label className={`col-lg-4 ${className} fw-bold text-muted`}>{item.label}</label>
          <div className='col-8'>
           {item.value()}
          </div>
        </div>
         )
          }
          if(typeof (item.value) === "object" && (item.label.includes(Strings.lastUpdatedBy) || item.label.includes(Strings.user))) {
            return (
              <div className="row mb-6">
              <label className={`col-lg-4 ${className} `}>{item.label}</label>
              <div className="col-lg-2">
                <div className="d-flex align-items-center">
                  <div className="symbol symbol-50px me-3">
                    <img src={item.value?.image_url} className="" alt={item.value.name} />
                  </div>
                  <div className="d-flex justify-content-start flex-column">
                    <span className="">{item.value?.name}</span>
                  </div>
                </div>
              </div>
            </div>
            )
          }
            return <DetailsFieldValues key={index} label={item.label} value={item.value} />
          })}

        </div>
      </div>
    </div>
  )
}

export default ShowDetails
