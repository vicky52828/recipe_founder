import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import RecipeDetail from "./pages/RecipeDetail";
import IngredientSearch from "./pages/IngredientSearch";
import CookingMode from "./pages/CookingMode";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar"; 
import ShoppingList from "./pages/ShoppingList";  // ✅ Import Navbar
import "./App.css";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "20px",
      }}
    >
      <Navbar /> {/* ✅ Add Navbar here */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<RecipeList />} />
        <Route path="/shopping" element={<ShoppingList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/search" element={<IngredientSearch />} />
        <Route path="/cooking/:id" element={<CookingMode />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
