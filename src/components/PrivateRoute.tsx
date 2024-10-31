import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const auth = useAuth();

  if (!auth?.currentUser) {
    return <Navigate to="/signup" />;
  }

  return <>{children}</>;
}