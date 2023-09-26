import React, {useState, useEffect} from 'react'
import Card from '../../Elements/Card/Card'
import './Notificaions.styles.css'

const Notifications = () => {
    const [notifications, setNotifications] = useState("")

    useEffect(() => {
    async () => {
        try {
            
                const res = await fetch("http://localhost:5004/api/v1/notifications ", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json"
                },
              
             });
             const responseData = await res.json()
             
             console.log(responseData)
            
        } catch (error) {
            console.log(error);
            
        }
    }
    }, [])

  return (
    <div
    className='notifications-outer-container' 
    >
        <Card
        className='notifications-card'
        >
            <h2>Hello</h2>

        </Card>

    </div>
  )
}

export default Notifications