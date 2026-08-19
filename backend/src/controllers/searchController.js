import { globalSearch } from "../services/searchService.js";

export async function searchController(req, res) {
  try {
    const query = req.query.q?.trim();

    if (!query) {
      return res.json({
        status: "success",
        data: [],
      });
    }

    const results = await globalSearch(query);

    res.json({
      status: "success",
      data: results,
    });
  } catch (error) {
    console.error(
      "Failed to perform search:",
      error
    );

    res.status(500).json({
      status: "error",
      message: "Failed to perform search",
    });
  }
}