//import express, express router as shown in lecture code
import { Router } from "express";
import { static as staticDir } from "express";
import path from "path";
import data from '../public/data/jobTrackerApplication.users.json' with { type: "json" };

import user from '../data/users.js';
import application from '../data/applications.js';

const router = Router();

router.route("/").get(async (req, res) => {
  return res.sendFile(path.resolve("static/landing.html"));
});

router.route("/dashboard").get(async (req, res) => {
  const user_info = await user.getUserById(req.session.user.userId);
  return res.render("dashboard", {
    applications: user_info.applications,
    nav: "privateNav",
    user: req.session.user
  });
});

router.route("/applications/:id").get(async (req, res) => {
  const app = await application.getJobappByid(req.params.id);
  return res.render("applicationPage", { nav: "privateNav", application:app });
});

export default router;
