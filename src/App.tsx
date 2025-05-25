import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Marquee from "./pages/Marquee";
import AboutPage from "./pages/AboutPage";
import "./App.css"; // Import your CSS styles

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Marquee />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
