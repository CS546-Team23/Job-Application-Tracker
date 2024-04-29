//import express, express router as shown in lecture code
import { Router } from "express";
import { static as staticDir } from "express";
import path from "path";
// import data from '../public/data/jobTrackerApplication.users.json' with { type: "json" };
const router = Router();

router.route("/").get(async (req, res) => {
  return res.sendFile(path.resolve("static/landing.html"));
});

router.route("/dashboard").get(async (_req, res) => {
  const applications = data.find(
    (item) => item._id.$oid === "661b1f0f00d5d86b38607305"
  ).applications;
  return res.render("dashboard", {
    applications: applications,
    nav: "privateNav",
  });
});

router.route("/applications/:id").get(async (req, res) => {
  const applications = data.find(
    (item) => item._id.$oid === "661b1f0f00d5d86b38607305"
  ).applications;
  const application = applications.find(
    (item) => item._id.$oid === req.params.id
  );
  return res.render("applicationPage", { nav: "privateNav", ...application });
});

export default router;
