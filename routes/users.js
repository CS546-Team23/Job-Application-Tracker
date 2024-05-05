//import express, express router as shown in lecture code
import { Router } from "express";
import path from "path";
import user from "../data/users.js";
import application from "../data/applications.js";
import * as helper from "../helpers.js";
import xss from "xss";
import moment from "moment";
import { fileUpload } from "../data/index.js";

import * as fsExtra from "fs-extra";

const router = Router();

router.route("/").get(async (_req, res) => {
  return res.sendFile(path.resolve("static/landing.html"));
});

router.route("/profile").get(async (req, res) => {
  const userInfo = await user.getUserById(req.session.user.userId);
  return res.render("profile", {
    nav: "privateNav",
    user: req.session.user,
    stylesheets: "commonStylesheets",
    scripts: "profileScript",
  });
});

function renderError(req, res, status, message, error) {
  const nav = req.session.user ? "privateNav" : "publicNav";
  return res.status(status).render("errors", {
    layout: "main",
    nav: nav,
    message: `${message}\n${error}`,
    stylesheets: "commonStylesheets",
    scripts: "applicationScript",
  });
}

function validateApplicationData(userInput) {
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
      userInput.followUpDate = helper.isFollowupDateValid(
        moment(userInput.followUpDate).format("MM/DD/YYYY"),
        `Follow Up Date (${userInput.followUpDate})`
      );
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

  return errors;
}

// TODO: Error Checking
router
  .route("/dashboard")
  .get(async (req, res) => {
    let user_info;
    try {
      user_info = await application.getUserApplications(req.session.user.userId);
    } catch (e) {
      return renderError(req, res, 500, "Internal Server Error", e.message);
    }
    
    let new_applications = [];
    try {
      new_applications = await application.getFollowUpApps(req.session.user.userId);
    } catch (e) {
      return renderError(req, res, 500, "Internal Server Error", e.message);
    }

    return res.render("dashboard", {
      applications: user_info,
      nav: "privateNav",
      stylesheets: "dashboardStylesheet",
      scripts: "dashboardScript",
      user: req.session.user,
      notifications: new_applications
    });
  })
  .post(async (req, res) => {
    // apply xss to user inputs
    const userInput = req.body;
    let fileInfo = {};
    let uploadObject = {};
    let errors = validateApplicationData(userInput);

    if (req.file) {
      try {
        uploadObject = {};
        if (req.file.originalname.endsWith(".docx")) {
          uploadObject = {
            public_id: req.file.originalname,
            resource_type: "raw",
          };
        }
        fileInfo = await fileUpload.uploadFileToCloudinary(
          req.file.path,
          req.file.originalname,
          uploadObject
        );
      } catch (error) {
        errors.file = error.message;
      }
    }

    uploadObject = fileInfo;

    userInput.appResume = fileInfo;

    //Check for Errors; if errors, respond with status 400
    if (Object.keys(errors).length !== 0) {
      const user_info = await application.getUserApplications(
        req.session.user.userId
      );
      return res.status(400).render("dashboard", {
        applications: user_info.applications,
        application: req.body,
        nav: "privateNav",
        user: req.session.user,
        errors: errors,
      });
    }

    try {
      const { app_id } = await application.createApplication(
        req.session.user.userId,
        userInput.companyName,
        userInput.jobPosition,
        userInput.appCity,
        userInput.appState,
        userInput.status,
        userInput.followUpDate,
        userInput.appResume
      );
      return res.redirect(`/applications/${app_id}`);
    } catch (e) {
      return renderError(req, res, 500, "Internal Server Error", e.message);
    }
  });

router
  .route("/applications/:id")
  .get(async (req, res) => {
    // validate id
    let jobId;
    try {
      jobId = helper.validateId(req.params.id);
    } catch (e) {
      return renderError(req, res, 400, "User Error", e.message);
    }

    // get application
    let app;
    try {
      app = await application.getJobappByid(jobId, req.session.user.userId);
    } catch (e) {
      return renderError(req, res, 404, "Not Found", e.message);
    }
    return res.render("applicationPage", {
      nav: "privateNav",
      application: app,
      stylesheets: "commonStylesheets",
      scripts: "applicationScript",
    });
  })
  .post(async (req, res) => {
    // validate id
    let jobId;
    let fileInfo = {};
    let uploadObject = {};
    try {
      jobId = helper.validateId(req.params.id);
    } catch (e) {
      return renderError(req, res, 400, "User Error", e.message);
    }

    // apply xss to user inputs
    const userInput = req.body;
    let errors = validateApplicationData(userInput);

    //Check for Errors; if errors, respond with status 400
    if (Object.keys(errors).length !== 0) {
      const user_info = await application.getUserApplications(
        req.session.user.userId
      );
      return res.status(400).render("dashboard", {
        applications: user_info.applications,
        application: req.body,
        nav: "privateNav",
        user: req.session.user,
        errors: errors,
      });
    }

    if (req.file) {
      try {
        uploadObject = {};
        if (req.file.originalname.endsWith(".docx")) {
          uploadObject = {
            public_id: req.file.originalname,
            resource_type: "raw",
          };
        }
        fileInfo = await fileUpload.uploadFileToCloudinary(
          req.file.path,
          req.file.originalname,
          uploadObject
        );
        userInput.appResume = fileInfo;
      } catch (error) {
        errors.file = error.message;
      }
    }

    const updateObject = {
      companyName: userInput.companyName,
      jobPosition: userInput.jobPosition,
      appCity: userInput.appCity,
      appState: userInput.appState,
      status: userInput.status,
    };
    if (userInput.followUpDate) {
      updateObject.followUpDate = userInput.followUpDate;
    }

    if (userInput.appResume) {
      updateObject.appResume = userInput.appResume;
    }

    try {
      await application.updateJobapp(
        jobId,
        updateObject,
        req.session.user.userId
      );
      return res.redirect("back");
    } catch (e) {
      return renderError(req, res, 500, "Internal Server Error", e.message);
    }
});

router.route("/view/applications/:id").get(async (req, res) => {
  // validate id
  let jobId;
  try {
    jobId = helper.validateId(req.params.id);
  } catch (e) {
    return renderError(req, res, 400, "User Error", e.message);
  }

  // get application
  try {
    await application.viewApplication(jobId, req.session.user.userId);
  } catch (e) {
    return renderError(req, res, 404, "Not Found", e.message);
  }

  return res.redirect(`/applications/${jobId}`);
});

export default router;
