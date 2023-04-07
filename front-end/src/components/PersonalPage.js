import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";
import { Context } from "./App";

import "../stylesheets/HomePage.css";

const PersonalPage = () => {
  const navigate = useNavigate();
  const [personalData, setPersonalData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { userId, count } = useContext(Context);

  useEffect(() => {
    fetch("http://localhost:8080/personal-items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        user_id: userId,
      },
    })
      .then((res) => res.json())
      .then((data) => setPersonalData(data))
      .then(() => setIsLoaded(true));
  }, [count]);

  return (
    <Row className="ml-5 text-black text-center">
      <h2>Personal Inventory</h2>
      {isLoaded
        ? personalData.map((item) => (
            <div
              className="showContainer"
              key={item.id}
              style={{ width: "18.5%" }}
            >
              <img
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
                      url: item.imageURL,
                    },
                  })
                }
              />
              <h3
                onClick={() =>
                  navigate(`/item/${item.id}`, {
                    state: {
                      id: item.id,
                      name: item.item_name,
                      description: item.description,
                      quantity: item.quantity,
                      url: item.imageURL,
                    },
                  })
                }
              >
                {item.item_name}
              </h3>
              <p>{item.description}</p>
              <p>Quantity: {item.quantity}</p>
              <br></br>
            </div>
          ))
        : null}
    </Row>
  );
};
export default PersonalPage;
