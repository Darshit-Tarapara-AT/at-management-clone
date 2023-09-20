import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { capitalizeFirstLetter } from 'app/utils/helper'
import {FC} from 'react'
import { useLocation } from 'react-router-dom'

type Props = {
  title?: string
  className ?:string
  icon?: IconProp
  isCapitalizeFirstLetterRequired?: boolean
}

const CustomRowTitle: FC<Props> = ({title, className, icon, isCapitalizeFirstLetterRequired = true}) => {
  const {pathname} = useLocation();
  const titleName = pathname.includes('/users') || pathname.includes('history') || !isCapitalizeFirstLetterRequired ? title : capitalizeFirstLetter(title || "")

 return (
  <div className={`badge badge-light fw-bolder ${className}`}>
    {icon && <FontAwesomeIcon icon={icon} />}
    {titleName}
    </div>
 )
}


const CustomDefaultTitle: FC<Props> = ({title,className, icon,isCapitalizeFirstLetterRequired: isCapitalizeFirstLetterRequired= true}) => {
    return (
      <span className={`text-gray-800 mb-1 ${className || ''}`}>
        
        {!isCapitalizeFirstLetterRequired ? title : capitalizeFirstLetter(title!)}
      </span>
    )
  }

export {CustomRowTitle, CustomDefaultTitle}
