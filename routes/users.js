//import express, express router as shown in lecture code
import { Router } from "express";
import path from "path";
import user from '../data/users.js';
import application from '../data/applications.js';
import xss from 'xss';
import { validateId } from "../helpers.js";
import note from '../data/notes.js';

const router = Router();

router.route("/").get(async (_req, res) => {
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
})

export default router;
