import bcrypt from "bcrypt";
const saltRounds = 16;

import { users } from "../config/mongoCollections.js";

import {
  checkIsProperString,
  checkIsProperFirstOrLastName,
  checkIsProperPassword,
  checkIsValidState,
  checkIsProperNumber,
  validateEmail,
} from "../helpers.js";

const registerUser = async (
  firstName,
  lastName,
  city,
  state,
  desiredPosition,
  dreamJob,
  email,
  password
) => {
  firstName = checkIsProperFirstOrLastName(firstName, "First name");
  lastName = checkIsProperFirstOrLastName(lastName, "Last name");
  city = checkIsProperString(city, "City");
  if (!checkIsValidState(state)) throw new Error("Invalid state passed");
  desiredPosition = checkIsProperString(desiredPosition, "Desiered position");
  dreamJob = checkIsProperString(dreamJob, "Dream job");
  email = validateEmail(email);
  password = checkIsProperPassword(password);

  const usersCollection = await users();

  let ifUserExist = await usersCollection.findOne({
    email: email.toLowerCase(),
  });

  if (ifUserExist) throw new Error("User with email already exists");

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
    throw new Error("Could not add a user");

  return { signupCompleted: true };
};

const loginUser = async (email, password) => {
  email = validateEmail(email);
  password = checkIsProperPassword(password);

  const usersCollection = await users();

  const getUser = await usersCollection.findOne({
    email: email.toLowerCase(),
  });
  if (!getUser) throw new Error("Either email or password invalid");

  let passwordCheck = await bcrypt.compare(password, getUser.password);
  if (!passwordCheck) throw new Error("Either email or password invalid");

  const { password: hashedPassword, applications, ...restDetails } = getUser;

  return restDetails;
};

const updateUser = async (email, updateObject) => {};

export default { registerUser, loginUser, updateUser };
