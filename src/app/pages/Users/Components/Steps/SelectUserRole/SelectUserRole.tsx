import React from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from 'app/redux/store'
import { UserSelectRoleInputFieldProps } from '../../Modal/Modal'
import { Loader } from 'app/Components/Loader/Loader'

const SelectUserRole: React.FC<UserSelectRoleInputFieldProps> = ({ formik, role }) => {
  const { list: roleList, isLoading } = useSelector((state: IRootState) => state.roleStateData)
  const handlerChange = (id: number) => {

    const roleId = id + ''
    formik.setFieldValue(role, roleId)
  }

  return (
    <>
      <div className='row mb-6'>
        {isLoading && !roleList ? (
          <Loader />
        ) : (
          roleList.map((list, index) => {
            return (
              <div className='col-lg-12 fv-row mt-3 mb-3' key={`${index}`} >
                <input
                  className='form-check-input me-3'
                  {...formik.getFieldProps('role')}
                  style={{ cursor: 'pointer' }}
                  type='radio'
                  id={list.id + ''}
                  value={list.id}
                  checked={formik.values.role === list.id + ''}
                  onChange={() => handlerChange(list.id)}
                />
                <label  style={{ cursor: 'pointer' }} className='form-check-label' htmlFor={list.id + ''}>
                  <div className='fw-bolder text-gray-800'>{list.label}</div>
                </label>
              </div>

            )
          })

        )}
        {formik.touched.role && formik.errors.role && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>{formik.errors.role}</div>
          </div>
        )}
      </div>



    </>

  )
}

export default SelectUserRole
