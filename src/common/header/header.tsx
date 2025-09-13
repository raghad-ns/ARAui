import React from "react";
import "./header.css";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/User/UserProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

const Header = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const userContext = React.useContext(UserContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (userContext.setUser) {
        userContext.setUser(undefined);
      }
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="headerWrapper">
      <div className="leftSide">
        <div className="logo">
          <img src="./araLogo_-_Copy-removebg-preview.png" alt="Logo" />
        </div>
        <div className="title">
          {pathname.includes("patients")
            ? "Patients"
            : pathname.includes("sessionDetails")
            ? "Session details"
            : pathname.includes("patientSessions")
            ? "Exercise sessions"
            : ""}
        </div>
      </div>

   {(() => {
  if (userContext.user) {
    console.log("Header userContext.user is now:", userContext.user);
  } else {
    console.log("Header waiting for user data...");
  }
  return null;
})()}


{userContext.user && (
  <div className="rightSide">
    <div className="user-info">
      <span>Welcome, {userContext.user.name}</span>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Header;
