import React from "react";
import NavBar from "../component/NavBar";
import Welcome from "../component/Welcome";
import Add from "../component/Add";
import Footer from "../component/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar showlogin={true} />
      <div className="flex-grow">
        <Welcome />
        <Add />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
