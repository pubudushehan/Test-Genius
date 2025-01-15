import React from "react";
import Admin from "../component/Admin";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <NavBar showlogin={false} />
        <Admin />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
