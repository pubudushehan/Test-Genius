import React from "react";
import NavBar from "../component/NavBar";
import Sign from "../component/SignUp";

const Signup = () => {
  return (
    <div>
      <NavBar showlogin={false} />
      <Sign />
    </div>
  );
};

export default Signup;
