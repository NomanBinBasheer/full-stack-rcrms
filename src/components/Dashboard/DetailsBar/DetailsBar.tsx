import React from 'react';
import { useAppContext } from '../../../AppContext';
import './DetailsBar.styles.css'

export default function DetailsBar() {

    const { isAdmin, userData } = useAppContext();

    // console.log(userData.name);
    const userName = userData?.name
    const fatherName = userData?.fatherName
    const dateOfBirth = userData?.dateOfBirth


    // console.log(userData);


const dateString = userData?.dateOfBirth;

// Step 1: Parse the string into a Date object
const dateObject = new Date(dateString ? dateString : "");

// Extract day, month, and year
const day = dateObject.getUTCDate();
const month = dateObject.toLocaleString("en-US", { month: "long" }); // Get full month name
const year = dateObject.getUTCFullYear();

// Determine day suffix
let daySuffix = "th";
if (day === 1 || day === 21 || day === 31) {
  daySuffix = "st";
} else if (day === 2 || day === 22) {
  daySuffix = "nd";
} else if (day === 3 || day === 23) {
  daySuffix = "rd";
}

// Format the date
const formattedDate = `${day}${daySuffix} ${month}, ${year}`;

// console.log(formattedDate);

    
    

  return (
    <div className={`details-bar ${isAdmin ? "admin-details-bar" : "student-details-bar"}`}>
    
        {
         isAdmin? (
        <div className='details-bar-inner'>
            <div className="details-bar-details">
                <span>Admin Name :</span>
                <span>{userName}</span>
            </div>
        </div>
         ):(
            <div className='details-bar-inner'>
            <div className="details-bar-details">
                <span>Student Name :</span>
                <span>{userName}</span>
            </div>
            <div className="details-bar-details">
                <span>Father Name :</span>
                <span>{fatherName}</span>
            </div>
            <div className="details-bar-details">
                <span>Dath of Birth :</span>
                <span>{formattedDate}</span>
            </div>

        </div>
         )
     } 
       
    </div>
  )
}
