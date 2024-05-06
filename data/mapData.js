import { users } from "../config/mongoCollections.js";
import { ObjectId, ReturnDocument } from "mongodb";
import {
  checkIsProperString,
  isDateValid,
  validateId,
  currDate,
  isFollowupDateValid,
} from "../helpers.js";

import applicationsData from "./applications.js"
const cityCoordinates = [
    { "state": "NY", "city": "New York", "lat": 40.6943, "lng": -73.9249 },
    { "state": "CA", "city": "Los Angeles", "lat": 34.1141, "lng": -118.4068 },
    { "state": "IL", "city": "Chicago", "lat": 41.8375, "lng": -87.6866 }
];
const getJobAppLocations = async(userId) =>{
    try {
        // Retrieve user's job applications
        const jobApplications = 
        await applicationsData.getUserApplications(userId);
        const companyCoordinates = {};
        // Iterate over job applications
        jobApplications.forEach(status => {
            // Iterate over applications within this status
            status.applications.forEach(application => {
                // Find city coordinates for this application
                const cityCoord = cityCoordinates.find(coord => coord.state === application.appState && coord.city === application.appCity);
                if (cityCoord) {
                    companyCoordinates[application.companyName] = {
                        lat: cityCoord.lat,
                        lng: cityCoord.lng
                    };
                } else {
                    console.log(`No coordinates found for ${application.appCity}, ${application.appState}`);
                }
            });
        });
        
        return companyCoordinates;
    } catch (error) {
        console.error('Error retrieving job applications:', error);
    }
}

export default {getJobAppLocations};