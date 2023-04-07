import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./App";

const Register = () => {
  const [password, setPassword] = useState("");
  const { setLoggedIn, username, setUsername, setCurrentUser } =
    useContext(Context);
  const navigate = useNavigate();
  const registerOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ username: username, password: password }),
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Make API call to register user
    fetch("http://localhost:8080/users", registerOptions)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data[0].id);
        if (data[0].id) {
          setLoggedIn(true);
          navigate("/personal", {
            state: { isLoggedIn: true, username: username },
          });
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="Auth-form-container-admin">
      <form
        className="Auth-form"
        onSubmit={handleSubmit}
        style={{ backgroundColor: "rgb(37, 37, 125)" }}
      >
        <div className="Auth-form-content">
          <h3 className="Auth-form-title text-light">Register here!</h3>
          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control mt-1"
              placeholder="username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="password"
              className="form-control mt-1"
              placeholder="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-outline-light">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
