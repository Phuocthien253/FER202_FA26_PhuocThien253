
import { Routes, Route, Navigate } from 'react-router-dom';

import CourseListPage from './bai3/CourseListPage';
import CourseDetailPage from './bai3/CourseDetailPage';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/courses" replace />}
      />

      <Route
        path="/courses"
        element={<CourseListPage />}
      />

      <Route
        path="/courses/:code"
        element={<CourseDetailPage />}
      />
    </Routes>
  );
}

export default App;
