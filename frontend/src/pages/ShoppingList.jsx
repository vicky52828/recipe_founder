import React, { useEffect, useState } from "react";

function ShoppingList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("shoppingList")) || [];
    setItems(saved);
  }, []);

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
    localStorage.setItem("shoppingList", JSON.stringify(updated));
  };

  return (
    <div className="container">
      <h1>🛒 My Shopping List</h1>
      {items.length === 0 ? (
        <p>No ingredients added yet.</p>
      ) : (
        <ul>
          {items.map((item, idx) => (
            <li key={idx} style={{ fontSize: "20px", marginBottom: "10px" }}>
              ✅ {item} <button onClick={() => removeItem(idx)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShoppingList;
