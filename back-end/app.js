const express = require("express");
const cors = require("cors");
const controllers = require("./db/controllers");

const app = express();
const port = 3002;

app.use(express.json());
app.use(cors());

//ROUTES GO HERE
app.get("/items", (req, res) => {
  controllers.getItems().then((data) => {
    res.status(200).send(data);
  });
});

app.get("/users", (req, res) => {
  controllers.getUsers().then((data) => {
    res.status(200).send(data);
  });
});

app.listen(port, () => {
  console.log(`Express Server running on port: ${port}`);
});
