import { Route, Routes } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { ArtHome } from "../art/pages/ArtHome";
import { ArtProjects } from "../art/pages/ArtProjects";
import { ArtSingleProject } from "../art/pages/ArtSingleProject";
import { ArtAbout } from "../art/pages/ArtAbout";
import { ArtContact } from "../art/pages/ArtContact"
import { FrontendHome } from "../development/pages/FrontendHome";
import { FrontendProjects } from "../development/pages/FrontendProjects";
import { FrontendSingleProject } from "../development/pages/FrontendSingleProject";
import { FrontendContact } from "../development/pages/FrontendContact";
import { FrontendAbout } from "../development/pages/FrontendAbout";
import { NotFound } from "../pages/NotFound";

export const MainRoutes = () => {
  return (
<Routes>
  <Route path="/" element={<LandingPage />} />

  {/* Art routes */}
  <Route path="/art" element={<ArtHome />} />  
  <Route path="/art/projects" element={<ArtProjects />} /> 
  <Route path="/art/project/:id" element={<ArtSingleProject />} />  
  <Route path="/art/about" element={<ArtAbout />} /> 
  <Route path="/art/contact" element={<ArtContact />} />

  {/* Frontend routes */}
  <Route path="/frontend" element={<FrontendHome />} />
  <Route path="/frontend/projects" element={<FrontendProjects />} />
  <Route path="/frontend/project/:id" element={<FrontendSingleProject />} />
  <Route path="/frontend/about" element={<FrontendAbout />} />
  <Route path="/frontend/contact" element={<FrontendContact />} />

  {/* Catch-all */}
  <Route path="*" element={<NotFound />} />
</Routes>
  );
};
