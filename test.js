import { usersData } from "./data/index.js";

import { statsData } from "./data/index.js";

import applications from "./data/applications.js";

import { dbConnection, closeConnection } from "./config/mongoConnection.js";

import { companyData } from "./data/index.js";

async function main() {
  try {
    console.log(await companyData.getAllCompanies());
  } catch (error) {
    console.log(error.message);
  }
}

main();
