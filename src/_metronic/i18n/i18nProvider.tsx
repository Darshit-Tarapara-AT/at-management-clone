import { WithChildren } from '_metronic/helpers'
import {FC} from 'react'


const I18nProvider: FC<WithChildren> = ({children}) => {

return (
  <>
    {children}
  </>
)
}

export {I18nProvider}
