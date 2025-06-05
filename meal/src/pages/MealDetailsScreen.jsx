import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import "./MealDetailsScreen.css";

const MealDetailsScreen = () => {
  const { state } = useLocation();
  const meal = state?.meal;
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    if (isFavorited) {
      setIsFavorited(false);
      toast("❤︎︎ Meal unfavorited!")
    }
    else{
    setIsFavorited(true);
    toast("❤️ Meal favorited!"); 
    }
  };

  if (!meal) {
    return <div className="meal-error">Meal data not found.</div>;
  }

  return (
    <div className="meal-details">
      <div className="meal-appbar">
        <h2>{meal.title}</h2>
        <button className="favorite-btn" onClick={toggleFavorite}>
          {isFavorited ? (
            <FaHeart color="pink" size={24} />
          ) : (
            <FaRegHeart color="black" size={24} />
          )}
        </button>
      </div>

      <img className="meal-image" src={meal.image} alt={meal.title} />

      <h3 className="section-title">Ingredients</h3>
      <ul className="meal-list">
        {meal.ingredients.map((ingredient, index) => (
          <li key={index} className="meal-item">
            {ingredient}
          </li>
        ))}
      </ul>

      <h3 className="section-title">Steps</h3>
      <ul className="meal-list">
        {meal.steps.map((step, index) => (
          <li key={index} className="meal-step">
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealDetailsScreen;