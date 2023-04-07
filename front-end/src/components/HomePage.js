import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "./App";

import "../stylesheets/HomePage.css";

const HomePage = () => {
  const { data } = useContext(Context);
  const navigate = useNavigate();
  return (
    <Row className="ml-5 text-black text-center">
      <h2 className="text-center">Current Available Inventory</h2>
      {data.map((item) => (
        <div className="showContainer" key={item.id} style={{ width: "18.5%" }}>
          <img
            id="home-img"
            src="https://i.pinimg.com/originals/6f/47/98/6f4798c65de92b06ea619f5453929c1a.jpg"
            alt="..."
            style={{ height: "350px", width: "300px" }}
            onClick={() =>
              navigate(`/item/${item.id}`, {
                state: {
                  id: item.id,
                  name: item.item_name,
                  description: item.description,
                  quantity: item.quantity,
                },
              })
            }
          />
          <h3
            onClick={() => {
              navigate(`/item/${item.id}`, {
                state: {
                  id: item.id,
                  name: item.item_name,
                  description: item.description,
                  quantity: item.quantity,
                  url: item.imageURL,
                },
              });
            }}
          >
            {item.item_name}
          </h3>
          <br></br>
        </div>
      ))}
    </Row>
  );
};
export default HomePage;
