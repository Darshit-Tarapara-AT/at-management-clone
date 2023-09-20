import { AssignPolicyRoleProps} from 'app/Modal/Modal'
import React from 'react'
import CheckBox from '../CheckBox/CheckBox'
import './AssignPolicyRole.scss';
const AssignPolicyRole: React.FC<AssignPolicyRoleProps> = ({ id, name, formilk }) => {
  
  return (
    <div className='col-2 mt-3 mb-3 assign-permission-checkbox-container'>
      <CheckBox
        id={id}
        value={name.replace(' ', '')}
        name={name}
        formilk={formilk}
      />
    </div>
  )
}

export default AssignPolicyRole
