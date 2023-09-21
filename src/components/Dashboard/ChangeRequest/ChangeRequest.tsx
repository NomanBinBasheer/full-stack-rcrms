import React, { useContext } from "react";
import Card from "../../Elements/Card/Card";
import ContextMenu from "../../Elements/ContextMenu/ContextMenu";
import threeDots from "../../../assets/three-dots.svg";
import arrowDown from "../../../assets/arrow-down.svg";
import { useAppContext } from "../../../AppContext";
import "./ChangeRequest.styles.css";

const ChangeRequest = () => {
  const { isAdmin, requestsList, setAddRequestActive, setContextIsActive, setCurrentRequestId, userData } = useAppContext();

  console.log(requestsList);
  requestsList && console.log(requestsList[0].fromUser.name);
  console.log(userData);
  

  const handleResubmit = (index: number) =>{
    console.log("Resubmittteddddddddddddddddd");
    setAddRequestActive(true)
    setContextIsActive(false)
    requestsList && setCurrentRequestId(requestsList[index]._id)
    
  }


  //  const  currentUserName = requestsList && requestsList.name
  //  const  currentUserFatherName = userData && userData.fatherName
  



  return (
    <section>
      <Card className="change-requests-card">
        <div className="change-requests-inner">
          <div className="change-requests-titles">
            <div className="roll-no">
              <span>Roll No</span>
            </div>
            <div className="request-type">
              <span>Request Type</span>
            </div>
            <div className="name">
              <span>Name</span>
            </div>
            <div className="father-name">
              <span>Father Name</span>
            </div>
            <div className="current-data">
              <span>Current Data</span>
            </div>
            <div className="corrected-data">
              <span>Corrected Data</span>
            </div>
            <div className="documents">
              <span>Documents</span>
            </div>
            <div className="remarks">
              <span>Remarks</span>
            </div>
          </div>
          {requestsList?.map((ele, ind) => (
            <div className="change-requests-details">
              <div className="roll-no-details">
                <span>57043-F19</span>
              </div>
              <div className="request-type-details">
                <span>{ele.requestType}</span>
              </div>
              <div className="name-details">
                <span>{isAdmin ? ele.fromUser.name : userData?.name}</span>
              </div>
              <div className="father-name-details">
                <span>{ isAdmin ? ele.fromUser.fatherName : userData?.fatherName}</span>
              </div>
              <div className="current-data-details">
                <span>{ele.currentData}</span>
              </div>
              <div className="corrected-data-details">
                <span>{ele.correctedData}</span>
              </div>
              <div className="documents-details">
                <span>{`${ele.documents.length} ${
                  ele.documents.length > 1 ? "Docs" : "Doc"
                }`}</span>
                <div className="download">
                  <img src={arrowDown} alt="" />
                </div>
              </div>

              <div className="remarks-details">
                
                  <div className="remarks-details-inner">
                   {ele.remarks !== "none" ? <div className="remarks">{ele.remarks}</div> : <div className="notAnnouned"> N/A </div>}
                  </div>
                
                <ContextMenu
                onClick={() => handleResubmit(ind)} 
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
};

export default ChangeRequest;
