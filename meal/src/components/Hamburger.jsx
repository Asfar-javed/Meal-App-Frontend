import React from "react";
import { FaBars } from "react-icons/fa";
import "./Hamburger.css";

export default function Hamburger({ onToggle }) {
  return (
    <div className="hamburger" onClick={onToggle}>
      <FaBars style={{ fontSize: "30px", color: "#000" }} />
    </div>
  );
}
