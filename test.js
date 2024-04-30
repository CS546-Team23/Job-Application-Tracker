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
      "Ajinkya@123"
    );
    console.log(user2);
  } catch (error) {
    console.log(error.message);
  }

  //#region Error

  //FirstName
  try {
    user3 = await usersData.registerUser(
      "",
      "Bhamre",
      "Queens",
      "NY",
      "Senior Software Developer",
      "Micorsoft",
      "abhamre@stevens.edu",
      "Ajinkya@123"
    );
    console.log(user2);
  } catch (error) {
    console.log(error.message);
  }

  // LastName
  try {
    user3 = await usersData.registerUser(
      "Ajinkya",
      "",
      "Queens",
      "NY",
      "Senior Software Developer",
      "Micorsoft",
      "abhamre@stevens.edu",
      "Ajinkya@123"
    );
    console.log(user2);
  } catch (error) {
    console.log(error.message);
  }

  //city
  try {
    user3 = await usersData.registerUser(
      "Ajinkya",
      "Bhamre",
      "",
      "NY",
      "Senior Software Developer",
      "Micorsoft",
      "abhamre@stevens.edu",
      "Ajinkya@123"
    );
    console.log(user2);
  } catch (error) {
    console.log(error.message);
  }

  //state
  try {
    user3 = await usersData.registerUser(
      "Ajinkya",
      "Bhamre",
      "Queens",
      "",
      "Senior Software Developer",
      "Micorsoft",
      "abhamre@stevens.edu",
      "Ajinkya@123"
    );
    console.log(user2);
  } catch (error) {
    console.log(error.message);
  }

  //desired Position
  try {
    user3 = await usersData.registerUser(
      "Ajinkya",
      "Bhamre",
      "Queens",
      "NY",
      "",
      "Micorsoft",
      "abhamre@stevens.edu",
      "Ajinkya@123"
    );
    console.log(user2);
  } catch (error) {
    console.log(error.message);
  }

  //dream Job
  try {
    user3 = await usersData.registerUser(
      "Ajinkya",
      "Bhamre",
      "Queens",
      "NY",
      "Senior Software Developer",
      undefined,
      "abhamre@stevens.edu",
      "Ajinkya@123"
    );
    console.log(user2);
  } catch (error) {
    console.log(error.message);
  }

  //email
  try {
    user3 = await usersData.registerUser(
      "Ajinkya",
      "Bhamre",
      "Queens",
      "NY",
      "Senior Software Developer",
      "Micorsoft",
      "",
      "Ajinkya@123"
    );
    console.log(user2);
  } catch (error) {
    console.log(error.message);
  }

  //password
  try {
    user3 = await usersData.registerUser(
      "Ajinkya",
      "Bhamre",
      "Queens",
      "NY",
      "Senior Software Developer",
      "Micorsoft",
      "abhamre@stevens.edu",
      "Ajinkya"
    );
    console.log(user2);
  } catch (error) {
    console.log(error.message);
  }

  //#endregion

  try {
    user1 = await usersData.loginUser("gahuja@stevens.edu", "Gautam@123");
    console.log(user1);
  } catch (error) {
    console.log(error.message);
  }

  try {
    user2 = await usersData.loginUser("abhamre@stevens.edu", "Ajinkya@123");
    console.log(user2);
  } catch (error) {
    console.log(error.message);
  }

  //#region Error Login
  //email
  try {
    user2 = await usersData.loginUser("abhamre@stevens", "Ajinkya@123");
    console.log(user2);
  } catch (error) {
    console.log(error.message);
  }

  // password
  try {
    user2 = await usersData.loginUser("abhamre@stevens.edu", "Gautam");
    console.log(user2);
  } catch (error) {
    console.log(error.message);
  }

  // password
  try {
    user2 = await usersData.loginUser("abhamre@stevens.edu", "Gautam@123");
    console.log(user2);
  } catch (error) {
    console.log(error.message);
  }
  //#endregion

  await closeConnection();
  console.log("Done!");
}

main();
