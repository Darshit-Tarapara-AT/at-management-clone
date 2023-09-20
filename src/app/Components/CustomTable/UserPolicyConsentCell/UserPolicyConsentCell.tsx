import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
interface UserPolicyConsentCellProps {
   is_read : 0 | 1;
}

const UserPolicyConsentCell: React.FC<UserPolicyConsentCellProps> = ({ is_read }) => {   

   return (
      <>
         {is_read === 1 ? (
            <span className="badge badge-light-success text-align-center">
               <FontAwesomeIcon icon={faCheck} />
            </span>
         ) : (
            <span className="badge badge-light-warning text-align-center">
            <FontAwesomeIcon icon={faXmark} />
         </span>
         )}
      </>
   );
};
export default UserPolicyConsentCell;