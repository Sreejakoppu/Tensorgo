import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "../../GoogleLogin";
import "./Login.css"; // Create this CSS file
import axios from "axios";

const Login = () => {
  const GoogleWrapper = () => (
    <GoogleOAuthProvider clientId="127152440452-tldi8ac89iqn3n6ffetdsr2cu96be8o1.apps.googleusercontent.com">
      <GoogleLogin />
    </GoogleOAuthProvider>
  );

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit::",data.email,data.password);
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

      console.log("Login successful:", res.data);

      if (res.data.success) {
        localStorage.setItem("authToken", res.data.token);

        window.location.href = "/dashboard";
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);

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
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please enter your credentials to login</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleOnChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="social-login">
          <GoogleWrapper />
        </div>

        <div className="login-footer">
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
          <a href="/forgot-password">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
