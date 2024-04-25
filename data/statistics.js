import { users } from "../config/mongoCollections.js";
import { validateId } from "../helper.js";
import { ObjectId } from "mongodb";

const getStatsForUser = async (userId) => {
  userId = validateId(userId);

  const usersCollection = await users();

  const userData = await usersCollection.findOne({_id : ObjectId.createFromHexString(userId)});
  if(!userData) throw new Error('Error: user not found');

  const res = {};

  res.barDateData = {};
  res.pieChartStatusData = {};

  for(let application of userData.applications){
    if(application.date in res.barDateData){
      res.barDateData[application.date]++;
    }
    else{
      res.barDateData[application.date] = 1;
    }

    if(application.status in res.pieChartStatusData){
      res.pieChartStatusData[application.status]++;
    }
    else{
      res.pieChartStatusData[application.status] = 1;
    }
  }

  return res;
};

export default {getStatsForUser};
