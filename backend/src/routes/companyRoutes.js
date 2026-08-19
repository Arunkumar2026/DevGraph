import express from "express";

import {
  getCompanies,
  getCompany,
  getCompanyDevelopersController,
} from "../controllers/companyController.js";

const router = express.Router();

router.get("/", getCompanies);

router.get("/:id", getCompany);

router.get(
  "/:id/developers",
  getCompanyDevelopersController
);

export default router;