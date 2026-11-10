import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ROLE_LABELS } from '../api/types';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">ISET<span>Care</span></div>
        <div className="topbar-right">
          <div className="who">
            <strong>{user.prenom} {user.nom}</strong>
            <span className={`badge badge-${user.role}`}>{ROLE_LABELS[user.role]}</span>
          </div>
          <button className="btn btn-outline" onClick={handleLogout}>Déconnexion</button>
        </div>
      </header>
      <div className="body">
        <nav className="sidebar">
          <NavLink to="/" end>Tableau de bord</NavLink>
          {user.role === 'ADMINISTRATEUR' && <NavLink to="/utilisateurs">Utilisateurs</NavLink>}
          <NavLink to="/profil">Mon profil</NavLink>
        </nav>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
