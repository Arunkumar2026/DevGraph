export const getDeveloperByIdQuery = `
  MATCH (d:Developer {id: $developerId})
  RETURN
    d.id AS id,
    d.name AS name,
    d.email AS email,
    d.location AS location,
    d.experience AS experience
`;

export const getDeveloperProjectsQuery = `
  MATCH (d:Developer {id: $developerId})
        -[r:WORKS_ON]->
        (p:Project)

  RETURN
    d.id AS developerId,
    d.name AS developer,
    p.id AS projectId,
    p.name AS project,
    p.description AS description,
    p.status AS status,
    r.role AS role
`;

export const getDeveloperTechnologiesQuery = `
  MATCH (d:Developer {id: $developerId})
        -[:WORKS_ON]->
        (p:Project)
        -[:USES]->
        (t:Technology)

  RETURN DISTINCT
    d.id AS developerId,
    d.name AS developer,
    p.id AS projectId,
    p.name AS project,
    t.id AS technologyId,
    t.name AS technology,
    t.category AS category
  ORDER BY technology
`;

export const getDeveloperSkillsQuery = `
  MATCH (d:Developer {id: $developerId})
        -[r:KNOWS]->
        (s:Skill)

  RETURN
    s.id AS skillId,
    s.name AS skill,
    s.category AS category,
    r.level AS level
  ORDER BY skill
`;

export const getDeveloperCompanyQuery = `
  MATCH (d:Developer {id: $developerId})
        -[r:WORKS_AT]->
        (c:Company)

  RETURN
    c.id AS companyId,
    c.name AS company,
    c.location AS location,
    c.industry AS industry,
    r.role AS role
`;

export const getAllDevelopersQuery = `
  MATCH (d:Developer)
  RETURN
    d.id AS id,
    d.name AS name,
    d.email AS email,
    d.location AS location,
    d.experience AS experience
  ORDER BY name
`;