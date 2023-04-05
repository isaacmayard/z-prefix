/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      first_name: "Isaac",
      last_name: "Mayard",
      username: "mayard",
      password: "password123",
    },
  ]);
};
