import { ObjectId } from "mongodb";
import moment from "moment";
export const isInputProvided = (variable, variableName) => {
    if (variable === undefined || variable === null)
      throw new Error(`Error: ${variableName || "variable"} not provided`);
  };

  export const checkIsProperString = (str, strName) => {
    isInputProvided(str, strName);
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

  export const currDate = () => {
    //https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };

  export const isDateValid = (dateStr, varName) => {
    isInputProvided(dateStr, varName);
    let today = moment();
  
    let date = moment(dateStr, "MM/DD/YYYY");
  
    if (date.isAfter(today))
      throw new Error(`Error: ${varName} should be today or before`);
  
    if (!date.isValid()) throw new Error(`Error: ${varName} is not valid`);
  
    return dateStr;
  };

  export const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const meridiem = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert hours to 12-hour format
    const formattedHours = hours.toString().padStart(2, '0');
    return `${formattedHours}:${minutes} ${meridiem}`;
};


  export const isFollowupDateValid = (dateStr, varName) => {
    isInputProvided(dateStr, varName);
  
    let today = moment();
    let followupDate = moment(dateStr, "MM/DD/YYYY");
  
    if (!followupDate.isValid())
      throw new Error(`Error: ${varName} is not a valid date`);
  
    if (followupDate.isBefore(today, 'day'))
      throw new Error(`Error: ${varName} cannot be in the past`);
  
    return dateStr;
  };

  export const validateEmail = (email) => {
    checkIsProperString(email, "email");
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)) throw new Error("email is invald");
  
    return email;
  };

  export const checkIsProperNumber = (val, variableName) => {
    if (typeof val !== "number") {
      throw new Error(
        `Error: ${variableName || "provided variable"} is not a number`
      );
    }
  
    if (isNaN(val)) {
      throw new Error(`Error: ${variableName || "provided variable"} is NaN`);
    }
  };

  export const checkPassword = (password) =>{
    password = checkIsProperString(password, password);
    if(password.length < 8) throw new Error(`Error: ${password || "password"} must be at least 8 characters long !`);
    if(!/[A-Z]/.test(password)) throw new Error(`Error: ${password || "password"} must contain at least one uppercase character !`);
    if(!/\d/.test(password)) throw new Error(`Error: ${password || "password"} must contain at least one number !`);
    if(!/[\W_]/.test(password)) throw new Error(`Error: ${password || "password"} must contain at least one special character !`);
    return password ;
}