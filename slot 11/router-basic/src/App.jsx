
import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './bai2/MainLayout';
import HomePage from './bai2/HomePage';
import BooksPage from './bai2/BooksPage';
import HelpLayout from './bai2/HelpLayout';
import FaqPage from './bai2/FaqPage';
import RulesPage from './bai2/RulesPage';
import NotFoundPage from './bai2/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="books" element={<BooksPage />} />

        <Route path="help" element={<HelpLayout />}>
          <Route
            index
            element={<Navigate to="faq" replace />}
          />

          <Route path="faq" element={<FaqPage />} />

          <Route path="rules" element={<RulesPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
