import React from "react";
import { NavLink } from "react-router-dom";
import './BackPageNavigation.scss';
interface BackPageNavigationProps {
  url: string;
}
const BackPageNavigation:React.FC<BackPageNavigationProps> = ({ url }) => {
  return (
    <NavLink className="backButton" to = {url}>
      <i className="fa fa-arrow-circle-left" aria-hidden="true" style={{width:"20px !important"}}></i>
    </NavLink>
  );
};
export default BackPageNavigation;