import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Marquee from "./pages/Marquee";
import AboutPage from "./pages/AboutPage";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Marquee />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
