import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// --------------------
// Graph
// --------------------

export const getDeveloperGraph = async (developerId) => {
  const response = await api.get(
    `/graph/developers/${developerId}`
  );

  return response.data;
};

// --------------------
// Developers
// --------------------

export const getDeveloper = async (developerId) => {
  const response = await api.get(
    `/developers/${developerId}`
  );

  return response.data;
};

export const getDeveloperProjects = async (developerId) => {
  const response = await api.get(
    `/developers/${developerId}/projects`
  );

  return response.data;
};

export const getDeveloperTechnologies = async (developerId) => {
  const response = await api.get(
    `/developers/${developerId}/technologies`
  );

  return response.data;
};

export const getDeveloperSkills = async (developerId) => {
  const response = await api.get(
    `/developers/${developerId}/skills`
  );

  return response.data;
};

export const getDeveloperCompany = async (developerId) => {
  const response = await api.get(
    `/developers/${developerId}/company`
  );

  return response.data;
};

// --------------------
// Projects
// --------------------

export const getProjects = async () => {
  const response = await api.get("/projects");

  return response.data;
};

export const getProject = async (projectId) => {
  const response = await api.get(
    `/projects/${projectId}`
  );

  return response.data;
};

export const getProjectDevelopers = async (projectId) => {
  const response = await api.get(
    `/projects/${projectId}/developers`
  );

  return response.data;
};

export const getProjectTechnologies = async (projectId) => {
  const response = await api.get(
    `/projects/${projectId}/technologies`
  );

  return response.data;
};

// --------------------
// Technologies
// --------------------

export const getTechnologies = async () => {
  const response = await api.get("/technologies");

  return response.data;
};

export const getTechnology = async (technologyId) => {
  const response = await api.get(
    `/technologies/${technologyId}`
  );

  return response.data;
};

export const getTechnologyProjects = async (technologyId) => {
  const response = await api.get(
    `/technologies/${technologyId}/projects`
  );

  return response.data;
};

export const getTechnologyDevelopers = async (technologyId) => {
  const response = await api.get(
    `/technologies/${technologyId}/developers`
  );

  return response.data;
};

// --------------------
// Companies
// --------------------

export const getCompanies = async () => {
  const response = await api.get("/companies");

  return response.data;
};

export const getCompany = async (companyId) => {
  const response = await api.get(
    `/companies/${companyId}`
  );

  return response.data;
};

export const getCompanyDevelopers = async (companyId) => {
  const response = await api.get(
    `/companies/${companyId}/developers`
  );

  return response.data;
};

export const getDevelopers = async () => {
  const response = await api.get("/developers");

  return response.data;
};

export const searchGlobal = async (query) => {
  const response = await api.get("/search", {
    params: {
      q: query,
    },
  });

  return response.data;
};

export const getProjectGraph = async (projectId) => {
  const response = await api.get(
    `/graph/projects/${projectId}`
  );

  return response.data;
};

export const getTechnologyGraph = async (technologyId) => {
  const response = await api.get(
    `/graph/technologies/${technologyId}`
  );

  return response.data;
};

export const getCompanyGraph = async (companyId) => {
  const response = await api.get(
    `/graph/companies/${companyId}`
  );

  return response.data;
};