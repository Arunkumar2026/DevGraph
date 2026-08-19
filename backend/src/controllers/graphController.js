import {
  getDeveloperGraph,
  getDeveloperProjectTechnology,
  getTechnologyDeveloperProjects,
  getRelatedDevelopers,
  getDevelopersByProjectTechnology,
  getProjectGraph,
  getTechnologyGraph,
  getCompanyGraph,
} from "../services/graphService.js";

export async function getDeveloperGraphController(req, res) {
  try {
    const graph = await getDeveloperGraph(req.params.id);

    if (!graph) {
      return res.status(404).json({
        status: "error",
        message: "Developer graph not found",
      });
    }

    res.json({
      status: "success",
      data: graph,
    });
  } catch (error) {
    console.error("Failed to fetch developer graph:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch developer graph",
    });
  }
}

export async function getDeveloperProjectTechnologyController(req, res) {
  try {
    const data = await getDeveloperProjectTechnology(req.params.id);

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Failed to fetch developer project technologies:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch developer project technologies",
    });
  }
}

export async function getTechnologyDeveloperProjectsController(req, res) {
  try {
    const data = await getTechnologyDeveloperProjects(req.params.id);

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Failed to fetch technology developer projects:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch technology developer projects",
    });
  }
}

export async function getRelatedDevelopersController(req, res) {
  try {
    const data = await getRelatedDevelopers(req.params.id);

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error("Failed to fetch related developers:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch related developers",
    });
  }
}

export async function getDevelopersByProjectTechnologyController(req, res) {
  try {
    const data = await getDevelopersByProjectTechnology(req.params.id);

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    console.error(
      "Failed to fetch developers by project technology:",
      error
    );

    res.status(500).json({
      status: "error",
      message: "Failed to fetch developers by project technology",
    });
  }
}

export async function getProjectGraphController(req, res) {
  try {
    const graph = await getProjectGraph(req.params.id);

    if (!graph) {
      return res.status(404).json({
        status: "error",
        message: "Project graph not found",
      });
    }

    res.json({
      status: "success",
      data: graph,
    });
  } catch (error) {
    console.error("Failed to fetch project graph:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch project graph",
    });
  }
}


export async function getTechnologyGraphController(req, res) {
  try {
    const graph = await getTechnologyGraph(req.params.id);

    if (!graph) {
      return res.status(404).json({
        status: "error",
        message: "Technology graph not found",
      });
    }

    res.json({
      status: "success",
      data: graph,
    });
  } catch (error) {
    console.error("Failed to fetch technology graph:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch technology graph",
    });
  }
}


export async function getCompanyGraphController(req, res) {
  try {
    const graph = await getCompanyGraph(req.params.id);

    if (!graph) {
      return res.status(404).json({
        status: "error",
        message: "Company graph not found",
      });
    }

    res.json({
      status: "success",
      data: graph,
    });
  } catch (error) {
    console.error("Failed to fetch company graph:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch company graph",
    });
  }
}