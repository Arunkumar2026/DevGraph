export const getAllCompaniesQuery = `
  MATCH (c:Company)
  RETURN
    c.id AS id,
    c.name AS name,
    c.location AS location,
    c.industry AS industry
  ORDER BY name
`;

export const getCompanyByIdQuery = `
  MATCH (c:Company {id: $companyId})
  RETURN
    c.id AS id,
    c.name AS name,
    c.location AS location,
    c.industry AS industry
`;

export const getCompanyDevelopersQuery = `
  MATCH (d:Developer)
        -[r:WORKS_AT]->
        (c:Company {id: $companyId})

  RETURN
    d.id AS developerId,
    d.name AS developer,
    d.location AS location,
    d.experience AS experience,
    r.role AS role
  ORDER BY developer
`;