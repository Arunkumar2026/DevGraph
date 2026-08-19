import driver from "../config/database.js";

import {
  getAllCompaniesQuery,
  getCompanyByIdQuery,
  getCompanyDevelopersQuery,
} from "../queries/companyQueries.js";

export async function getAllCompanies() {
  const session = driver.session();

  try {
    const result = await session.run(
      getAllCompaniesQuery
    );

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      location: record.get("location"),
      industry: record.get("industry"),
    }));
  } finally {
    await session.close();
  }
}

export async function getCompanyById(companyId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getCompanyByIdQuery,
      { companyId }
    );

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      id: record.get("id"),
      name: record.get("name"),
      location: record.get("location"),
      industry: record.get("industry"),
    };
  } finally {
    await session.close();
  }
}

export async function getCompanyDevelopers(companyId) {
  const session = driver.session();

  try {
    const result = await session.run(
      getCompanyDevelopersQuery,
      { companyId }
    );

    return result.records.map((record) => ({
      developerId: record.get("developerId"),
      developer: record.get("developer"),
      location: record.get("location"),
      experience: record.get("experience"),
      role: record.get("role"),
    }));
  } finally {
    await session.close();
  }
}