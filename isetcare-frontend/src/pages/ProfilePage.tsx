import { useState, type FormEvent } from 'react';
import api, { errorMessage } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { ROLE_LABELS, type User } from '../api/types';

type Msg = { type: 'ok' | 'error'; text: string } | null;

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [nom, setNom] = useState(user?.nom ?? '');
  const [prenom, setPrenom] = useState(user?.prenom ?? '');
  const [telephone, setTelephone] = useState(user?.telephone ?? '');
  const [profileMsg, setProfileMsg] = useState<Msg>(null);

  const [ancien, setAncien] = useState('');
  const [nouveau, setNouveau] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pwdMsg, setPwdMsg] = useState<Msg>(null);

  if (!user) return null;

  // US03 : modifier mon profil
  const saveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);
    try {
      const res = await api.put<User>('/auth/profile', { nom, prenom, telephone: telephone || null });
      setUser(res.data);
      setProfileMsg({ type: 'ok', text: 'Profil mis à jour.' });
    } catch (err) {
      setProfileMsg({ type: 'error', text: errorMessage(err) });
    }
  };

  // US03 : modifier mon mot de passe
  const savePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPwdMsg(null);
    if (nouveau.length < 8) return setPwdMsg({ type: 'error', text: 'Le nouveau mot de passe doit contenir au moins 8 caractères.' });
    if (nouveau !== confirm) return setPwdMsg({ type: 'error', text: 'La confirmation ne correspond pas.' });
    try {
      await api.put('/auth/password', { ancienMotDePasse: ancien, nouveauMotDePasse: nouveau });
      setAncien(''); setNouveau(''); setConfirm('');
      setPwdMsg({ type: 'ok', text: 'Mot de passe modifié.' });
    } catch (err) {
      setPwdMsg({ type: 'error', text: errorMessage(err) });
    }
  };

  return (
    <>
      <h1>Mon profil</h1>
      <div className="grid two">
        <form className="card" onSubmit={saveProfile}>
          <h3>Informations personnelles</h3>
          {profileMsg && <div className={`alert alert-${profileMsg.type}`}>{profileMsg.text}</div>}
          <label>Email</label>
          <input value={user.email} disabled />
          <label>Rôle</label>
          <input value={ROLE_LABELS[user.role]} disabled />
          <label htmlFor="prenom">Prénom</label>
          <input id="prenom" required value={prenom} onChange={(e) => setPrenom(e.target.value)} />
          <label htmlFor="nom">Nom</label>
          <input id="nom" required value={nom} onChange={(e) => setNom(e.target.value)} />
          <label htmlFor="tel">Téléphone</label>
          <input id="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
          <button className="btn btn-primary" type="submit">Enregistrer</button>
        </form>

        <form className="card" onSubmit={savePassword}>
          <h3>Changer le mot de passe</h3>
          {pwdMsg && <div className={`alert alert-${pwdMsg.type}`}>{pwdMsg.text}</div>}
          <label htmlFor="old">Ancien mot de passe</label>
          <input id="old" type="password" autoComplete="current-password" required value={ancien} onChange={(e) => setAncien(e.target.value)} />
          <label htmlFor="new">Nouveau mot de passe (8 caractères minimum)</label>
          <input id="new" type="password" autoComplete="new-password" required value={nouveau} onChange={(e) => setNouveau(e.target.value)} />
          <label htmlFor="conf">Confirmer le nouveau mot de passe</label>
          <input id="conf" type="password" autoComplete="new-password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          <button className="btn btn-primary" type="submit">Modifier le mot de passe</button>
        </form>
      </div>
    </>
  );
}
