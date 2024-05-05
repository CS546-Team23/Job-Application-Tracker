import { Router } from "express";
const router = Router();
import { usersData } from "../data/index.js";
import * as helper from "../helpers.js";
import xss from "xss";

router
  .route("/login")
  .get(async (req, res) => {
    try {
      res.render("login", {
        layout: "main",
        nav: "publicNav",
        stylesheets: 'commonStylesheets',
        scripts: 'registerLoginScripts'
      });
    } catch (e) {
      return res.status(404).render("errors", {
        layout: "main",
        nav: "publicNav",
        message: e.message,
        stylesheets: 'commonStylesheets',
        scripts: 'commonScripts',
      });
    }
  })
  .post(async (req, res) => {
    const userInput = req.body;
    for (let key in userInput) {
      userInput[key] = xss(userInput[key]);
    }
    let errors = {};

    //Validate email
    try {
      userInput.email = helper.validateEmail(userInput.email);
    } catch (e) {
      errors.email = e.message;
    }

    //Validate password
    try {
      userInput.password = helper.checkPassword(userInput.password);
    } catch (e) {
      errors.password = e.message;
    }

    //Check for errors; if errors, respond with status 400
    if (Object.keys(errors).length !== 0) {
      res.status(400).render("login", {
        layout: "main",
        nav: "publicNav",
        errors: errors,
        stylesheets: 'commonStylesheets',
        scripts: 'registerLoginScripts',
      });
    }

    //Login in user
    try {
      const loginUser = await usersData.loginUser(
        userInput.email,
        userInput.password
      );
      if (loginUser) {
        req.session.user = {
          userId: loginUser._id.toString(),
          firstName: loginUser.firstName,
          lastName: loginUser.lastName,
          city: loginUser.city,
          state: loginUser.state,
          desiredPosition: loginUser.desiredPosition,
          dreamJob: loginUser.dreamJob,
          email: loginUser.email,
        };
        res
          .cookie("AuthenticationState", "Authenticated")
          .redirect("/dashboard");
      } else {
        res.status(400).render("login", {
          layout: "main",
          nav: "publicNav",
          message: "Incorrect username and/or password. Please try again.",
          stylesheets: 'commonStylesheets',
          scripts: 'registerLoginScripts',
        });
      }
    } catch (e) {
      res.status(400).render("errors", {
        layout: "main",
        nav: "publicNav",
        message: e.message,
        stylesheets: 'commonStylesheets',
        scripts: 'commonScripts',
      });
    }
  });

router.route("/logout").get(async (req, res) => {
  if (req.session.user) req.session.destroy();
  return res.redirect("/login");
});

export default router;
