import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { availableCategories, dummyMeals } from "../data/dummy-data";
import CategoryGridItem from "../components/CategoryGridItem";
import Hamburger from "../components/Hamburger";
import Sidebar from "../components/Sidebar";  // Import Sidebar
import { FaCommentDots, FaPlus } from "react-icons/fa";
import "./CategoriesScreen.css";

export default function CategoriesScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState(availableCategories);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for Sidebar visibility

  useEffect(() => {
    if (location.state?.newCategory) {
      const newCategory = location.state.newCategory;
      setCategories(prev => {
        if (prev.some(cat => cat.id === newCategory.id)) {
          return prev;
        }
        return [...prev, newCategory];
      });
    }
  }, [location.state]);

  const selectCategoryHandler = (category) => {
    const filteredMeals = dummyMeals.filter(meal => meal.categories.includes(category.id));

    navigate('/meals', {
      state: {
        title: category.title,
        meals: filteredMeals,
      },
    });
  };

  const handleChatClick = () => {
    navigate("/chat");
  };

  const handleAddNewClick = () => {
    navigate("/form");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev); // Toggle Sidebar open/close
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false); // Close Sidebar
  };

  return (
    <div className="screen">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} /> {/* Pass Props to Sidebar */}

      <header className="app-bar-main">
        <Hamburger onToggle={toggleSidebar} /> {/* Hamburger button to toggle Sidebar */}
        <h1>Pick your category</h1>
        <FaCommentDots className="chat-icon" onClick={handleChatClick} />
      </header>

      <div className="grid">
        {categories.map(category => (
          <CategoryGridItem
            key={category.id}
            category={category}
            onSelectCategory={() => selectCategoryHandler(category)}
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
