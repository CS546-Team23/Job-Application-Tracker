import { users } from "../config/mongoCollections.js";

import { validateEmail, getDateDifference } from "../helpers.js";

import moment from "moment";

const getStatsForUser = async (email) => {
  email = validateEmail(email);

  const usersCollection = await users();

  const userData = await usersCollection.findOne({
    email: email.toLowerCase(),
  });
  if (!userData) throw new Error("Error: user not found");

  const res = {};

  if (userData.applications.length === 0) return res;

  let allCompanies = [];

  res.totalApplications = userData.applications.length;
  res.barDateData = {};
  res.pieChartStatusData = {};
  res.ghostedApplications = 0;

  for (let application of userData.applications) {
    allCompanies.push(application.companyName);
    if (getDateDifference(application.date) > 45) res.ghostedApplications += 1;
    // res.ghostedApplications.push(application);
    if (application.date in res.barDateData) {
      res.barDateData[application.date]++;
    } else {
      res.barDateData[application.date] = 1;
    }

    if (application.status in res.pieChartStatusData) {
      res.pieChartStatusData[application.status]++;
    } else {
      res.pieChartStatusData[application.status] = 1;
    }
  }

  res.noOfCompaniesApplied = [...new Set(allCompanies)].length;

  return res;
};

export default { getStatsForUser };
