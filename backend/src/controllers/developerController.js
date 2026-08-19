import {
  getDeveloperById,
  getDeveloperProjects,
  getDeveloperTechnologies,
  getDeveloperSkills,
  getDeveloperCompany,
  getAllDevelopers
} from "../services/developerService.js";

export async function getDeveloper(req, res) {
  try {
    const developer = await getDeveloperById(req.params.id);

    if (!developer) {
      return res.status(404).json({
        status: "error",
        message: "Developer not found",
      });
    }

    res.json({
      status: "success",
      data: developer,
    });
  } catch (error) {
    console.error("Failed to fetch developer:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch developer",
    });
  }
}

export async function getDeveloperProjectsController(req, res) {
  try {
    const projects = await getDeveloperProjects(req.params.id);

    res.json({
      status: "success",
      data: projects,
    });
  } catch (error) {
    console.error("Failed to fetch developer projects:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch developer projects",
    });
  }
}

export async function getDeveloperTechnologiesController(req, res) {
  try {
    const technologies = await getDeveloperTechnologies(req.params.id);

    res.json({
      status: "success",
      data: technologies,
    });
  } catch (error) {
    console.error("Failed to fetch developer technologies:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch developer technologies",
    });
  }
}

export async function getDeveloperSkillsController(req, res) {
  try {
    const skills = await getDeveloperSkills(req.params.id);

    res.json({
      status: "success",
      data: skills,
    });
  } catch (error) {
    console.error("Failed to fetch developer skills:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch developer skills",
    });
  }
}

export async function getDeveloperCompanyController(req, res) {
  try {
    const company = await getDeveloperCompany(req.params.id);

    if (!company) {
      return res.status(404).json({
        status: "error",
        message: "Company information not found",
      });
    }

    res.json({
      status: "success",
      data: company,
    });
  } catch (error) {
    console.error("Failed to fetch developer company:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch developer company",
    });
  }
}

export async function getAllDevelopersController(req, res) {
  try {
    const developers = await getAllDevelopers();

    res.json({
      status: "success",
      data: developers,
    });
  } catch (error) {
    console.error(
      "Failed to fetch developers:",
      error
    );

    res.status(500).json({
      status: "error",
      message: "Failed to fetch developers",
    });
  }
}

export async function getDevelopers(req, res) {
  try {
    const developers = await getAllDevelopers();

    res.json({
      status: "success",
      data: developers,
    });
  } catch (error) {
    console.error(
      "Failed to fetch developers:",
      error
    );

    res.status(500).json({
      status: "error",
      message: "Failed to fetch developers",
    });
  }
}