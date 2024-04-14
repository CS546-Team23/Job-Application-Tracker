import statsRoutes from "./statistics.js";

const constructorMethod = (app) => {
  app.use("/statistics", statsRoutes);

  app.use("*", (req, res) => {
    return res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
