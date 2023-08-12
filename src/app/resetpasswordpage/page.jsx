"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ResetPassPage = () => {

    const router = useRouter();
    const [user, setUser] = useState({
    email: "",
    password: "",
    });

    const onSet = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("api/users/updatepassword", user);
        console.log(res);

        router.push("/login");
    } catch (error) {
        console.log(error);
    }
};

  return (
    <div>
        <form className="flex flex-col items-start justify-start p-3 gap-2">
            <label >Email :</label>
            <input
                className="inputs"
                type="email"
                id="email"
                value={user.email}
                placeholder="Enter your email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <label >New Password :</label>
            <input
                className="inputs"
                type="text"
                id="password"
                value={user.password}
                placeholder="Enter your new password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

        <button className="outline_btn" onClick={onSet}>
            Set New Password
        </button>
        </form>
    </div>
    );
};

export default ResetPassPage;
