import { NavLink } from "react-router-dom";

import {
  FiGrid,
  FiUsers,
  FiFolder,
  FiCode,
  FiBriefcase,
  FiX,
} from "react-icons/fi";

function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: FiGrid,
    },
    {
      name: "Developers",
      path: "/developers",
      icon: FiUsers,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: FiFolder,
    },
    {
      name: "Technologies",
      path: "/technologies",
      icon: FiCode,
    },
    {
      name: "Companies",
      path: "/companies",
      icon: FiBriefcase,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static
          top-16 left-0
          z-50
          w-60
          bg-white
          border-r
          min-h-[calc(100vh-4rem)]
          p-4

          transform
          transition-transform
          duration-300

          ${isOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        {/* Mobile header */}
        <div className="flex items-center justify-between mb-4 md:hidden">

          <span className="font-semibold text-gray-900">
            Menu
          </span>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <FiX size={20} />
          </button>

        </div>

        <nav className="space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >

                <Icon size={18} />

                <span>
                  {item.name}
                </span>

              </NavLink>
            );
          })}

        </nav>

      </aside>
    </>
  );
}

export default Sidebar;