import driver from "../config/database.js";

export async function createTestGraph() {
    const session = driver.session();

    try {
        const result = await session.run(`
            CREATE (d:Developer {
                id: "dev001",
                name: "Arun Kumar",
                location: "Hyderabad",
                experience: 2
            })
                
            CREATE (p:Project {
                id: "project001",
                name: "DevGraph",
                description: "Developer relationship graph",
                status: "Active"
            })
            
            CREATE (t:Technology {
                id: "tech001",
                name: "React",
                category: "Frontend"
            })

            CREATE (d)-[:WORKS_ON {
                role: "Full Stack Developer"
            }]->(p)
                
            CREATE (p)-[:USES]->(t)
                
            RETURN d, p, t
        `);

        return result.records;
    } finally{
        await session.close();
    }
}


export async function getTestGraph(){
    const session = driver.session();

    try {
        const result = await session.run(`
            MATCH (d:Developer)-[r:WORKS_ON]->(p:Project)-[:USES]->(t:Technology)
            RETURN
                d.name AS developer,
                type(r) AS relationship,
                p.name AS project,
                t.name AS technology
            `);

            return result.records.map((record) => ({
                developer: record.get("developer"),
                relationship: record.get("relationship"),
                projects: record.get("project"),
                technology: record.get("technology"),
            }));
    } finally {
        await session.close();
    }
};


export async function getAllTestData() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (n)
      RETURN labels(n) AS labels, n
    `);

    return result.records.map((record) => ({
      labels: record.get("labels"),
      properties: record.get("n").properties,
    }));
  } finally {
    await session.close();
  }
};

export async function getTestRelationships() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (a)-[r]->(b)
      RETURN
        labels(a) AS fromLabels,
        a.name AS fromName,
        type(r) AS relationship,
        labels(b) AS toLabels,
        b.name AS toName
    `);

    return result.records.map((record) => ({
      from: {
        labels: record.get("fromLabels"),
        name: record.get("fromName"),
      },
      relationship: record.get("relationship"),
      to: {
        labels: record.get("toLabels"),
        name: record.get("toName"),
      },
    }));
  } finally {
    await session.close();
  }
};

export async function deleteTestGraph() {
  const session = driver.session();

  try {
    await session.run(`
      MATCH (n)
      WHERE n.id IN ["dev001", "project001", "tech001"]
      DETACH DELETE n
    `);

    return true;
  } finally {
    await session.close();
  }
}