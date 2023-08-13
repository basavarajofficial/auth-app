"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MyProfile from "../components/MyProfile";

const ProfilePage = () => {
  const router = useRouter();

  const [id, setId] = useState("Nothing");
  const [data, setData] = useState([]);

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
    // console.log(res.data);
    setId(res.data.data._id);
    setData(res.data.data);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-white py-4 gap-3">
      <h1>ProfilePage</h1>
      <br />

      <h1>{id === "Nothing" ? "Nothing" :
        <Link href={`/profile/${id}`  } >click here to view you profile</Link>}</h1>

      <button className="bg-blue-500 text-xl p-2 rounded-md" onClick={logout}>
        Logout
      </button>

      <button className="bg-orange-500 text-xl p-2 rounded-md" onClick={getUserDetails}>
        Your Profile
      </button>

      <div className="bg-orange-500 text-xl p-2 rounded-md">
        <MyProfile mydata={data} />
      </div>

    </div>
  );
};

export default ProfilePage;
