const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all recipes
router.get("/", (req, res) => {
  db.query("SELECT * FROM recipes", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get recipes by category
router.get("/category/:category", (req, res) => {
  db.query("SELECT * FROM recipes WHERE category = ?", [req.params.category], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get single recipe
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM recipes WHERE id = ?", [req.params.id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Search by ingredients
router.get("/search/:ingredients", (req, res) => {
  const ingredients = req.params.ingredients.split(",").map(i => i.trim());
  const likeClauses = ingredients.map(() => "ingredients LIKE ?").join(" OR ");
  const values = ingredients.map(i => `%${i}%`);

  db.query(`SELECT * FROM recipes WHERE ${likeClauses}`, values, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});


module.exports = router;

// Ingredient search
router.get("/search/:ingredients", (req, res) => {
  const ingredients = req.params.ingredients.split(",").map(i => i.trim());
  
  if (ingredients.length === 0) {
    return res.json([]);
  }

  const likeClauses = ingredients.map(() => "ingredients LIKE ?").join(" OR ");
  const values = ingredients.map(i => `%${i}%`);

  db.query(`SELECT * FROM recipes WHERE ${likeClauses}`, values, (err, results) => {
    if (err) {
      console.error("Error searching recipes:", err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Random recipe
router.get("/random", (req, res) => {
  db.query("SELECT * FROM recipes ORDER BY RAND() LIMIT 1", (err, results) => {
    if (err) {
      console.error("Error fetching random recipe:", err);
      return res.status(500).send("Error fetching random recipe");
    }
    res.json(results[0]); // return one recipe
  });
});

