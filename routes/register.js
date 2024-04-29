import { Router } from "express";
const router = Router();
import { usersData } from "../data/index.js";
import * as helper from "../helpers.js";
import xss from "xss";

router
  .route("/")
  .get(async (req, res) => {
    try {
      res.render("register", {
        layout: "main",
        nav: "publicNav",
      });
    } catch (e) {
      return res.status(404).render("errors", {
        layout: "main",
        nav: "publicNav",
        message: e,
      });
    }
  })
  .post(async (req, res) => {
    const userInput = req.body;
    for (let key in userInput) {
      userInput[key] = xss(userInput[key]);
    }
    let errors = {};

    //Validate First Name
    try {
      userInput.firstName = helper.checkIsProperFirstOrLastName(
        userInput.firstName,
        "First name"
      );
    } catch (e) {
      errors.firstName = e.message;
    }

    //Validate Last Name
    try {
      userInput.lastName = helper.checkIsProperFirstOrLastName(
        userInput.lastName,
        "Last name"
      );
    } catch (e) {
      errors.lastName = e.message;
    }

    //Validate City
    try {
      userInput.city = helper.checkCity(userInput.city);
    } catch (e) {
      errors.city = e.message;
    }

    //Validate State
    try {
      if (!helper.checkIsValidState(userInput.state)) {
        errors.state = "Error: State is not valid.";
      }
    } catch (e) {
      errors.state = e.message;
    }

    //Validate Desired Position
    try {
      if (userInput.desiredPosition) {
        userInput.desiredPosition = helper.checkIsProperString(
          userInput.desiredPosition,
          "Desired position"
        );
      }
    } catch (e) {
      errors.desiredPosition = e.message;
    }

    //Validate Dream Job
    try {
      if (userInput.dreamJob) {
        userInput.dreamJob = helper.checkIsProperString(
          userInput.dreamJob,
          "Dream job"
        );
      }
    } catch (e) {
      errors.dreamJob = e.message;
    }

    //Validate Email
    try {
      userInput.email = helper.validateEmail(userInput.email);
    } catch (e) {
      errors.email = e.message;
    }

    //Validate Password
    try {
      userInput.password = helper.checkPassword(userInput.password);
    } catch (e) {
      errors.password = e.message;
    }

    //Validate Confirm password
    try {
      userInput.confirmPassword = helper.checkPassword(
        userInput.confirmPassword
      );
      if (userInput.password !== userInput.confirmPassword) {
        errors.confirmPassword =
          "Error: Password and Confirm Password do not match. Please try again.";
      }
    } catch (e) {
      errors.confirmPassword = e.message;
    }

    //Check for Errors; if errors, respond with status 400
    if (Object.keys(errors).length !== 0) {
      res.status(400).render("register", {
        errors: errors,
        user: userInput,
        layout: "main",
        nav: "publicNav",
      });
      return;
    }

    //Register User
    try {
      const registerUser = await usersData.registerUser(
        userInput.firstName,
        userInput.lastName,
        userInput.city,
        userInput.state,
        userInput.email,
        userInput.password,
        userInput.desiredPosition,
        userInput.dreamJob
      );
      if (registerUser.signupCompleted) {
        res.render("login", {
          layout: "main",
          nav: "publicNav",
        });
      } else {
        res.status(500).render("errors", {
          layout: "main",
          nav: "publicNav",
          message: "Internal Server Error",
        });
      }
    } catch (e) {
      res.status(400).render("errors", {
        layout: "main",
        nav: "publicNav",
        message: e.message,
      });
    }
  });

export default router;
