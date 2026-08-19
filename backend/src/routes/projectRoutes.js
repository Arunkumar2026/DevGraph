import express from "express";

import {
  getProjects,
  getProject,
  getProjectDevelopersController,
  getProjectTechnologiesController,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);

router.get("/:id", getProject);

router.get("/:id/developers", getProjectDevelopersController);

router.get("/:id/technologies", getProjectTechnologiesController);

export default router;