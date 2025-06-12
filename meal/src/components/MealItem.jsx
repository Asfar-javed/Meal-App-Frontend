import React from "react";
import { useNavigate } from "react-router-dom";
import "./MealItem.css";
import MealItemTrait from "../components/MealItemTrait";
import { FaClock, FaBriefcase, FaDollarSign } from "react-icons/fa";

const MealItem = ({ meal, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/meal/${meal.id}`, { state: { meal } });
  };

  const handleDelete = async (e) => {
    e.stopPropagation(); // prevent navigating to details
    const confirmDelete = window.confirm(`Delete "${meal.title}"?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8000/api/deletemeal/${meal._id}`, {
  method: "DELETE",
});


      const result = await response.json();
      if (result.success) {
        alert("Meal deleted");
        onDelete(meal._id); // Inform parent to update UI
      } else {
        alert("Failed to delete meal");
      }
    } catch (err) {
      console.error("Error deleting meal:", err);
      alert("Server error");
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      <button className="delete-button" onClick={handleDelete}>Delete</button>
      <img className="fade-in-image" src={meal.image} alt={meal.title} />
      <div className="overlay">
        <h6>{meal.title}</h6>
        <div className="trait-container">
          <MealItemTrait icon={FaClock} label={`${meal.duration} min`} />
          <MealItemTrait icon={FaBriefcase} />
          <MealItemTrait icon={FaDollarSign} />
        </div>
      </div>
    </div>
  );
};

export default MealItem;
