export const globalSearchQuery = `
  CALL {
    MATCH (d:Developer)
    WHERE toLower(d.name) CONTAINS toLower($query)
    RETURN
      "developer" AS type,
      d.id AS id,
      d.name AS name

    UNION ALL

    MATCH (p:Project)
    WHERE toLower(p.name) CONTAINS toLower($query)
    RETURN
      "project" AS type,
      p.id AS id,
      p.name AS name

    UNION ALL

    MATCH (t:Technology)
    WHERE toLower(t.name) CONTAINS toLower($query)
    RETURN
      "technology" AS type,
      t.id AS id,
      t.name AS name

    UNION ALL

    MATCH (c:Company)
    WHERE toLower(c.name) CONTAINS toLower($query)
    RETURN
      "company" AS type,
      c.id AS id,
      c.name AS name
  }

  RETURN type, id, name
  ORDER BY name
  LIMIT 20
`;