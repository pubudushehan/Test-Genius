import React from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import QuizDo from "../component/QuizDo";

const Quiz = () => {
  return <div>
    <NavBar showlogin={false} />
    <QuizDo />
    <Footer />
  </div>;
};

export default Quiz;
