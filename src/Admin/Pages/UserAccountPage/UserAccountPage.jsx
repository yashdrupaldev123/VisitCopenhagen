import React from 'react'
import { useParams } from 'react-router-dom'

const UserAccountPage = () => {
  // This page can be used to display user account details
  // and allow users to update their profile information.
  let userId = useParams().userId;
  console.log("User ID from params:", userId);
  return (
    <div>
      <h2 className='page-title'>User Account Details</h2>
     
    </div>
  )
}

export default UserAccountPage
