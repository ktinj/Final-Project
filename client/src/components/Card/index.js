import React from "react";
import "./style.css";


function Card({ title, children }) {
  return (
    <div className="card text-center">
      
        {title}
      
      <div className="card-body ">{children}</div>
    </div>
  );
}

export default Card;