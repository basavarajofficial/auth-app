import React from 'react'

const UserProfile = ({params}) => {
  return (
    
    <div className="flex flex-col justify-center items-center min-h-screen text-white py-4 gap-3">
        <h1 >UserProfile </h1>
        <h1 className='bg-green-500 text-black p-2'>{params.id}</h1>
    </div>
  )
}

export default UserProfile