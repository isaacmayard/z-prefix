const knex = require("./dbConnection");

module.exports = {
  getItems: () => {
    return knex.select("*").from("items");
  },

  getPersonalItems: (req) => {
    return knex.select("*").from("items").where('user_id', req.get('user_id'));
  },

  getUsers: () => {
    return knex.select("*").from("users");
  },

  addUser: (req) => {
    return knex("users")
      .insert({
        username: req.body.username,
        password: req.body.password,
      })
      .returning("id");
  },

  addItem: (req) => {
    return knex("items").insert({
      user_id: req.body.user_id,
      item_name: req.body.item_name,
      description: req.body.description,
      quantity: req.body.quantity,
    });
  },

  deleteItem: (req) => {
    return knex.select("*").from("items").where("id", req.body.id).del();
  },

  updateItem: (req) => {
    console.log(req.body.updated);
    return knex
      .select("*")
      .from("items")
      .where("item_name", req.body.name)
      .update(req.body.updated)
      .then(() => ({
        msg: `1`,
      }));
  },
};
