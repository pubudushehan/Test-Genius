import React from "react";
import QuizDo from "../component/QuizDo";
import Footer from "../component/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <QuizDo />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
