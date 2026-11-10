export type Role = 'DECLARANT' | 'TECHNICIEN' | 'ADMINISTRATEUR';

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  role: Role;
  actif: boolean;
  departement: string | null;
  fonction: string | null;
  service: string | null;
  specialite: string | null;
  disponible: boolean | null;
}

export const ROLE_LABELS: Record<Role, string> = {
  DECLARANT: 'Déclarant',
  TECHNICIEN: 'Technicien',
  ADMINISTRATEUR: 'Administrateur',
};
