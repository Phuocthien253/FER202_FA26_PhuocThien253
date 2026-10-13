
import { Routes, Route } from 'react-router-dom';

import EventPage from './bai4/EventPage';
import RegisterPage from './bai4/RegisterPage';
import SuccessPage from './bai4/SuccessPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<EventPage />} />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/success"
        element={<SuccessPage />}
      />
    </Routes>
  );
}

export default App;
