import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

let firstUser = undefined;

// Saved, Applied, Screening, Interviewing, Rejected, Hired.

async function main() {
  try {
    const usersCollection = await users();

    firstUser = await usersCollection.findOne({
      _id: ObjectId.createFromHexString("661b1f0f00d5d86b38607305"),
    });

    let newApplication = {
      _id: new ObjectId(),
      companyName: "TechCorp",
      jobPosition: "Software Engineer",
      appCity: "New York",
      appState: "NY",
      date: "03/05/24",
      followUpDate: "03/25/24",
      appResume: "resume2.docx",
      status: "Under Review",
      Notes: [],
    };

    const { _id, ...updatedUserDetails } = firstUser;

    firstUser.applications.push(newApplication);

    let updatedUser = await usersCollection.findOneAndUpdate(
      {
        _id: _id,
      },
      { $set: updatedUserDetails },
      { returnDocument: "after" }
    );

    console.log(updatedUser.applications.length);
  } catch (error) {
    console.error(error);
  }
}

main();
