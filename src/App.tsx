import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ModulesPage from './pages/ModulesPage';
import TestPage from './pages/TestPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/module/:moduleId" element={<ModulesPage />} />
        <Route path="/test/:moduleId" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;