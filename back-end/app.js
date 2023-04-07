const express = require("express");
const knex = require("./db/dbConnection");
const cors = require("cors");
const controllers = require("./db/controllers");

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

//ROUTES GO HERE
app.get("/items", (req, res) => {
  controllers.getItems().then((data) => {
    res.status(200).send(data);
  });
});

app.get("/personal-items", (req, res) => {
  controllers.getPersonalItems(req).then((data) => {
    res.status(200).send(data);
  });
});

app.get("/users", async (req, res) => {
  if (req.get("username")) {
    var userData = await knex
      .select("*")
      .from("users")
      .where("username", req.get("username"))
      .then((data) => {
        if (data.length === 0) {
          return false;
        }
        return true;
      });
  }
  console.log(userData);
  res.status(200).send(userData);
});

app.post("/users", (req, res) => {
  controllers.addUser(req).then((data) => {
    res.status(200).send(data);
  });
});

app.post("/items", (req, res) => {
  controllers.addItem(req).then((data) => {
    res.status(200).send({ msg: `1` });
  });
});

app.delete("/users-mgmt", async (req, res) => {
  if (req.body.username) {
    var user = await knex
      .select("*")
      .from("users")
      .where("username", req.body.username)
      .del();
  }
  console.log(user);
  res.status(200).send({ msg: `${user}` });
});

app.delete("/items", async (req, res) => {
  var item = await controllers.deleteItem(req);
  res.status(200).send({ msg: `${item}` });
});

app.put("/items", async (req, res) => {
  console.log(req.body.updated);
  var item = await controllers.updateItem(req);
  res.status(200).send(item);
});

app.listen(port, () => {
  console.log(`Express Server running on port: ${port}`);
});
