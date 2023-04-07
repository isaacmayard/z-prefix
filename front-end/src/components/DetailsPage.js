import React from "react";
import { useLocation } from "react-router-dom";

const DetailsPage = () => {
  const location = useLocation();
  let name = location.state.name;
  let description = location.state.description;
  let quantity = location.state.quantity;
  return (
    <div className="text-center mt-3">
      <img
        src="https://i.pinimg.com/originals/6f/47/98/6f4798c65de92b06ea619f5453929c1a.jpg"
        alt="..."
        style={{ height: "350px", width: "400px" }}
      />
      <br></br>
      <h5 className="text-center mt-2">{name}</h5>
      <p className="text-center">{description}</p>
      <p className="text-center">Quantity in stock: {quantity}</p>
    </div>
  );
};

export default DetailsPage;
