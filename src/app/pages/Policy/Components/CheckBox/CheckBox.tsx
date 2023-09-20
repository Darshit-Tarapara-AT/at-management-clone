/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react'
import { AssignPolicyRoleProps } from 'app/Modal/Modal'

const CheckBox: React.FC<AssignPolicyRoleProps> = (props) => {
  const  policyRole = [...props.formilk.values.policyRole]
  const checkedPolicyRole = useMemo(() => policyRole, [policyRole]);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    if (checkedPolicyRole.includes(props.id)) {
      setIsChecked(true);
    }
    else {
      setIsChecked(false);
    }
  }, [checkedPolicyRole]);

  const changeHandler = (e: React.BaseSyntheticEvent, id: number) => {
    const newPolicyRole = [...props.formilk.values.policyRole]
    if (e.target.checked) {
      props.formilk.setFieldValue("policyRole", [...newPolicyRole, id])
    } else {
      const newPolicyRoleList = newPolicyRole.filter(
        (selectedId: number) => selectedId !== id
      )
      props.formilk.setFieldValue("policyRole", [...newPolicyRoleList])
    }
    setIsChecked((preViewState) => !preViewState);
  }

  return (
    <div className='form-check form-check-custom form-check-solid'>
      <input
        className='form-check-input me-3'
        name={props.name}
        checked={isChecked}
        value={props.name}
        type='checkbox'
        onChange={(e) => changeHandler(e, props.id)}
        id={props.name}
      />
      <label className='form-check-label' htmlFor={props.name}>
        <div className='fw-bolder text-gray-800'>
          {props.name}
        </div>
      </label>
    </div>
  )
}

export default CheckBox
