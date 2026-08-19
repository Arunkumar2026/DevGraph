import express from "express";

import {
  getDeveloperGraphController,
  getDeveloperProjectTechnologyController,
  getTechnologyDeveloperProjectsController,
  getRelatedDevelopersController,
  getDevelopersByProjectTechnologyController,
  getProjectGraphController,
  getTechnologyGraphController,
  getCompanyGraphController,
} from "../controllers/graphController.js";

const router = express.Router();

router.get(
  "/developers/:id",
  getDeveloperGraphController
);

router.get(
  "/developers/:id/project-technologies",
  getDeveloperProjectTechnologyController
);

router.get(
  "/technologies/:id/developers",
  getTechnologyDeveloperProjectsController
);

router.get(
  "/developers/:id/related",
  getRelatedDevelopersController
);

router.get(
  "/projects/:id/recommended-developers",
  getDevelopersByProjectTechnologyController
);

router.get(
  "/projects/:id",
  getProjectGraphController
);

router.get(
  "/technologies/:id",
  getTechnologyGraphController
);

router.get(
  "/companies/:id",
  getCompanyGraphController
);

export default router;