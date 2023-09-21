import React, { useState } from "react";
import Card from "../Card/Card";
import threeDots from "../../../assets/three-dots.svg";
import { useAppContext } from "../../../AppContext";
import {Context as ContextProps} from '../../../types'
import "./ContextMenu.styles.css";


const ContextMenu: React.FC<ContextProps> = ({onClick}) => {
  const { isAdmin, addRequestActive, setAddRequestActive, requestsList, currentRequestId, setCurrentRequestId} = useAppContext();
  const [contextIsActive, setContextIsActive] = useState<boolean>(false)

  console.log(isAdmin);
  const handleContextActive = () => {
    setContextIsActive(prev => !prev)
  }

  // const reSubmitClick = () => {
  //   setAddRequestActive(true)
  //   setContextIsActive(false)
  // }

  return (
    <>
      <div className="context-menu-outer">
        <div className={`three-dots ${contextIsActive ? "active" : ""}`} onClick={handleContextActive}>
          <img src={threeDots} alt="" />
        </div>
        {
          contextIsActive &&
        <Card className="context-menu-inner">
          {!isAdmin ? (
            <ul>
              <li id="student-context" onClick={onClick}>Re-submit Request</li>
            </ul>
          ) : (
            <ul>
              <li>Accept Request</li>
              <li>Reject Request</li>
              <li>Give Remarks</li>
            </ul>
          )}
        </Card>
       }
      </div>
    </>
  );
};

export default ContextMenu;
