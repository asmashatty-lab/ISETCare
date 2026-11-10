# ISETCare – Frontend (authentification)

React + TypeScript + Vite. Pages : connexion, tableau de bord, mon profil, gestion des utilisateurs (administrateur).

## Lancer
1. Installer Node.js LTS (nodejs.org).
2. Démarrer le backend (API Spring Boot) d'abord.
3. Dans ce dossier :
   ```
   npm install
   npm run dev
   ```
4. Ouvrir http://localhost:5173

## Adresse de l'API
Le fichier `.env` contient `VITE_API_URL=http://localhost:8080/api`.
Si votre API utilise un autre port (ex. 8081), modifiez-le puis relancez `npm run dev`.

## Comptes de démonstration
| Rôle | Email | Mot de passe |
|---|---|---|
| Administrateur | admin@isetcare.tn | Admin123! |
| Technicien | technicien@isetcare.tn | Tech1234! |
| Déclarant | enseignant@isetcare.tn | Ens12345! |

## Structure
```
src/
  api/client.ts         axios + token JWT automatique + gestion des erreurs
  api/types.ts          types User / Role
  auth/AuthContext.tsx  état de connexion (login, logout, utilisateur courant)
  auth/ProtectedRoute   routes protégées par connexion et par rôle
  components/Layout     barre du haut + menu selon le rôle
  pages/                LoginPage, DashboardPage, ProfilePage, UsersPage
```
