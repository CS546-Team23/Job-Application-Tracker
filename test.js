import { usersData } from "./data/index.js";

import { dbConnection, closeConnection } from "./config/mongoConnection.js";

let user1 = undefined;
let user2 = undefined;
let user3 = undefined;

const db = await dbConnection();
await db.dropDatabase();

async function main() {
  try {
    user1 = await usersData.registerUser(
      "Gautam",
      "Ahuja",
      "Jersey City",
      "NJ",
      "ML Enginneer",
      "Google",
      "gahuja@stevens.edu",
      "Gautam@123"
    );
    console.log(user1);
  } catch (error) {
    console.log(error.message);
  }

  try {
    user2 = await usersData.registerUser(
      "Ajinkya",
      "Bhame",
      "Queens",
      "NY",
      "Senior Software Developer",
      "Micorsoft",
      "abhamre@stevens.edu",
      "Ajinkya@@123"
    );
    console.log(user2);
  } catch (error) {
    console.log(error.message);
  }

  await closeConnection();
  console.log("Done!");
}

main();
