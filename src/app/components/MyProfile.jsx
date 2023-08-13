import React from 'react'

const MyProfile = ({mydata}) => {

  console.log(mydata);
  return (
    <div>
      <h2> {mydata._id}</h2>

       <p>{mydata.username}</p>
       <p>{mydata.email}</p>
    </div>
  )
}

export default MyProfile