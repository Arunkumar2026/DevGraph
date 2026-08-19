import driver from "../config/database.js";

import {
  getDeveloperGraphQuery,
  getDeveloperProjectTechnologyQuery,
  getTechnologyDeveloperProjectsQuery,
  getRelatedDevelopersQuery,
  getDevelopersByProjectTechnologyQuery,
  getProjectGraphQuery,
  getTechnologyGraphQuery,
  getCompanyGraphQuery,
} from "../queries/graphQueries.js";

export async function getDeveloperGraph(developerId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getDeveloperGraphQuery,
      { developerId }
    );

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    const developerNode = record.get("developer");

    return {
      developer: developerNode.properties,
      projects: record.get("projects"),
      technologies: record.get("technologies"),
      projectTechnologies: record.get("projectTechnologies"),
      skills: record.get("skills"),
      companies: record.get("companies"),
};
  } finally {
    await session.close();
  }
}

export async function getDeveloperProjectTechnology(developerId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getDeveloperProjectTechnologyQuery,
      { developerId }
    );

    return result.records.map((record) => ({
      developer: record.get("developer"),
      project: record.get("project"),
      technology: record.get("technology"),
      category: record.get("category"),
    }));
  } finally {
    await session.close();
  }
}

export async function getTechnologyDeveloperProjects(technologyId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getTechnologyDeveloperProjectsQuery,
      { technologyId }
    );

    return result.records.map((record) => ({
      technology: record.get("technology"),
      developerId: record.get("developerId"),
      developer: record.get("developer"),
      projectId: record.get("projectId"),
      project: record.get("project"),
    }));
  } finally {
    await session.close();
  }
}

export async function getRelatedDevelopers(developerId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getRelatedDevelopersQuery,
      { developerId }
    );

    return result.records.map((record) => ({
      developerId: record.get("developerId"),
      developer: record.get("developer"),
      sharedSkills: record.get("sharedSkills"),
    }));
  } finally {
    await session.close();
  }
}

export async function getDevelopersByProjectTechnology(projectId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getDevelopersByProjectTechnologyQuery,
      { projectId }
    );

    return result.records.map((record) => ({
      developerId: record.get("developerId"),
      developer: record.get("developer"),
      matchingTechnologies: record.get("matchingTechnologies"),
    }));
  } finally {
    await session.close();
  }
}

export async function getProjectGraph(projectId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getProjectGraphQuery,
      { projectId }
    );

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      project: record.get("project").properties,
      developers: record.get("developers"),
      technologies: record.get("technologies"),
    };
  } finally {
    await session.close();
  }
}


export async function getTechnologyGraph(technologyId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getTechnologyGraphQuery,
      { technologyId }
    );

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      technology: record.get("technology").properties,
      projects: record.get("projects"),
      developers: record.get("developers"),
    };
  } finally {
    await session.close();
  }
}


export async function getCompanyGraph(companyId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getCompanyGraphQuery,
      { companyId }
    );

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      company: record.get("company").properties,
      developers: record.get("developers"),
    };
  } finally {
    await session.close();
  }
}