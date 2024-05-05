import { Router } from "express";
import { companyData } from "../data/index.js";
import { validateId } from "../helpers.js";

const router = Router();

router.route("/").get(async (req, res) => {
  //return res.sendFile(path.resolve("static/landing.html"));
  const allCompanies = await companyData.getCompanies();
  res.render("companies", {
    companies: allCompanies,
    layout: "main",
    nav: "privateNav",
    stylesheets: "commonStylesheets",
    scripts: "profileScript",
  });
});
router.route("/:id").get(async (req, res) => {
  //return res.sendFile(path.resolve("static/landing.html"));
  let companyId = req.params.id;
  companyId = validateId(companyId, "company_Id");
  const getCompany = await companyData.getCompanyById(companyId);
  res.json(getCompany);
});

export default router;
