import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { availableCategories } from "../data/dummy-data";
import CategoryGridItem from "../components/CategoryGridItem";
import Hamburger from "../components/Hamburger";
import Sidebar from "../components/Sidebar";
import { FaCommentDots, FaPlus } from "react-icons/fa";
import "./CategoriesScreen.css";

export default function CategoriesScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState(availableCategories);
  const [meals, setMeals] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
  const fetchMeals = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/getmeals");
      const result = await response.json();

      if (result.success) {
        console.log("Fetched meals:", result.data);
        setMeals(result.data);
      } else {
        console.error("Failed to fetch meals:", result.message);
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  fetchMeals();
}, []);


  // Add newly created category if passed through route state
  useEffect(() => {
    if (location.state?.newCategory) {
      const newCategory = location.state.newCategory;
      setCategories(prev => {
        if (prev.some(cat => cat.id === newCategory.id)) return prev;
        return [...prev, newCategory];
      });
    }
  }, [location.state]);

  const selectCategoryHandler = (category) => {
    const filteredMeals = meals.filter(meal => meal.category === category.title); // Match by category name
    navigate('/meals', {
      state: {
        title: category.title,
        meals: filteredMeals,
      },
    });
  };

  const handleDeleteCategory = async (categoryTitle) => {
  const confirmDelete = window.confirm(`Are you sure you want to delete all meals in "${categoryTitle}"?`);
  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:8000/api/deletecategory/${categoryTitle}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      alert(data.message);

      // Remove meals from that category in UI state
      setMeals(prev => prev.filter(meal => meal.category !== categoryTitle));

      // Optional: if categories are dynamic and depend on meals, update them too
      setCategories(prev => prev.filter(cat => cat.title !== categoryTitle));
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("Error deleting category.");
    console.error(error);
  }
};



  const handleChatClick = () => {
    navigate("/chat");
  };

  const handleAddNewClick = () => {
    navigate("/form");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="screen">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <header className="app-bar-main">
        <Hamburger onToggle={toggleSidebar} />
        <h1>Pick your category</h1>
        <FaCommentDots className="chat-icon" onClick={handleChatClick} />
      </header>

      <div className="grid">
        {meals.map(category => (
          <CategoryGridItem
            key={category.id}
            category={category}
            onSelectCategory={() => selectCategoryHandler(category)}
             onDeleteCategory={handleDeleteCategory}
          />
        ))}

        <div className="add-new-grid-item" onClick={handleAddNewClick}>
          <FaPlus style={{ marginBottom: "10px", fontSize: "40px" }} />
          <span>Add New</span>
        </div>
      </div>
    </div>
  );
}
