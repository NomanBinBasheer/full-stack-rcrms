import React, { useState, useEffect } from "react";
import Card from "../../Elements/Card/Card";
import Button from "../../Elements/Button/Button";
import Input from "../../Elements/Input/Input";
import cancel from "../../../assets/cancel.svg";
import { useAppContext } from "../../../AppContext";
import Cookies from "js-cookie";
import "./AddRequest.styles.css";

const initialFormValues = {
  currentData: "",
  correctedData: "",
};

const AddRequest: React.FC = () => {
  const { requestsList, addRequestActive, setAddRequestActive, currentRequestId, setCurrentRequestId } = useAppContext();

  const loginCookie = Cookies.get("loginToken");

  // const [addRequestActive, setAddRequestActive] = useState<boolean>(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(
    null
  );
  const [requestType, setRequestType] = useState<string>("");
  const [formData, setFormData] = useState(initialFormValues);
  const [file, setFile] = useState<File | null>();

  const buttonsArr = ["Name", "Father Name", "D.O.B"];

  const handleChangeRequestBtnClick = (ele: string, index: number) => {
    setSelectedButtonIndex(index);
    setAddRequestActive(true);
    setRequestType(ele);
    console.log("Buttoned");
  };

  // console.log(selectedButtonIndex);
  // console.log(addRequestActive);
  console.log(currentRequestId)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // console.log("{{formData}}", formData);
    // console.log("{{name}}", name);
    // console.log("{{value}}", value);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);
  console.log(requestType);

  console.log(currentRequestId);
  
  
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };

  const handleUploadDocs = () => {
    console.log("Upload Docs");
  };

  // const submitRequest = () => {
  //   console.log("submitting request");
  // };

  // useEffect(() => {
  //   console.log(formData);
  //   console.log(file)

  // }, [formData])

  // console.log(loginCookie);

  const submitRequest = async () => {
    try {
      const formDataForSubmit = new FormData();
      const formDataForResubmit = new FormData();

      formDataForResubmit.append("correctedData", formData.correctedData);
      formDataForResubmit.append("documents", file as File);

      formDataForSubmit.append("requestType", requestType);
      formDataForSubmit.append("correctedData", formData.correctedData);
      formDataForSubmit.append("documents", file as File);

      console.log(formDataForSubmit);
      console.log(currentRequestId);

      console.log(requestType);
       

      if (requestType !== "") {
        
        const resSubmit = await fetch(`http://localhost:5004/api/v1/requests`, {
          method: "POST",
          body: formDataForSubmit,
          headers: {
            Authorization: `Bearer ${loginCookie}`,

          },
        });

        const responseData = await resSubmit.json();

        if (responseData.status === "success") {
          // Cookies.set('loginToken', responseData.token)
          // window.location.assign('/')
          console.log(responseData);
        }

        console.log(responseData);
        console.log(responseData.status);
      } else {
        const resResubmit = await fetch(`http://localhost:5004/api/v1/requests/${currentRequestId}`, {
          method: "PATCH",
          body: formDataForResubmit,
          headers: {
            Authorization: `Bearer ${loginCookie}`,
          },
        });

        const responseData = await resResubmit.json();

        if (responseData.status === "success") {
          // Cookies.set('loginToken', responseData.token)
          // window.location.assign('/')
          console.log(responseData);
        }

        // console.log(responseData);
        // console.log(responseData.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <section>
      <Card className="add-request-card">
        <section className="add-request-buttons-container">
          <h3>Add A New Change Request</h3>
          <div className="add-request-buttons-inner">
            {buttonsArr.map((ele, index) => (
              <Button
                type="lightGreen"
                onClick={() => handleChangeRequestBtnClick(ele, index)}
                key={index}
              >
                {`${ele} Change Request`}
              </Button>
            ))}
          </div>
        </section>
      </Card>

      {addRequestActive ? (
        <Card className="add-request-card">
          <section className="add-request-container">
            <div
              className="cancel-container"
              onClick={() => setAddRequestActive(false)}
            >
              <img src={cancel} alt="" />
            </div>
            <h3>
              New{" "}
              <span>
                {selectedButtonIndex === 0
                  ? "Name"
                  : selectedButtonIndex === 1
                  ? "Father Name"
                  : "D.O.B"}
              </span>{" "}
              Change Request
            </h3>
            <div className="inputs-and-upload">
              <div>
                <label htmlFor="currentData">Current Data</label>
                <Input
                  type="text"
                  placeholder="Enter Current Data"
                  className="data-input"
                  id="currentData"
                  onChange={handleInputChange}
                  value={formData.currentData}
                  name="currentData"
                />
              </div>
              <div>
                <label htmlFor="currentData">Current Data</label>
                <Input
                  type="text"
                  placeholder="Enter Corrected Data"
                  className="data-input"
                  id="correctedtData"
                  onChange={handleInputChange}
                  value={formData.correctedData}
                  name="correctedData"
                />
              </div>
              <label onClick={handleUploadDocs} className="upload-docs">
                <input type="file" onChange={handleFileChange} />
                Upload Challan & Documents
              </label>
            </div>
            <div className="note-and-submit">
              <div className="note-para">
                <p>
                  <span>Note:</span> Please upload image of your fee challan and
                  other official documents that will help us verify your
                  provided data like DMC, Birth certificate, FSC or Matric marks
                  sheets etc.
                </p>
              </div>
              <div>
                <Button type="submit" onClick={submitRequest}>
                  Submit Request
                </Button>
              </div>
            </div>
          </section>
        </Card>
      ) : (
        ""
      )}
    </section>
  );
};

export default AddRequest;
