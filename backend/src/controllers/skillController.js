import {
  getAllSkills,
  getSkillById,
  getSkillDevelopers,
} from "../services/skillService.js";

export async function getSkills(req, res) {
  try {
    const skills = await getAllSkills();

    res.json({
      status: "success",
      data: skills,
    });
  } catch (error) {
    console.error("Failed to fetch skills:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch skills",
    });
  }
}

export async function getSkill(req, res) {
  try {
    const skill = await getSkillById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        status: "error",
        message: "Skill not found",
      });
    }

    res.json({
      status: "success",
      data: skill,
    });
  } catch (error) {
    console.error("Failed to fetch skill:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch skill",
    });
  }
}

export async function getSkillDevelopersController(req, res) {
  try {
    const developers = await getSkillDevelopers(req.params.id);

    res.json({
      status: "success",
      data: developers,
    });
  } catch (error) {
    console.error("Failed to fetch skill developers:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch skill developers",
    });
  }
}