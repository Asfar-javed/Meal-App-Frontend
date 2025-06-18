import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTimes, FaUtensils } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const navItems = [
    { label: "Meals", path: "/meals" },
    { label: "Filters", path: "/filters" },
    { label: "Favorites", path: "/favorites" }
  ];

  return (
    <div className={`sidebar-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div
        className={`sidebar ${isOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sidebar-header">
          <FaUtensils className="sidebar-icon" />
          <h2>Cooking Up!</h2>
          <FaTimes className="close-btn" onClick={onClose} />
        </div>

        <div className="sidebar-content">
          <ul>
            {navItems.map((item) => (
              <li
                key={item.path}
                className={location.pathname === item.path ? "active" : ""}
                onClick={() => handleNavigate(item.path)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
