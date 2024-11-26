import React from "react";
import Aboutme from "../component/Aboutme";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <NavBar showlogin={true} />
        <Aboutme />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
