import { usersData } from "./data/index.js";

import { statsData } from "./data/index.js";

import applications from "./data/applications.js";

import { dbConnection, closeConnection } from "./config/mongoConnection.js";

async function main() {
  try {
    const data = await applications.getUserApplications(
      "661b1f0f00d5d86b38607305"
    );
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

main();
