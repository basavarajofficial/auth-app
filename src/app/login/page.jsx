"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);

      console.log("Login successful", response.data);
      toast.success("Login Success");

      router.push("/profile");
    } catch (error) {
      console.log("Login failed", error.message);
      toast.error("Login Error");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-white py-2">
      <h1 className="blue_gradient text-3xl mb-5">Login</h1>
      <hr />

      <label htmlFor="email">Email:</label>
      <input
        className="inputs"
        type="email"
        id="email"
        value={user.email}
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password">Password:</label>
      <input
        className="inputs"
        type="password"
        id="password"
        value={user.password}
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button className="outline_btn" onClick={onLogin}>
        {buttonDisabled ? "Not yet" : "Login"}
      </button>

      <Link href="/forgotpassword">Forgot Password</Link>

      <Link href="/signup" className="my-3">
        visit SignUp Page
      </Link>

      <Toaster />
    </div>
  );
};

export default LoginPage;
