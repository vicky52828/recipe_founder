import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

function RecipeList() {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/recipes/category/${category}`)
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err));
  }, [category]);

  return (
    <div className="container">
      <h1>{category} Recipes</h1>
      {recipes.length === 0 ? (
        <p>No recipes found</p>
      ) : (
        <div className="categories">
          {recipes.map((r) => (
            <Link key={r.id} to={`/recipe/${r.id}`} className="recipe-card">
              <img src={`http://localhost:5000${r.image_url}`} alt={r.name} />
              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 10px" }}>{r.name}</h3>
                <p style={{ margin: "0 0 5px", color: "#666" }}>{r.category}</p>
                <p style={{ margin: 0 }}>⭐ {r.rating}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeList;
