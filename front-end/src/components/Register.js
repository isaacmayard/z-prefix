import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./App";

const Register = () => {
  const [password, setPassword] = useState("");
  const { setLoggedIn, username, setUsername, setUserId } = useContext(Context);
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
        setUserId(data[0].id);
        setLoggedIn(true);
        navigate("/personal", {
          state: { isLoggedIn: true, username: username },
        });
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Register as a new inventory admin here!</h3>
        <br></br>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Register;
