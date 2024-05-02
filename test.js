import { usersData } from "./data/index.js";

import { statsData } from "./data/index.js";

import { dbConnection, closeConnection } from "./config/mongoConnection.js";

async function main() {
  try {
    const data = await statsData.getStatsForUser("johndoe16@gmail.com");
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

main();
