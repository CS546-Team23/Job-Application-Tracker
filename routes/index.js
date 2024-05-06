//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.
import userRoutes from "./users.js";
import registerRoute from "./register.js";
import loginRoute from "./login.js";
import apiRoute from "./api.js";
import { static as staticDir } from "express";
import statsRoutes from "./statistics.js";
import companyRoutes from "./companies.js";

import path from "path";

const constructorMethod = (app) => {
  app.use("/register", registerRoute);
  app.use("/", loginRoute);
  app.use("/", userRoutes);
  app.use("/statistics", statsRoutes);
  app.use("/api", apiRoute);
  app.use("/companies", companyRoutes);
  app.use("*", (req, res) => {
    return res.status(404).sendFile(path.resolve("static/pageNotFound.html"));
  });
};

export default constructorMethod;
