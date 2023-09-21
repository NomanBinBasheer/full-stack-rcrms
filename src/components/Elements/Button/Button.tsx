import React from 'react'
import './Button.styles.css'

interface ButtonProps {
    type: "blue" | "green" | "lightGreen" | "signUp" | "upload" | "submit"
    onClick: React.MouseEventHandler;
    children: string;
}

const Button:React.FC<ButtonProps> = ({onClick, type, children}) => {
  return (
    <button 
    onClick={onClick}
    className={`button ${type === "lightGreen" ? "light-green" : type === "signUp" ? "login-signup" :  type === "upload" ? "upload" : type === "submit" ? "submit" : "logout-button"} ${type === "blue" ? "blue-button" : "green-button"}`}
    >
    {children}
    </button>
  )
}

export default Button