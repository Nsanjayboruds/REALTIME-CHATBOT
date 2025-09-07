import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";
import { ChatData } from "../context/ChatContext";

const Verify = () => {
  const [otp, setOtp] = useState("");

  const { verifyUser, btnloading } = UserData();
  const { fetchChat } = ChatData();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    verifyUser(Number(otp), navigate, fetchChat);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={submitHandler}
          className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-10 border border-white/30 animate-fadeIn"
        >
          {/* Heading */}
          <h2 className="text-3xl font-extrabold text-center text-white drop-shadow-md mb-6">
            Verify Your Account
          </h2>
          <p className="text-center text-white/80 mb-8">
            Enter the OTP sent to your email
          </p>

          {/* OTP Input */}
          <div className="mb-6">
            <label
              htmlFor="otp"
              className="block text-white font-semibold mb-2"
            >
              One-Time Password
            </label>
            <input
              type="number"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/80 text-gray-900 placeholder-gray-500 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white shadow-sm"
              placeholder="Enter OTP"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg 
                       bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold 
                       shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 
                       disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={btnloading}
          >
            {btnloading ? <LoadingSpinner /> : "Verify"}
          </button>

          {/* Resend option */}
          <p className="text-center text-white/70 mt-6">
            Didn’t get the OTP?{" "}
            <span
              onClick={() => alert("Resend OTP logic goes here")}
              className="text-blue-300 hover:text-white cursor-pointer underline"
            >
              Resend
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Verify;
