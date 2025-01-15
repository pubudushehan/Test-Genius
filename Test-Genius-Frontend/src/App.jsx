import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Quiz from "./Pages/Quiz";
import Result from "./Pages/Result";
import Home from "./Pages/Home";
import SelectQuiz from "./Pages/SelectQuiz";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
import Admin from "./Pages/Admin";

function App() {
  // Example API call
  const fetchQuiz = async () => {
    try {
      const response = await fetch("/api/quiz/select");
      const data = await response.json();
      // Handle the data
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="result" element={<Result />} />
          <Route path="selectquiz" element={<SelectQuiz />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} />
          <Route path="result" element={<Result />} />
          <Route path="admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
