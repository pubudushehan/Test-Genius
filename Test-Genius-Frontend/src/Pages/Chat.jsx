import React from "react";
import Chat from "../component/Chat";
import Footer from "../component/Footer";
import NavBar from "../component/NavBar";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <Chat />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
