import { Router } from "express";
import { companyData } from "../data/index.js";
import { validateId } from "../helpers.js";

const router = Router();

router.route("/companyNames").get(async (req, res) => {
  try {
    let allCompanyNames = await companyData.getAllCompanyNames();
    return res.json({ data: allCompanyNames });
  } catch (error) {
    return res.status.json({ error: error.messgae });
  }
});

router.route("/").get(async (req, res) => {
  const allCompanies = await companyData.getCompanies();
  res.render("companies", {
    companies: allCompanies,
    layout: "main",
    nav: "privateNav",
    stylesheets: "commonStylesheets",
    scripts: "companiesScript",
  });
});

router.route("/:id").get(async (req, res) => {
  let companyId = req.params.id;
  companyId = validateId(companyId, "company_Id");
  const getCompany = await companyData.getCompanyById(companyId);
  res.json(getCompany);
});

export default router;
