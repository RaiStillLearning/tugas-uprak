import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Marquee from "./pages/Marquee";
import AboutPage from "./pages/AboutPage";
import CoffeePage from "./pages/CoffeePage";
import Contact from "./pages/Contact";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Marquee />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/coffee" element={<CoffeePage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
