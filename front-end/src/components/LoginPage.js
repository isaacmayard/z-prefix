import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./App";

const LoginPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState();
  const { setLoggedIn, username, setUsername } = useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Make API call to authenticate user
    let headers = new Headers();
    headers.append("username", username);
    headers.append("password", password);
    fetch("http://localhost:8080/users", {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setAuth(data);
        if (auth === true) {
          setLoggedIn(true);
          navigate("/personal", {
            state: { isLoggedIn: true, username: username },
          });
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Login as inventory admin here!</h3>
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

export default LoginPage;
