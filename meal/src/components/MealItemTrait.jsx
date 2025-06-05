import React from "react";
import "./MealItemTrait.css";


const MealItemTrait = ({ icon: Icon, label }) => {
  return (
    <div className="trait">
      <Icon className="icon" />
      {/* <span className="label">{label}</span> */}
    </div>
  );
};

export default MealItemTrait;
