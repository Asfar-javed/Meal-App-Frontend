import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormScreen.css';

// Predefined categories matching your database schema
const predefinedCategories = [
  'Italian', 
  'Quick & Easy', 
  'Hamburgers', 
  'German', 
  'Light & Lovely', 
  'Exotic', 
  'Breakfast', 
  'Asian', 
  'French', 
  'Summer'
];

export default function FormScreen() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: '', 
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.category || !formData.imageUrl.trim() || !formData.duration || !formData.ingredients.trim() || !formData.steps.trim()) {
      alert('Please fill out all required fields (Title, Category, Duration, Image URL, Ingredients, and Steps)!');
      return;
    }

    setIsLoading(true);

    try {
      // Prepare data for backend (matching your schema)
      const mealData = {
        title: formData.title.trim(),
        category: formData.category, // This will be one of the enum values
        duration: parseInt(formData.duration),
        imageUrl: formData.imageUrl.trim(), // Your backend maps this to 'image'
        ingredients: formData.ingredients ? formData.ingredients.split(',').map(ing => ing.trim()).filter(ing => ing) : [],
        steps: formData.steps ? formData.steps.split(',').map(step => step.trim()).filter(step => step) : [],
      };

      // Make actual API call to your backend
      console.log('Meal data to be saved:', mealData);
      
      const response = await fetch('http://localhost:8000/api/meals', { // Updated to port 8000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealData),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        
        let errorMessage = 'Failed to save meal';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = errorText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      console.log('Response from server:', responseData);
      
      // Your backend returns { success: true, data: meal }
      const savedMeal = responseData.data;
      console.log('Meal saved successfully to database:', savedMeal);

      // Show success alert
      alert('Meal added successfully! 🎉');

      // Reset form
      setFormData({
        title: '',
        category: '',
        duration: '',
        imageUrl: '',
        ingredients: '',
        steps: '',
      });

      // Navigate back or to meals list
      navigate('/', { state: { newMeal: savedMeal } });

    } catch (error) {
      console.error('Error saving meal:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
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
        <h2>Add New Meal</h2>

        <input
          type="text"
          name="title"
          placeholder="Meal Title *"
          value={formData.title}
          onChange={handleChange}
          required
          disabled={isLoading}
        />

        <select 
          name="category" 
          value={formData.category} 
          onChange={handleChange}
          required
          disabled={isLoading}
        >
          <option value="">Select Category *</option>
          {predefinedCategories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes) *"
          value={formData.duration}
          onChange={handleChange}
          min="1"
          required
          disabled={isLoading}
        />

        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL *"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          disabled={isLoading}
        />

        <textarea
          name="ingredients"
          placeholder="Ingredients (comma-separated) *"
          value={formData.ingredients}
          onChange={handleChange}
          rows={3}
          disabled={isLoading}
          required
        />

        <textarea
          name="steps"
          placeholder="Cooking Steps (comma-separated) *"
          value={formData.steps}
          onChange={handleChange}
          rows={3}
          disabled={isLoading}
          required
        />

        <div className="form-buttons">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Submit'}
          </button>
          <button type="button" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}