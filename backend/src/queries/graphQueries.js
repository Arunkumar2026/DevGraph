export const getDeveloperGraphQuery = `

  MATCH (d:Developer {id: $developerId})

  OPTIONAL MATCH (d)-[works:WORKS_ON]->(p:Project)

  OPTIONAL MATCH (p)-[uses:USES]->(t:Technology)

  OPTIONAL MATCH (d)-[knows:KNOWS]->(s:Skill)

  OPTIONAL MATCH (d)-[worksAt:WORKS_AT]->(c:Company)

  RETURN

    d AS developer,

    collect(DISTINCT {
      project: p,
      role: works.role
    }) AS projects,

    collect(DISTINCT {
      technology: t
    }) AS technologies,

    collect(DISTINCT {
      project: p,
      technology: t
    }) AS projectTechnologies,

    collect(DISTINCT {
      skill: s,
      level: knows.level
    }) AS skills,

    collect(DISTINCT {
      company: c,
      role: worksAt.role
    }) AS companies

`;

export const getDeveloperProjectTechnologyQuery = `
  MATCH (d:Developer {id: $developerId})
        -[:WORKS_ON]->
        (p:Project)
        -[:USES]->
        (t:Technology)

  RETURN DISTINCT
    d.name AS developer,
    p.name AS project,
    t.name AS technology,
    t.category AS category
  ORDER BY project, technology
`;

export const getTechnologyDeveloperProjectsQuery = `
  MATCH (d:Developer)
        -[:WORKS_ON]->
        (p:Project)
        -[:USES]->
        (t:Technology {id: $technologyId})

  RETURN DISTINCT
    t.name AS technology,
    d.id AS developerId,
    d.name AS developer,
    p.id AS projectId,
    p.name AS project
  ORDER BY developer, project
`;

export const getRelatedDevelopersQuery = `
  MATCH (d1:Developer {id: $developerId})
        -[:KNOWS]->
        (s:Skill)
        <-[:KNOWS]-
        (d2:Developer)

  WHERE d1.id <> d2.id

  RETURN
    d2.id AS developerId,
    d2.name AS developer,
    collect(DISTINCT s.name) AS sharedSkills
  ORDER BY developer
`;

export const getDevelopersByProjectTechnologyQuery = `
  MATCH (p:Project {id: $projectId})
        -[:USES]->
        (t:Technology)
        <-[:USES]-
        (otherProject:Project)
        <-[:WORKS_ON]-
        (d:Developer)

  WHERE otherProject.id <> p.id

  RETURN DISTINCT
    d.id AS developerId,
    d.name AS developer,
    collect(DISTINCT t.name) AS matchingTechnologies
  ORDER BY developer
`;

// --------------------------------------
// Project Graph
// --------------------------------------

export const getProjectGraphQuery = `
  MATCH (p:Project {id: $projectId})

  OPTIONAL MATCH (d:Developer)-[works:WORKS_ON]->(p)

  OPTIONAL MATCH (p)-[:USES]->(t:Technology)

  RETURN
    p AS project,

    collect(DISTINCT {
      developer: d,
      role: works.role
    }) AS developers,

    collect(DISTINCT {
      technology: t
    }) AS technologies
`;


// --------------------------------------
// Technology Graph
// --------------------------------------

export const getTechnologyGraphQuery = `
  MATCH (t:Technology {id: $technologyId})

  OPTIONAL MATCH (p:Project)-[:USES]->(t)

  OPTIONAL MATCH (d:Developer)-[works:WORKS_ON]->(p)

  RETURN
    t AS technology,

    collect(DISTINCT {
      project: p
    }) AS projects,

    collect(DISTINCT {
      developer: d,
      project: p,
      role: works.role
    }) AS developers
`;


// --------------------------------------
// Company Graph
// --------------------------------------

export const getCompanyGraphQuery = `
  MATCH (c:Company {id: $companyId})

  OPTIONAL MATCH (d:Developer)-[worksAt:WORKS_AT]->(c)

  RETURN
    c AS company,

    collect(DISTINCT {
      developer: d,
      role: worksAt.role
    }) AS developers
`;