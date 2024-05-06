# Job-Application-Tracker

Welcome to our Job Application Tracker web app! Our app is simple, clean, and user friendly. It is also mobile-friendly.

## Getting Started

First, run the seed file by navigating to the terminal and entering the following command:

`npm run seed `

After seeding the database, rung the following command to connect to the server:

`npm start`

The following emails and passwords can be used to explore our application:

1. **Email**: janesmith23@gmail.com  
   **Password**: Superjane@1
2. **Email**: emilyjohnson87@gmail.com  
   **Password**: Emily@321
3. **Email**: michaelbrown@gmail.com  
   **Password**: BrownSuper@1
4. **Email**: oliviamartinez@gmail.com  
   **Password**: Olivia@190
5. **Email**: alicejohnson@stevens.edu  
   **Password**: Alice@123

## Features

### Dashboard Page
After registering and/or logging in, users are immediately redirected to their dashboard. Features include:
- New applications can be added by clicking on the “New Application” button. That will fire up a modal where users can fill out the following information:
  - Company Name (An auto-fill feature will display all jobs beginning with the first set of letters users type)
  - Job Position
  - City
  - State
  - Follow Up Date
  - Upload the version of their resume they submitted with that application
  - Status of the application (saved, applied, screening, interviewing, hired, rejected)
- On the dashboard, all added applications will be displayed. Each application is clickable, which when clicked will redirect users to the applications details page where users can take more actions in regards to said application.
- Applications will be listed under to major sections: Follow-Ups and Applications.
- Follow-Ups: Here, applications with follow-up dates that are the current date or past dates will be listed here to remind the user. When a user clicks on an application module, they are redirected to the applications detail page. The application is automatically removed from the Follow-ups Section, but it will remain on the Applications Section. 
- Applications: The applications section is divided into six status categories: saved, applied, screening, interviewing, rejected, and hired. The application modules will be displayed under their respective statuses.

## Applications Page
When a user clicks on an application module, they will be redirected to the applications page which displays the details of clicked application.
- Users can edit the application details by clicking “Edit Application”
- Users can also delete the application by clicking “Delete Application”
- User can add notes to each application.
  - Each note that is added is date stamped with the current date and users have the option to edit the note or delete it.
  - If users begin to create a note but want to retype it, they have the convenient option of reseting the texture to its initial state (blank).

## Stats Page
- Here, users can see in a snapshot various statistics of their application. They can view the following:
- Total number of applications they have added
- Total number of companies they’ve applied to
- Total number of companies that never responded
- Number of application with he status of saved, screening, hired, rejected, and applied.
- Total number of applications by date.

## Companies Page
Here users can view a comprehensive list of companies, displayed as a card using company’s logo and name. Each card is clickable, which displays a modal with a company’s following information:
- Company name
- Company logo
- Company sector
- Company location
- Company CEO
- Company website
