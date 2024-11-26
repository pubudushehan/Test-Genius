import React from "react";
import CantactMe from "../component/CantactMe";
import Footer from "../component/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <CantactMe />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
