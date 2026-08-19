import driver from "../config/database.js";

export async function getGraphStats() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (n)
      RETURN
        labels(n)[0] AS type,
        count(n) AS count
      ORDER BY type
    `);

    return result.records.map((record) => ({
      type: record.get("type"),
      count: record.get("count").toNumber(),
    }));
  } finally {
    await session.close();
  }
}