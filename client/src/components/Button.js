import React from "react";
import "./Button.css";
const Button = (props) => {
  return (
    <button
      className="btn"
      id={props.val}
      value={props.val}
      onClick={(e) => props.onclick(parseInt(e.target.value))}
    >
      {props.val === "*" ? "⚫" : props.val}
    </button>
  );
};

export default Button;
