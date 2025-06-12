import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './FavoriteScreen.css';

const FavoriteScreen = () => {
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteMeals = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/favorites');
        setFavoriteMeals(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        toast.error('Failed to load favorite meals');
        setLoading(false);
      }
    };

    fetchFavoriteMeals();
  }, []);

  if (loading) {
    return <div className="loading">Loading favorite meals...</div>;
  }

  if (favoriteMeals.length === 0) {
    return <div className="no-favorites">You haven't favorited any meals yet!</div>;
  }

  return (
    <div className="favorite-screen">
      <h1 className="title">Your Favorite Meals</h1>
      <div className="meals-grid">
        {favoriteMeals.map((meal) => (
          <Link to={`/meal/${meal._id}`} state={{ meal }} key={meal._id} className="meal-card">
            <img src={meal.image} alt={meal.title} className="meal-image" />
            <div className="meal-info">
              <h3 className="meal-title">{meal.title}</h3>
              <p className="meal-category">{meal.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoriteScreen;