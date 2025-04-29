import React from "react";
import { FaTimes, FaUtensils } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar({ isOpen, onClose }) {
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
            <li>Meals</li>
            <li>Filters</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
