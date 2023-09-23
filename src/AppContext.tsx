import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {User as CurrentUser} from './types'
import {Request as Requestsss} from './types'

// interface User {
//   id: number;
//   name: string;
//   fatherName: string;
//   dateOfBirth: string;
// }

interface AppContextProps {
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  userData: CurrentUser | null;
  setUserData: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
  // loginCookie: string | undefined;
  requestsList: Requestsss[] | undefined; 
  addRequestActive: boolean;
  setAddRequestActive: React.Dispatch<React.SetStateAction<boolean>>;
  currentRequestId: string;
  setCurrentRequestId: React.Dispatch<React.SetStateAction<string>>;
  contextIsActive: boolean;
  setContextIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  requestRemarks: string;
  setRequestRemarks: React.Dispatch<React.SetStateAction<string>>;

  // Add other shared states here
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode; // Define the children prop
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userData, setUserData] = useState<CurrentUser | null>(null)
  const [requestsList, setRequestsList] = useState<Requestsss[]>()
  const [addRequestActive, setAddRequestActive] = useState<boolean>(false);
  const [currentRequestId, setCurrentRequestId] = useState<string>("")
  const [contextIsActive, setContextIsActive] = useState<boolean>(false)
  const [requestRemarks, setRequestRemarks] = useState<string>("")
  // const [loginCookie, setLoginCookie] = useState<string | undefined>("")


  //  console.log(currentRequestId);
   
  // useEffect(() => {
  //   setLoginCookie(Cookies.get('loginToken'))
  // }, [])

  const loginCookie = Cookies.get('loginToken')

 


//   useEffect(() => {
//     // Your existing code to fetch user data and set isAdmin
//     // ...

//   }, []);


const getRequestsData = async () => {
  try {
    const res = await fetch("http://localhost:5004/api/v1/requests", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginCookie}`,
    },
  
 });
 const responseData = await res.json()
 
//  console.log(responseData.results)
 setRequestsList(responseData.results)
//  setUserData(responseData.results)
    
   } catch (error) {
    console.log(error);
   }
}

const getUserData = async() => {
  try {
   const res = await fetch("http://localhost:5004/api/v1/users/me", {
   method: "GET",
   headers: {
     Authorization: `Bearer ${loginCookie}`,
   },
 
});
const responseData = await res.json()

// console.log(responseData.user)
setUserData(responseData.user)
setIsAdmin(responseData.user.isAdmin)
   
  } catch (error) {
   console.log(error);
  }
}

// console.log(requestsList);


useEffect(() => {
  getUserData()
  getRequestsData()
  // console.log(isAdmin)

}, [])

  //  console.log(userData);
   

  const contextValue: AppContextProps = {
    isAdmin,
    setIsAdmin,
    userData,
    setUserData,
    requestsList,
    addRequestActive,
    setAddRequestActive,
    currentRequestId,
    setCurrentRequestId,
    contextIsActive,
    setContextIsActive,
    requestRemarks,
    setRequestRemarks
    // Add other shared states here
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
