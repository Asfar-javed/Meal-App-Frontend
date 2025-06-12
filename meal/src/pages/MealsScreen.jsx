import React, { useState, useEffect } from "react";
import "./MealsScreen.css";
import { useLocation } from 'react-router-dom';
import MealItem from '../components/MealItem';

export default function MealsScreen() {
  const location = useLocation();
  const { title, meals: initialMeals } = location.state || {};

  // Add local state to allow updates on delete
  const [meals, setMeals] = useState(initialMeals || []);

  useEffect(() => {
    // Optional: for debug
    console.log("Loaded meals for category:", title, meals);
  }, [meals]);

  let content;

  if (!meals || meals.length === 0) {
    content = (
      <div className="meals-center">
        <h1 className="meals-heading">Uh oh ... nothing here!</h1>
        <p className="meals-text">Try selecting a different category!</p>
      </div>
    );
  } else {
    content = (
      <ul className="meals-list">
        {meals.map((meal) => (
          <li key={meal._id || meal.id || meal.createdAt} className="meals-list-item">
            <MealItem
              meal={meal}
              onDelete={(deletedId) => {
                // Remove the deleted meal from UI
                setMeals((prevMeals) => prevMeals.filter((m) => m._id !== deletedId && m.id !== deletedId));
              }}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="meals-screen">
      <header className="meals-app-bar">
        <h2>{title}</h2>
      </header>
      <main className="meals-body">{content}</main>
    </div>
  );
}
