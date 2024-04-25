import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

let firstUser = undefined;

// Saved, Applied, Screening, Interviewing, Rejected, Hired.

async function main() {
  try {
    const usersCollection = await users();

    // firstUser = await usersCollection.findOne({
    //   _id: ObjectId.createFromHexString("661b1f0f00d5d86b38607305"),
    // });

    let newUser = {
      firstName: "Kabir",
      lastName: "Ramchandani",
      city: "Union City",
      state: "NJ",
      desiredPosition: "Frontend Developer",
      dreamJob: "Google",
      email: "kramchandani@gmail.com",
      password: "Hashed Password",
      applications: [],
    };

    const statues = [
      "Saved",
      "Applied",
      "Screening",
      "Interviewing",
      "Rejected",
      "Hired",
      "Saved",
      "Applied",
      "Screening",
      "Interviewing",
      "Rejected",
      "Hired",
    ];

    for (let i = 0; i < 10; i++) {
      let newApplication = {
        _id: new ObjectId(),
        companyName: "TechCorp",
        jobPosition: "Software Engineer",
        appCity: "New York",
        appState: "NY",
        date: "03/05/24",
        followUpDate: "03/25/24",
        appResume: "resume2.docx",
        status: statues[i],
        Notes: [],
      };
      newUser.applications.push(newApplication);
    }

    let insertUser = usersCollection.insertOne(newUser);


    // console.log(updatedUser.applications.length);
  } catch (error) {
    console.error(error);
  }
}

main();
