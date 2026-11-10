import { useCallback, useEffect, useState, type FormEvent } from 'react';
import api, { errorMessage } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { ROLE_LABELS, type Role, type User } from '../api/types';

interface FormState {
  nom: string; prenom: string; email: string; motDePasse: string; telephone: string; role: Role;
  departement: string; fonction: string; service: string; specialite: string;
}

const emptyForm: FormState = {
  nom: '', prenom: '', email: '', motDePasse: '', telephone: '', role: 'DECLARANT',
  departement: '', fonction: '', service: '', specialite: '',
};

const toForm = (u: User): FormState => ({
  nom: u.nom, prenom: u.prenom, email: u.email, motDePasse: '', telephone: u.telephone ?? '', role: u.role,
  departement: u.departement ?? '', fonction: u.fonction ?? '', service: u.service ?? '', specialite: u.specialite ?? '',
});

/** US02 : gestion des comptes (administrateur). */
export default function UsersPage() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [roleFilter, setRoleFilter] = useState<'' | Role>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<User | 'new' | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get<User[]>('/users', { params: roleFilter ? { role: roleFilter } : {} });
      setUsers(res.data);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [roleFilter]);

  useEffect(() => { void load(); }, [load]);

  const toggleActif = async (u: User) => {
    try {
      await api.patch(`/users/${u.id}/actif`, { actif: !u.actif });
      await load();
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  return (
    <>
      <div className="page-head">
        <h1>Utilisateurs</h1>
        <button className="btn btn-primary" onClick={() => setEditing('new')}>+ Nouveau compte</button>
      </div>

      <div className="toolbar">
        <label htmlFor="rf">Rôle :</label>
        <select id="rf" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as '' | Role)}>
          <option value="">Tous</option>
          {(Object.keys(ROLE_LABELS) as Role[]).map((r) => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
        </select>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card table-wrap">
        {loading ? <p className="muted">Chargement…</p> : (
          <table>
            <thead>
              <tr><th>Nom</th><th>Email</th><th>Rôle</th><th>Détail</th><th>Statut</th><th /></tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className={u.actif ? '' : 'row-off'}>
                  <td>{u.prenom} {u.nom}</td>
                  <td>{u.email}</td>
                  <td><span className={`badge badge-${u.role}`}>{ROLE_LABELS[u.role]}</span></td>
                  <td>{u.departement ?? u.service ?? u.specialite ?? '—'}</td>
                  <td>{u.actif ? 'Actif' : 'Désactivé'}</td>
                  <td className="actions">
                    <button className="btn btn-small" onClick={() => setEditing(u)}>Modifier</button>
                    <button className="btn btn-small btn-outline" disabled={u.id === me?.id} onClick={() => toggleActif(u)}>
                      {u.actif ? 'Désactiver' : 'Réactiver'}
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && <tr><td colSpan={6} className="muted">Aucun utilisateur.</td></tr>}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <UserModal
          user={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); void load(); }}
        />
      )}
    </>
  );
}

function UserModal({ user, onClose, onSaved }: { user: User | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<FormState>(user ? toForm(user) : emptyForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const isNew = user === null;

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (isNew && form.motDePasse.length < 8) return setError('Mot de passe : 8 caractères minimum.');
    if (!isNew && form.motDePasse && form.motDePasse.length < 8) return setError('Mot de passe : 8 caractères minimum.');
    setSaving(true);
    try {
      const payload = {
        nom: form.nom, prenom: form.prenom, email: form.email, role: form.role,
        telephone: form.telephone || null,
        departement: form.role === 'DECLARANT' ? form.departement || null : null,
        fonction: form.role === 'DECLARANT' ? form.fonction || null : null,
        service: form.role === 'ADMINISTRATEUR' ? form.service || null : null,
        specialite: form.role === 'TECHNICIEN' ? form.specialite || null : null,
        ...(form.motDePasse ? { motDePasse: form.motDePasse } : {}),
      };
      if (isNew) await api.post('/users', payload);
      else await api.put(`/users/${user.id}`, payload);
      onSaved();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <form className="modal card" onSubmit={submit} onMouseDown={(e) => e.stopPropagation()}>
        <h3>{isNew ? 'Nouveau compte' : 'Modifier le compte'}</h3>
        {error && <div className="alert alert-error">{error}</div>}

        <div className="row">
          <div><label>Prénom</label><input required value={form.prenom} onChange={(e) => set('prenom', e.target.value)} /></div>
          <div><label>Nom</label><input required value={form.nom} onChange={(e) => set('nom', e.target.value)} /></div>
        </div>
        <label>Email</label>
        <input type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} />
        <label>{isNew ? 'Mot de passe' : 'Nouveau mot de passe (laisser vide pour ne pas changer)'}</label>
        <input type="password" autoComplete="new-password" value={form.motDePasse} onChange={(e) => set('motDePasse', e.target.value)} />
        <label>Téléphone</label>
        <input value={form.telephone} onChange={(e) => set('telephone', e.target.value)} />
        <label>Rôle</label>
        <select value={form.role} onChange={(e) => set('role', e.target.value as Role)}>
          {(Object.keys(ROLE_LABELS) as Role[]).map((r) => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
        </select>

        {form.role === 'DECLARANT' && (
          <div className="row">
            <div><label>Département</label><input value={form.departement} onChange={(e) => set('departement', e.target.value)} /></div>
            <div><label>Fonction</label><input value={form.fonction} onChange={(e) => set('fonction', e.target.value)} /></div>
          </div>
        )}
        {form.role === 'ADMINISTRATEUR' && (
          <><label>Service</label><input value={form.service} onChange={(e) => set('service', e.target.value)} /></>
        )}
        {form.role === 'TECHNICIEN' && (
          <><label>Spécialité</label><input value={form.specialite} onChange={(e) => set('specialite', e.target.value)} /></>
        )}

        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>Annuler</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Enregistrement…' : 'Enregistrer'}</button>
        </div>
      </form>
    </div>
  );
}
