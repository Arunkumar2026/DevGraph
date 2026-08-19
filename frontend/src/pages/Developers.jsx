import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { getDevelopers } from "../services/api";

function Developers() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadDevelopers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getDevelopers();

        console.log("Developers:", response);

        setDevelopers(response.data || []);
      } catch (error) {
        console.error(
          "Failed to load developers:",
          error
        );

        setError("Failed to load developers.");
      } finally {
        setLoading(false);
      }
    };

    loadDevelopers();
  }, []);

  if (loading) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-gray-500">
          Loading developers...
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
          Developers
        </h2>

        <p className="text-gray-500 mt-1">
          Explore developer information.
        </p>
      </div>

      {developers.length === 0 ? (
        <div className="bg-white border rounded-xl p-6">
          <p className="text-gray-500">
            No developers found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {developers.map((developer) => (
                <div
                    key={developer.id}
                    onClick={() =>
                      navigate("/", {
                        state: {
                          type: "developer",
                          id: developer.id,
                        },
                      })
                    }
                    className="bg-white border rounded-xl p-5 hover:shadow-md transition cursor-pointer"
                >

              <h3 className="text-xl font-semibold text-gray-900">
                {developer.name}
              </h3>

              <div className="mt-4 space-y-2 text-sm text-gray-600">

                <p>
                  <span className="font-medium text-gray-900">
                    Email:
                  </span>{" "}
                  {developer.email}
                </p>

                <p>
                  <span className="font-medium text-gray-900">
                    Location:
                  </span>{" "}
                  {developer.location}
                </p>

                <p>
                  <span className="font-medium text-gray-900">
                    Experience:
                  </span>{" "}
                  {developer.experience} years
                </p>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Developers;