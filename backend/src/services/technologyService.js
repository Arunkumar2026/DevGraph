import driver from "../config/database.js";

import {
  getAllTechnologiesQuery,
  getTechnologyByIdQuery,
  getTechnologyProjectsQuery,
  getTechnologyDevelopersQuery,
} from "../queries/technologyQueries.js";

export async function getAllTechnologies() {
  const session = driver.session();

  try {
    const result = await session.run(
      getAllTechnologiesQuery
    );

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      category: record.get("category"),
    }));
  } finally {
    await session.close();
  }
}

export async function getTechnologyById(technologyId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getTechnologyByIdQuery,
      { technologyId }
    );

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      id: record.get("id"),
      name: record.get("name"),
      category: record.get("category"),
    };
  } finally {
    await session.close();
  }
}

export async function getTechnologyProjects(technologyId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getTechnologyProjectsQuery,
      { technologyId }
    );

    return result.records.map((record) => ({
      projectId: record.get("projectId"),
      project: record.get("project"),
      description: record.get("description"),
      status: record.get("status"),
    }));
  } finally {
    await session.close();
  }
}

export async function getTechnologyDevelopers(technologyId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getTechnologyDevelopersQuery,
      { technologyId }
    );

    return result.records.map((record) => ({
      developerId: record.get("developerId"),
      developer: record.get("developer"),
      location: record.get("location"),
      experience: record.get("experience").toNumber(),
    }));
  } finally {
    await session.close();
  }
}