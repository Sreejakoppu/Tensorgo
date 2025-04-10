import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "../../GoogleLogin";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const GoogleWrapper = () => (
    <GoogleOAuthProvider clientId="826174799038-v62ser7hks027b2ae5ekl51s38jcovh2.apps.googleusercontent.com">
      <GoogleLogin />
    </GoogleOAuthProvider>
  );

  const [data, setData] = useState({ email: "", password: "" });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/auth/userLogin",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        localStorage.setItem("authToken", res.data.token);
        window.location.href = "/dashboard";
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Login failed");
      } else if (error.request) {
        alert("Network error - please try again");
      } else {
        alert("An error occurred - please try again");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass">
        <div className="login-header">
          <h1>Sign Up</h1>
          <p>Welcome back! Please Sign Up with Google</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form"></form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="social-login">
          <GoogleWrapper />
        </div>

        <div className="login-footer">
          <p>
            Alredy registerd? <a href="/signup">Sign in</a>
          </p>
          <a href="/forgot-password">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
