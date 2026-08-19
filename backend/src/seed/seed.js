import driver from "../config/database.js";

export async function seedDatabase() {
  const session = driver.session();

  try {
    await session.run(`
      MERGE (arun:Developer {
        id: "dev001"
      })
      SET
        arun.name = "Arun Kumar",
        arun.email = "arun@example.com",
        arun.location = "Hyderabad",
        arun.experience = 2

      MERGE (rahul:Developer {
        id: "dev002"
      })
      SET
        rahul.name = "Rahul Sharma",
        rahul.email = "rahul@example.com",
        rahul.location = "Bangalore",
        rahul.experience = 4

      MERGE (priya:Developer {
        id: "dev003"
      })
      SET
        priya.name = "Priya Reddy",
        priya.email = "priya@example.com",
        priya.location = "Hyderabad",
        priya.experience = 3
    `);

    await session.run(`
      MERGE (devGraph:Project {
        id: "project001"
      })
      SET
        devGraph.name = "DevGraph",
        devGraph.description = "Developer relationship graph",
        devGraph.status = "Active"

      MERGE (shopZone:Project {
        id: "project002"
      })
      SET
        shopZone.name = "ShopZone",
        shopZone.description = "E-commerce application",
        shopZone.status = "Completed"

      MERGE (cityRide:Project {
        id: "project003"
      })
      SET
        cityRide.name = "CityRide",
        cityRide.description = "Smart city bus application",
        cityRide.status = "Active"
    `);

    await session.run(`
      MERGE (react:Technology {
        id: "tech001"
      })
      SET
        react.name = "React",
        react.category = "Frontend"

      MERGE (node:Technology {
        id: "tech002"
      })
      SET
        node.name = "Node.js",
        node.category = "Backend"

      MERGE (javascript:Technology {
        id: "tech003"
      })
      SET
        javascript.name = "JavaScript",
        javascript.category = "Programming Language"

      MERGE (neo4j:Technology {
        id: "tech004"
      })
      SET
        neo4j.name = "Neo4j",
        neo4j.category = "Database"
    `);

    await session.run(`
      MERGE (frontend:Skill {
        id: "skill001"
      })
      SET
        frontend.name = "Frontend Development",
        frontend.category = "Development"

      MERGE (backend:Skill {
        id: "skill002"
      })
      SET
        backend.name = "Backend Development",
        backend.category = "Development"

      MERGE (database:Skill {
        id: "skill003"
      })
      SET
        database.name = "Database Design",
        database.category = "Database"

      MERGE (api:Skill {
        id: "skill004"
      })
      SET
        api.name = "REST API Development",
        api.category = "Backend"
    `);

    await session.run(`
      MERGE (techCorp:Company {
        id: "company001"
      })
      SET
        techCorp.name = "TechCorp",
        techCorp.location = "Hyderabad",
        techCorp.industry = "Software"

      MERGE (codeLabs:Company {
        id: "company002"
      })
      SET
        codeLabs.name = "CodeLabs",
        codeLabs.location = "Bangalore",
        codeLabs.industry = "Technology"
    `);

    await session.run(`
      MATCH (arun:Developer {id: "dev001"})
      MATCH (rahul:Developer {id: "dev002"})
      MATCH (priya:Developer {id: "dev003"})

      MATCH (devGraph:Project {id: "project001"})
      MATCH (shopZone:Project {id: "project002"})
      MATCH (cityRide:Project {id: "project003"})

      MATCH (react:Technology {id: "tech001"})
      MATCH (node:Technology {id: "tech002"})
      MATCH (javascript:Technology {id: "tech003"})
      MATCH (neo4j:Technology {id: "tech004"})

      MATCH (frontend:Skill {id: "skill001"})
      MATCH (backend:Skill {id: "skill002"})
      MATCH (database:Skill {id: "skill003"})
      MATCH (api:Skill {id: "skill004"})

      MATCH (techCorp:Company {id: "company001"})
      MATCH (codeLabs:Company {id: "company002"})

      MERGE (arun)-[:WORKS_ON {role: "Full Stack Developer"}]->(devGraph)
      MERGE (arun)-[:WORKS_ON {role: "Frontend Developer"}]->(shopZone)

      MERGE (rahul)-[:WORKS_ON {role: "Backend Developer"}]->(devGraph)
      MERGE (rahul)-[:WORKS_ON {role: "Backend Developer"}]->(cityRide)

      MERGE (priya)-[:WORKS_ON {role: "Frontend Developer"}]->(shopZone)
      MERGE (priya)-[:WORKS_ON {role: "Full Stack Developer"}]->(cityRide)

      MERGE (arun)-[:KNOWS {level: "Advanced"}]->(frontend)
      MERGE (arun)-[:KNOWS {level: "Advanced"}]->(backend)
      MERGE (arun)-[:KNOWS {level: "Intermediate"}]->(database)

      MERGE (rahul)-[:KNOWS {level: "Advanced"}]->(backend)
      MERGE (rahul)-[:KNOWS {level: "Advanced"}]->(api)
      MERGE (rahul)-[:KNOWS {level: "Advanced"}]->(database)

      MERGE (priya)-[:KNOWS {level: "Advanced"}]->(frontend)
      MERGE (priya)-[:KNOWS {level: "Intermediate"}]->(api)

      MERGE (arun)-[:USES {proficiency: "Advanced"}]->(react)
      MERGE (arun)-[:USES {proficiency: "Advanced"}]->(node)
      MERGE (arun)-[:USES {proficiency: "Advanced"}]->(javascript)

      MERGE (rahul)-[:USES {proficiency: "Advanced"}]->(node)
      MERGE (rahul)-[:USES {proficiency: "Advanced"}]->(javascript)

      MERGE (priya)-[:USES {proficiency: "Advanced"}]->(react)
      MERGE (priya)-[:USES {proficiency: "Advanced"}]->(javascript)

      MERGE (arun)-[:WORKS_AT {role: "Full Stack Developer"}]->(techCorp)
      MERGE (rahul)-[:WORKS_AT {role: "Backend Developer"}]->(codeLabs)
      MERGE (priya)-[:WORKS_AT {role: "Frontend Developer"}]->(techCorp)

      MERGE (devGraph)-[:USES]->(react)
      MERGE (devGraph)-[:USES]->(node)
      MERGE (devGraph)-[:USES]->(neo4j)

      MERGE (shopZone)-[:USES]->(react)
      MERGE (shopZone)-[:USES]->(node)

      MERGE (cityRide)-[:USES]->(react)
      MERGE (cityRide)-[:USES]->(node)
      MERGE (cityRide)-[:USES]->(javascript)
    `);

    return true;
  } finally {
    await session.close();
  }
}