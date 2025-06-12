import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import CategoryGridItem from "../components/CategoryGridItem";
import Hamburger from "../components/Hamburger";
import Sidebar from "../components/Sidebar";
import { FaCommentDots, FaPlus } from "react-icons/fa";
import "./CategoriesScreen.css";

export default function CategoriesScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState([]);
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

        const uniqueCategories = Array.from(
          new Set(result.data.map(meal => meal.category))
        ).map(title => ({ title, id: title })); // use title as id if not available
        setCategories(uniqueCategories);

        console.log("Fetched meals:", result.data);
        console.log("Derived categories:", uniqueCategories);
      } else {
        console.error("Failed to fetch meals:", result.message);
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  fetchMeals();
}, []);


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
      setMeals(prev => prev.filter(meal => meal.title !== categoryTitle));
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
        {categories.map(category => (
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
