import express from "express";

import {
  getDeveloper,
  getDevelopers,
  getDeveloperProjectsController,
  getDeveloperTechnologiesController,
  getDeveloperSkillsController,
  getDeveloperCompanyController,
  getAllDevelopersController
} from "../controllers/developerController.js";

const router = express.Router();

router.get("/", getDevelopers);

router.get("/:id", getDeveloper);

router.get("/:id/projects", getDeveloperProjectsController);

router.get("/:id/technologies", getDeveloperTechnologiesController);

router.get("/:id/skills", getDeveloperSkillsController);

router.get("/:id/company", getDeveloperCompanyController);

export default router;