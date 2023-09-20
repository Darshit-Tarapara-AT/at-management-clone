import {IRootState} from 'app/redux/store'
import {Strings} from 'app/resource/Strings'
import {Message} from 'app/utils/AlertMessage'
import { PATHS } from 'config/paths/paths'
import React from 'react'
import {useSelector} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'

interface IProps {
  children: React.ReactNode
}
const MainLayOut: React.FC<IProps> = (props) => {
  const {isUserReadPolicy, isCurrentUserDataFetch} = useSelector(
    (state: IRootState) => state.UserStateData
  )
  const location = useLocation()
  const navigator = useNavigate()
  const splitPath = location?.pathname?.split('/')
const isViewPolicyPage = splitPath?.[1] === 'policy' && typeof(splitPath?.[2]) === "string" && splitPath?.[3] === "view";
  const alertMessage = (icon: 'error' | 'success' | 'warning', text: string, title: string) => {
    Message(title, icon, text, Strings.goToPolicyPage).then((result) => {
      if (result.isConfirmed) {
        navigator(PATHS.policy.list)
      }
    })
  }

  return (
    <>
      {!isCurrentUserDataFetch &&
        isUserReadPolicy === 1 &&
        location.pathname !== '/policy' &&
        !isViewPolicyPage &&
        alertMessage('warning', Strings.youHavePendingPolicyToRead, '')}
      {props.children}
    </>
  )
}

export default MainLayOut
