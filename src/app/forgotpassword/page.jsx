"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ForgotPasswordPage = () => {
    // const router = useRouter();

    const [user, setUser] = useState({
        email: ""
    });

    const onForgotEmailVerify = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/api/users/forgotpassword', user);
        console.log("Email Found", response.data);

      } catch (error) {
        throw new Error(error);
      }
    }

    console.log(user);
  return (
    <div className='flex flex-col justify-center items-center min-h-screen text-white py-2'>
        <form className="flex flex-col items-start justify-start p-3 gap-2">
      <label  htmlFor="email">Email:</label>
      <input
        className="inputs"
        type="email"
        id="email"
        value={user.email}
        placeholder="Enter your email"
        onChange={(e) => setUser({ email: e.target.value})}
      />

<button className='outline_btn' onClick={onForgotEmailVerify} >Submit</button>

</form>
    </div>
  );
};

export default ForgotPasswordPage;
