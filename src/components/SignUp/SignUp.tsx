import React, { useState } from "react";
import Card from "../Elements/Card/Card";
import "./SignUp.styles.css";
import Input from "../Elements/Input/Input";
import Button from "../Elements/Button/Button";

const initialFormValues = {
  name: "",
  fatherName: "",
  email: "",
  dateOfBirth: "",
  isAdmin: false,
  password: "",
  confirmPassword: "",
};

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState(initialFormValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //const name = e.target.name
    //const value = e.target.value
    const { name, value } = e.target;

    // console.log("{{formData}}", formData);
    // console.log("{{name}}", name);
    // console.log("{{value}}", value);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const performSignUp = async () => {
     try {
      const res = await fetch("http://localhost:5004/api/v1/users/signup", {
      method: "POST",
      body: JSON.stringify({
        name: formData.name,
        fatherName: formData.fatherName,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        isAdmin: false,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const responseData = await res.json()

    console.log(responseData);
    console.log(responseData.status);
      
     } catch (error) {
       console.log("Error:", error)
     }

     console.log("Hello");
     
  };

  React.useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <section className="sign-up-container">
      <Card className="sign-up-card">
        <>
          <h2>RCRMS</h2>
          <div className="name">
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              id="name"
              placeholder="Enter Your Name"
              className="sign-up-input"
              onChange={handleInputChange}
              value={formData.name}
              name="name"
            />
          </div>
          <div className="father-name">
            <label htmlFor="father-name">Father Name</label>
            <Input
              type="text"
              id="father-name"
              placeholder="Enter Father Name"
              className="sign-up-input"
              onChange={handleInputChange}
              value={formData.fatherName}
              name="fatherName"
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="sign-up-input"
              onChange={handleInputChange}
              value={formData.email}
              name="email"
            />
          </div>
          <div className="date">
            <label htmlFor="date">D.O.B</label>
            <Input
              type="date"
              id="date"
              placeholder=""
              className="sign-up-input"
              onChange={handleInputChange}
              value={formData.dateOfBirth}
              name="dateOfBirth"
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="sign-up-input"
              onChange={handleInputChange}
              value={formData.password}
              name="password"
            />
          </div>
          <div className="confirmPassword">
            <label htmlFor="email">Confirm Password</label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              className="sign-up-input"
              onChange={handleInputChange}
              value={formData.confirmPassword}
              name="confirmPassword"
            />
          </div>
          <Button type="lightGreen" onClick={performSignUp}>
            Sign Up
          </Button>
        </>
      </Card>
    </section>
  );
};

export default SignUp;
