
import { Routes, Route } from 'react-router-dom';

import StudentDirectoryPage from './bai5/StudentDirectoryPage';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<StudentDirectoryPage />}
      />
    </Routes>
  );
}

export default App;
