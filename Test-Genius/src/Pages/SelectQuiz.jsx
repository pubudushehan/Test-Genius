import React from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import Select from "../component/Select";

const Signup = () => {
  return (
    <div>
      <NavBar showlogin={false} />
      <Select />
      <Footer />
    </div>
  );
};

export default Signup;
