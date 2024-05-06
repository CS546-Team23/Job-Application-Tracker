import user from "../data/users.js";
import application from "../data/applications.js";
import notes from "../data/notes.js";
import { dbConnection, closeConnection } from "../config/mongoConnection.js";

import { companyData } from "./companies.js";

import { companies } from "../config/mongoCollections.js";

// drop database each run of the loop
// const db = await dbConnection();
// await db.dropDatabase();

async function createCompanyCollection(companyData) {
  try {
    const companiesCollection = await companies();
    const result = await companiesCollection.insertMany(companyData);
    console.log(result.insertedCount);
  } catch (error) {
    console.log(error.message);
  }
}

createCompanyCollection(companyData);

// close the connection
// closeConnection();
