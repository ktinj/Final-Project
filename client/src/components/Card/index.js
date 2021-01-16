import React from "react";
import "./card.scss";


function Card({ title, children }) {
  return (
    <div className="card text-center m-3">
      
        <strong>{title} </strong>
      
      <div className="card-body ">{children}</div>
    </div>
  );
}

export default Card;