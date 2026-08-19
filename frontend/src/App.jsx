import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Developers from "./pages/Developers";
import Projects from "./pages/Projects";
import Technologies from "./pages/Technologies";
import Companies from "./pages/Companies";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>

          <Route path="/" element={<Dashboard />} />

          <Route
            path="/developers"
            element={<Developers />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/technologies"
            element={<Technologies />}
          />

          <Route
            path="/companies"
            element={<Companies />}
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;