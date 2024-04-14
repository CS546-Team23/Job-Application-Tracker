import { ObjectId } from "mongodb";

import moment from "moment";


export const isInputProvided = (variable, variableName) => {
  if (variable === undefined || variable === null)
    throw new Error(`Error: ${variableName || "variable"} not provided`);
};

export const checkIsProperString = (str, strName) => {
  if (typeof str !== "string")
    throw new Error(`Error: ${strName || "provided variable"} is not a string`);

  str = str.trim();
  if (str.length === 0)
    throw new Error(
      `Error: ${strName || "provided variable"} is a empty string`
    );

  return str;
};

export const validateId = (id) => {
  isInputProvided(id, "id");
  id = checkIsProperString(id, "id");

  if (!ObjectId.isValid(id)) throw new Error(`Error: Invalid object Id`);

  return id;
};
