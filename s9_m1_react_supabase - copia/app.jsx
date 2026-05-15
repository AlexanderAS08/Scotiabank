// =========================================================
// App.jsx  –  NovaBanco
// =========================================================
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './src/pages/LandingPage';
import LoginPage from './src/pages/LoginPage';
import DashboardPage from './src/pages/DashboardPage';

// ---------- Ruta protegida ----------
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

// ---------- Ruta pública (redirige si ya hay sesión) ----------
function PublicRoute({ children }) {
  const token = localStorage.getItem('token');
  if (token) return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Cualquier ruta desconocida → landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

