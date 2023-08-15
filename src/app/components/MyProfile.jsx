import React from 'react'

const MyProfile = ({mydata}) => {

  console.log(mydata);
  return (
    <div className='bg-white text-black p-3 font-bold rounded-md'>
        <h2>Id :  {mydata._id}</h2>
        <p>Username : {mydata.username}</p>
        <p>email : {mydata.email}</p>
    </div>
  )
}

export default MyProfile