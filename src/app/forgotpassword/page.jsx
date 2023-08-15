"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const ForgotPasswordPage = () => {
  // const router = useRouter();

  const [user, setUser] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [myToast, setMyToast] = useState(false);

  const onForgotEmailVerify = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post("/api/users/forgotpassword", user);
      console.log("Email Found", response.data);
      setMyToast(true);
    } catch (error) {
      toast.error("Email Not Found!");
      throw new Error(error);
    }
  };

  return (
    <div className="flex items-center min-h-screen justify-center">
      {myToast ? (
        <div className=" items-center font-bold text-green-500 rounded-md border-8 border-l-green-600   p-3 bg-white">
          <h1 >
            Reset password link has been sent to your email address!
          </h1>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen text-white py-2">
          <h1 className="blue_gradient text-3xl mb-5">
            {loading ? <div className="spinner"></div> : "Forgot Password ...?"} 
            
            </h1>
          <form className="flex flex-col items-start justify-start p-3 gap-2">
            <label htmlFor="email">Email:</label>
            <input
              className="inputs"
              type="email"
              id="email"
              value={user.email}
              placeholder="Enter your email"
              onChange={(e) => setUser({ email: e.target.value })}
            />

            <button className="outline_btn" onClick={onForgotEmailVerify}>
              Submit
            </button>
          </form>
            <Link href='/login' className='login my-3'>
                visit login Page
              </Link>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default ForgotPasswordPage;
