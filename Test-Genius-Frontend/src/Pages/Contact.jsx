import React from "react";
import ContactMe from "../component/CantactMe";
import Footer from "../component/Footer";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <ContactMe />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
