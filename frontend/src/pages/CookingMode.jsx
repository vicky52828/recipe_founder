import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

function CookingMode() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  const steps = recipe.steps.split("→");

  return (
    <div className="container">
      <h1>👨‍🍳 Cooking Mode</h1>
      <h2>{recipe.name}</h2>
      <p style={{ fontSize: "22px", margin: "20px 0" }}>{steps[stepIndex]}</p>

      <button
        disabled={stepIndex === 0}
        onClick={() => setStepIndex(stepIndex - 1)}
        style={{ marginRight: "10px", padding: "10px 20px" }}
      >
        ⬅ Prev
      </button>

      <button
        disabled={stepIndex === steps.length - 1}
        onClick={() => setStepIndex(stepIndex + 1)}
        style={{ padding: "10px 20px" }}
      >
        Next ➡
      </button>
    </div>
  );
}

export default CookingMode;
