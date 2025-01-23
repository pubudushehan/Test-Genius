import React from "react";
import Review from "../component/Review";
import Footer from "../component/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Review />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
