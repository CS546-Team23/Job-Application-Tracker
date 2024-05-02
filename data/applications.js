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
    if (followUpDate) followUpDate = isFollowupDateValid(followUpDate, followUpDate);
    if (appResume) appResume = checkIsProperString(appResume, 'filePath');
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
    status : status,
    Notes : [],
}
if (followUpDate) newJobApp.followUpDate = followUpDate;
if (appResume) newJobApp.appResume = appResume;

user.applications.push(newJobApp);

const {_id, ...userDetails} = user;
const updatedUser = await userCollection.findOneAndUpdate({ _id: _id }, { $set: userDetails }, { returnDocument: "after" })
return { updatedUser:updatedUser, app_id:newJobApp._id.toString()};

},

async getJobappByid(jobappId, userId){
  jobappId = validateId(jobappId, jobappId.toString());
  const search = {
    "applications._id": new ObjectId(jobappId)
  };
  if (userId !== undefined) {
    userId = validateId(userId, userId.toString());
    search._id = new ObjectId(userId);
  }
  
  const userCollection = await users();
  const foundJobapp =  await userCollection.findOne(
    search,
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



/*
app.js - (check the validity of data functions in app.js (applications.js & notes.js))
import dataFun from "./data/applications.js";
import noteFunc from "./data/notes.js";

//console.log(await dataFun.createApplication("66244f5be7840fc13e5d3be6", "dummyCompany", "dummyjobposition","dummyappCity", "dummyappState","09/25/2024","appResume","status"));

 //console.log(await dataFun.getJobappByid("6624b5cb33ec2e52c08d14f6"));

// let obj = {
//   companyName : "dummy2",
//   jobPosition : "dummy2 Engineer",
//   appCity : "duumy2 York",
//   appState : "2dummyNY2",
//   followUpDate : "03/25/2025",
//   appResume : "2dummy.docx",
//   status : "2dummy",
// }
// console.log(await dataFun.updateJobapp("661b1f0f00d5d86b38607301", obj));

 //console.log(await dataFun.removeJobapp("66244f5be7840fc13e5d3be4"));

//console.log(await noteFunc.createNote("6624a1a7acc268ab5adf1135", "wow im so gr8"));

//console.log(await noteFunc.getNoteById("6624b729db2c3cb4dd2550e6"));


//console.log(await noteFunc.removeNoteById("6624b366239e644f44ae1e76"))

//console.log(await noteFunc.updateNoteById("6624b729db2c3cb4dd2550e6", "I'm not gr8, I'm Awesome !!!"))

*/