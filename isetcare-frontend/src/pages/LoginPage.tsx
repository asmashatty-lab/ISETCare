import { useState, type FormEvent } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { errorMessage } from '../api/client';

export default function LoginPage() {
  const { user, login } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/';

  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to={from} replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email.trim(), motDePasse);
    } catch (err) {
      setError(errorMessage(err, 'Connexion impossible.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="brand brand-lg">ISET<span>Care</span></div>
        <p className="subtitle">Gestion intelligente du matériel, des réclamations et de la maintenance</p>

        {error && <div className="alert alert-error" role="alert">{error}</div>}

        <label htmlFor="email">Adresse email</label>
        <input id="email" type="email" autoComplete="username" required autoFocus
               value={email} onChange={(e) => setEmail(e.target.value)} placeholder="prenom.nom@isetcare.tn" />

        <label htmlFor="pwd">Mot de passe</label>
        <div className="pwd-row">
          <input id="pwd" type={showPwd ? 'text' : 'password'} autoComplete="current-password" required
                 value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />
          <button type="button" className="btn btn-ghost" onClick={() => setShowPwd((s) => !s)}>
            {showPwd ? 'Masquer' : 'Afficher'}
          </button>
        </div>

        <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
          {submitting ? 'Connexion…' : 'Se connecter'}
        </button>
        <p className="hint">Compte oublié ? Contactez l'administrateur du service technique.</p>
      </form>
    </div>
  );
}
