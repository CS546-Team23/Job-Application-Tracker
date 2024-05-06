import { Router } from "express";
import { companyData } from "../data/index.js";
import { validateId } from "../helpers.js";

const router = Router();

router.route("/companyNames").get(async (req, res) => {
  try {
    let allCompanyNames = await companyData.getAllCompanyNames();
    return res.json({ data: allCompanyNames });
  } catch (error) {
    return res.status(500).json({ error: error.messgae });
  }
});

router.route("/").get(async (req, res) => {
  try {
    const allCompanies = await companyData.getCompanies();
    return res.render("companies", {
      companies: allCompanies,
      layout: "main",
      nav: "privateNav",
      stylesheets: "commonStylesheets",
      scripts: "companiesScript",
    });
  } catch (error) {
    return res.status(500).render("errors", {
      layout: "main",
      nav: "privateNav",
      message: "Internal Server Error",
      stylesheets: "commonStylesheets",
      scripts: "commonScripts",
    });
  }
});

router.route("/:id").get(async (req, res) => {
  let companyId = req.params.id;
  try {
    companyId = validateId(companyId, "company_Id");
  } catch (error) {
    return res.status(400).json(error.message);
  }

  try {
    const getCompany = await companyData.getCompanyById(companyId);
    return res.json(getCompany);
  } catch (error) {
    return res.status(404).json(error.message);
  }
});

export default router;
