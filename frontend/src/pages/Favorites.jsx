import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  return (
    <div className="container">
      <h1>❤️ My Favorite Recipes</h1>
      <div className="categories">
        {favorites.map((r) => (
          <Link key={r.id} to={`/recipe/${r.id}`} className="recipe-card">
            <img src={r.image_url} alt={r.name} />
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

export default Favorites;
