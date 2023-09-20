/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, createContext, useContext, useEffect, useState} from 'react'
import {WithChildren} from '../../helpers'

export interface PageLink {
  title: string
  path: string
  isActive: boolean
  isSeparator?: boolean
}

export interface PageDataContextModel {
  pageTitle?: string
  buttonText?: string
  isAddPermissionAllow?: boolean
  buttonClassName?: string
  hideSVGValue?: boolean
  setButtonClassName: (_title: string) => void
  setPageTitle: (_title: string) => void
  toggleTaskCorrectionForm: () => void
  setCurrentPath: (_path: string) => void
  setButtonText: (_title: string) => void
  setIsAddPermissionAllow: (_title: boolean) => void
  setHasTaskCorrectionFormShown: (_title: boolean) => void,
  currentPath?: string
  hasTaskCorrectionFormShown?: boolean
  pageDescription?: string
  setPageDescription: (_description: string) => void
  pageBreadcrumbs?: Array<PageLink>
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => void
  setHideSVGValue: (_title: boolean) => void
}

const PageDataContext = createContext<PageDataContextModel>({
  setPageTitle: (_title: string) => {},
  setButtonText: (_title: string) => {},
  toggleTaskCorrectionForm: () => {},
  setButtonClassName: (_title: string) => {},
  setIsAddPermissionAllow: (_title: boolean) => {},
  setHasTaskCorrectionFormShown: (_title: boolean) => {},
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => {},
  setPageDescription: (_description: string) => {},
  setCurrentPath: (_path: string) => {},
  setHideSVGValue: (_title: boolean) => {},
})

const PageDataProvider: FC<WithChildren> = ({children}) => {
  const [buttonText, setButtonText] = useState<string>('')
  const [hasTaskCorrectionFormShown, setHasTaskCorrectionFormShown] = useState<boolean>(false)
  const [isAddPermissionAllow, setIsAddPermissionAllow] = useState<boolean>(false)
  const [pageTitle, setPageTitle] = useState<string>('')
  const [pageDescription, setPageDescription] = useState<string>('')
  const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([])
  const [currentPath, setCurrentPath] = useState<string>('')
  const [buttonClassName, setButtonClassName] = useState<string>('')
  const [hideSVGValue, setHideSVGValue] = useState<boolean>(false)

  const toggleTaskCorrectionForm = () => {
    setHasTaskCorrectionFormShown(!hasTaskCorrectionFormShown)
  }
  const value: PageDataContextModel = {
    pageTitle,
    buttonClassName,
    setButtonClassName,
    toggleTaskCorrectionForm,
    hasTaskCorrectionFormShown,
    isAddPermissionAllow,
    buttonText,
    setPageTitle,
    setButtonText,
    setIsAddPermissionAllow,
    setHasTaskCorrectionFormShown,
    pageDescription,
    setPageDescription,
    setCurrentPath,
    currentPath,
    pageBreadcrumbs,
    setPageBreadcrumbs,
    hideSVGValue,
    setHideSVGValue
  }

  return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
}

function usePageData() {
  return useContext(PageDataContext)
}

type Props = {
  description?: string
  path?: string
  className?: string
  breadcrumbs?: Array<PageLink>
  buttontitle?: string
  hasAddPermission ?: boolean
  hideSVG?: boolean
}

const PageTitle: FC<Props & WithChildren> = ({
  children,
  description,
  breadcrumbs,
  path,
  hasAddPermission ,
  className = "btn btn-sm btn-primary m-3",
  buttontitle,
  hideSVG
}) => {
  const {
    setPageTitle,
    setPageDescription,
    setPageBreadcrumbs,
    setCurrentPath,
    setButtonText,
    setIsAddPermissionAllow,
    setButtonClassName,
    setHideSVGValue,
  } = usePageData()

  useEffect(() => {
    if (children) {
      setPageTitle(children.toString())
    }
    return () => {
      setPageTitle('')
    }
  }, [children])

  useEffect(() => {
    if (className) {
      setButtonClassName(className)
    }
    return () => {
      setButtonClassName('')
    }
  }, [className])

  useEffect(() => {
    if (path) {
      setCurrentPath(path)
    }
    return () => {
      setCurrentPath('');
    }
  }, [path])

  useEffect(() => {
    if (buttontitle) {
      setButtonText(buttontitle)
    }
    return () => {
      setButtonText('')
    }
  }, [buttontitle])

  useEffect(() => {
    if (hasAddPermission){
      setIsAddPermissionAllow(hasAddPermission )
    }
    return () => {
      setIsAddPermissionAllow(false)
    }
  }, [hasAddPermission])

  useEffect(() => {
    if (hideSVG ){
      setHideSVGValue(hideSVG )
    }
    return () => {
      setHideSVGValue(false)
    }
  }, [hideSVG])

  useEffect(() => {
    if (description) {
      setPageDescription(description)
    }
    return () => {
      setPageDescription('')
    }
  }, [description])

  useEffect(() => {
    if (breadcrumbs) {
      setPageBreadcrumbs(breadcrumbs)
    }
    return () => {
      setPageBreadcrumbs([])
    }
  }, [breadcrumbs])

  return <></>
}

const PageDescription: FC<WithChildren> = ({children}) => {
  const {setPageDescription} = usePageData()
  useEffect(() => {
    if (children) {
      setPageDescription(children.toString())
    }
    return () => {
      setPageDescription('')
    }
  }, [children])
  return <></>
}

export {PageDescription, PageTitle, PageDataProvider, usePageData}
