import React from "react";
import './CategoryGridItem.css';
import { FaTrash } from "react-icons/fa";

export default function CategoryGridItem({ category, onSelectCategory, onDeleteCategory }) {

 const colors = [
  "#FF5733", // red-orange
  "#33B5FF", // blue
  "#28A745", // green
  "#FFC107", // amber
  "#6F42C1", // purple
  "#FF33A8", // pink
  "#20C997", // teal
  "#FD7E14", // orange
  "#6610f2", // indigo
  "#E83E8C"  // magenta
];

// Randomly pick one color
const randomColor = colors[Math.floor(Math.random() * colors.length)];


  return (
    <div
      className="container"
      onClick={onSelectCategory}
      style={{ backgroundColor: randomColor, position: "relative" }}
    >
      {/* Delete badge */}
      <div
        className="delete-badge"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering onSelectCategory
          onDeleteCategory(category.title);

        }}
      >
        <FaTrash size={12} />
      </div>

      <p className="title">{category.title}</p>
    </div>
  );
}
