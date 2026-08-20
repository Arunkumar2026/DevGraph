# DevGraph

**DevGraph** is an interactive developer relationship graph built with **CognoDB**, a managed graph database compatible with the Neo4j driver and openCypher.

The application allows users to explore relationships between:

* Developers
* Projects
* Technologies
* Skills
* Companies

Users can search for entities and interactively explore their connected relationships through a graph visualization.

## Live Demo

**Frontend:** https://dev-graph-nine.vercel.app/

**Backend:** https://devgraph-backend-xy9s.onrender.com/

## GitHub Repository

https://github.com/Arunkumar2026/DevGraph

---

## Why a Graph Database?

DevGraph focuses on relationships between developers, projects, technologies, skills, and companies.

A relational database could store these entities using multiple tables and join tables, but relationship-heavy questions would require several joins.

For example:

> Which developers have worked on projects that use a particular technology?

Or:

> Which developers are related through shared skills?

These questions can be represented naturally as graph traversals.

For example:

```text
Developer
    |
  WORKS_ON
    |
  Project
    |
   USES
    |
Technology
```

Another relationship can be explored through:

```text
Developer
    |
  KNOWS
    |
  Skill
    |
  KNOWS
    |
Developer
```

CognoDB makes these multi-hop relationships straightforward to query using Cypher.

---

# Features

* Search developers, projects, technologies, and companies
* Interactive graph visualization
* Explore relationships between graph entities
* View developer-project relationships
* View project-technology relationships
* View company-developer relationships
* Explore developers connected through shared skills
* Select graph nodes to view detailed information
* Responsive desktop and mobile UI
* Loading and error states
* Backend database connection error handling

---

# Graph Data Model

The application uses the following node types:

```text
Developer
Project
Technology
Skill
Company
```

The main relationships are:

```text
Developer ── WORKS_ON ──> Project

Project ── USES ──> Technology

Developer ── KNOWS ──> Skill

Developer ── WORKS_AT ──> Company
```

### Relationship Properties

`WORKS_ON`

* `role`

`KNOWS`

* `level`

`WORKS_AT`

* `role`

Additional properties are stored on nodes such as:

* Developer: `id`, `name`, `email`, `location`, `experience`
* Project: `id`, `name`, `description`, `status`
* Technology: `id`, `name`, `category`
* Skill: `id`, `name`, `category`
* Company: `id`, `name`, `location`, `industry`

---

# Example Graph

```text
                    ┌──────────────┐
                    │   Company    │
                    └──────┬───────┘
                           │
                       WORKS_AT
                           │
                           ▼
┌──────────────┐      WORKS_ON      ┌──────────────┐
│  Developer   │ ─────────────────> │   Project    │
└──────┬───────┘                    └──────┬───────┘
       │                                   │
     KNOWS                               USES
       │                                   │
       ▼                                   ▼
┌──────────────┐                    ┌──────────────┐
│    Skill     │                    │ Technology   │
└──────────────┘                    └──────────────┘
```

---

# Technology Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Flow
* Axios
* React Router
* React Icons

## Backend

* Node.js
* Express.js
* Neo4j JavaScript Driver
* Cypher
* dotenv
* CORS

## Database

* CognoDB
* openCypher
* Bolt protocol
* Official Neo4j JavaScript driver

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: CognoDB Cloud

---

# Project Structure

```text
DevGraph/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── queries/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   │
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

# CognoDB Setup

1. Create a CognoDB Cloud account.
2. Create a free CognoDB instance.
3. Copy the generated connection URI.
4. Save the database username and password.
5. Configure the backend environment variables.

The backend uses:

```env
COGNODB_URI=your_cognodb_bolt_uri
COGNODB_USERNAME=cognodb
COGNODB_PASSWORD=your_password
```

The credentials must **never be committed to GitHub**.

---

# Running the Project Locally

## 1. Clone the repository

```bash
git clone https://github.com/Arunkumar2026/DevGraph.git

cd DevGraph
```

## 2. Start the backend

```bash
cd backend

npm install

npm run dev
```

Create `backend/.env`:

```env
COGNODB_URI=your_cognodb_bolt_uri
COGNODB_USERNAME=cognodb
COGNODB_PASSWORD=your_password
PORT=5000
```

## 3. Start the frontend

Open another terminal:

```bash
cd frontend

npm install

npm run dev
```

The frontend will run using the Vite development server.

---

# Seed Data

The repository contains a database seed script that creates realistic sample data.

The seed data includes:

### Developers

* Arun Kumar
* Rahul Sharma
* Priya Reddy

### Projects

* DevGraph
* ShopZone
* CityRide

### Technologies

* React
* Node.js
* JavaScript
* Neo4j

### Skills

* Frontend Development
* Backend Development
* Database Design
* REST API Development

### Companies

* TechCorp
* CodeLabs

The seed script also creates relationships between these entities.

---

# Main Cypher Queries

DevGraph uses parameterized Cypher queries through the official Neo4j JavaScript driver.

## Developer → Project → Technology

This query performs a multi-hop graph traversal:

```cypher
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
```

This answers:

> Which technologies are used by projects that a developer works on?

---

## Related Developers Through Shared Skills

This query finds developers connected through common skills:

```cypher
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
```

This is an example of a relationship-oriented query where graph traversal is particularly natural.

---

## Developers Through Shared Project Technologies

Another multi-hop traversal:

```cypher
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
```

This can identify developers who have worked on other projects using technologies also used by a selected project.

---

# Parameterized Queries

All user-provided identifiers are passed to Cypher as parameters.

Example:

```javascript
session.run(query, {
  developerId: id
});
```

The application does not construct Cypher queries by concatenating user input.

This helps keep the database queries safer and easier to maintain.

---

# Application Architecture

```text
                 ┌─────────────────────┐
                 │      React UI       │
                 │      Vercel         │
                 └──────────┬──────────┘
                            │
                         Axios
                            │
                            ▼
                 ┌─────────────────────┐
                 │    Express API      │
                 │      Render         │
                 └──────────┬──────────┘
                            │
                   Neo4j JavaScript
                        Driver
                            │
                            ▼
                 ┌─────────────────────┐
                 │      CognoDB        │
                 │    Graph Database   │
                 └─────────────────────┘
```

---

# Error Handling

The backend handles database connection failures and API errors without exposing database credentials.

The frontend provides:

* Loading states
* Empty search results
* Graph loading state
* Graph error state

This allows the application to remain understandable when data is unavailable or the backend cannot be reached.

---

# Screenshots

Screenshots of the deployed application will be added here.

### Dashboard

*Add dashboard screenshot here.*

### Developer Graph

*Add developer graph screenshot here.*

### Project / Technology Graph

*Add project or technology graph screenshot here.*

### Search

*Add search screenshot here.*

---

# Live Application

**DevGraph:**
https://dev-graph-nine.vercel.app/

The application provides an interactive way to search and explore relationships between developers, projects, technologies, skills, and companies.

---

# Assignment

This project was developed as a take-home assignment for **WEXA AI** to demonstrate:

* Graph data modeling
* Cypher query design
* Multi-hop graph traversal
* Parameterized database queries
* Backend API development
* Interactive graph visualization
* Application architecture
* Deployment of a complete graph-backed application
