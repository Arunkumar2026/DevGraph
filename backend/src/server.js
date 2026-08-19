import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import driver from './config/database.js';
import { createTestGraph, getTestGraph, getAllTestData, getTestRelationships, deleteTestGraph } from './queries/testQuery.js';
import { createConstraints } from './queries/constraints.js';
import { seedDatabase } from './seed/seed.js';
import { getGraphStats } from './queries/stats.js';
import { getDeveloperById, getDeveloperProjects, getDeveloperTechnologies, getDeveloperSkills, getDeveloperCompany, } from "./services/developerService.js";
import developerRoutes from './routes/developerRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import technologyRoutes from './routes/technologyRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import graphRoutes from './routes/graphRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import searchRoutes from './routes/searchRoutes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/developers", developerRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/companies", companyRoutes)
app.use("/api/graph", graphRoutes);
app.use("/api/search", searchRoutes);

app.get("/api/health", async (req, res) => {
  try {
    await driver.verifyConnectivity();

    res.json({
      status: "success",
      database: "CognoDB connected",
    });
  } catch (error) {
    console.error(
      "CognoDB connection failed:",
      error.message
    );

    res.status(500).json({
      status: "error",
      database: "CognoDB connection failed",
      message: error.message,
    });
  }
});

app.get("/", (req, res) => {
    res.json({
        message: "DevGraph Backend is running",
    });
});

app.listen(PORT, () => {
    console.log(`DevGraph Backend running on port ${PORT}`);
});