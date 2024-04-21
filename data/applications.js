import { users } from "../config/mongoCollections.js";
import { ObjectId, ReturnDocument } from "mongodb";
import {checkIsProperString, isDateValid, validateId, currDate, isFollowupDateValid} from '../helpers.js';

const exportedMethods = {

async createApplication(userId, companyName, jobPosition, appCity, appState,followUpDate,appResume,status){
    
    userId = validateId(userId);
    companyName = checkIsProperString(companyName, "company-name");
    jobPosition = checkIsProperString(jobPosition, "job-position");
    appCity = checkIsProperString(appCity, "job-city");
    appState = checkIsProperString(appState, "job-state");
    const date = currDate();
    followUpDate = isFollowupDateValid(followUpDate, followUpDate);
    appResume = checkIsProperString(appResume, 'filePath');
    status = checkIsProperString(status, 'status');

    const userCollection = await users();
    const user = await userCollection.findOne({
      _id: new ObjectId(userId),
    });

      if (!user) {
        throw new Error("Error: user not found");
      }

let newJobApp = {
    _id: new ObjectId(),
    companyName : companyName,
    jobPosition : jobPosition,
    appCity : appCity,
    appState : appState,
    date : date,
    followUpDate : followUpDate,
    appResume : appResume,
    status : status,
    Notes : [],
}

user.applications.push(newJobApp);

const {_id, ...userDetails} = user;
const updatedUser = await userCollection.findOneAndUpdate({ _id: _id }, { $set: userDetails }, { returnDocument: "after" })
return updatedUser

},

async getJobappByid(jobappId){
    jobappId = validateId(jobappId, jobappId.toString());
    const userCollection = await users();
    const foundJobapp =  await userCollection.findOne(
        { "applications._id": new ObjectId(jobappId) },
        { projection: { _id: 0, "applications.$": 1 } }
    );
    if (!foundJobapp) throw new Error(`User Not found with ${jobappId}`);

    return foundJobapp.applications[0];

},

async updateJobapp(jobappId, updatedObj){

    jobappId = validateId(jobappId, jobappId.toString());
    updatedObj.companyName = checkIsProperString(updatedObj.companyName, "company-name");
    updatedObj.jobPosition = checkIsProperString(updatedObj.jobPosition, "job-position");
    updatedObj.appCity = checkIsProperString(updatedObj.appCity, "job-city");
    updatedObj.appState = checkIsProperString(updatedObj.appState, "job-state");
    updatedObj.date = currDate();
    updatedObj.followUpDate = isFollowupDateValid(updatedObj.followUpDate, updatedObj.followUpDate);
    updatedObj.appResume = checkIsProperString(updatedObj.appResume, 'filePath');
    updatedObj.status = checkIsProperString(updatedObj.status, 'status');


    const usersCollection = await users();
    const user = await usersCollection.findOne({
        "applications._id": ObjectId.createFromHexString(jobappId),
      });
      if (user == null) {
        throw new Error(`Error: User not found with job-application-id: ${jobappId}`);
      }

      const oldApplication = await usersCollection.find({
        "applications._id": ObjectId.createFromHexString(jobappId),
      });

      if (!oldApplication) {
        throw new Error("Error: Job application not found");
      }

      for (let i of user.applications) {
        if (i._id.toString() === jobappId) {
          for (let key in updatedObj) {
            i[key] = updatedObj[key];
          }
          break;
        }
      }
      const { _id, ...updateUser} = user;

      let updatedUser = await usersCollection.findOneAndUpdate(
        {
          _id: _id,
        },
        {
          $set: updateUser,
        },
        { returnDocument: "after" }
      );

      return updatedUser; 


},

async removeJobapp(jobappId) {
    jobappId = validateId(jobappId);

    const userCollection = await users();
    const userWithApplication = await userCollection.findOne({
        "applications._id": ObjectId.createFromHexString(jobappId),
    });

    if (!userWithApplication) {
        throw new Error(`Error: User not found with application id: ${jobappId}`);
    }

    const updatedApplications = userWithApplication.applications.filter(application => application._id.toString() !== jobappId);

    const updatedUser = await userCollection.findOneAndUpdate(
        { _id: userWithApplication._id },
        { $set: { applications: updatedApplications } },
        { returnDocument: "after" }
    );

    return updatedUser; 
},


}


export default exportedMethods;