import * as React from 'react'
import { useNavigate } from 'react-router-dom'
interface FieldInputTitle {
  title: string,
  targetToggleId?: string,
  className?: string
  path?: string
  buttonText?: string
  isEditAllow?: boolean
}
export const ContentTitle: React.FC<FieldInputTitle> = ({
  isEditAllow= false,
  ...props
}) => {
  const navigator = useNavigate();
  return (
    <div
      className={`card-header  border-bottom ${
        props.className ? props.className : ''
      } `}
      data-bs-target={props.targetToggleId}
      aria-expanded='true'
      aria-controls='kt_account_profile_details'
    >
      <div className='card-title m-0 flex-column' style={{cursor: "default"}}>
        <h3 className='fw-bolder m-0'>{props.title}</h3>
      </div>
      {props.path && isEditAllow && (
        <button type='button' onClick={(e) => {
          e.stopPropagation();
          if(props.path) {
            navigator(`/${props.path}`)
          }
        }} className='btn btn-sm btn-primary align-self-center'>
        {props.buttonText}
      </button>
    )}
    </div>
  )
}
