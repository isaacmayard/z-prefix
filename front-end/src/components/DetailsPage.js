import React from "react";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const DetailsPage = () => {
  const location = useLocation();
  let name = location.state.name;
  let description = location.state.description;
  let quantity = location.state.quantity;
  return (
    <>
      <Row>
        <Col></Col>
        <Col id="showPic">
          <div className="showContainer">
            <img
              src="https://i.pinimg.com/originals/6f/47/98/6f4798c65de92b06ea619f5453929c1a.jpg"
              alt="..."
              style={{ height: "350px", width: "400px" }}
            />
            <br></br>
            <strong>{name}</strong>
            <p>{description}</p>
            <p>Quantity in stock: {quantity}</p>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
};

export default DetailsPage;
