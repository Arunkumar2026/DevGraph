import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProjects } from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProjects();

        setProjects(response.data || []);
      } catch (error) {
        console.error(
          "Failed to load projects:",
          error
        );

        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    navigate("/", {
      state: {
        type: "project",
        id: projectId,
      },
    });
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-gray-500">
          Loading projects...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-red-500">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Projects
        </h2>

        <p className="text-gray-500 mt-1">
          Explore projects in the developer graph.
        </p>
      </div>

      {/* Empty State */}
      {projects.length === 0 ? (
        <div className="bg-white border rounded-xl p-6">
          <p className="text-gray-500 text-sm">
            No projects found.
          </p>
        </div>
      ) : (
        /* Project Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() =>
                handleProjectClick(project.id)
              }
              className="text-left bg-white border rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition cursor-pointer"
            >

              <h3 className="text-lg font-semibold text-gray-900">
                {project.name}
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                {project.description}
              </p>

              <div className="mt-4">

                <span className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                  {project.status}
                </span>

              </div>

            </button>
          ))}

        </div>
      )}

    </div>
  );
}

export default Projects;