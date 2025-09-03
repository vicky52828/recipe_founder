import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../App.css";

function IngredientSearch() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);

const handleSearch = async () => {
  try {
    const query = ingredients.replace(/\s+/g, ""); // remove spaces
    const res = await axios.get(`http://localhost:5000/api/recipes/search/${query}`);
    setRecipes(res.data);
  } catch (err) {
    console.error("Error fetching recipes:", err);
  }
};


  return (
    <div className="container">
      <h1>🥕 What’s in My Kitchen?</h1>
      <p className="welcome">Enter ingredients you have, e.g. "Paneer, Tomato"</p>
      
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients..."
        style={{ padding: "10px", width: "80%", borderRadius: "8px", marginBottom: "15px" }}
      />
      <br />
      <button onClick={handleSearch} style={{ padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}>
        Search
      </button>



      <div className="categories" style={{ marginTop: "20px" }}>
        {recipes.map((r) => (
          <Link key={r.id} to={`/recipe/${r.id}`} className="recipe-card">
            <img src={`http://localhost:5000${r.image_url}`} alt={r.name} />
            <div style={{ padding: "15px" }}>
              <h3>{r.name}</h3>
              <p>{r.category}</p>
              <p>⭐ {r.rating}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default IngredientSearch;
