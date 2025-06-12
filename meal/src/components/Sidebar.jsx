import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaUtensils } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    onClose(); // Close sidebar after navigation
  };

  return (
    <div className={`sidebar-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div
        className={`sidebar ${isOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top 20% block */}
        <div className="sidebar-header">
          <FaUtensils className="sidebar-icon" />
          <h2>Cooking Up!</h2>
          <FaTimes className="close-btn" onClick={onClose} />
        </div>

        {/* Remaining content */}
        <div className="sidebar-content">
          <ul>
            <li onClick={() => handleNavigate("/meals")}>Meals</li>
            <li onClick={() => handleNavigate("/filters")}>Filters</li>
            <li onClick={() => handleNavigate("/favorites")}>Favorites</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
