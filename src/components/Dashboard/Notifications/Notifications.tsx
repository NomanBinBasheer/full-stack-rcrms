import React from "react";
import Card from "../../Elements/Card/Card";
import { Notification } from "../../../types";
import { useAppContext } from "../../../AppContext";
import "./Notificaions.styles.css";

interface Props {
  notificationsModalOpen: boolean;
  notifications: Notification[];
}

const Notifications: React.FC<Props> = ({ notifications }) => {
  const { isAdmin } = useAppContext();


  return (
    <div className="notifications-outer-container">
      <Card className="notifications-card">
        {notifications.map((ele, ind) => {
          const [part1, part2, part3] = ele.message
            .split("|")
            .map((part) => part.trim());
          const firstLetters = part1.split(" ").map((word) => word[0]);
          // let profName = ;

          return (
            <div className="notification" key={ind}>
              <div
                className={`avatar ${isAdmin ? "green-avatar" : "blue-avatar"}`}
              >
                {firstLetters}
              </div>
              <div className="notification-content">
                <h4>{part1}</h4>
                <p>
                  {isAdmin ? (
                    `has submitted a new ${part3} change request`
                  ) : (
                    <>
                      has <span className={part2 === "given remarks" ? "orange-remarks-span" : part2 === "accepted" ? "green-remarks-span" : part2 === "rejected" ? "red-remarks-span" : ""}>{part2}</span>{" "}
                      {part2 === "given remarks" ? "on" : ""} your father name
                      change request
                    </>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default Notifications;
