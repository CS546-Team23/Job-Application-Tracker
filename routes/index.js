//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.
import userRoutes from "./users.js";
import registerRoute from "./register.js";
import loginRoute from "./login.js";
import apiRoute from "./api.js";
import { static as staticDir } from "express";
import statsRoutes from "./statistics.js";
import companyRoutes from "./companies.js"
import mapRoutes from "./maps.js"

const constructorMethod = (app) => {
  app.use("/register", registerRoute);
  app.use("/", loginRoute);
  app.use("/", userRoutes);
  app.use("/statistics", statsRoutes);
  app.use("/api", apiRoute);
  app.use("/companies", companyRoutes);
  app.use("/map", mapRoutes);

  app.use("*", (req, res) => {
    return res.status(404).render("errors", {
      layout: "main",
      nav: req.session.user ? "privateNav" : "publicNav",
      message: "404 Error\nPage Not Found",
      stylesheets: "commonStylesheets",
      scripts: "applicationScript",
    });

  });
};

export default constructorMethod;
