
import { Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { AppNavbar } from './components/AppNavbar';

function App() {
  return (
    <>
      <AppNavbar />

      <Routes>
<Route path="*" element={<NotFoundPage />} />

        <Route
          path="/skills"
          element={<SkillsPage />}
        />

        <Route
          path="/projects"
          element={<ProjectsPage />}
        />

        <Route
          path="/contact"
          element={<ContactPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </>
  );
}

export default App;
