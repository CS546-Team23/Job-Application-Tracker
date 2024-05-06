import { Router } from "express";
import mapData from "../data/mapData.js";

const router = Router();

router.route('/').get(async (req, res) => {
    // Get map data from your database or other source
    let userId = req.session.user.userId;
    const data = await mapData.getJobAppLocations(userId); // Replace with your actual method to fetch map data
    // Render the map page and pass the data
    res.render('map', {nav: "privateNav", stylesheets : "commonStylesheets",scripts : "commonScripts", data: JSON.stringify(data) }); // Pass data as a string

    
});


export default router;