"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "Programming",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Technology",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Self Development",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Business",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Novel",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};