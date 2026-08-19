# DevGraph

DevGraph is an interactive developer relationship graph that helps explore connections between developers, projects, technologies, and companies.

## Features

- Explore developers and their relationships
- Explore projects and associated developers and technologies
- Explore technologies used across projects
- Explore companies and their developers
- Interactive graph visualization
- Search developers, projects, technologies, and companies
- View detailed information by selecting graph nodes

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Flow
- Axios

### Backend
- Node.js
- Express.js
- Neo4j
- Cypher

## Project Structure

```text
DevGraph/
├── frontend/
└── backend/
````

## Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

The backend requires environment variables for the Neo4j database connection.

Create a `.env` file inside the backend directory and configure your Neo4j credentials.

> Do not commit `.env` files or database credentials to GitHub.

## Project Goal

DevGraph demonstrates how graph databases can be used to represent and explore relationships within a developer ecosystem.
