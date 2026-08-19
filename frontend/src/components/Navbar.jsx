import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiMenu } from "react-icons/fi";

import { searchGlobal } from "../services/api";

function Navbar({ onMenuClick }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await searchGlobal(
          trimmedQuery
        );

        setResults(response.data || []);
      } catch (error) {
        console.error(
          "Search failed:",
          error
        );

        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleResultClick = (result) => {
    navigate("/", {
      state: {
        type: result.type,
        id: result.id,
      },
    });

    setQuery("");
    setResults([]);
  };

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4 sm:px-6">

      {/* Left Side */}
      <div className="flex items-center gap-3">

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700"
          aria-label="Open menu"
        >
          <FiMenu size={22} />
        </button>

        <h1 className="text-xl font-bold text-gray-900">
          DevGraph
        </h1>

      </div>

      {/* Search */}
      <div className="relative">

        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-52 sm:w-80">

          <FiSearch
            size={18}
            className="text-gray-400 shrink-0"
          />

          <input
            type="text"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search..."
            className="outline-none w-full text-sm"
          />

        </div>

        {/* Search Results */}

        {query.trim() && (
          <div className="absolute top-12 right-0 w-72 sm:w-80 bg-white border rounded-lg shadow-lg z-50 overflow-hidden">

            {loading && (
              <div className="p-4 text-sm text-gray-500">
                Searching...
              </div>
            )}

            {!loading &&
              results.length === 0 && (
                <div className="p-4 text-sm text-gray-500">
                  No results found.
                </div>
              )}

            {!loading &&
              results.length > 0 && (
                <div className="max-h-80 overflow-y-auto">

                  {results.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      type="button"
                      onClick={() =>
                        handleResultClick(result)
                      }
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
                    >

                      <p className="text-sm font-medium text-gray-900">
                        {result.name}
                      </p>

                      <p className="text-xs text-gray-500 mt-1 capitalize">
                        {result.type}
                      </p>

                    </button>
                  ))}

                </div>
              )}

          </div>
        )}

      </div>

    </header>
  );
}

export default Navbar;
