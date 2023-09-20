import { KTSVG } from '_metronic/helpers';
import { useEffect } from 'react'

interface ModalProps {
    id: string;
    HeaderContainer?: React.ElementType;
    children: JSX.Element
}

const Modal: React.FC<ModalProps> = ({
    id,
    HeaderContainer,
    children
}) => {
    useEffect(() => {
        document.body.classList.add('modal-open')
        return () => {
          document.body.classList.remove('modal-open')
        }
      }, [])
    return (
        <>
            <div
                className='modal fade'
                id={id}
                aria-hidden="true"
                tabIndex={-1}
               style={{overflowX: "scroll"}}
            >
                {/* begin::Modal dialog */}
                <div className='modal-dialog modal-dialog-centered mw-650px'>

                    {/* begin::Modal content */}
                    <div className='modal-content'>
                        <div className='modal-header pb-0 border-0 justify-content-end'>
                            <div
                                className='btn btn-icon btn-sm btn-active-icon-primary '
                                data-bs-dismiss="modal" 
                            >
                                <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                            </div>
                            {HeaderContainer && <HeaderContainer />}
                        </div>

                        {/* begin::Modal body */}
                        <div className='modal-body scroll-y mx-5 mx-xl-15 my-0'>
                            {children}
                        </div>
                        {/* end::Modal body */}
                    </div>
                    {/* end::Modal content */}
                </div>
                {/* end::Modal dialog */}
            </div>
            {/* begin::Modal Backdrop */}

            {/* end::Modal Backdrop */}
        </>
    )
}

export { Modal }
