import express from "express";

import {
  getTechnologies,
  getTechnology,
  getTechnologyProjectsController,
  getTechnologyDevelopersController,
} from "../controllers/technologyController.js";

const router = express.Router();

router.get("/", getTechnologies);

router.get("/:id", getTechnology);

router.get("/:id/projects", getTechnologyProjectsController);

router.get("/:id/developers", getTechnologyDevelopersController);

export default router;