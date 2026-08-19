export const getAllProjectsQuery = `
  MATCH (p:Project)
  RETURN
    p.id AS id,
    p.name AS name,
    p.description AS description,
    p.status AS status
  ORDER BY name
`;

export const getProjectByIdQuery = `
  MATCH (p:Project {id: $projectId})
  RETURN
    p.id AS id,
    p.name AS name,
    p.description AS description,
    p.status AS status
`;

export const getProjectDevelopersQuery = `
  MATCH (d:Developer)
        -[r:WORKS_ON]->
        (p:Project {id: $projectId})

  RETURN
    d.id AS developerId,
    d.name AS developer,
    d.location AS location,
    d.experience AS experience,
    r.role AS role
  ORDER BY developer
`;

export const getProjectTechnologiesQuery = `
  MATCH (p:Project {id: $projectId})
        -[:USES]->
        (t:Technology)

  RETURN
    t.id AS technologyId,
    t.name AS technology,
    t.category AS category
  ORDER BY technology
`;