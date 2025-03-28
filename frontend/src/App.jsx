import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./GoogleLogin";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { useState } from "react";
import RefrshHandler from "./RefreshHandler";
import NotFound from "./NotFound";
import Login from "./components/login/Login";
import Feedback from "./pages/Feedback";
import FeedbackList from "./components/Feedback/FeedbackList";
// import FeedbackForm from "./components/Feedback/FeedbackForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const GoogleWrapper = () => (
    <GoogleOAuthProvider clientId="127152440452-tldi8ac89iqn3n6ffetdsr2cu96be8o1.apps.googleusercontent.com">
      <GoogleLogin></GoogleLogin>
    </GoogleOAuthProvider>
  );
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <BrowserRouter>
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/googlelogin" element={<GoogleWrapper />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        {/* <Route path="/fbform" element={<FeedbackForm/>}/> */}
        <Route path="/feedback" element={<Feedback/>}/>
        <Route path="/feedbacklist" element={<FeedbackList/>}/>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
