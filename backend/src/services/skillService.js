import driver from "../config/database.js";

import {
  getAllSkillsQuery,
  getSkillByIdQuery,
  getSkillDevelopersQuery,
} from "../queries/skillQueries.js";

export async function getAllSkills() {
  const session = driver.session();

  try {
    const result = await session.run(getAllSkillsQuery);

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      category: record.get("category"),
    }));
  } finally {
    await session.close();
  }
}

export async function getSkillById(skillId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getSkillByIdQuery,
      { skillId }
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

export async function getSkillDevelopers(skillId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getSkillDevelopersQuery,
      { skillId }
    );

    return result.records.map((record) => ({
      developerId: record.get("developerId"),
      developer: record.get("developer"),
      location: record.get("location"),
      experience: record.get("experience").toNumber(),
      level: record.get("level"),
    }));
  } finally {
    await session.close();
  }
}