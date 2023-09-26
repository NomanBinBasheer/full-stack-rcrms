import React, { useState } from "react";
import Cookies from 'js-cookie';
import Card from "../Elements/Card/Card";
import ProjectName from "../Elements/ProjectName";
import ProjectAbbr from "../Elements/ProjectAbrr";
import Input from "../Elements/Input/Input";
import Button from "../Elements/Button/Button";
import "./LoginPage.styles.css";

const initialFormValues = {
  email: "",
  password: ""
};

const LoginPage = () => {
  const [formData, setFormData] = useState(initialFormValues);

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

  // console.log(formData)

  const performLogin = async () => {
    try {
     const res = await fetch("http://localhost:5004/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    
   });

   const responseData = await res.json()

   if (responseData.status === 'success'){
    Cookies.set('loginToken', responseData.token)
    window.location.assign('/')
   }

   console.log(responseData);
   console.log(responseData.status);
     
    } catch (error) {
      console.log("Error:", error)
    }
 };
  



  const goToSignUp = () => {
    console.log("take me to Sign Up")
    window.location.assign('/signup')
  }

  return (
    <>
      <section className="login-outer">
        <Card className="login-card">
          <div className="login-inner">
            <h2 className="uni-name">Hazara University</h2>
            <div className="name-and-abbr">
              <h1 className="project-name">
                <ProjectName />
              </h1>
              <span>
                <ProjectAbbr />
              </span>
            </div>
            <div>
              <label htmlFor="name">Email</label>
              <Input
                type="email"
                placeholder="Enter Your Email"
                className="input-box"
                onChange={handleInputChange}
                value={formData.email}
                name="email"
                id="email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                placeholder="Enter Your Password"
                className="input-box"
                onChange={handleInputChange}
                value={formData.password}
                name="password"
                id="password"
              />
            </div>
            <div className="buttons">
              <Button type="lightGreen" onClick={performLogin}>
                Login
              </Button>
              <span className="or">Or</span>
              <Button type="signUp" onClick={goToSignUp}>
                Sign Up
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
};

export default LoginPage;
