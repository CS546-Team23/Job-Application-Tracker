import bcrypt from "bcrypt";
const saltRounds = 16;

import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";


import {
  checkIsProperString,
  checkIsProperFirstOrLastName,
  checkIsProperPassword,
  checkIsValidState,
  checkIsProperNumber,
  validateEmail,
  validateId
} from "../helpers.js";

const registerUser = async (
  firstName,
  lastName,
  city,
  state,
  email,
  password,
  desiredPosition,
  dreamJob
) => {
  firstName = checkIsProperFirstOrLastName(firstName, "First name");
  lastName = checkIsProperFirstOrLastName(lastName, "Last name");
  city = checkIsProperString(city, "City");
  email = validateEmail(email);
  password = checkIsProperPassword(password);
  if (!checkIsValidState(state)) throw new Error("Error: Invalid state passed");


  if (desiredPosition)
    desiredPosition = checkIsProperString(desiredPosition, "Desiered position");
  if (dreamJob) dreamJob = checkIsProperString(dreamJob, "Dream job");

  const usersCollection = await users();

  let ifUserExist = await usersCollection.findOne({
    email: email.toLowerCase(),
  });

  if (ifUserExist) throw new Error("Error: User with email already exists");

  let hashedPassword = await bcrypt.hash(password, saltRounds);

  let newUser = {
    firstName: firstName,
    lastName: lastName,
    city: city,
    state: state,
    desiredPosition: desiredPosition,
    dreamJob: dreamJob,
    email: email.toLowerCase(),
    password: hashedPassword,
    applications: [],
  };

  const insertUser = await usersCollection.insertOne(newUser);

  if (!insertUser.acknowledged || !insertUser.insertedId)
    throw new Error("Error: Could not add a user");

  return { signupCompleted: true, user_id: insertUser.insertedId };
};

const loginUser = async (email, password) => {
  email = validateEmail(email);
  password = checkIsProperPassword(password);

  const usersCollection = await users();

  const getUser = await usersCollection.findOne({
    email: email.toLowerCase(),
  });
  if (!getUser) throw new Error("Error: Either email or password invalid");

  let passwordCheck = await bcrypt.compare(password, getUser.password);
  if (!passwordCheck) throw new Error("Error: Either email or password invalid");

  const { password: hashedPassword, applications, ...restDetails } = getUser;

  return restDetails;
};

const updateUser = async (email, updateObject) => {
  email = validateEmail(email);
  if (updateObject.firstName)
    updateObject.firstName = checkIsProperFirstOrLastName(
      updateObject.firstName,
      "First name"
    );
  if (updateObject.lastName)
    updateObject.lastName = checkIsProperFirstOrLastName(
      updateObject.lastName,
      "First name"
    );
  if (updateObject.city)
    updateObject.city = checkIsProperString(updateObject.city, "City");

  if (updateObject.state) {
    if (!checkIsValidState(updateObject.state)) throw new Error("Error: Invalid state passed");
  }

  if (updateObject.desiredPosition)
    updateObject.desiredPosition = checkIsProperString(
      updateObject.desiredPosition,
      "Desired position"
    );

  if (updateObject.dreamJob)
    updateObject.dreamJob = checkIsProperString(
      updateObject.dreamJob,
      "Dream Job"
    );


  const usersCollection = await users();

  let updatedUser = await usersCollection.findOneAndUpdate(
    { email: email.toLowerCase() },
    { $set: updateObject },
    { returnDocument: "after" }
  );

  if (!updatedUser) throw new Error("Error: No user with email has been registered");

  const {
    password: hashedPassword,
    applications,
    ...otherDetails
  } = updatedUser;

  return otherDetails;
};

const getUserById = async function(userId) {
  userId = validateId(userId);

  const userCollection = await users();
  const foundUser =  await userCollection.findOne(
    { "_id": new ObjectId(userId) },
  );
  if (!foundUser) throw new Error(`User Not found with id ${userId}`);

  // remove all object ids
  foundUser._id = foundUser._id.toString();
  foundUser.applications.map((app) => {
    app.Notes = app.Notes.map((note) => { note._id = note._id.toString(); return note; });
    app._id = app._id.toString();
    return app;
  });

  return foundUser;
}

const checkOldPassword = async (email, enteredPassword)=>{
  email = validateEmail(email);
  enteredPassword = checkIsProperPassword(enteredPassword);
  const usersCollection = await users();

  const getUser = await usersCollection.findOne({
    email: email.toLowerCase(),
  });
  if (!getUser) throw new Error("Error: Either email or password invalid");

  let passwordCheck = await bcrypt.compare(enteredPassword, getUser.password);
  if (!passwordCheck) throw new Error("Error: Enter Correct Password !");

  return {email, enteredPassword};
}

const changeNewPassword = async(email, oldPassword, newPassword)=>{
let userEmailPassword = checkOldPassword(email, oldPassword);
newPassword = checkIsProperPassword(newPassword);
let hashedPassword = await bcrypt.hash(newPassword, saltRounds);

const usersCollection = await users();

let updatedUser = await usersCollection.findOneAndUpdate(
  { email: email.toLowerCase() },
  { $set: {password : hashedPassword} },
  { returnDocument: "after" }
);

if (!updatedUser) throw new Error("Error: No user with email has been registered");

return {passwordUpdated: true};

}

export default { registerUser, loginUser, updateUser, getUserById, checkOldPassword, changeNewPassword };
