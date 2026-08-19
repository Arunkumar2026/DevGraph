import {
  getAllTechnologies,
  getTechnologyById,
  getTechnologyProjects,
  getTechnologyDevelopers,
} from "../services/technologyService.js";

export async function getTechnologies(req, res) {
  try {
    const technologies = await getAllTechnologies();

    res.json({
      status: "success",
      data: technologies,
    });
  } catch (error) {
    console.error(
      "Failed to fetch technologies:",
      error
    );

    res.status(500).json({
      status: "error",
      message: "Failed to fetch technologies",
    });
  }
}

export async function getTechnology(req, res) {
  try {
    const technology = await getTechnologyById(
      req.params.id
    );

    if (!technology) {
      return res.status(404).json({
        status: "error",
        message: "Technology not found",
      });
    }

    res.json({
      status: "success",
      data: technology,
    });
  } catch (error) {
    console.error(
      "Failed to fetch technology:",
      error
    );

    res.status(500).json({
      status: "error",
      message: "Failed to fetch technology",
    });
  }
}

export async function getTechnologyProjectsController(
  req,
  res
) {
  try {
    const projects = await getTechnologyProjects(
      req.params.id
    );

    res.json({
      status: "success",
      data: projects,
    });
  } catch (error) {
    console.error(
      "Failed to fetch technology projects:",
      error
    );

    res.status(500).json({
      status: "error",
      message: "Failed to fetch technology projects",
    });
  }
}

export async function getTechnologyDevelopersController(
  req,
  res
) {
  try {
    const developers = await getTechnologyDevelopers(
      req.params.id
    );

    res.json({
      status: "success",
      data: developers,
    });
  } catch (error) {
    console.error(
      "Failed to fetch technology developers:",
      error
    );

    res.status(500).json({
      status: "error",
      message: "Failed to fetch technology developers",
    });
  }
}