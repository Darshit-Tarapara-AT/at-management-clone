/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {useEffect} from 'react'
import './AuthLayOut.scss'
import { AuthLayOutProp } from 'app/Modal/Modal';

const AuthLayout:React.FC<AuthLayOutProp> = ({
  component:Component
}) => {
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, []);

  return (
    <div className='container-fluid auth-layout' >
      <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
        <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1'>
              <Component />
          </div>
        </div>
      </div>

  )
}

export {AuthLayout}
