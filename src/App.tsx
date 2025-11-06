import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainLayout from './pages/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<MainLayout />} />
        <Route path="/module/:moduleId" element={<MainLayout />} />
        <Route path="/test/:moduleId" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

export default App;