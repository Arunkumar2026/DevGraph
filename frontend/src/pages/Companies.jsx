import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCompanies } from "../services/api";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCompanies();

        setCompanies(response.data || []);
      } catch (error) {
        console.error(
          "Failed to load companies:",
          error
        );

        setError("Failed to load companies.");
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  const handleCompanyClick = (companyId) => {
    navigate("/", {
      state: {
        type: "company",
        id: companyId,
      },
    });
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-gray-500">
          Loading companies...
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
          Companies
        </h2>

        <p className="text-gray-500 mt-1">
          Explore companies and their developer
          relationships.
        </p>
      </div>

      {companies.length === 0 ? (
        <div className="bg-white border rounded-xl p-6">
          <p className="text-gray-500 text-sm">
            No companies found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {companies.map((company) => (
            <button
              key={company.id}
              type="button"
              onClick={() =>
                handleCompanyClick(company.id)
              }
              className="text-left bg-white border rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition cursor-pointer"
            >

              <h3 className="text-lg font-semibold text-gray-900">
                {company.name}
              </h3>

              <div className="mt-3 space-y-1 text-sm">

                {company.location && (
                  <p className="text-gray-500">
                    Location: {company.location}
                  </p>
                )}

                {company.industry && (
                  <p className="text-gray-500">
                    Industry: {company.industry}
                  </p>
                )}

              </div>

            </button>
          ))}

        </div>
      )}

    </div>
  );
}

export default Companies;