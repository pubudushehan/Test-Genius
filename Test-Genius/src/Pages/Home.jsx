import React from "react";
import NavBar from "../component/NavBar";
import Welcome from "../component/Welcome";
import Add from "../component/Add";
import Footer from "../component/Footer";

const Home = () => {
  return (
    <div>
      <NavBar showlogin={true} />
      <Welcome />
      <Add />
      <Footer />
    </div>
  );
};

export default Home;
