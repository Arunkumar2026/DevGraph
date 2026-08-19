import express from "express";

import {
  getSkills,
  getSkill,
  getSkillDevelopersController,
} from "../controllers/skillController.js";

const router = express.Router();

router.get("/", getSkills);

router.get("/:id", getSkill);

router.get("/:id/developers", getSkillDevelopersController);

export default router;