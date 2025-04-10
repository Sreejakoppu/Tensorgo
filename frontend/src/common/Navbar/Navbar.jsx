import React, { useState } from "react";
import "./Navbar.css";
import { useEffect } from "react";
import { json, useNavigate,Link } from "react-router-dom";

const Navbar = () => {
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    const userData = JSON.parse(data);
    setUserInfo(userData);
  }, []);

  return (
    <div className="main_section">
      <div className="left_section">
        <h1>TensorGo</h1>
      </div>
      <div className="right_section">
        <li>
          <Link to={"/"} className="no_underline">
            Home
          </Link>
        </li>
        
        <li>
          <Link to={"/feedback"} className="no_underline">FeedBack</Link>
        </li>
        <li className="img">
          <img src={userInfo?.image} className="ac_img" />
        </li>
      </div>
    </div>
  );
};

export default Navbar;
