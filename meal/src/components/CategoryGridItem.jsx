import React from "react";
import './CategoryGridItem.css';


export default function CategoryGridItem({ category, onSelectCategory}) {
  return (
    <div
      className="container"
      onClick={onSelectCategory}
      style={{ backgroundColor: category.color }}
    >
      <p className="title">{category.title}</p>
    </div>
  );
}
