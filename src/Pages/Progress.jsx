import React from "react";
import ProgressComponent from "../component/Progress";
import Footer from "../component/Footer";

const Progress = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <ProgressComponent />
      </div>
      <Footer />
    </div>
  );
};

export default Progress; 