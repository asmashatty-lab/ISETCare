import { useAuth } from '../auth/AuthContext';
import type { Role } from '../api/types';

interface Module { titre: string; description: string; sprint: string; roles: Role[] }

const MODULES: Module[] = [
  { titre: 'Matériel', description: 'Fiches équipements, salles, types, QR codes.', sprint: 'Sprint 5', roles: ['ADMINISTRATEUR', 'TECHNICIEN', 'DECLARANT'] },
  { titre: 'Réclamations', description: 'Signaler une panne, suivre son statut, affecter un technicien.', sprint: 'Sprint 6', roles: ['ADMINISTRATEUR', 'TECHNICIEN', 'DECLARANT'] },
  { titre: 'Interventions', description: 'Diagnostic, action effectuée, coût et clôture.', sprint: 'Sprint 7', roles: ['ADMINISTRATEUR', 'TECHNICIEN'] },
  { titre: 'Maintenance préventive', description: 'Planification, calendrier et rapports.', sprint: 'Sprint 8', roles: ['ADMINISTRATEUR', 'TECHNICIEN'] },
  { titre: 'Notifications', description: 'Alertes, rappels et changements de statut.', sprint: 'Sprint 9', roles: ['ADMINISTRATEUR', 'TECHNICIEN', 'DECLARANT'] },
  { titre: 'Aide à la décision', description: 'Recommandation de remplacement et statistiques.', sprint: 'Sprint 11', roles: ['ADMINISTRATEUR'] },
];

export default function DashboardPage() {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <>
      <h1>Bonjour {user.prenom} S</h1>
      <p className="muted">Voici les modules d'ISETCare qui vous seront accessibles. Ils seront activés au fil des sprints.</p>
      <div className="grid">
        {MODULES.filter((m) => m.roles.includes(user.role)).map((m) => (
          <div className="card module" key={m.titre}>
            <h3>{m.titre}</h3>
            <p>{m.description}</p>
            <span className="tag">{m.sprint} – bientôt</span>
          </div>
        ))}
      </div>
    </>
  );
}
