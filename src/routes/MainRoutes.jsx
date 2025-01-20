import { Route, Routes } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { ArtProjects } from "../art/pages/ArtProjects";
import { ArtSingleProject } from "../art/pages/ArtSingleProject";
import { FrontendProjects } from "../development/pages/FrontendProjects";
import { FrontendSingleProject } from "../development/pages/FrontendSingleProject";
import { Contact } from "../pages/Contact.jsx"
import { About } from "../pages/About.jsx";
import { NotFound } from "../pages/NotFound";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* Art routes */}
      <Route path="/art" element={<ArtProjects />} />
      <Route path="/art/:id" element={<ArtSingleProject />} />
      <Route path="/art/about" element={<About />} />
      <Route path="/art/contact" element={<Contact />} />

      {/* Frontend routes */}
      <Route path="/frontend" element={<FrontendProjects />} />
      <Route path="/frontend/:id" element={<FrontendSingleProject />} />
      <Route path="/frontend/about" element={<About />} />
      <Route path="/frontend/contact" element={<Contact />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
