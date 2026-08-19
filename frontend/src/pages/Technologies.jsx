import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getTechnologies } from "../services/api";

function Technologies() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadTechnologies = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getTechnologies();

        setTechnologies(response.data || []);
      } catch (error) {
        console.error(
          "Failed to load technologies:",
          error
        );

        setError("Failed to load technologies.");
      } finally {
        setLoading(false);
      }
    };

    loadTechnologies();
  }, []);

  const handleTechnologyClick = (technologyId) => {
    navigate("/", {
      state: {
        type: "technology",
        id: technologyId,
      },
    });
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-gray-500">
          Loading technologies...
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

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Technologies
        </h2>

        <p className="text-gray-500 mt-1">
          Explore technologies used across projects
          and developers.
        </p>
      </div>

      {technologies.length === 0 ? (
        <div className="bg-white border rounded-xl p-6">
          <p className="text-gray-500 text-sm">
            No technologies found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

          {technologies.map((technology) => (
            <button
              key={technology.id}
              type="button"
              onClick={() =>
                handleTechnologyClick(technology.id)
              }
              className="text-left bg-white border rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition cursor-pointer"
            >

              <h3 className="text-lg font-semibold text-gray-900">
                {technology.name}
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                {technology.category}
              </p>

            </button>
          ))}

        </div>
      )}

    </div>
  );
}

export default Technologies;

