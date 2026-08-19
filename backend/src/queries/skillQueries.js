export const getAllSkillsQuery = `
  MATCH (s:Skill)
  RETURN
    s.id AS id,
    s.name AS name,
    s.category AS category
  ORDER BY name
`;

export const getSkillByIdQuery = `
  MATCH (s:Skill {id: $skillId})
  RETURN
    s.id AS id,
    s.name AS name,
    s.category AS category
`;

export const getSkillDevelopersQuery = `
  MATCH (d:Developer)
        -[r:KNOWS]->
        (s:Skill {id: $skillId})

  RETURN
    d.id AS developerId,
    d.name AS developer,
    d.location AS location,
    d.experience AS experience,
    r.level AS level
  ORDER BY developer
`;