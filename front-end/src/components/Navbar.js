import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Context } from "./App";
import "../stylesheets/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, username, render, setRender } =
    React.useContext(Context);
  console.log("this is what render is on navbar", render);
  return (
    <nav>
      <Row className="nav">
        <Col className="mt-2">
          <h1
            onClick={() => {
              navigate("/");
              setRender((prevCount) => prevCount + 1);
            }}
            className="header text-light"
          >
            Best Car Website Ever
          </h1>
        </Col>
        <Col className="mt-2 text-light">
          <div className="logout">
            {loggedIn ? (
              <span className="user-span" onClick={() => navigate("/personal")}>
                Welcome, {username}
              </span>
            ) : (
              <></>
            )}
            {!loggedIn ? (
              <button
                className="btn btn-light"
                type="button"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            ) : (
              <></>
            )}
            {loggedIn ? (
              <button
                className="btn btn-light"
                type="button"
                onClick={() => {
                  setLoggedIn(false);
                  navigate("/");
                }}
              >
                Logout
              </button>
            ) : (
              <></>
            )}
            {loggedIn ? (
              <button
                className="btn btn-light"
                type="button"
                onClick={() => navigate("/adminpage")}
              >
                Admin Panel
              </button>
            ) : (
              <></>
            )}
            <button
              className="btn btn-light"
              type="button"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </div>
        </Col>
      </Row>
    </nav>
  );
};

export default Navbar;
