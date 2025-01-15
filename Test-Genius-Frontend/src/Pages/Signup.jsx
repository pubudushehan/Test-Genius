import React from "react";
import NavBar from "../component/NavBar";
import Sign from "../component/SignUp";
import Footer from "../component/Footer";

const Signup = () => {
  return (
    <div>
      <NavBar showlogin={false} />
      <Sign />
      <Footer />
    </div>
  );
};

export default Signup;
