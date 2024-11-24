import React from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import Sign from "../component/Sign";

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
