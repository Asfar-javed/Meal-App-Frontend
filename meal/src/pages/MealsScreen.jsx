import React from "react";
import "./MealsScreen.css";
import { useLocation } from 'react-router-dom';
import MealItem from '../components/MealItem'; 


export default function MealsScreen() {
  
  const location = useLocation();
  const { title, meals } = location.state || {}; 
 
  let content;

  
  if (meals.length === 0) {
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
          <li key={meal.id} className="meals-list-item">
            <MealItem key={meal.id} meal={meal} />
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
