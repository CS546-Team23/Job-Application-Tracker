import user from '../data/users.js';
import application from '../data/applications.js';
import notes from '../data/notes.js';
import { dbConnection, closeConnection } from '../config/mongoConnection.js';

// drop database each run of the loop
const db = await dbConnection();
await db.dropDatabase();

const data = [
    {
      firstName: "John",
      lastName: "Doe",
      city: "Hoboken",
      state: "NJ",
      desiredPosition: "Web Developer",
      dreamJob: "Google",
      email: "johndoe16@gmail.com",
      password: "Admin123!",
      applications: [
        {
          companyName: "Stevens",
          jobPosition: "Web Developer",
          appCity: "Hoboken",
          appState: "NJ",
          date: "05/01/24",
          followUpDate: "05/22/24",
          appResume: "resume1.docx",
          status: "Saved",
          Notes: [
            {
              date: "03/14/24",
              time: "4:00pm",
              text: "Asked for an interview on 3/19/24"
            }
          ]
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Screening",
          Notes: [
            {
              date: "03/18/24",
              time: "10:00am",
              text: "Received confirmation email for application"
            }
          ]
        },
        {
          companyName: "CodeMaster",
          jobPosition: "Frontend Developer",
          appCity: "San Francisco",
          appState: "CA",
          date: "04/01/24",
          followUpDate: "05/15/24",
          appResume: "resume10.docx",
          status: "Hired",
          Notes: [
            {
              date: "04/10/24",
              time: "2:30pm",
              text: "Scheduled phone interview for next week"
            }
          ]
        },
        {
          companyName: "CodeMaster",
          jobPosition: "Backend Developer",
          appCity: "Los Angeles",
          appState: "CA",
          date: "03/15/24",
          followUpDate: "05/31/24",
          appResume: "resume4.docx",
          status: "Rejected",
          Notes: []
        },
        {
          companyName: "DataTech",
          jobPosition: "Data Analyst",
          appCity: "Chicago",
          appState: "IL",
          date: "03/20/24",
          followUpDate: "05/05/24",
          appResume: "resume5.docx",
          status: "Saved",
          Notes: []
        },
        {
          companyName: "CreativeSolutions",
          jobPosition: "UX Designer",
          appCity: "Seattle",
          appState: "WA",
          date: "03/25/24",
          followUpDate: "05/10/24",
          appResume: "resume6.docx",
          status: "Hired",
          Notes: []
        },
        {
          companyName: "FutureVision",
          jobPosition: "Machine Learning Engineer",
          appCity: "Boston",
          appState: "MA",
          date: "04/05/24",
          followUpDate: "05/20/24",
          appResume: "resume8.docx",
          status: "Rejected",
          Notes: []
        },
        {
          companyName: "DesignWorks",
          jobPosition: "Graphic Designer",
          appCity: "Portland",
          appState: "OR",
          date: "04/10/24",
          followUpDate: "05/25/24",
          appResume: "resume9.docx",
          status: "Screening",
          Notes: []
        },
        {
          companyName: "InnovativeSolutions",
          jobPosition: "Product Manager",
          appCity: "Denver",
          appState: "CO",
          date: "04/15/24",
          followUpDate: "05/30/24",
          appResume: "resume10.docx",
          status: "Applied",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Saved",
          Notes: []
        }
      ]
    },
    {
      firstName: "Gautam",
      lastName: "Ahuja",
      city: "Hoboken",
      state: "NJ",
      desiredPosition: "Web Developer",
      dreamJob: "Microsoft",
      email: "gahuja@gmail.com",
      password: "someHashedPassword9$",
      applications: [
        {
          companyName: "Stevens",
          jobPosition: "Web Developer",
          appCity: "Hoboken",
          appState: "NJ",
          date: "03/01/24",
          followUpDate: "05/22/24",
          appResume: "resume1.docx",
          status: "Saved",
          Notes: [
            {
              date: "03/14/24",
              time: "4:00pm",
              text: "Asked for an interview on 3/19/24"
            }
          ]
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Screening",
          Notes: [
            {
              date: "03/18/24",
              time: "10:00am",
              text: "Received confirmation email for application"
            }
          ]
        },
        {
          companyName: "CodeMaster",
          jobPosition: "Frontend Developer",
          appCity: "San Francisco",
          appState: "CA",
          date: "04/01/24",
          followUpDate: "05/15/24",
          appResume: "resume10.docx",
          status: "Hired",
          Notes: [
            {
              date: "04/10/24",
              time: "2:30pm",
              text: "Scheduled phone interview for next week"
            }
          ]
        },
        {
          companyName: "CodeMaster",
          jobPosition: "Backend Developer",
          appCity: "Los Angeles",
          appState: "CA",
          date: "03/15/24",
          followUpDate: "05/31/24",
          appResume: "resume4.docx",
          status: "Rejected",
          Notes: []
        },
        {
          companyName: "DataTech",
          jobPosition: "Data Analyst",
          appCity: "Chicago",
          appState: "IL",
          date: "03/20/24",
          followUpDate: "05/05/24",
          appResume: "resume5.docx",
          status: "Saved",
          Notes: []
        },
        {
          companyName: "CreativeSolutions",
          jobPosition: "UX Designer",
          appCity: "Seattle",
          appState: "WA",
          date: "03/25/24",
          followUpDate: "05/10/24",
          appResume: "resume6.docx",
          status: "Hired",
          Notes: []
        },
        {
          companyName: "FutureVision",
          jobPosition: "Machine Learning Engineer",
          appCity: "Boston",
          appState: "MA",
          date: "04/05/24",
          followUpDate: "05/20/24",
          appResume: "resume8.docx",
          status: "Rejected",
          Notes: []
        },
        {
          companyName: "DesignWorks",
          jobPosition: "Graphic Designer",
          appCity: "Portland",
          appState: "OR",
          date: "04/10/24",
          followUpDate: "05/25/24",
          appResume: "resume9.docx",
          status: "Screening",
          Notes: []
        },
        {
          companyName: "InnovativeSolutions",
          jobPosition: "Product Manager",
          appCity: "Denver",
          appState: "CO",
          date: "04/15/24",
          followUpDate: "05/30/24",
          appResume: "resume10.docx",
          status: "Applied",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Saved",
          Notes: []
        }
      ]
    },
    {
      firstName: "Ajinkya",
      lastName: "Bhamre",
      city: "Hoboken",
      state: "NJ",
      desiredPosition: "AI Engineer",
      dreamJob: "Black Rock",
      email: "abhamre@gmail.com",
      password: "Password0/",
      applications: [
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Saved",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Applied",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Screening",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Interviewing",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Rejected",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Hired",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Saved",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Applied",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Screening",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Interviewing",
          Notes: []
        }
      ]
    },
    {
      firstName: "Dhruv",
      lastName: "Rathi",
      city: "Jersey City",
      state: "NJ",
      desiredPosition: "Web Developer",
      dreamJob: "Microosoft",
      email: "dhruv@gmail.com",
      password: "Anotherpassword0%",
      applications: [
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Saved",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Applied",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Screening",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Interviewing",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Rejected",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Hired",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Saved",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Applied",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Screening",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Interviewing",
          Notes: []
        }
      ]
    },
    {
      firstName: "Kabir",
      lastName: "Ramchandani",
      city: "Union City",
      state: "NJ",
      desiredPosition: "Frontend Developer",
      dreamJob: "Google",
      email: "kramchandani@gmail.com",
      password: "MyPassword10!",
      applications: [
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Saved",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Applied",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Screening",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Interviewing",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Rejected",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Hired",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Saved",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Applied",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Screening",
          Notes: []
        },
        {
          companyName: "TechCorp",
          jobPosition: "Software Engineer",
          appCity: "New York",
          appState: "NY",
          date: "03/05/24",
          followUpDate: "05/25/24",
          appResume: "resume2.docx",
          status: "Interviewing",
          Notes: []
        }
      ]
    }
]


for (const i_user of data) {
    let { user_id } = await user.registerUser(
        i_user.firstName,
        i_user.lastName,
        i_user.city,
        i_user.state,
        i_user.email,
        i_user.password,
        i_user.desiredPosition,
        i_user.dreamJob
    );

    for (const i_app of i_user.applications) {
        let {app_id} = await application.createApplication(
            user_id.toString(),
            i_app.companyName,
            i_app.jobPosition,
            i_app.appCity,
            i_app.appState,
            i_app.followUpDate,
            i_app.appResume,
            i_app.status
        );
        
        for (const i_note of i_app.Notes) {
            await notes.createNote(
                app_id.toString(),
                i_note.text
            );
        }
    }
}

// close the connection
closeConnection();