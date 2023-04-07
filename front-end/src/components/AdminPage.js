import React, { useRef, useState, useContext } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { DismissableAlert } from "./DismissableAlert";
import { Context } from "./App";
import "../stylesheets/AdminPage.css";

const AdminPage = () => {
  const { userId, count, setCount } = useContext(Context);
  const [authMode, setAuthMode] = useState("deleteUser");
  const [showAlert, setShowAlert] = useState(false);
  const [alertObj, setAlertObj] = useState({});
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  let modificationObj = useRef({});
  const navigate = useNavigate();

  const changeAuthMode = (value) => {
    setShowAlert(false);
    setAuthMode(value);
  };

  const handleDeleteUser = () => {
    fetch("http://localhost:8080/users-mgmt", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ username: username }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setAlertObj(data);
        setShowAlert(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteItem = () => {
    fetch("http://localhost:8080/items", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ id: name }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("DATA", data);
        setAlertObj(data);
        setShowAlert(true);
        console.log("HERE", alertObj);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddItem = () => {
    modificationObj.current["user_id"] = userId !== 1 ? userId : 1;
    fetch("http://localhost:8080/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(modificationObj.current),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setAlertObj(data);
        setShowAlert(true);
      })
      .catch((error) => {
        console.log(error);
      });
    modificationObj.current = {};
  };

  const handleEditItem = () => {
    modificationObj.current["user_id"] = userId !== 1 ? userId : 1;
    fetch("http://localhost:8080/items", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ name: name, updated: modificationObj.current }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setAlertObj(data);
        setShowAlert(true);
      })
      .catch((error) => {
        console.log(error);
      });
    modificationObj.current = {};
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  if (authMode === "deleteUser") {
    return (
      <div className="Auth-form-container-admin">
        <form className="Auth-form bg-dark" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title text-primary">Admin Panel</h3>
            <DropdownButton
              id="dropdown-select-button"
              title="Select Action"
              variant="outline-primary"
            >
              <Dropdown.Item onClick={() => changeAuthMode("deleteUser")}>
                Delete User
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeAuthMode("deleteItem")}>
                Delete Item
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeAuthMode("addItem")}>
                Add Item
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeAuthMode("editItem")}>
                Edit Item
              </Dropdown.Item>
            </DropdownButton>
            <div className="form-group mt-3">
              <label className="input-label">User to Delete</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            {showAlert ? (
              <DismissableAlert alert={alertObj} setShowAlert={setShowAlert} />
            ) : null}
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-outline-primary"
                onClick={() => handleDeleteUser()}
              >
                Delete User
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  } else if (authMode === "deleteItem") {
    return (
      <div className="Auth-form-container-admin">
        <form className="Auth-form bg-dark" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title text-primary">Admin Panel</h3>
            <DropdownButton
              id="dropdown-select-button"
              title="Select Action"
              variant="outline-primary"
            >
              <Dropdown.Item onClick={() => changeAuthMode("deleteUser")}>
                Delete User
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeAuthMode("deleteItem")}>
                Delete Item
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeAuthMode("addItem")}>
                Add Item
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeAuthMode("editItem")}>
                Edit Item
              </Dropdown.Item>
            </DropdownButton>
            <div className="form-group mt-3">
              <label className="input-label">ID of Item to Delete</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="id"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            {showAlert ? (
              <DismissableAlert alert={alertObj} setShowAlert={setShowAlert} />
            ) : null}
            <div className="d-grid gap-2 mt-3">
              <button
                type="text"
                className="btn btn-outline-primary"
                onClick={() => handleDeleteItem()}
              >
                Delete Item
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  } else if (authMode === "addItem") {
    return (
      <div className="Auth-form-container-admin" onSubmit={handleSubmit}>
        <form className="Auth-form bg-dark">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title text-primary">Admin Panel</h3>
            <DropdownButton
              id="dropdown-select-button"
              title="Select Action"
              variant="outline-primary"
            >
              <Dropdown.Item onClick={() => changeAuthMode("deleteUser")}>
                Delete User
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeAuthMode("deleteItem")}>
                Delete Item
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeAuthMode("addItem")}>
                Add Item
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeAuthMode("editItem")}>
                Edit Item
              </Dropdown.Item>
            </DropdownButton>
            <div className="form-group mt-3">
              <label className="input-label">Item Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Name"
                onChange={(event) =>
                  (modificationObj.current["item_name"] = event.target.value)
                }
              />
            </div>
            <div className="form-group mt-3">
              <label className="input-label">Item Description</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Description"
                onChange={(event) =>
                  (modificationObj.current["description"] = event.target.value)
                }
              />
            </div>
            <div className="form-group mt-3">
              <label className="input-label">Item Quantity</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Quantity"
                onChange={(event) =>
                  (modificationObj.current["quantity"] = event.target.value)
                }
              />
            </div>
            {showAlert ? (
              <DismissableAlert alert={alertObj} setShowAlert={setShowAlert} />
            ) : null}
            <div className="d-grid gap-2 mt-3">
              <button
                type="text"
                className="btn btn-outline-primary"
                onClick={() => {
                  handleAddItem();
                  setCount(1)
                }}
              >
                Add Item
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  } else if (authMode === "editItem") {
    return (
      <div className="Auth-form-container-admin" onSubmit={handleSubmit}>
        <form className="Auth-form bg-dark">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title text-primary">Admin Panel</h3>
            <DropdownButton
              id="dropdown-select-button"
              title="Select Action"
              variant="outline-primary"
            >
              <Dropdown.Item onClick={() => changeAuthMode("deleteUser")}>
                Delete User
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeAuthMode("deleteItem")}>
                Delete Item
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeAuthMode("addItem")}>
                Add Item
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeAuthMode("editItem")}>
                Edit Item
              </Dropdown.Item>
            </DropdownButton>
            <div className="form-group mt-3">
              <label className="input-label">Name of Item to Edit</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Current Item Name"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label className="input-label">New Item Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="New Name"
                onChange={(event) =>
                  (modificationObj.current["item_name"] = event.target.value)
                }
              />
            </div>
            <div className="form-group mt-3">
              <label className="input-label">New Item Description</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Description"
                onChange={(event) =>
                  (modificationObj.current["description"] = event.target.value)
                }
              />
            </div>
            <div className="form-group mt-3">
              <label className="input-label">New Item Quantity</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Quantity"
                onChange={(event) =>
                  (modificationObj.current["quantity"] = event.target.value)
                }
              />
            </div>
            {showAlert ? (
              <DismissableAlert alert={alertObj} setShowAlert={setShowAlert} />
            ) : null}
            <div className="d-grid gap-2 mt-3">
              <button
                type="text"
                className="btn btn-outline-primary"
                onClick={() => handleEditItem()}
              >
                Edit Item
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default AdminPage;
