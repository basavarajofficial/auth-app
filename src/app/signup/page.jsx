"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [Loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", user);
      
      setLoading(true);

      console.log("Signup successful", response.data);

      toast.success("Please Check your email inbox, to verify your account");

      setTimeout(() => {
        router.push("/login");
      }, 5000);
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-white py-2">
      <form className="flex flex-col justify-center  flex-start min-h-screen text-white py-2">
        <h1 className="blue_gradient text-3xl mb-5">
          {Loading ? <div className="spinner"></div> : "Sign up"}
        </h1>
        <hr />

<br />


        <label htmlFor="username">UserName:</label>
        <input
          className="inputs"
          type="text"
          id="username"
          value={user.username}
          placeholder="username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
<br />

        <label htmlFor="email">Email:</label>
        <input
          className="inputs"
          type="email"
          id="email"
          value={user.email}
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
<br />
        <label htmlFor="password">Password:</label>
        <input
          className="inputs"
          type="password"
          id="password"
          value={user.password}
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
          onClick={onSignUp}
          type="submit"
          className="outline_btn"
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Not yet" : "SignUp"}
        </button>

        <Link href="/login" className="outline_btn ">
          visit login Page
        </Link>
      </form>
      <Toaster />
    </div>
  );
};

export default SignUp;
