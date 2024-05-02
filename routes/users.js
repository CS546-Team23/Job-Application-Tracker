//import express, express router as shown in lecture code
import { Router } from "express";
import path from "path";
import user from '../data/users.js';
import application from '../data/applications.js';
import * as helper from "../helpers.js";
import xss from "xss";

const router = Router();

router.route("/").get(async (_req, res) => {
  return res.sendFile(path.resolve("static/landing.html"));
});

// TODO: Error Checking
router.route("/dashboard").get(async (req, res) => {
  const user_info = await user.getUserById(req.session.user.userId);
  return res.render("dashboard", {
    applications: user_info.applications,
    nav: "privateNav",
    user: req.session.user
  });
}).post(async (req, res) => {
  // apply xss to user inputs
  const userInput = req.body;
  for (let key in userInput) {
    userInput[key] = xss(userInput[key]);
  }
  let errors = {};

  // Validate Company
  try {
    userInput.companyName = helper.checkIsProperFirstOrLastName(
      userInput.companyName,
      "Company Name"
    );
  } catch (e) {
    errors.companyName = e.message;
  }

  // Validate Job Position
  try {
    userInput.jobPosition = helper.checkIsProperFirstOrLastName(
      userInput.jobPosition,
      "Job Position"
    );
  } catch (e) {
    errors.jobPosition = e.message;
  }

  //Validate City
  try {
    userInput.appCity = helper.checkCity(userInput.appCity);
  } catch (e) {
    errors.appCity = e.message;
  }

  //Validate State
  try {
    if (!helper.checkIsValidState(userInput.appState)) {
      errors.appState = "Error: State is not valid.";
    }
  } catch (e) {
    errors.appState = e.message;
  }

  //Validate Follow-Up Date (if entered)
  if (userInput.followUpDate) {
    try {
      userInput.followUpDate = helper.isFollowupDateValid(userInput.followUpDate, "Follow Up Date");
    } catch (e) {
      errors.followUpDate = e.message;
    }
  }

  // Validate Status
  try {
    userInput.status = helper.checkIsProperStatus(userInput.status);
  } catch (e) {
    errors.status = e.message;
  }

  //Check for Errors; if errors, respond with status 400
  if (Object.keys(errors).length !== 0) {
    const user_info = await user.getUserById(req.session.user.userId);
    console.log(req.body);
    return res.render("dashboard", {
      applications: user_info.applications,
      application: req.body,
      nav: "privateNav",
      user: req.session.user,
      errors: errors
    });
  }

  try {
    const { app_id } = await application.createApplication(
      req.session.user.userId,
      userInput.companyName,
      userInput.jobPosition,
      userInput.appCity,
      userInput.appState,
      userInput.followUpDate,
      userInput.appResume,
      userInput.status
    );
    return res.redirect(`/applications/${app_id}`);
  } catch(e) {
    return res.status(500).render("errors", {
      layout: "main",
      nav: "publicNav",
      message: "Internal Server Error",
    });
  }
});

router.route("/applications/:id").get(async (req, res) => {
  let app;
  try {
    app = await application.getJobappByid(req.params.id, req.session.user.userId);
  }
  catch(e) {
    return res.json({error:e.messsage});
  }
  return res.render("applicationPage", { nav: "privateNav", application:app });
});

export default router;
