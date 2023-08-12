"use client";

import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VerifyEmailReset() {
//   const router = useRouter();

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//   });

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemailpass", { token });
      setVerified(true);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

//   const onSet = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "api/users/forgotpassword/updatepassword",
//         user
//       );
//       console.log(res);

//       router.push("/login");
//     } catch (error) {
//       console.log(error);
//     }
//   };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-white py-2">
      {/* <form className="flex flex-col items-start justify-start p-3 gap-2">
        <label htmlFor="email">Email :</label>
        <input
          className="inputs"
          type="text"
          id="email"
          value={user.email}
          placeholder="Enter your email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label htmlFor="email">New Password :</label>
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
      </form> */}



      
        <h1 className="text-4xl">Verify Email for Password</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified for reset password</h2>
                    <Link href="/resetpasswordpage">
                        click here to Reset Password
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
  );
}
