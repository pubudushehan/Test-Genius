import React from "react";
import ResultDisplay from "../component/ResultDisplay";
import Footer from "../component/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <ResultDisplay />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
