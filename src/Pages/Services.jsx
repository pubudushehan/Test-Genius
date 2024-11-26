import React from "react";
import Service from "../component/Service";
import Footer from "../component/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Service />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
