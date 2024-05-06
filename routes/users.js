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
import { error } from "console";

const router = Router();

router.route("/").get(async (_req, res) => {
  return res.sendFile(path.resolve("static/landing.html"));
});

router
  .route("/profile")
  .get(async (req, res) => {
    const userInfo = await user.getUserById(req.session.user.userId);
    return res.render("profile", {
      nav: "privateNav",
      user: userInfo,
      stylesheets: "commonStylesheets",
      scripts: "profileScript",
    });
  })
  .patch(async (req, res) => {
    // return res.json(req.body);
    let editInfo = req.body;
    if (!editInfo || Object.keys(editInfo).length === 0) {
      //todo
      return res.status(400).render("errors", {
        layout: "main",
        nav: "privateNav",
        message: "No data is passed",
        stylesheets: "commonStylesheets",
        scripts: "commonScripts",
      });
    }
    let updateObject = {};
    let errors = {};
    for (let key in editInfo) {
      editInfo[key] = xss(editInfo[key]);
    }
    try {
      if (editInfo.profileFirstName) {
        updateObject.firstName = helper.checkIsProperFirstOrLastName(
          editInfo.profileFirstName,
          "First Name"
        );
      }
    } catch (e) {
      errors.firstName = e.message;
    }
    try {
      if (editInfo.profileLastName) {
        updateObject.lastName = helper.checkIsProperFirstOrLastName(
          editInfo.profileLastName,
          "Last Name"
        );
      }
    } catch (e) {
      errors.lastName = e.message;
    }
    try {
      if (editInfo.profileEmail) {
        updateObject.email = helper.validateEmail(
          editInfo.profileEmail,
          "Email"
        );
      }
    } catch (e) {
      errors.email = e.message;
    }
    try {
      if (editInfo.profileCity) {
        updateObject.city = helper.checkCity(editInfo.profileCity, "City");
      }
    } catch (e) {
      errors.city = e.message;
    }
    try {
      if (editInfo.profileState) {
        if (!helper.checkIsValidState(editInfo.profileState)) {
          throw new Error("State is not valid !");
        }
        updateObject.state = editInfo.profileState;
      }
    } catch (e) {
      errors.state = e.message;
    }
    try {
      if (editInfo.profileDesiredPosition) {
        updateObject.desiredPosition = helper.checkIsProperFirstOrLastName(
          editInfo.profileDesiredPosition,
          "Desired Position"
        );
      }
    } catch (e) {
      errors.desiredPosition = e.message;
    }
    try {
      if (editInfo.profileDreamJob) {
        updateObject.dreamJob = helper.checkIsProperFirstOrLastName(
          editInfo.profileDreamJob,
          "Desired Position"
        );
      }
    } catch (e) {
      errors.dreamJob = e.message;
    }

    try {
      if (editInfo.profileHighestEducation) {
        updateObject.highestEducation = helper.checkHighestEductaion(
          editInfo.profileHighestEducation,
          "Highest Education"
        );
      }
    } catch (e) {
      errors.highestEducation = e.message;
    }

    try {
      if (editInfo.profileSpecialization) {
        updateObject.specialization = helper.checkIsProperString(
          editInfo.profileSpecialization,
          "Specialization"
        );
      }
    } catch (e) {
      errors.specialization = e.message;
    }

    try {
      if (editInfo.profileSkills) {
        updateObject.skills = helper.checkAndCreateSkills(
          editInfo.profileSkills,
          "Skills"
        );
        let prevskills = req.session.user.skills ? req.session.user.skills : "";
        updateObject.skills = prevskills
          ? prevskills + ", " + updateObject.skills
          : updateObject.skills;
      }
    } catch (e) {
      errors.skills = e.message;
    }

    if (Object.keys(errors).length !== 0) {
      return res.render("profile", {
        nav: "privateNav",
        user: req.session.user,
        stylesheets: "commonStylesheets",
        scripts: "profileScript",
        errors: errors,
      });
    }

    try {
      let userUpdateInfo = await user.updateUser(
        req.session.user.email,
        updateObject
      );
      userUpdateInfo.userId = userUpdateInfo._id.toString();
      req.session.user = userUpdateInfo;
      return res.render("profile", {
        nav: "privateNav",
        user: userUpdateInfo,
        stylesheets: "commonStylesheets",
        scripts: "profileScript",
      });
    } catch (error) {
      return res.status(500).render("errors", {
        layout: "main",
        nav: "privateNav",
        message: error.message,
        stylesheets: "commonStylesheets",
        scripts: "commonScripts",
      });
    }
  });

router.route("/profile/changePassword").patch(async (req, res) => {
  let editInfo = req.body;
  if (!editInfo || Object.keys(editInfo).length === 0) {
    return res.status(400).render("errors", {
      layout: "main",
      nav: "privateNav",
      message: "No data is passed",
      stylesheets: "commonStylesheets",
      scripts: "commonScripts",
    });
  }
  let updateObject = {};
  let errors = {};
  for (let key in editInfo) {
    editInfo[key] = xss(editInfo[key]);
  }

  try {
    if (editInfo.oldPassword) {
      updateObject.oldPassword = helper.checkIsProperPassword(
        editInfo.oldPassword
      );
    }
  } catch (e) {
    errors.oldPassword = e.message;
  }

  try {
    if (editInfo.newPassword) {
      updateObject.newPassword = helper.checkIsProperPassword(
        editInfo.newPassword
      );
    }
  } catch (e) {
    errors.newPassword = e.message;
  }

  try {
    if (editInfo.newPassword !== editInfo.confirmNewPassword) {
      throw new Error("newPassword and confirmNewPassword and not same !");
    }
  } catch (e) {
    errors.confirmNewPassword = e.message;
  }

  if (Object.keys(errors).length !== 0) {
    return res.render("changePasswordModal", {
      nav: "privateNav",
      user: req.session.user,
      stylesheets: "commonStylesheets",
      scripts: "profileScript",
      errors: true,
    });
  }

  let email = req.session.user.email;
  let oldPassword = updateObject.oldPassword;
  let newPassword = updateObject.newPassword;
  try {
    let userCred = await user.checkOldPassword(email, oldPassword);
  } catch (error) {
    return res.status(404).render("errors", {
      layout: "main",
      nav: "privateNav",
      message: error.message,
      stylesheets: "commonStylesheets",
      scripts: "commonScripts",
    });
  }

  try {
    newPassword = await user.changeNewPassword(email, oldPassword, newPassword);
    if (!newPassword.passwordUpdated) {
      return res.status(404).render("errors", {
        layout: "main",
        nav: "privateNav",
        message: error.message,
        stylesheets: "commonStylesheets",
        scripts: "commonScripts",
      }); 
    }
  } catch (error) {
    return res.render("errors", {
      layout: "main",
      nav: "privateNav",
      message: error.message,
      stylesheets: "commonStylesheets",
      scripts: "commonScripts",
    }); 
  }
  return res.redirect('logout');
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
      user_info = await application.getUserApplications(
        req.session.user.userId
      );
    } catch (e) {
      return renderError(req, res, 500, "Internal Server Error", e.message);
    }

    let new_applications = [];
    try {
      new_applications = await application.getFollowUpApps(
        req.session.user.userId
      );
    } catch (e) {
      return renderError(req, res, 500, "Internal Server Error", e.message);
    }

    return res.render("dashboard", {
      applications: user_info,
      nav: "privateNav",
      stylesheets: "dashboardStylesheet",
      scripts: "dashboardScript",
      user: req.session.user,
      notifications: new_applications,
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
        if (!req.file.originalname.endsWith(".pdf")) {
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
      let user_info;
      try {
        user_info = await application.getUserApplications(
          req.session.user.userId
        );
      } catch (e) {
        return renderError(req, res, 500, "Internal Server Error", e.message);
      }

      let new_applications = [];
      try {
        new_applications = await application.getFollowUpApps(
          req.session.user.userId
        );
      } catch (e) {
        return renderError(req, res, 500, "Internal Server Error", e.message);
      }

      return res.render("dashboard", {
        application: req.body,
        applications: user_info,
        nav: "privateNav",
        stylesheets: "dashboardStylesheet",
        scripts: "dashboardScript",
        user: req.session.user,
        notifications: new_applications,
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
      stylesheets: "applicationStylesheet",
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
      // get application
      let app;
      try {
        app = await application.getJobappByid(jobId, req.session.user.userId);
      } catch (e) {
        return renderError(req, res, 404, "Not Found", e.message);
      }
      return res.render("applicationPage", {
        errors: errors,
        nav: "privateNav",
        application: app,
        stylesheets: "commonStylesheets",
        scripts: "applicationScript",
      });
    }

    if (req.file) {
      try {
        uploadObject = {};
        if (!req.file.originalname.endsWith(".pdf")) {
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
