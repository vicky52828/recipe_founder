import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // ✅ Added Link here
import axios from "axios";
import "../App.css";




function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail">
      {/* ✅ Image at top, centered */}
      <div className="recipe-detail-image">
        <img
          src={`http://localhost:5000${recipe.image_url}`}
          alt={recipe.name}
        />
      </div>

    




      <Link to={`/cooking/${recipe.id}`}>
  <button style={{ padding: "10px 20px", marginTop: "15px" }}>Start Cooking Mode</button>
</Link>


<button
  onClick={() => {
    let saved = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!saved.find((item) => item.id === recipe.id)) {
      saved.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(saved));
      alert("Recipe saved to favorites! ❤️");
    } else {
      alert("Already in favorites!");
    }
  }}
  style={{ marginTop: "15px", padding: "10px 20px" }}
>
  Save to Favorites ❤️
</button>

<button
  onClick={() => {
    if (!recipe.ingredients) return;
    const ingredients = recipe.ingredients.split(","); // split into list
    let saved = JSON.parse(localStorage.getItem("shoppingList")) || [];
    saved = [...new Set([...saved, ...ingredients.map(i => i.trim())])]; // remove duplicates
    localStorage.setItem("shoppingList", JSON.stringify(saved));
    alert("Ingredients added to Shopping List 🛒");
  }}
  style={{ marginTop: "15px", padding: "10px 20px" }}
>
  Add Ingredients to Shopping List 🛒
</button>



      {/* ✅ Information below image */}
      <h1>{recipe.name}</h1>

      <h3>📝 Description</h3>
      <p>{recipe.description}</p>

      <h3>🥕 Ingredients</h3>
      <p>{recipe.ingredients}</p>

      <h3>👨‍🍳 Steps</h3>
      <p>{recipe.steps}</p>

      <p>
        <b>Category:</b> {recipe.category}
      </p>
      <p>
        <b>Type:</b> {recipe.type}
      </p>
      <p>
        <b>Rating:</b> ⭐ {recipe.rating}
      </p>
      {recipe.is_healthy ? (
        <p style={{ color: "green", fontWeight: "bold" }}>✅ Healthy Choice</p>
      ) : null}
    </div>
  );
}

export default RecipeDetail;
