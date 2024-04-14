import { Router } from "express";
import { ObjectId } from "mongodb";
import { validateId } from "../helper.js";

import { statsData } from "../data/index.js";

const router = Router();

router.route("/:id").get(async (req, res) => {
  try {
    req.params.id = validateId(req.params.id);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  try {
    const getStats = await statsData.getStatsForUser(req.params.id);
    return res
      .status(200)
      .render("statistics", { data: JSON.stringify(getStats) });

    // return res.status(200).json(getStats);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

export default router;
