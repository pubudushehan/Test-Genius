import React from "react";
import NavBar from "../component/NavBar";
import Select from "../component/Select";
import Footer from "../component/Footer";

const SelectQuiz = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <NavBar showlogin={false} />
        <Select />
      </div>
      <Footer />
    </div>
  );
};

export default SelectQuiz;
