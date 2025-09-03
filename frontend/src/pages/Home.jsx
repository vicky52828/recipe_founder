import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

const categories = ["Punjabi", "Gujarati", "Chinese", "Healthy", "South Indian"];

function Home() {
  const [randomRecipe, setRandomRecipe] = useState(null);

  const fetchRandomRecipe = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/recipes/random"); // ✅ backend random route
      setRandomRecipe(res.data);
    } catch (err) {
      console.error("Error fetching random recipe:", err);
    }
  };

  return (
    <div className="container">
      <h1>Recipe_Maker</h1>
      <p className="welcome">
        🙏 Welcome to Recipe Maker! Discover delicious vegetarian dishes 🌱
      </p>

      {/* 🎲 Surprise Me Button */}
      <button
        onClick={fetchRandomRecipe}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#ff4e50",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        🎲 Surprise Me
      </button>

      {/* Show Random Recipe Card */}
      {randomRecipe && (
        <Link
          to={`/recipe/${randomRecipe.id}`}
          className="recipe-card"
          style={{ display: "block", marginTop: "20px" }}
        >
          <img
            src={`http://localhost:5000${randomRecipe.image_url}`}
            alt={randomRecipe.name}
          />
          <div style={{ padding: "15px" }}>
            <h3>{randomRecipe.name}</h3>
            <p>{randomRecipe.category}</p>
            <p>⭐ {randomRecipe.rating}</p>
          </div>
        </Link>
      )}

      {/* Categories */}
      <div className="categories">
        {categories.map((cat) => (
          <Link key={cat} to={`/category/${cat}`} className="category">
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
