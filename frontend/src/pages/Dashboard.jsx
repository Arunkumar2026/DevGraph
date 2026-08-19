import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  FiUser,
  FiFolder,
  FiCode,
  FiMapPin,
  FiMail,
  FiBriefcase,
  FiX,
} from "react-icons/fi";

import GraphView from "../components/GraphView";

function Dashboard() {
  const [selectedNode, setSelectedNode] = useState(null);

  const location = useLocation();

  const detailsRef = useRef(null);

  const selectedType = location.state?.type || "developer";
  const selectedId = location.state?.id || "dev001";


  const renderDetails = () => {
    if (!selectedNode) {
      return (
        <div className="p-4 sm:p-6 text-gray-400 text-sm">
          Select a node from the graph to view its details.
        </div>
      );
    }

    const { type, details } = selectedNode.data;

    return (
      <div className="p-4 sm:p-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">

              {type === "Developer" && (
                <FiUser size={20} />
              )}

              {type === "Project" && (
                <FiFolder size={20} />
              )}

              {type === "Technology" && (
                <FiCode size={20} />
              )}

            </div>

            <div>
              <p className="text-xs text-gray-400 uppercase font-medium">
                {type}
              </p>

              <h4 className="font-semibold text-gray-900">
                {details.name}
              </h4>
            </div>

          </div>

          <button
            onClick={() => setSelectedNode(null)}
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
          >
            <FiX size={18} />
          </button>

        </div>

        {/* Details */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">

          {details.id && (
            <div className="border rounded-lg p-3">
              <p className="text-xs text-gray-400">
                ID
              </p>

              <p className="text-sm text-gray-700 mt-1 break-all">
                {details.id}
              </p>
            </div>
          )}

          {details.email && (
            <div className="border rounded-lg p-3">
              <div className="flex items-center gap-2">
                <FiMail
                  size={14}
                  className="text-gray-400"
                />

                <p className="text-xs text-gray-400">
                  Email
                </p>
              </div>

              <p className="text-sm text-gray-700 mt-1 break-all">
                {details.email}
              </p>
            </div>
          )}

          {details.location && (
            <div className="border rounded-lg p-3">
              <div className="flex items-center gap-2">
                <FiMapPin
                  size={14}
                  className="text-gray-400"
                />

                <p className="text-xs text-gray-400">
                  Location
                </p>
              </div>

              <p className="text-sm text-gray-700 mt-1">
                {details.location}
              </p>
            </div>
          )}

          {details.role && (
            <div className="border rounded-lg p-3">
              <div className="flex items-center gap-2">
                <FiBriefcase
                  size={14}
                  className="text-gray-400"
                />

                <p className="text-xs text-gray-400">
                  Role
                </p>
              </div>

              <p className="text-sm text-gray-700 mt-1">
                {details.role}
              </p>
            </div>
          )}

          {details.category && (
            <div className="border rounded-lg p-3">
              <div className="flex items-center gap-2">
                <FiCode
                  size={14}
                  className="text-gray-400"
                />

                <p className="text-xs text-gray-400">
                  Category
                </p>
              </div>

              <p className="text-sm text-gray-700 mt-1">
                {details.category}
              </p>
            </div>
          )}

        </div>

      </div>
    );
  };

  useEffect(() => {
  if (selectedNode) {
    detailsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}, [selectedNode]);

  return (
    <div className="p-3 sm:p-4 md:p-6">

      {/* Page Header */}
      <div className="mb-4 sm:mb-6">

        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          DevGraph Explorer
        </h2>

        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Explore relationships between developers,
          projects, technologies and companies.
        </p>

      </div>

      {/* Graph Section */}
      <section className="bg-white border rounded-xl overflow-hidden">

        <div className="px-4 sm:px-5 py-4 border-b">

          <h3 className="font-semibold text-gray-900">
            Graph Visualization
          </h3>

        </div>

        <div className="w-full h-[55vh] min-h-[300px] sm:h-[350px] md:h-[370px] lg:h-[450px]">

          <GraphView
            type={selectedType}
            id={selectedId}
            onNodeSelect={setSelectedNode}
          />

        </div>

      </section>

      {/* Search Results / Details */}
      <section ref={detailsRef} className="mt-4 sm:mt-6 bg-white border rounded-xl">

        <div className="px-4 sm:px-5 py-4 border-b">

          <h3 className="font-semibold text-gray-900">
            Search Results / Details
          </h3>

        </div>

        {renderDetails()}

      </section>

    </div>
  );
}

export default Dashboard;