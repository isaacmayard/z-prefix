const express = require("express");
const controllers = require("./db/controllers");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

//ROUTES GO HERE

app.listen(port, () => {
  console.log(`Express Server running on port: ${port}`);
});