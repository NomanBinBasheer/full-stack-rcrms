import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import LoginPage from "./components/LoginPage/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import SignUp from "./components/SignUp/SignUp";
import { useAppContext } from './AppContext';
import "./App.css";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [isAdmin, setIsAdmin] = useState<boolean>(false)
  // const { isAdmin, setIsAdmin } = useAppContext();


 
    const loginCookie = Cookies.get('loginToken')   
  //  console.log(loginCookie)
  //  return loginCookie
  // }

  // if (loginCookie && loginCookie !== '') setIsLoggedIn(true)


    // useEffect(() => {
    //   const cookieCheck = getLoginCookie()
    //   if (cookieCheck && cookieCheck !== '') setIsLoggedIn(true)
    // }, [])
  
  // console.log(isLoggedIn)
  // const getUserData = async() => {
  //    try {
  //     const res = await fetch("http://localhost:5004/api/v1/users/me", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${loginCookie}`,
  //     },
    
  //  });
  //  const responseData = await res.json()

  //  console.log(responseData.user)
  //  setIsAdmin(responseData.user.isAdmin)
      
  //    } catch (error) {
  //     console.log(error);
  //    }
  // }

  // useEffect(() => {
  //   getUserData()

  //   console.log(isAdmin)

  // }, [])

  // useEffect(() => {
  //   console.log(isAdmin)

  // }, [])

  

  return (
    <>
     {loginCookie ? <Dashboard /> : <LoginPage />} 
    </>
  );
}

export default App;
