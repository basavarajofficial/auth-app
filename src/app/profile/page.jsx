"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MyProfile from "../components/MyProfile";
import { Toaster, toast } from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();

  const [id, setId] = useState("Nothing");
  const [data, setData] = useState([]);

  const logout = async () => {
    try {
      const response = await axios.get("api/users/logout");
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [id]);

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setId(res.data.data._id);
    setData(res.data.data);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-white py-4 gap-3">
      <h1 className="blue_gradient text-3xl mb-5">Profile Page</h1>
      <br />

      {/* <h1>
        {id === "Nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${id}`}>click here to view you profile</Link>
        )}
      </h1> */}


      <div className="bg-orange-500 text-xl p-2 rounded-md">
        Your Profile
      <h1>{id === "Nothing" ? "Nothing" : <MyProfile mydata={data} />}</h1>
      </div>

      <button className="bg-blue-500 text-xl p-2 mt-10 rounded-md" onClick={logout}>
        Logout
      </button>

      <Toaster />
    </div>
  );
};

export default ProfilePage;
