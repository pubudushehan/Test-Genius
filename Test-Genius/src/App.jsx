import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Quiz from "./Pages/Quiz";
import Result from "./Pages/Result";
import Home from "./Pages/Home";
import SelectQuiz from "./Pages/SelectQuiz";

function App() {
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
