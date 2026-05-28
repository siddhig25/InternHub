import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import { useState } from "react";
import "./App.css";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Jobs from "./pages/jobs";
import Dashboard from "./pages/dashboard";
import Footer from "./components/footer";
import Applications from "./pages/applications";
import Admin from "./pages/admin";

function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <BrowserRouter>
      <div className={theme === "dark" ? "dark-theme" : "light-theme"}>
        <Navbar toggleTheme={toggleTheme} theme={theme} />

        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/jobs" element={<Jobs theme={theme} />} />
          <Route path="/login" element={<Login theme={theme} />} />
          <Route path="/signup" element={<Signup theme={theme} />} />

          <Route path="/dashboard" element={<Dashboard theme={theme} />} />

          <Route
            path="/applications"
            element={<Applications theme={theme} />}
          />

          <Route path="/admin" element={<Admin theme={theme} />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
