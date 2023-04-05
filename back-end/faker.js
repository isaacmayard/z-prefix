const { faker } = require("@faker-js/faker");

module.exports = {
  fakeItems: function () {
    let rows = [];
    for (let i = 1; i < 51; i++) {
      rows.push({
        user_id: 1,
        item_name: faker.vehicle.vehicle(),
        description: faker.lorem.sentence(10),
        quantity: faker.datatype.number(100),
      });
    }
    return rows;
  },
};
