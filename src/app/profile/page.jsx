"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ProfilePage = () => {
  const router = useRouter();

  const [data, setData] = useState("Nothing");

  const logout = async () => {
    try {
      const response = await axios.get("api/users/logout");
      console.log(response);

      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-white py-4 gap-3">
      <h1>ProfilePage</h1>
      <br />

      <h1>{data === "Nothing" ? "Nothing" :
        <Link href={`/profile/${data}`} >click here</Link>}</h1>

      <button className="bg-blue-500 text-xl p-2 rounded-md" onClick={logout}>
        Logout
      </button>

      <button className="bg-orange-500 text-xl p-2 rounded-md" onClick={getUserDetails}>
        Your Profile
      </button>
    </div>
  );
};

export default ProfilePage;
