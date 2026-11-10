import axios, { AxiosError } from 'axios';

export const TOKEN_KEY = 'isetcare_token';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api',
});

let onUnauthorized: (() => void) | null = null;
export const setUnauthorizedHandler = (fn: (() => void) | null) => {
  onUnauthorized = fn;
};

// Ajoute automatiquement le token JWT à chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Session expirée ou token invalide : on déconnecte (sauf pour la page de connexion elle-même)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && !error.config?.url?.includes('/auth/login')) {
      onUnauthorized?.();
    }
    return Promise.reject(error);
  },
);

/** Extrait un message lisible d'une erreur renvoyée par l'API ({"message": "..."}). */
export function errorMessage(e: unknown, fallback = 'Une erreur est survenue.'): string {
  if (axios.isAxiosError(e)) {
    if (!e.response) return "Impossible de joindre le serveur. Vérifiez que l'API est démarrée.";
    const message = (e.response.data as { message?: string } | undefined)?.message;
    if (message) return message;
    if (e.response.status === 403) return 'Accès refusé pour votre rôle.';
  }
  return fallback;
}

export default api;
