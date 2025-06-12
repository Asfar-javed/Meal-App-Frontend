import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import "./MealDetailsScreen.css";

const MealDetailsScreen = () => {
  const { state } = useLocation();
  const meal = state?.meal;
  const [isFavorited, setIsFavorited] = useState(false);

  // Get favorite status from meal prop
  useEffect(() => {
    if (meal?.favorite !== undefined) {
      setIsFavorited(meal.favorite);
    }
  }, [meal]);

  

  const toggleFavorite = async () => {
  if (!meal || !meal._id) {
    toast.error("⚠️ Meal ID missing!");
    return;
  }

  try {
    const response = await axios.patch(
      `http://localhost:8000/api/togglefavorite/${meal._id}`
    );

    // Debug: Log the full response
    console.log("[DEBUG] Server Response:", response.data);

    if (response.data?.success) {
      setIsFavorited(response.data.favorite);
      toast.success(response.data.favorite ? "❤️ Favorited!" : "❤︎ Unfavorited!");
    } else {
      toast.error("⚠️ Unexpected server response.");
    }
  } catch (error) {
    console.error("[ERROR] Toggle Favorite Failed:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    toast.error("⚠️ Failed to update favorite.");
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
