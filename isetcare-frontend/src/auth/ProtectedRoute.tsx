import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import type { Role } from '../api/types';

interface Props {
  children: ReactNode;
  roles?: Role[]; // si défini, seuls ces rôles ont accès (US37)
}

export default function ProtectedRoute({ children, roles }: Props) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="center-screen"><div className="spinner" /></div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (roles && !roles.includes(user.role)) {
    return (
      <div className="card narrow">
        <h2>Accès refusé</h2>
        <p>Votre rôle ne permet pas d'accéder à cette page.</p>
      </div>
    );
  }
  return <>{children}</>;
}
