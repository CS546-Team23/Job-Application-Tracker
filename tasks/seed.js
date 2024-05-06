import user from "../data/users.js";
import application from "../data/applications.js";
import notes from "../data/notes.js";
import { dbConnection, closeConnection } from "../config/mongoConnection.js";

import { companyData } from "./companies.js";

import { ObjectId } from "mongodb";

import { companies } from "../config/mongoCollections.js";
import { users } from "../config/mongoCollections.js";
import { user1, user2, user3, user4, user5 } from "./users.js";

async function createCompanyCollection(companyData) {
  const companiesCollection = await companies();
  const result = await companiesCollection.insertMany(companyData);
  return result;
}

async function main() {
  try {
    // drop database each run of the loop
    const db = await dbConnection();
    await db.dropDatabase();
    const result = await createCompanyCollection(companyData);
    let allUsers = [];
    allUsers.push(user1);
    allUsers.push(user2);
    allUsers.push(user3);
    allUsers.push(user4);
    allUsers.push(user5);

    for (let user of allUsers) {
      for (let application of user.applications) {
        for (let note of application.Notes) {
          note._id = new ObjectId();
        }
        application._id = new ObjectId();
      }
    }

    const usersCollection = await users();
    const insertUsers = await usersCollection.insertMany(allUsers);
    console.log(insertUsers.insertedCount);

    closeConnection();
  } catch (error) {
    console.log(error.message);
  }
}

main();
