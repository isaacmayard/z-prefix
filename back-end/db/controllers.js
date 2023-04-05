const knex = require("./dbConnection");

module.exports = {
  getItems: () => {
    return knex.select("*").from("items");
  },

  getUsers: () => {
    return knex.select("*").from("users");
  },
};
