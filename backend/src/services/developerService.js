import driver from "../config/database.js";

import {
  getDeveloperByIdQuery,
  getDeveloperProjectsQuery,
  getDeveloperTechnologiesQuery,
  getDeveloperSkillsQuery,
  getDeveloperCompanyQuery,
  getAllDevelopersQuery
} from "../queries/developerQueries.js";

export async function getAllDevelopers() {
  const session = driver.session();

  try {
    const result = await session.run(
      getAllDevelopersQuery
    );

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      email: record.get("email"),
      location: record.get("location"),
      experience: record.get("experience").toNumber(),
    }));
  } finally {
    await session.close();
  }
}

export async function getDeveloperById(developerId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getDeveloperByIdQuery,
      { developerId }
    );

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      id: record.get("id"),
      name: record.get("name"),
      email: record.get("email"),
      location: record.get("location"),
      experience: record.get("experience").toNumber(),
    };
  } finally {
    await session.close();
  }
}

export async function getDeveloperProjects(developerId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getDeveloperProjectsQuery,
      { developerId }
    );

    return result.records.map((record) => ({
      developerId: record.get("developerId"),
      developer: record.get("developer"),
      projectId: record.get("projectId"),
      project: record.get("project"),
      description: record.get("description"),
      status: record.get("status"),
      role: record.get("role"),
    }));
  } finally {
    await session.close();
  }
}

export async function getDeveloperTechnologies(developerId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getDeveloperTechnologiesQuery,
      { developerId }
    );

    return result.records.map((record) => ({
      developerId: record.get("developerId"),
      developer: record.get("developer"),
      projectId: record.get("projectId"),
      project: record.get("project"),
      technologyId: record.get("technologyId"),
      technology: record.get("technology"),
      category: record.get("category"),
    }));
  } finally {
    await session.close();
  }
}

export async function getDeveloperSkills(developerId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getDeveloperSkillsQuery,
      { developerId }
    );

    return result.records.map((record) => ({
      skillId: record.get("skillId"),
      skill: record.get("skill"),
      category: record.get("category"),
      level: record.get("level"),
    }));
  } finally {
    await session.close();
  }
}

export async function getDeveloperCompany(developerId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getDeveloperCompanyQuery,
      { developerId }
    );

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      companyId: record.get("companyId"),
      company: record.get("company"),
      location: record.get("location"),
      industry: record.get("industry"),
      role: record.get("role"),
    };
  } finally {
    await session.close();
  }
}
