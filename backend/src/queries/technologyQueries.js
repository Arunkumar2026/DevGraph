export const getAllTechnologiesQuery = `
  MATCH (t:Technology)
  RETURN
    t.id AS id,
    t.name AS name,
    t.category AS category
  ORDER BY name
`;

export const getTechnologyByIdQuery = `
  MATCH (t:Technology {id: $technologyId})
  RETURN
    t.id AS id,
    t.name AS name,
    t.category AS category
`;

export const getTechnologyProjectsQuery = `
  MATCH (p:Project)
        -[:USES]->
        (t:Technology {id: $technologyId})

  RETURN
    p.id AS projectId,
    p.name AS project,
    p.description AS description,
    p.status AS status
  ORDER BY project
`;

export const getTechnologyDevelopersQuery = `
  MATCH (d:Developer)
        -[:WORKS_ON]->
        (p:Project)
        -[:USES]->
        (t:Technology {id: $technologyId})

  RETURN DISTINCT
    d.id AS developerId,
    d.name AS developer,
    d.location AS location,
    d.experience AS experience
  ORDER BY developer
`;