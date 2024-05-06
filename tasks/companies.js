import exp from "constants";
import fs from "fs";

const jsonData = fs.readFileSync("public/data/companies.json", "utf8");

// Parse the JSON data
const data = JSON.parse(jsonData);

export const companyData = data;
