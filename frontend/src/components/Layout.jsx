import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex">

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default Layout;