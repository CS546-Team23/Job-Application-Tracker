import { Router } from "express";
import mapData from "../data/mapData.js";

const router = Router();

router.route('/').get(async (req, res) => {
    // Get map data from your database or other source
    try{
    let userId = req.session.user.userId;
    const data = await mapData.getJobAppLocations(userId); // Replace with your actual method to fetch map data
    // Render the map page and pass the data
    return res.render('map', {nav: "privateNav", stylesheets : "commonStylesheets",scripts : "commonScripts", data: JSON.stringify(data) }); // Pass data as a string
    }catch (e) {
        return res.status(500).render("errors", {
          layout: "main",
          nav: "publicNav",
          message: e.message,
          stylesheets: 'commonStylesheets',
          scripts: 'commonScripts',
        });
      }
    
});


export default router;