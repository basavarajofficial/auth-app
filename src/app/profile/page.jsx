"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProfilePage = () => {

  const router = useRouter();

  const logout = async () => {
      try {
        const response = await axios.get("api/users/logout");
        console.log(response);

        router.push("/login");
        
      } catch (error) {
        console.log(error.message);
      }
  }



  return (
    <div className='flex flex-col justify-center items-center min-h-screen text-white py-4 gap-3'>
      <h1>ProfilePage</h1>

      <button className='bg-blue-500 text-xl p-2 rounded-md' onClick={logout}  >Logout</button>
    </div>
  )
}

export default ProfilePage
