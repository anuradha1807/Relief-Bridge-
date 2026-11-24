import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Not logged in -> login page. Logged in but wrong role -> dashboard.
export default function ProtectedRoute({ roles }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
