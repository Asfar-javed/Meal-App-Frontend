import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { availableCategories, dummyMeals } from '../data/dummy-data';
import Category from '../models/Category';
import './FormScreen.css';

const randomColors = [
  "#FF5722", "#9C27B0", "#3F51B5", "#009688", "#FFC107",
  "#795548", "#FF9800", "#8BC34A", "#673AB7", "#03A9F4",
];

export default function FormScreen() {
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    duration: '',
    imageUrl: '',
    ingredients: '',
    steps: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.imageUrl.trim()) {
      alert('Please fill out all required fields!');
      return;
    }

    let categoryIdToUse = false;
    
    let newCategory = null;

    if (!categoryIdToUse) {
      const lastCategory = availableCategories[availableCategories.length - 1];
      const lastIdNumber = parseInt(lastCategory.id.replace('c', ''));
      const newIdNumber = lastIdNumber + 1;
      const newCategoryId = `c${newIdNumber}`;

      newCategory = new Category(newCategoryId, formData.title.trim(), randomColors[Math.floor(Math.random() * randomColors.length)]);
      availableCategories.push(newCategory);
      console.log(availableCategories);
      categoryIdToUse = newCategoryId;
      console.log(newCategory);
    }

    const newMeal = {
      id: `m${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      categories: [categoryIdToUse],
      title: formData.title.trim(),
      affordability: 'affordable',
      complexity: 'simple',
      imageUrl: formData.imageUrl.trim(),
      duration: +formData.duration,
      ingredients: formData.ingredients.split(',').map(ing => ing.trim()),
      steps: formData.steps.split(',').map(step => step.trim()),
      isGlutenFree: false,
      isVegan: false,
      isVegetarian: false,
      isLactoseFree: false,
    };
    console.log(newMeal);
    
    dummyMeals.push(newMeal);

    setFormData({
      title: '',
      categoryId: '',
      duration: '',
      imageUrl: '',
      ingredients: '',
      steps: '',
    });

    navigate('/', { state: newCategory  });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="form-screen">
      <div className="left-text-section">
        <h1>Unleash Your Creativity ✨<br />Add New Flavors!</h1>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Add New Category + Meal</h2>

        <input
          type="text"
          name="title"
          placeholder="Title *"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <select name="categoryId" value={formData.categoryId} onChange={handleChange}>
          <option value="">Or Select Existing Category</option>
          {availableCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.title}</option>
          ))}
        </select>

        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes) *"
          value={formData.duration}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL *"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />

        <textarea
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          value={formData.ingredients}
          onChange={handleChange}
          rows={3}
        />

        <textarea
          name="steps"
          placeholder="Steps (comma-separated)"
          value={formData.steps}
          onChange={handleChange}
          rows={3}
        />

        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
