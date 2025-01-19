import React from "react";
import NavBar from "../component/NavBar";
import Profile from "../component/Profile";
import Footer from "../component/Footer";

const UserProfile = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <NavBar showlogin={false} />
        <Profile />
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
