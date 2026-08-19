import {
  getAllProjects,
  getProjectById,
  getProjectDevelopers,
  getProjectTechnologies,
} from "../services/projectService.js";

export async function getProjects(req, res) {
  try {
    const projects = await getAllProjects();

    res.json({
      status: "success",
      data: projects,
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch projects",
    });
  }
}

export async function getProject(req, res) {
  try {
    const project = await getProjectById(req.params.id);

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    res.json({
      status: "success",
      data: project,
    });
  } catch (error) {
    console.error("Failed to fetch project:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch project",
    });
  }
}

export async function getProjectDevelopersController(req, res) {
  try {
    const developers = await getProjectDevelopers(
      req.params.id
    );

    res.json({
      status: "success",
      data: developers,
    });
  } catch (error) {
    console.error(
      "Failed to fetch project developers:",
      error
    );

    res.status(500).json({
      status: "error",
      message: "Failed to fetch project developers",
    });
  }
}

export async function getProjectTechnologiesController(req, res) {
  try {
    const technologies = await getProjectTechnologies(
      req.params.id
    );

    res.json({
      status: "success",
      data: technologies,
    });
  } catch (error) {
    console.error(
      "Failed to fetch project technologies:",
      error
    );

    res.status(500).json({
      status: "error",
      message: "Failed to fetch project technologies",
    });
  }
}