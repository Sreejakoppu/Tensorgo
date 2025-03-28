import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './common/Navbar/Navbar';
import "./Dashboard.css"
// import ProductList from './components/ProductList/ProductList';
const Dashboard = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const data = localStorage.getItem('user-info');
        const userData = JSON.parse(data);
        setUserInfo(userData);
    },[])

    const handleLogout = ()=>{
        localStorage.removeItem('user-info');
        navigate('/login');
    }

    return (
      <>
        <Navbar />
        {/* <h1>Welcome {userInfo?.name}</h1>
            // <h3>{userInfo?.email}</h3>
            <img src={userInfo?.image} alt={userInfo?.name}/>
            <button onClick={handleLogout}
            >Logout
            </button> */}
        <div className="dashboard_section">
          <div className="heading">
            <div className="left_heading">
              <h1>Welcome {userInfo?.name}</h1>
            </div>
            <div className="right_heading">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          {/* <div>
            <ProductList/>
          </div> */}
        </div>
      </>
    );
}

export default Dashboard