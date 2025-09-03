import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  // Save dark mode preference
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  // Load saved preference
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  }, []);

  return (
    <nav className="navbar">
      <h2 className="logo">Recipe_Maker</h2>
      <div className="nav-links">
        <Link to="/">🏠 Home</Link>
        <Link to="/search">🔎 What’s in My Kitchen?</Link>
        <Link to="/favorites">❤️ Favorites</Link>
        <Link to="/shopping">🛒 Shopping List</Link>

        {/* 🌙 Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            marginLeft: "20px",
            padding: "6px 12px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            backgroundColor: darkMode ? "#ffcc00" : "#333",
            color: darkMode ? "#000" : "#fff",
            fontWeight: "bold"
          }}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
