import React from 'react'
import TopBar from './TopBar/TopBar'
import DetailsBar from './DetailsBar/DetailsBar'
import ChangeRequest from './ChangeRequest/ChangeRequest'
import AddRequest from './AddRequest/AddRequest'
import { useAppContext } from '../../AppContext'
import './Dashboard.styles.css'

const Dashboard = () => {

  const { isAdmin } = useAppContext();

  // console.log(isAdmin);
  

  return (
    <div>
        <TopBar />
        <DetailsBar/>
        <h2 className="change-requests-heading">
          Change Requests
        </h2>
        <ChangeRequest />
        <AddRequest />

    </div>
  )
}

export default Dashboard