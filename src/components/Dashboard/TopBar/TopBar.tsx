import React, { useEffect, useState } from "react";
import Button from "../../Elements/Button/Button";
import ProjectName from "../../Elements/ProjectName";
import ProjectAbbr from "../../Elements/ProjectAbrr";
import blueBell from "../../../assets/blue-bell-icon.svg";
import greenBell from "../../../assets/green-bell-icon.svg";
import Notifications from "../Notifications/Notifications";
import { Notification } from "../../../types";
import Cookies from "js-cookie";
import { useAppContext } from "../../../AppContext";
import "./TopBar.styles.css";

const TopBar = () => {
  const { isAdmin, notificationsModalOpen, setNotificationsModalOpen } =
    useAppContext();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const loginCookie = Cookies.get("loginToken");

  // useEffect(() => {
  // async () => {

  // }
  // }, [])

  // console.log(isAdmin)
  const handleNotiModal = async () => {
    setNotificationsModalOpen(!notificationsModalOpen);
    try {
      const res = await fetch("http://localhost:5004/api/v1/notifications?limit=8", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loginCookie}`,
          // "Content-Type": "application/json",
        },
      });
      const responseData = await res.json();

      setNotifications(responseData.results)

      // console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(notifications);
  

  // useEffect(() => {
  //   async () => {
  //     try {
  //             const res = await fetch("http://localhost:5004/api/v1/notifications ", {
  //             method: "GET",
  //             headers: {
  //               "Content-Type": "application/json"
  //             },
            
  //          });
  //          const responseData = await res.json()
  //          setNotifications(responseData)
  //          console.log(responseData)
          
  //     } catch (error) {
  //         console.log(error);
          
  //     }
  // }
  // }, [])
    

  const handleLogout = () => {
    Cookies.remove("loginToken");
    window.location.assign("/login");
  };


  return (
    <header className="topbar">
      <div className="heading-and-span">
        <h1 className="topbar-heading">{<ProjectName />}</h1>
        <span>{<ProjectAbbr />}</span>
      </div>
      <div className="bell-and-logout">
        <div onClick={() => handleNotiModal()}>
          <img src={isAdmin ? greenBell : blueBell} alt="bell icon" />
        </div>
        {
        notificationsModalOpen && 
        <Notifications 
        notificationsModalOpen={notificationsModalOpen}
        notifications={notifications}
        />}
        <Button type={isAdmin ? "green" : "blue"} onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
