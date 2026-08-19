import {
  getAllCompanies,
  getCompanyById,
  getCompanyDevelopers,
} from "../services/companyService.js";

export async function getCompanies(req, res) {
  try {
    const companies = await getAllCompanies();

    res.json({
      status: "success",
      data: companies,
    });
  } catch (error) {
    console.error(
      "Failed to fetch companies:",
      error
    );

    res.status(500).json({
      status: "error",
      message: "Failed to fetch companies",
    });
  }
}

export async function getCompany(req, res) {
  try {
    const company = await getCompanyById(req.params.id);

    if (!company) {
      return res.status(404).json({
        status: "error",
        message: "Company not found",
      });
    }

    res.json({
      status: "success",
      data: company,
    });
  } catch (error) {
    console.error(
      "Failed to fetch company:",
      error
    );

    res.status(500).json({
      status: "error",
      message: "Failed to fetch company",
    });
  }
}

export async function getCompanyDevelopersController(
  req,
  res
) {
  try {
    const developers = await getCompanyDevelopers(
      req.params.id
    );

    res.json({
      status: "success",
      data: developers,
    });
  } catch (error) {
    console.error(
      "Failed to fetch company developers:",
      error
    );

    res.status(500).json({
      status: "error",
      message: "Failed to fetch company developers",
    });
  }
}