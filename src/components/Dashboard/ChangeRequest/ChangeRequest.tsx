import React, { useState, useContext, useEffect } from "react";
import Card from "../../Elements/Card/Card";
import ContextMenu from "../../Elements/ContextMenu/ContextMenu";
import threeDots from "../../../assets/three-dots.svg";
import arrowDown from "../../../assets/arrow-down.svg";
import { useAppContext } from "../../../AppContext";
import Cookies from "js-cookie";
import "./ChangeRequest.styles.css";

const ChangeRequest = () => {
  const {
    isAdmin,
    requestsList,
    setAddRequestActive,
    setContextIsActive,
    currentRequestId,
    setCurrentRequestId,
    userData,
  } = useAppContext();

  const [remarks, setRemarks] = useState("");
  // console.log(remarks);

  // console.log(requestsList);
  // requestsList && console.log(requestsList[0].fromUser.name);
  // console.log(userData);

  const loginCookie = Cookies.get("loginToken");

  const handleResubmit = (index: number) => {
    console.log("Resubmittteddddddddddddddddd");
    setAddRequestActive(true);
    setContextIsActive(false);
    requestsList && setCurrentRequestId(requestsList[index]._id);

    console.log(currentRequestId);
  };

  // console.log(currentRequestId);

  const handleAccept = async (index: number) => {
    requestsList && setCurrentRequestId(requestsList[index]._id);
    requestsList && setRemarks(requestsList[index].remarks);
    // setRemarks("Accepted")
    console.log(currentRequestId);
    console.log(remarks);

    try {
      const accept = await fetch(
        `http://localhost:5004/api/v1/requests/${currentRequestId}/accept`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${loginCookie}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await accept.json();

      console.log(responseData);
    } catch (error) {}
  };
  const handleReject = async (index: number) => {
    requestsList && setCurrentRequestId(requestsList[index]._id);
    requestsList && setRemarks(requestsList[index].remarks);
    // setRemarks("Rejected")
    console.log(currentRequestId);
    console.log(remarks);

    console.log(index);

    try {
      const accept = await fetch(
        `http://localhost:5004/api/v1/requests/${currentRequestId}/reject`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${loginCookie}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await accept.json();

      console.log(responseData);
    } catch (error) {}
  };

  console.log(requestsList);

  // const handleReject = async (index: number) => {
  //   setRemarks("Rejected")
  //   console.log("Accepted");
  //   // try {
  //   //   const accept = await fetch(`http://localhost:5004/api/v1/requests/${currentRequestId}/accept`, {
  //   //     method: "PATCH",
  //   //     body: JSON.stringify({
  //   //       // Your data here, representing the changes you want to make
  //   //     }),
  //   //     headers: {
  //   //       Authorization: `Bearer ${loginCookie}`,
  //   //       "Content-Type": "application/json",

  //   //     },
  //   //   });

  //   //   const responseData = await accept.json();

  //   // } catch (error) {

  //   // }
  // }
  const handleGiveRemarks = async (index: number) => {
    setRemarks("Accepted");
    console.log("Accepted");

    // try {
    //   const accept = await fetch(`http://localhost:5004/api/v1/requests/${currentRequestId}/accept`, {
    //     method: "PATCH",
    //     body: JSON.stringify({
    //       // Your data here, representing the changes you want to make
    //     }),
    //     headers: {
    //       Authorization: `Bearer ${loginCookie}`,
    //       "Content-Type": "application/json",

    //     },
    //   });

    //   const responseData = await accept.json();

    // } catch (error) {

    // }
  };

  const currentUserName = requestsList && requestsList.name;
  const currentUserFatherName = userData && userData.fatherName;

  // useEffect(()=> {
  //   handleAccept()

  // }, [])

  console.log(remarks);

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
                <span>57043</span>
              </div>
              <div className="request-type-details">
                <span>{ele.requestType}</span>
              </div>
              <div className="name-details">
                <span>{isAdmin ? ele.fromUser.name : userData?.name}</span>
              </div>
              <div className="father-name-details">
                <span>
                  {isAdmin ? ele.fromUser.fatherName : userData?.fatherName}
                </span>
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
                  {ele.remarks !== "none" ? (
                    <div
                      className={`remarks ${
                        ele.remarks === "Accepted"
                          ? "accepted-remarks"
                          : ele.remarks === "Rejected"
                          ? "rejected-remarks"
                          : ""
                      }`}
                    >
                      {ele.remarks}
                    </div>
                  ) : (
                    <div className="notAnnouned"> N/A </div>
                  )}
                </div>
                {/* {console.log(ele)} */}
                <ContextMenu
                  handleResubmit={() => handleResubmit(ind)}
                  handleAccept={() => handleAccept(ind)}
                  handleReject={() => handleReject(ind)}
                  handleGiveRemarks={() => handleGiveRemarks(ind)}
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
