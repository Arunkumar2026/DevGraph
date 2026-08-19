import driver from "../config/database.js";

import {
  getAllProjectsQuery,
  getProjectByIdQuery,
  getProjectDevelopersQuery,
  getProjectTechnologiesQuery,
} from "../queries/projectQueries.js";

export async function getAllProjects() {
  const session = driver.session();

  try {
    const result = await session.run(
      getAllProjectsQuery
    );

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      description: record.get("description"),
      status: record.get("status"),
    }));
  } finally {
    await session.close();
  }
}

export async function getProjectById(projectId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getProjectByIdQuery,
      { projectId }
    );

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      id: record.get("id"),
      name: record.get("name"),
      description: record.get("description"),
      status: record.get("status"),
    };
  } finally {
    await session.close();
  }
}

export async function getProjectDevelopers(projectId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getProjectDevelopersQuery,
      { projectId }
    );

    return result.records.map((record) => ({
      developerId: record.get("developerId"),
      developer: record.get("developer"),
      location: record.get("location"),
      experience: record.get("experience").toNumber(),
      role: record.get("role"),
    }));
  } finally {
    await session.close();
  }
}

export async function getProjectTechnologies(projectId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getProjectTechnologiesQuery,
      { projectId }
    );

    return result.records.map((record) => ({
      technologyId: record.get("technologyId"),
      technology: record.get("technology"),
      category: record.get("category"),
    }));
  } finally {
    await session.close();
  }
}