import { useEffect, useState } from "react";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import {
  getDeveloperGraph,
  getProjectGraph,
  getTechnologyGraph,
  getCompanyGraph,
} from "../services/api";

function GraphView({ type, id, onNodeSelect }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!type || !id) return;

    const loadGraph = async () => {
      try {
        setLoading(true);
        setError("");

        let response;

        // -----------------------------
        // Load correct graph
        // -----------------------------

        if (type === "developer") {
          response = await getDeveloperGraph(id);
        } else if (type === "project") {
          response = await getProjectGraph(id);
        } else if (type === "technology") {
          response = await getTechnologyGraph(id);
        } else if (type === "company") {
          response = await getCompanyGraph(id);
        } else {
          throw new Error("Unsupported graph type");
        }

        console.log(`${type} graph:`, response);

        const graph = response.data;

        const newNodes = [];
        const newEdges = [];

        // ==================================================
        // DEVELOPER GRAPH
        // ==================================================

        if (type === "developer") {
          const developer = graph.developer;
          const projects = graph.projects || [];
          const technologies = graph.technologies || [];
          const projectTechnologies =
            graph.projectTechnologies || [];

          const developerNodeId =
            `developer-${developer.id}`;

          newNodes.push({
            id: developerNodeId,
            position: {
              x: 50,
              y: 250,
            },
            data: {
              label: developer.name,
              type: "Developer",
              details: developer,
            },
          });

          projects.forEach((item, index) => {
            if (!item.project) return;

            const project =
              item.project.properties;

            const projectId =
              `project-${project.id}`;

            newNodes.push({
              id: projectId,
              position: {
                x: 350,
                y: index * 150 + 100,
              },
              data: {
                label: project.name,
                type: "Project",
                details: {
                  ...project,
                  role: item.role,
                },
              },
            });

            newEdges.push({
              id: `${developerNodeId}-${projectId}`,
              source: developerNodeId,
              target: projectId,
              label: item.role
                ? `WORKS_ON (${item.role})`
                : "WORKS_ON",
            });
          });

          technologies.forEach((item, index) => {
            if (!item.technology) return;

            const technology =
              item.technology.properties;

            const technologyId =
              `technology-${technology.id}`;

            if (
              newNodes.some(
                (node) =>
                  node.id === technologyId
              )
            ) {
              return;
            }

            newNodes.push({
              id: technologyId,
              position: {
                x: 700,
                y: index * 140 + 100,
              },
              data: {
                label: technology.name,
                type: "Technology",
                details: technology,
              },
            });
          });

          projectTechnologies.forEach((item) => {
            if (
              !item.project ||
              !item.technology
            ) {
              return;
            }

            const project =
              item.project.properties;

            const technology =
              item.technology.properties;

            const projectId =
              `project-${project.id}`;

            const technologyId =
              `technology-${technology.id}`;

            const edgeId =
              `${projectId}-${technologyId}`;

            if (
              newEdges.some(
                (edge) => edge.id === edgeId
              )
            ) {
              return;
            }

            newEdges.push({
              id: edgeId,
              source: projectId,
              target: technologyId,
              label: "USES",
            });
          });
        }

        // ==================================================
        // PROJECT GRAPH
        // ==================================================

        if (type === "project") {
          const project =
            graph.project;

          const developers =
            graph.developers || [];

          const technologies =
            graph.technologies || [];

          const projectNodeId =
            `project-${project.id}`;

          newNodes.push({
            id: projectNodeId,
            position: {
              x: 400,
              y: 250,
            },
            data: {
              label: project.name,
              type: "Project",
              details: project,
            },
          });

          developers.forEach((item, index) => {
            if (!item.developer) return;

            const developer =
              item.developer.properties;

            const developerId =
              `developer-${developer.id}`;

            newNodes.push({
              id: developerId,
              position: {
                x: 80,
                y: index * 150 + 100,
              },
              data: {
                label: developer.name,
                type: "Developer",
                details: {
                  ...developer,
                  role: item.role,
                },
              },
            });

            newEdges.push({
              id:
                `${developerId}-${projectNodeId}`,
              source: developerId,
              target: projectNodeId,
              label: item.role
                ? `WORKS_ON (${item.role})`
                : "WORKS_ON",
            });
          });

          technologies.forEach((item, index) => {
            if (!item.technology) return;

            const technology =
              item.technology.properties;

            const technologyId =
              `technology-${technology.id}`;

            newNodes.push({
              id: technologyId,
              position: {
                x: 750,
                y: index * 150 + 100,
              },
              data: {
                label: technology.name,
                type: "Technology",
                details: technology,
              },
            });

            newEdges.push({
              id:
                `${projectNodeId}-${technologyId}`,
              source: projectNodeId,
              target: technologyId,
              label: "USES",
            });
          });
        }

          // ==================================================
          // TECHNOLOGY GRAPH
          // ==================================================

          if (type === "technology") {
            const technology =
              graph.technology;

            const projects =
              graph.projects || [];

            const developers =
              graph.developers || [];

            const technologyNodeId =
              `technology-${technology.id}`;

            // --------------------------------
            // Technology
            // --------------------------------

            newNodes.push({
              id: technologyNodeId,

              position: {
                x: 750,
                y: 250,
              },

              data: {
                label: technology.name,
                type: "Technology",
                details: technology,
              },
            });

            // --------------------------------
            // Projects
            // --------------------------------

            projects.forEach((item, index) => {
              if (!item.project) return;

              const project =
                item.project.properties;

              const projectId =
                `project-${project.id}`;

              // Avoid duplicate project nodes
              if (
                !newNodes.some(
                  (node) => node.id === projectId
                )
              ) {
                newNodes.push({
                  id: projectId,

                  position: {
                    x: 400,
                    y: index * 150 + 100,
                  },

                  data: {
                    label: project.name,
                    type: "Project",
                    details: project,
                  },
                });
              }

              // Project → Technology
              const edgeId =
                `${projectId}-${technologyNodeId}`;

              if (
                !newEdges.some(
                  (edge) => edge.id === edgeId
                )
              ) {
                newEdges.push({
                  id: edgeId,

                  source: projectId,
                  target: technologyNodeId,

                  type: "default",
                  animated: false,

                  label: "USES",
                });
              }
            });

            // --------------------------------
            // Developers
            // --------------------------------

            developers.forEach((item, index) => {
              if (!item.developer) return;

              const developer =
                item.developer.properties;

              const developerId =
                `developer-${developer.id}`;

              // Create developer node
              if (
                !newNodes.some(
                  (node) => node.id === developerId
                )
              ) {
                newNodes.push({
                  id: developerId,

                  position: {
                    x: 80,
                    y: index * 150 + 100,
                  },

                  data: {
                    label: developer.name,
                    type: "Developer",
                    details: developer,
                  },
                });
              }

              // --------------------------------
              // Developer → Project
              // --------------------------------

              if (item.project) {
                const project =
                  item.project.properties;

                const projectId =
                  `project-${project.id}`;

                // Make sure project node exists
                if (
                  !newNodes.some(
                    (node) => node.id === projectId
                  )
                ) {
                  newNodes.push({
                    id: projectId,

                    position: {
                      x: 400,
                      y: index * 150 + 100,
                    },

                    data: {
                      label: project.name,
                      type: "Project",
                      details: project,
                    },
                  });
                }

                const edgeId =
                  `${developerId}-${projectId}`;

                if (
                  !newEdges.some(
                    (edge) => edge.id === edgeId
                  )
                ) {
                  newEdges.push({
                    id: edgeId,

                    source: developerId,
                    target: projectId,

                    type: "default",
                    animated: false,

                    label: item.role
                      ? `WORKS_ON (${item.role})`
                      : "WORKS_ON",
                  });
                }
              }
            });
          }

        // ==================================================
        // COMPANY GRAPH
        // ==================================================

        if (type === "company") {
          const company =
            graph.company;

          const developers =
            graph.developers || [];

          const companyNodeId =
            `company-${company.id}`;

          newNodes.push({
            id: companyNodeId,
            position: {
              x: 500,
              y: 250,
            },
            data: {
              label: company.name,
              type: "Company",
              details: company,
            },
          });

          developers.forEach((item, index) => {
            if (!item.developer) return;

            const developer =
              item.developer.properties;

            const developerId =
              `developer-${developer.id}`;

            newNodes.push({
              id: developerId,
              position: {
                x: 150,
                y: index * 150 + 100,
              },
              data: {
                label: developer.name,
                type: "Developer",
                details: {
                  ...developer,
                  role: item.role,
                },
              },
            });

            newEdges.push({
              id:
                `${developerId}-${companyNodeId}`,
              source: developerId,
              target: companyNodeId,
              label: item.role
                ? `WORKS_AT (${item.role})`
                : "WORKS_AT",
            });
          });
        }

        console.log("Graph nodes:", newNodes);
        console.log("Graph edges:", newEdges);

        setNodes(newNodes);
        setEdges(newEdges);

      } catch (error) {
        console.error(
          "Failed to load graph:",
          error
        );

        setError(
          "Failed to load graph."
        );

        setNodes([]);
        setEdges([]);
      } finally {
        setLoading(false);
      }
    };

    loadGraph();
  }, [type, id]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500 text-sm">
          Loading graph...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-red-500 text-sm">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-0">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        defaultEdgeOptions={{
          type: "default",
          animated: false,
        }}
        fitView
        fitViewOptions={{
          padding: 0.2,
        }}
        onNodeClick={(event, node) => {
          onNodeSelect(node);
        }}
        onPaneClick={() => {
          onNodeSelect(null);
        }}
      >
        <Background />

        <Controls />

        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default GraphView;