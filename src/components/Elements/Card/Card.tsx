import React from 'react'
import './Card.styles.css'

interface CardProps {
   children: JSX.Element | any;
   className: string;
}

const Card:React.FC<CardProps> = ({children,className }) => {
  return (
    <section
    className={`card ${className}`}
    >
        {children}
    </section>
  )
}

export default Card