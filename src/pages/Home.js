// src/pages/Home.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PlantCard from "../components/PlantCard";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translations";

function Home({ products, addToCart, goToCart, selectedCategory, setSelectedCategory }) {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  // Categories (dynamic)
  const categories = [
    language === "es" ? "Todas" : language === "de" ? "Alle" : "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  // Filtered products
  const filteredProducts =
    selectedCategory === "All" || selectedCategory === "Todas"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* HEADER */}
      <div className="header">
        <h1>Indoor Garden Shop - JUST PORTFOLIO PROJECT 🌿</h1>
        <button onClick={goToCart}>{t.cart}</button>
      </div>

      {/* CATEGORY FILTER */}
      <div style={{ padding: "0 20px", marginBottom: "20px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{ marginRight: "10px", padding: "6px 12px", borderRadius: "6px" }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* HERO */}
      <div className="hero-banner">
        <h2>{t.heroTitle} 🌿</h2>
        <p>{t.heroSubtitle}</p>
      </div>

      {/* PRODUCTS GRID */}
      
<div className="products">
  {filteredProducts.length > 0
    ? filteredProducts.map((plant) => (
        <PlantCard key={plant.id} plant={plant} addToCart={addToCart} />
      ))
    : <p>{t.noProducts}</p>}
</div>
    </div>
  );
}

export default Home;