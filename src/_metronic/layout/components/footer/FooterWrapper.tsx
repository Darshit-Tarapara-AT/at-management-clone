import clsx from 'clsx'
import {useLayout} from '../../core'
import {Footer} from './Footer'

const FooterWrapper = () => {
  const {config} = useLayout()
  if (!config.app?.footer?.display) {
    return null
  }

  return (
    <div className='app-footer mt-8' id='kt_app_footer'>
      {config.app.footer.containerClass ? (
        <div className={clsx('app-container', config.app.footer.containerClass)} style={{width: "100%", justifyContent: "space-between"}}>
          <Footer />
        </div>
      ) : (
        <Footer />
      )}
    </div>
  )
}

export {FooterWrapper}
