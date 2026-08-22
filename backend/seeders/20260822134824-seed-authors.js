"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("authors", [
      {
        name: "Robert C. Martin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "James Clear",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Martin Fowler",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Eric Evans",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Andrew Hunt",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("authors", null, {});
  },
};