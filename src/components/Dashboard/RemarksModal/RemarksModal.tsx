import React, { useContext, useEffect, useState } from "react";
import closeButton from "../../../assets/cancel.svg";
import { useAppContext } from "../../../AppContext";
import Cookies from "js-cookie";
import "./RemarksModal.styles.css";

interface Props {
  requestType: string | undefined;
  currentData: string | undefined;
  correctedData: string | undefined;
  remarksModalOpen: boolean;
  setRemarksModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  curentRequestIndex: number;
  remarks: string;
  setRemarks: React.Dispatch<React.SetStateAction<string>>;
}

const remarksData = [
  {
    remarkName: "Missing Challan",
    remarkDetails:
      "Mark the request as pending and notify the student to submit the missing challan form/image",
  },
  {
    remarkName: "Visit Office / Office Summon",
    remarkDetails:
      "Mark the request as pending and notify the student to visit the office to further discuss their request.",
  },
  {
    remarkName: "Incomplete Docs",
    remarkDetails:
      "Mark the request as pending and notify the student to re-submit the request including all the files.",
  },
  {
    remarkName: "Re-upload Docs",
    remarkDetails:
      "Mark the request as pending and notify the student to re-submit the request because the current docs are blurry or unreadable.",
  },
];
const RemarksModal: React.FC<Props> = ({
  requestType,
  currentData,
  correctedData,
  remarksModalOpen,
  setRemarksModalOpen,
  curentRequestIndex,
  remarks,
  setRemarks,
}) => {
  const [remarkCard, setRemarkCard] = useState("");
  const {
    isAdmin,
    requestsList,
    setAddRequestActive,
    setContextIsActive,
    currentRequestId,
    setCurrentRequestId,
    userData,
  } = useAppContext();

  const loginCookie = Cookies.get("loginToken");

  const handleGiveRemarks = (index: number) => {
    requestsList && setCurrentRequestId(requestsList[curentRequestIndex]._id);
    requestsList && setRemarks(requestsList[curentRequestIndex].remarks);
    console.log("Clicked");

    setRemarkCard(
      index === 0
        ? "Missing Challan"
        : index === 1
        ? "Visit Office"
        : index === 2
        ? "Incomplete Docs"
        : "Re-upload Docs"
    );
  };

  const remarksToAdd = 
    remarkCard === "Missing Challan"
  ? "Missing Challan"
  : remarkCard === "Visit Office"
  ? "Visit Office"
  : remarkCard === "Incomplete Docs"
  ? "Incomplete Docs"
  : "Re-upload Docs"
  
  console.log(curentRequestIndex);
  console.log(currentRequestId);

  console.log(remarkCard);

  useEffect(() => {
    console.log(currentRequestId);
    if (currentRequestId) {
      (async () => {
        try {
          // API call to accept request
          const remarkResponse = await fetch(
            `http://localhost:5004/api/v1/requests/${currentRequestId}/remark`,
            {
              method: "PATCH",
              body: JSON.stringify({
                "remarks": remarksToAdd,
              }),
              headers: {
                Authorization: `Bearer ${loginCookie}`,
                "Content-Type": "application/json",
              },
            }
          );

          const remarkData = await remarkResponse.json();

          console.log("Remark Response:", remarkData);
        } catch (error) {
          // Handle errors here
          console.log(error);
        }
      })();
    }
  }, [remarkCard]);

  return (
    <div className="remarks-modal-container">
      <div>
        <h3 className="give-remarks-heading">
          Give remarks to the Student Request
        </h3>
        <ul>
          <li>Request Type: {requestType}</li>
          <li>Current Data: {currentData}</li>
          <li>Corrected Data: {correctedData}</li>
        </ul>
      </div>
      <section className="remarks-cards-container">
        {remarksData.map((ele, ind) => (
          <div
            className="remark-card"
            key={ind}
            onClick={() => handleGiveRemarks(ind)}
          >
            <h4>{ele.remarkName}</h4>
            <p>{ele.remarkDetails}</p>
          </div>
        ))}
      </section>

      <div
        className="remarks-close-button"
        onClick={() => setRemarksModalOpen(false)}
      >
        <img src={closeButton} alt="" />
      </div>
    </div>
  );
};

export default RemarksModal;
