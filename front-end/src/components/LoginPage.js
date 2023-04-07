import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./App";

const LoginPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { setLoggedIn, username, setUsername, setCurrentUser } =
    useContext(Context);

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
        setCurrentUser(data.msg);
        if (data.msg) {
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
          <h3 className="Auth-form-title text-light">Welcome back!</h3>
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
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
