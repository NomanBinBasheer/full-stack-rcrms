import React from "react";
import Button from "../../Elements/Button/Button";
import ProjectName from "../../Elements/ProjectName";
import ProjectAbbr from "../../Elements/ProjectAbrr";
import blueBell from '../../../assets/blue-bell-icon.svg';
import greenBell from '../../../assets/green-bell-icon.svg';
import Notifications from "../Notifications/Notifications";
import Cookies from "js-cookie";
import { useAppContext } from "../../../AppContext";
import "./TopBar.styles.css";

const TopBar = () => {
  const { isAdmin, notificationsModalOpen, setNotificationsModalOpen } = useAppContext();

  // console.log(isAdmin)
  const handleNotiModal = () => {
    setNotificationsModalOpen(!notificationsModalOpen)
    
  }
  console.log(notificationsModalOpen);
  

  const handleLogout = () => {
    Cookies.remove('loginToken')
    window.location.assign('/login')
  };
  return (
    <header className="topbar">
      <div className="heading-and-span">
        <h1 className="topbar-heading">{<ProjectName />}</h1>
        <span>{<ProjectAbbr />}</span>
      </div>
      <div className="bell-and-logout">
        <div
        onClick={() => handleNotiModal()}
        >
          <img src={isAdmin ? greenBell : blueBell} alt="bell icon" />
        </div>
        {notificationsModalOpen && <Notifications/>}
        <Button type={isAdmin ? "green" : "blue"} onClick={handleLogout}>
          Logout
        </Button>
      </div>
      
    </header>
  );
};

export default TopBar;
