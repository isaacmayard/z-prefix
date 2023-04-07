import React, { createContext, useState, useEffect } from "react";
import "../stylesheets/App.css";
import Navbar from "./Navbar";
import RouteHandler from "./RouteHandler";

export const Context = createContext();

function App() {
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    fetch("http://localhost:8080/items")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => alert(err));
  }, []);
  return (
    <Context.Provider value={{ data, loggedIn, setLoggedIn, username, setUsername, userId, setUserId }}>
      <Navbar />
      <RouteHandler />
    </Context.Provider>
  );
}

export default App;
