import driver from "../config/database.js";

import {
  globalSearchQuery,
} from "../queries/searchQueries.js";

export async function globalSearch(query) {
  const session = driver.session();

  try {
    const result = await session.run(
      globalSearchQuery,
      { query }
    );

    return result.records.map((record) => ({
      type: record.get("type"),
      id: record.get("id"),
      name: record.get("name"),
    }));
  } finally {
    await session.close();
  }
}