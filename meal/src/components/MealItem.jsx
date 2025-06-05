import React from "react";
import { useNavigate } from "react-router-dom";
import "./MealItem.css";
import MealItemTrait  from "../components/MealItemTrait";
import { FaClock, FaBriefcase, FaDollarSign } from "react-icons/fa";


const MealItem = ({ meal }) => {
  const navigate = useNavigate();

  // const complexityText = meal.complexity.charAt(0).toUpperCase() + meal.complexity.slice(1);
  // const affordabilityText = meal.affordability.charAt(0).toUpperCase() + meal.affordability.slice(1);

  const handleClick = () => {
    navigate(`/meal/${meal.id}`, { state: { meal } });
  };

  return (
    <div className="card" onClick={handleClick}>
      <img className="fade-in-image" src={meal.image} alt={meal.title} />
      <div className="overlay">
        <h6>{meal.title}</h6>
        <div className="trait-container">
          <MealItemTrait
            icon= {FaClock}
            label={`${meal.duration} min`}
          />
          <MealItemTrait
            icon={FaBriefcase}
            // label={complexityText}
          />
          <MealItemTrait
            icon={FaDollarSign}
            // label={affordabilityText}
          />
        </div>
      </div>
    </div>
  );
};

export default MealItem;
