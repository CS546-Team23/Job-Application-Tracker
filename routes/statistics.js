import { Router } from "express";

import { statsData } from "../data/index.js";

const router = Router();

router.route("/getStats").get(async (req, res) => {
  try {
    const getStats = await statsData.getStatsForUser(req.session.user.email);
    return res.status(200).json({ data: getStats });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.route("/").get(async (req, res) => {
  return res
    .status(200)
    .render("statistics", { 
      layout: "main", 
      nav: "privateNav",
      stylesheets: 'commonStylesheets',
      scripts: 'chartScripts',
  });
});

export default router;